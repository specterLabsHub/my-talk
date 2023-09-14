import { FormLabel, HStack, Stack, Text } from '@chakra-ui/react'
import { CodeEditor } from '@/components/inputs/CodeEditor'
import { FileInputOptions, Variable } from '@typebot.io/schemas'
import React from 'react'
import { TextInput, NumberInput } from '@/components/inputs'
import { SwitchWithLabel } from '@/components/inputs/SwitchWithLabel'
import { VariableSearchInput } from '@/components/inputs/VariableSearchInput'
import { useScopedI18n } from '@/locales'

type Props = {
  options: FileInputOptions
  onOptionsChange: (options: FileInputOptions) => void
}

export const FileInputSettings = ({ options, onOptionsChange }: Props) => {
  const handleButtonLabelChange = (button: string) =>
    onOptionsChange({ ...options, labels: { ...options.labels, button } })

  const handlePlaceholderLabelChange = (placeholder: string) =>
    onOptionsChange({ ...options, labels: { ...options.labels, placeholder } })

  const handleMultipleFilesChange = (isMultipleAllowed: boolean) =>
    onOptionsChange({ ...options, isMultipleAllowed })

  const handleVariableChange = (variable?: Variable) =>
    onOptionsChange({ ...options, variableId: variable?.id })

  const handleSizeLimitChange = (sizeLimit?: number) =>
    onOptionsChange({ ...options, sizeLimit })

  const handleRequiredChange = (isRequired: boolean) =>
    onOptionsChange({ ...options, isRequired })

  const updateClearButtonLabel = (clear: string) =>
    onOptionsChange({ ...options, labels: { ...options.labels, clear } })

  const updateSkipButtonLabel = (skip: string) =>
    onOptionsChange({ ...options, labels: { ...options.labels, skip } })

    const scopedT = useScopedI18n('build')

  return (
    <Stack spacing={4}>
      <SwitchWithLabel
        label={scopedT("Required?")}
        initialValue={options.isRequired ?? true}
        onCheckChange={handleRequiredChange}
      />
      <SwitchWithLabel
        label={scopedT("Allow multiple files?")}
        initialValue={options.isMultipleAllowed}
        onCheckChange={handleMultipleFilesChange}
      />
      <HStack>
        <NumberInput
          label={scopedT('Size limit:')}
          defaultValue={options.sizeLimit ?? 10}
          onValueChange={handleSizeLimitChange}
          withVariableButton={false}
        />
        <Text>MB</Text>
      </HStack>

      <Stack>
        <FormLabel mb="0">{scopedT('Placeholder')}</FormLabel>
        <CodeEditor
          lang="html"
          onChange={handlePlaceholderLabelChange}
          defaultValue={options.labels.placeholder}
          height={'100px'}
          withVariableButton={false}
        />
      </Stack>
      <TextInput
        label={scopedT("Button label:")}
        defaultValue={options.labels.button}
        onChange={handleButtonLabelChange}
        withVariableButton={false}
      />
      <TextInput
        label={scopedT("Clear button label:")}
        defaultValue={options.labels.clear ?? ''}
        onChange={updateClearButtonLabel}
        withVariableButton={false}
      />
      <TextInput
        label={scopedT("Skip button label:")}
        defaultValue={options.labels.skip ?? ''}
        onChange={updateSkipButtonLabel}
        withVariableButton={false}
      />
      <Stack>
        <FormLabel mb="0" htmlFor="variable">
          {scopedT("Save upload URL")}{options.isMultipleAllowed ? 's' : ''} {scopedT("in a variable")}
        </FormLabel>
        <VariableSearchInput
          initialVariableId={options.variableId}
          onSelectVariable={handleVariableChange}
        />
      </Stack>
    </Stack>
  )
}
