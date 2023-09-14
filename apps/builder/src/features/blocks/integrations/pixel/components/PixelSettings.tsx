import { DropdownList } from '@/components/DropdownList'
import { SwitchWithRelatedSettings } from '@/components/SwitchWithRelatedSettings'
import { TableList, TableListItemProps } from '@/components/TableList'
import { TextLink } from '@/components/TextLink'
import { TextInput } from '@/components/inputs'
import { CodeEditor } from '@/components/inputs/CodeEditor'
import { Select } from '@/components/inputs/Select'
import { SwitchWithLabel } from '@/components/inputs/SwitchWithLabel'
import { useScopedI18n } from '@/locales'
import { Stack, Text } from '@chakra-ui/react'
import { isDefined, isEmpty } from '@typebot.io/lib'
import {
  PixelBlock,
  pixelEventTypes,
  pixelObjectProperties,
} from '@typebot.io/schemas'
import React, { useMemo } from 'react'

const pixelReferenceUrl =
  'https://developers.facebook.com/docs/meta-pixel/reference#standard-events'

type Props = {
  options?: PixelBlock['options']
  onOptionsChange: (options: PixelBlock['options']) => void
}

type Item = NonNullable<PixelBlock['options']['params']>[number]

export const PixelSettings = ({ options, onOptionsChange }: Props) => {
  const updateIsInitSkipped = (isChecked: boolean) =>
    onOptionsChange({
      ...options,
      isInitSkip: isChecked,
    })

  const updatePixelId = (pixelId: string) =>
    onOptionsChange({
      ...options,
      pixelId: isEmpty(pixelId) ? undefined : pixelId,
    })

  const updateIsTrackingEventEnabled = (isChecked: boolean) =>
    onOptionsChange({
      ...options,
      params: isChecked && !options?.params ? [] : undefined,
    })

  const updateEventType = (
    _: string | undefined,
    eventType?: (typeof pixelEventTypes)[number] | 'Custom'
  ) =>
    onOptionsChange({
      ...options,
      params: [],
      eventType,
    })

  const updateParams = (params: PixelBlock['options']['params']) =>
    onOptionsChange({
      ...options,
      params,
    })

  const updateEventName = (name: string) => {
    if (options?.eventType !== 'Custom') return
    onOptionsChange({
      ...options,
      name: isEmpty(name) ? undefined : name,
    })
  }

  const Item = useMemo(
    () =>
      function Component(props: TableListItemProps<Item>) {
        return <ParamItem {...props} eventType={options?.eventType} />
      },
    [options?.eventType]
  )

  const scopedT = useScopedI18n('build')

  return (
    <Stack spacing={4}>
      <TextInput
        defaultValue={options?.pixelId ?? ''}
        onChange={updatePixelId}
        withVariableButton={false}
        placeholder='Pixel ID (e.g. "123456789")'
      />
      <SwitchWithLabel
        label={scopedT('Skip initialization')}
        moreInfoContent={scopedT("Check this if the bot is embedded in your website and the pixel is already initialized.")}
        initialValue={options?.isInitSkip ?? false}
        onCheckChange={updateIsInitSkipped}
      />
      <SwitchWithRelatedSettings
        label={scopedT('Track event')}
        initialValue={isDefined(options?.params)}
        onCheckChange={updateIsTrackingEventEnabled}
      >
        <Text fontSize="sm" color="gray.500">
          {scopedT('Read the')}{' '}
          <TextLink href={pixelReferenceUrl} isExternal>
            reference
          </TextLink>{' '}
          {scopedT('to better understand the available options.')}
        </Text>
        <Select
          items={['Custom', ...pixelEventTypes] as const}
          selectedItem={options?.eventType}
          placeholder={scopedT("Select event type")}
          onSelect={updateEventType}
        />
        {options?.eventType === 'Custom' && (
          <TextInput
            defaultValue={options.name ?? ''}
            onChange={updateEventName}
            placeholder={scopedT("Event name")}
          />
        )}
        {options?.eventType &&
          (options.eventType === 'Custom' ||
            pixelObjectProperties.filter((prop) =>
              prop.associatedEvents.includes(options.eventType)
            ).length > 0) && (
            <TableList
              initialItems={options?.params ?? []}
              Item={Item}
              onItemsChange={updateParams}
              addLabel="Add parameter"
            />
          )}
      </SwitchWithRelatedSettings>
    </Stack>
  )
}

type ParamItemProps = {
  item: Item
  eventType: 'Custom' | (typeof pixelEventTypes)[number] | undefined
  onItemChange: (item: Item) => void
}

const ParamItem = ({ item, eventType, onItemChange }: ParamItemProps) => {
  const possibleObjectProps =
    eventType && eventType !== 'Custom'
      ? pixelObjectProperties.filter((prop) =>
          prop.associatedEvents.includes(eventType)
        )
      : []

  const currentObject = possibleObjectProps.find(
    (prop) => prop.key === item.key
  )

  const updateKey = (key: string) =>
    onItemChange({
      ...item,
      key,
    })

  const updateValue = (value: string) =>
    onItemChange({
      ...item,
      value,
    })

  if (!eventType) return null

  return (
    <Stack p="4" rounded="md" flex="1" borderWidth="1px">
      {eventType === 'Custom' ? (
        <TextInput
          defaultValue={item.key}
          onChange={updateKey}
          placeholder="Key"
        />
      ) : (
        <DropdownList
          currentItem={item.key}
          items={possibleObjectProps.map((prop) => prop.key)}
          onItemSelect={updateKey}
          placeholder="Selecionar key"
        />
      )}
      {currentObject?.type === 'code' ? (
        <CodeEditor
          lang={'javascript'}
          defaultValue={item.value}
          onChange={updateValue}
        />
      ) : (
        <TextInput
          defaultValue={item.value}
          onChange={updateValue}
          placeholder="Valor"
        />
      )}
    </Stack>
  )
}
