import { TextInput, NumberInput } from '@/components/inputs'
import { VariableSearchInput } from '@/components/inputs/VariableSearchInput'
import { useScopedI18n } from '@/locales'
import { FormLabel, Stack } from '@chakra-ui/react'
import { NumberInputOptions, Variable } from '@typebot.io/schemas'
import React from 'react'

type Props = {
  options: NumberInputOptions
  onOptionsChange: (options: NumberInputOptions) => void
}

export const NumberInputSettings = ({ options, onOptionsChange }: Props) => {
  const handlePlaceholderChange = (placeholder: string) =>
    onOptionsChange({ ...options, labels: { ...options.labels, placeholder } })
  const handleButtonLabelChange = (button: string) =>
    onOptionsChange({ ...options, labels: { ...options.labels, button } })
  const handleMinChange = (min?: NumberInputOptions['min']) =>
    onOptionsChange({ ...options, min })
  const handleMaxChange = (max?: NumberInputOptions['max']) =>
    onOptionsChange({ ...options, max })
  const handleStepChange = (step?: NumberInputOptions['step']) =>
    onOptionsChange({ ...options, step })
  const handleVariableChange = (variable?: Variable) => {
    onOptionsChange({ ...options, variableId: variable?.id })
  }

  const scopedT = useScopedI18n('build')

  return (
    <Stack spacing={4}>
      <TextInput
        label={scopedT("Placeholder")}
        defaultValue={options.labels.placeholder}
        onChange={handlePlaceholderChange}
      />
      <TextInput
        label={scopedT("Button label:")}
        defaultValue={options?.labels?.button ?? 'Enviar'}
        onChange={handleButtonLabelChange}
      />
      <NumberInput
        label="Min:"
        defaultValue={options.min}
        onValueChange={handleMinChange}
      />
      <NumberInput
        label="Max:"
        defaultValue={options.max}
        onValueChange={handleMaxChange}
      />
      <NumberInput
        label={scopedT("Step:")}
        defaultValue={options.step}
        onValueChange={handleStepChange}
      />
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
