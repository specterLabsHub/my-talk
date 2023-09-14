import { TextInput } from '@/components/inputs'
import { MoreInfoTooltip } from '@/components/MoreInfoTooltip'
import { VariableSearchInput } from '@/components/inputs/VariableSearchInput'
import { FormControl, FormLabel, Stack } from '@chakra-ui/react'
import {
  ChoiceInputOptions,
  Variable,
  defaultChoiceInputOptions,
} from '@typebot.io/schemas'
import React from 'react'
import { SwitchWithRelatedSettings } from '@/components/SwitchWithRelatedSettings'
import { useScopedI18n } from '@/locales'

type Props = {
  options?: ChoiceInputOptions
  onOptionsChange: (options: ChoiceInputOptions) => void
}

export const ButtonsBlockSettings = ({ options, onOptionsChange }: Props) => {
  const updateIsMultiple = (isMultipleChoice: boolean) =>
    options && onOptionsChange({ ...options, isMultipleChoice })
  const updateIsSearchable = (isSearchable: boolean) =>
    options && onOptionsChange({ ...options, isSearchable })
  const updateButtonLabel = (buttonLabel: string) =>
    options && onOptionsChange({ ...options, buttonLabel })
  const updateSearchInputPlaceholder = (searchInputPlaceholder: string) =>
    options && onOptionsChange({ ...options, searchInputPlaceholder })
  const updateSaveVariable = (variable?: Variable) =>
    options && onOptionsChange({ ...options, variableId: variable?.id })
  const updateDynamicDataVariable = (variable?: Variable) =>
    options && onOptionsChange({ ...options, dynamicVariableId: variable?.id })

    const scopedT = useScopedI18n('build')

  return (
    <Stack spacing={4}>
      <SwitchWithRelatedSettings
        label={scopedT("Multiple choice?")}
        initialValue={options?.isMultipleChoice ?? false}
        onCheckChange={updateIsMultiple}
      >
        <TextInput
          label={scopedT("Submit button label:")}
          defaultValue={options?.buttonLabel ?? 'Enviar'}
          onChange={updateButtonLabel}
        />
      </SwitchWithRelatedSettings>
      <SwitchWithRelatedSettings
        label={scopedT("Is searchable?")}
        initialValue={options?.isSearchable ?? false}
        onCheckChange={updateIsSearchable}
      >
        <TextInput
          label={scopedT("Input placeholder:")}
          defaultValue={
            options?.searchInputPlaceholder ??
            defaultChoiceInputOptions.searchInputPlaceholder
          }
          onChange={updateSearchInputPlaceholder}
        />
      </SwitchWithRelatedSettings>
      <FormControl>
        <FormLabel>
          {scopedT("Dynamic data:")}{' '}
          <MoreInfoTooltip>
            {scopedT("If defined, buttons will be dynamically displayed based on what the variable contains.")}
          </MoreInfoTooltip>
        </FormLabel>
        <VariableSearchInput
          initialVariableId={options?.dynamicVariableId}
          onSelectVariable={updateDynamicDataVariable}
        />
      </FormControl>
      <Stack>
        <FormLabel mb="0" htmlFor="variable">
           {scopedT("Save answer in a variable:")}
        </FormLabel>
        <VariableSearchInput
          initialVariableId={options?.variableId}
          onSelectVariable={updateSaveVariable}
        />
      </Stack>
    </Stack>
  )
}
