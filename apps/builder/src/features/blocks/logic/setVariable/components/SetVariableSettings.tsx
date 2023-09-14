import { Alert, AlertIcon, FormLabel, Stack, Tag, Text } from '@chakra-ui/react'
import { CodeEditor } from '@/components/inputs/CodeEditor'
import { SetVariableOptions, Variable, valueTypes } from '@typebot.io/schemas'
import React from 'react'
import { VariableSearchInput } from '@/components/inputs/VariableSearchInput'
import { SwitchWithLabel } from '@/components/inputs/SwitchWithLabel'
import { Select } from '@/components/inputs/Select'
import { useScopedI18n } from '@/locales'

type Props = {
  options: SetVariableOptions
  onOptionsChange: (options: SetVariableOptions) => void
}

export const SetVariableSettings = ({ options, onOptionsChange }: Props) => {
  const updateVariableId = (variable?: Variable) =>
    onOptionsChange({ ...options, variableId: variable?.id })

  const updateValueType = (type?: string) =>
    onOptionsChange({
      ...options,
      type: type as SetVariableOptions['type'],
    })

    const scopedT = useScopedI18n('build')

  return (
    <Stack spacing={4}>
      <Stack>
        <FormLabel mb="0" htmlFor="variable-search">
          {scopedT('Search or create variable')}
        </FormLabel>
        <VariableSearchInput
          onSelectVariable={updateVariableId}
          initialVariableId={options.variableId}
          id="variable-search"
        />
      </Stack>

      <Stack>
        <Text mb="0" fontWeight="medium">
          {scopedT('Value')}
        </Text>
        <Select
          selectedItem={options.type ?? `${scopedT('Custom')}`}
          items={valueTypes}
          onSelect={updateValueType}
        />
        <SetVariableValue options={options} onOptionsChange={onOptionsChange} />
      </Stack>
    </Stack>
  )
}

const SetVariableValue = ({
  options,
  onOptionsChange,
}: {
  options: SetVariableOptions
  onOptionsChange: (options: SetVariableOptions) => void
}): JSX.Element | null => {
  const updateExpression = (expressionToEvaluate: string) =>
    onOptionsChange({ ...options, expressionToEvaluate })

  const updateClientExecution = (isExecutedOnClient: boolean) =>
    onOptionsChange({
      ...options,
      isExecutedOnClient,
    })

  const updateItemVariableId = (variable?: Variable) =>
    onOptionsChange({
      ...options,
      mapListItemParams: {
        ...options.mapListItemParams,
        baseItemVariableId: variable?.id,
      },
    })

  const updateBaseListVariableId = (variable?: Variable) =>
    onOptionsChange({
      ...options,
      mapListItemParams: {
        ...options.mapListItemParams,
        baseListVariableId: variable?.id,
      },
    })

  const updateTargetListVariableId = (variable?: Variable) =>
    onOptionsChange({
      ...options,
      mapListItemParams: {
        ...options.mapListItemParams,
        targetListVariableId: variable?.id,
      },
    })

    const scopedT = useScopedI18n('build')

  switch (options.type) {
    case 'Custom':
    case undefined:
      return (
        <>
          <CodeEditor
            defaultValue={options.expressionToEvaluate ?? ''}
            onChange={updateExpression}
            lang="javascript"
          />
          <SwitchWithLabel
            label={scopedT("Execute on client?")}
            moreInfoContent={scopedT("Check this if you need access to client-only variables like 'window' or 'document'.")}
            initialValue={options.isExecutedOnClient ?? false}
            onCheckChange={updateClientExecution}
          />
        </>
      )
    case 'Map item with same index': {
      return (
        <Stack p="2" rounded="md" borderWidth={1}>
          <VariableSearchInput
            initialVariableId={options.mapListItemParams?.baseItemVariableId}
            onSelectVariable={updateItemVariableId}
            placeholder={scopedT("Base item")}
          />
          <VariableSearchInput
            initialVariableId={options.mapListItemParams?.baseListVariableId}
            onSelectVariable={updateBaseListVariableId}
            placeholder={scopedT("Base list")}
          />
          <VariableSearchInput
            initialVariableId={options.mapListItemParams?.targetListVariableId}
            onSelectVariable={updateTargetListVariableId}
            placeholder={scopedT("Target list")}
          />
        </Stack>
      )
    }
    case 'Moment of the day': {
      return (
        <Alert fontSize="sm">
          <AlertIcon />
          <Text>
            {scopedT("Will return either")} <Tag size="sm">{scopedT("morning")}</Tag>,{' '}
            <Tag size="sm">{scopedT("afternoon")}</Tag>,<Tag size="sm">{scopedT("evening")}</Tag> {scopedT("or")}{' '}
            <Tag size="sm">{scopedT("night")}</Tag> {scopedT("based on the current user time.")}
          </Text>
        </Alert>
      )
    }
    case 'Random ID':
    case 'Today':
    case 'Tomorrow':
    case 'User ID':
    case 'Yesterday':
    case 'Empty':
      return null
  }
}
