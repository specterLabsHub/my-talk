import { TextInput } from '@/components/inputs'
import { VariableSearchInput } from '@/components/inputs/VariableSearchInput'
import { useScopedI18n } from '@/locales'
import { FormLabel, Stack } from '@chakra-ui/react'
import { EmailInputOptions, Variable } from '@typebot.io/schemas'
import React from 'react'

type Props = {
  options: EmailInputOptions
  onOptionsChange: (options: EmailInputOptions) => void
}

export const EmailInputSettings = ({ options, onOptionsChange }: Props) => {
  const handlePlaceholderChange = (placeholder: string) =>
    onOptionsChange({ ...options, labels: { ...options.labels, placeholder } })
  const handleButtonLabelChange = (button: string) =>
    onOptionsChange({ ...options, labels: { ...options.labels, button } })
  const handleVariableChange = (variable?: Variable) =>
    onOptionsChange({ ...options, variableId: variable?.id })
  const handleRetryMessageChange = (retryMessageContent: string) =>
    onOptionsChange({ ...options, retryMessageContent })
    const scopedT = useScopedI18n('build')

  return (
    <Stack spacing={4}>
      <TextInput
        label={scopedT("Placeholder")}
        defaultValue={options.labels.placeholder}
        onChange={handlePlaceholderChange}
      />
      <TextInput
        label={scopedT("Button label")}
        defaultValue={options.labels.button}
        onChange={handleButtonLabelChange}
      />
      <TextInput
        label={scopedT("Retry message")}
        defaultValue={options.retryMessageContent}
        onChange={handleRetryMessageChange}
      />
      <Stack>
        <FormLabel mb="0" htmlFor="variable">
          {scopedT("Save answer in a variable")}:
        </FormLabel>
        <VariableSearchInput
          initialVariableId={options.variableId}
          onSelectVariable={handleVariableChange}
        />
      </Stack>
    </Stack>
  )
}
