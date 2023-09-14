import React from 'react'
import { Stack } from '@chakra-ui/react'
import { SwitchWithRelatedSettings } from '@/components/SwitchWithRelatedSettings'
import { ConditionForm } from '@/features/blocks/logic/condition/components/ConditionForm'
import { ButtonItem, Condition, LogicalOperator } from '@typebot.io/schemas'
import { useScopedI18n } from '@/locales'

type Props = {
  item: ButtonItem
  onSettingsChange: (updates: Omit<ButtonItem, 'content'>) => void
}

export const ButtonsItemSettings = ({ item, onSettingsChange }: Props) => {
  const updateIsDisplayConditionEnabled = (isEnabled: boolean) =>
    onSettingsChange({
      ...item,
      displayCondition: {
        ...item.displayCondition,
        isEnabled,
      },
    })

  const updateDisplayCondition = (condition: Condition) =>
    onSettingsChange({
      ...item,
      displayCondition: {
        ...item.displayCondition,
        condition,
      },
    })

    const scopedT = useScopedI18n('build')

  return (
    <Stack spacing={4}>
      <SwitchWithRelatedSettings
        label={scopedT("Display condition")}
        moreInfoContent={scopedT("Only display this item if a condition is met.")}
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
