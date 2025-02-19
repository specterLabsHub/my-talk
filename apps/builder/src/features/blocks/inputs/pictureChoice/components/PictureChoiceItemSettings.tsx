import React from 'react'
import { TextInput, Textarea } from '@/components/inputs'
import { PictureChoiceItem } from '@typebot.io/schemas/features/blocks/inputs/pictureChoice'
import {
  Button,
  HStack,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from '@chakra-ui/react'
import { ImageUploadContent } from '@/components/ImageUploadContent'
import { SwitchWithRelatedSettings } from '@/components/SwitchWithRelatedSettings'
import { ConditionForm } from '@/features/blocks/logic/condition/components/ConditionForm'
import { Condition, LogicalOperator } from '@typebot.io/schemas'
import { useScopedI18n } from '@/locales'

type Props = {
  typebotId: string
  item: PictureChoiceItem
  onItemChange: (updates: Partial<PictureChoiceItem>) => void
}

export const PictureChoiceItemSettings = ({
  typebotId,
  item,
  onItemChange,
}: Props) => {
  const updateTitle = (title: string) => onItemChange({ ...item, title })

  const updateImage = (pictureSrc: string) => {
    onItemChange({ ...item, pictureSrc })
  }

  const updateDescription = (description: string) =>
    onItemChange({ ...item, description })

  const updateIsDisplayConditionEnabled = (isEnabled: boolean) =>
    onItemChange({
      ...item,
      displayCondition: {
        ...item.displayCondition,
        isEnabled,
      },
    })

  const updateDisplayCondition = (condition: Condition) =>
    onItemChange({
      ...item,
      displayCondition: {
        ...item.displayCondition,
        condition,
      },
    })

    const scopedT = useScopedI18n('build')

  return (
    <Stack spacing={4}>
      <HStack>
        <Text fontWeight="medium">{scopedT('Image')}</Text>
        <Popover isLazy>
          {({ onClose }) => (
            <>
              <PopoverTrigger>
                <Button size="sm">
                  {item.pictureSrc ? `${scopedT('Change image')}` : `${scopedT('Pick an image')}`}
                </Button>
              </PopoverTrigger>
              <PopoverContent p="4" w="500px">
                <ImageUploadContent
                  filePath={`typebots/${typebotId}/blocks/${item.blockId}/items/${item.id}`}
                  defaultUrl={item.pictureSrc}
                  onSubmit={(url) => {
                    updateImage(url)
                    onClose()
                  }}
                  excludedTabs={['emoji']}
                />
              </PopoverContent>
            </>
          )}
        </Popover>
      </HStack>
      <TextInput
        label={scopedT("Title")}
        defaultValue={item.title}
        onChange={updateTitle}
      />
      <Textarea
        label={scopedT("Description")}
        defaultValue={item.description}
        onChange={updateDescription}
      />
      <SwitchWithRelatedSettings
        label={scopedT("Display condition")}
        initialValue={item.displayCondition?.isEnabled ?? false}
        onCheckChange={updateIsDisplayConditionEnabled}
      >
        <ConditionForm
          condition={
            item.displayCondition?.condition ?? {
              comparisons: [],
              logicalOperator: LogicalOperator.AND,
            }
          }
          onConditionChange={updateDisplayCondition}
        />
      </SwitchWithRelatedSettings>
    </Stack>
  )
}
