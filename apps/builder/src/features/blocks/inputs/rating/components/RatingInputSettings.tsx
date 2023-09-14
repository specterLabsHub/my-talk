import { FormLabel, Stack } from '@chakra-ui/react'
import { DropdownList } from '@/components/DropdownList'
import { RatingInputOptions, Variable } from '@typebot.io/schemas'
import React from 'react'
import { SwitchWithLabel } from '@/components/inputs/SwitchWithLabel'
import { TextInput } from '@/components/inputs'
import { VariableSearchInput } from '@/components/inputs/VariableSearchInput'
import { useScopedI18n } from '@/locales'

type Props = {
  options: RatingInputOptions
  onOptionsChange: (options: RatingInputOptions) => void
}

export const RatingInputSettings = ({ options, onOptionsChange }: Props) => {
  const handleLengthChange = (length: number) =>
    onOptionsChange({ ...options, length })

  const handleTypeChange = (buttonType: 'Icons' | 'Numbers') =>
    onOptionsChange({ ...options, buttonType })

  const handleCustomIconCheck = (isEnabled: boolean) =>
    onOptionsChange({
      ...options,
      customIcon: { ...options.customIcon, isEnabled },
    })

  const handleIconSvgChange = (svg: string) =>
    onOptionsChange({ ...options, customIcon: { ...options.customIcon, svg } })

  const handleLeftLabelChange = (left: string) =>
    onOptionsChange({ ...options, labels: { ...options.labels, left } })

  const handleRightLabelChange = (right: string) =>
    onOptionsChange({ ...options, labels: { ...options.labels, right } })

  const handleButtonLabelChange = (button: string) =>
    onOptionsChange({ ...options, labels: { ...options.labels, button } })

  const handleVariableChange = (variable?: Variable) =>
    onOptionsChange({ ...options, variableId: variable?.id })

  const handleOneClickSubmitChange = (isOneClickSubmitEnabled: boolean) =>
    onOptionsChange({ ...options, isOneClickSubmitEnabled })

    const scopedT = useScopedI18n('build')

  return (
    <Stack spacing={4}>
      <Stack>
        <FormLabel mb="0" htmlFor="button">
          {scopedT("Maximum:")}
        </FormLabel>
        <DropdownList
          onItemSelect={handleLengthChange}
          items={[3, 4, 5, 6, 7, 8, 9, 10]}
          currentItem={options.length}
        />
      </Stack>

      <Stack>
        <FormLabel mb="0" htmlFor="button">
          {scopedT("Type:")}
        </FormLabel>
        <DropdownList
          onItemSelect={handleTypeChange}
          items={['Icons', 'Numbers'] as const}
          currentItem={options.buttonType}
        />
      </Stack>

      {options.buttonType === 'Icons' && (
        <SwitchWithLabel
          label={scopedT("Custom icon?")}
          initialValue={options.customIcon.isEnabled}
          onCheckChange={handleCustomIconCheck}
        />
      )}
      {options.buttonType === 'Icons' && options.customIcon.isEnabled && (
        <TextInput
          label={scopedT("Icon SVG:")}
          defaultValue={options.customIcon.svg}
          onChange={handleIconSvgChange}
          placeholder="<svg>...</svg>"
        />
      )}
      <TextInput
        label={`${options.buttonType === 'Icons' ? '1' : '0'} ${scopedT("label:")}`}
        defaultValue={options.labels.left}
        onChange={handleLeftLabelChange}
        placeholder={scopedT("Not likely at all")}
      />
      <TextInput
        label={`${options.length} ${scopedT("label:")}`}
        defaultValue={options.labels.right}
        onChange={handleRightLabelChange}
        placeholder={scopedT("Extremely likely")}
      />
      <SwitchWithLabel
        label={scopedT("One click submit")}
        moreInfoContent={scopedT(`If enabled, the answer will be submitted as soon as the user clicks on a rating instead of showing the 'Send' button.`)}
        initialValue={options.isOneClickSubmitEnabled ?? false}
        onCheckChange={handleOneClickSubmitChange}
      />
      {!options.isOneClickSubmitEnabled && (
        <TextInput
          label={scopedT("Button label:")}
          defaultValue={options.labels.button}
          onChange={handleButtonLabelChange}
        />
      )}
      <Stack>
        <FormLabel mb="0" htmlFor="variable">
          {scopedT("Save answer in a variable:")}
        </FormLabel>
        <VariableSearchInput
          initialVariableId={options.variableId}
          onSelectVariable={handleVariableChange}
        />
      </Stack>
    </Stack>
  )
}
