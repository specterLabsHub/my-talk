import { TextInput } from '@/components/inputs'
import { VariableSearchInput } from '@/components/inputs/VariableSearchInput'
import { FormLabel, Stack } from '@chakra-ui/react'
import { PhoneNumberInputOptions, Variable } from '@typebot.io/schemas'
import React from 'react'
import { CountryCodeSelect } from './CountryCodeSelect'
import { useScopedI18n } from '@/locales'

type Props = {
  options: PhoneNumberInputOptions
  onOptionsChange: (options: PhoneNumberInputOptions) => void
}

export const PhoneInputSettings = ({ options, onOptionsChange }: Props) => {
  const handlePlaceholderChange = (placeholder: string) =>
    onOptionsChange({ ...options, labels: { ...options.labels, placeholder } })
  const handleButtonLabelChange = (button: string) =>
    onOptionsChange({ ...options, labels: { ...options.labels, button } })
  const handleVariableChange = (variable?: Variable) =>
    onOptionsChange({ ...options, variableId: variable?.id })
  const handleRetryMessageChange = (retryMessageContent: string) =>
    onOptionsChange({ ...options, retryMessageContent })
  const handleDefaultCountryChange = (defaultCountryCode: string) =>
    onOptionsChange({ ...options, defaultCountryCode })

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
      <Stack>
        <FormLabel mb="0" htmlFor="button">
          {scopedT("Default country")}
        </FormLabel>
        <CountryCodeSelect
          onSelect={handleDefaultCountryChange}
          countryCode={options.defaultCountryCode}
        />
      </Stack>
      <TextInput
        label={scopedT("Retry message")}
        defaultValue={options.retryMessageContent}
        onChange={handleRetryMessageChange}
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
