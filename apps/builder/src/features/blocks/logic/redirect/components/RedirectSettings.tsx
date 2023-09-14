import { TextInput } from '@/components/inputs'
import { SwitchWithLabel } from '@/components/inputs/SwitchWithLabel'
import { useScopedI18n } from '@/locales'
import { Stack } from '@chakra-ui/react'
import { RedirectOptions } from '@typebot.io/schemas'
import React from 'react'

type Props = {
  options: RedirectOptions
  onOptionsChange: (options: RedirectOptions) => void
}

export const RedirectSettings = ({ options, onOptionsChange }: Props) => {
  const handleUrlChange = (url?: string) => onOptionsChange({ ...options, url })

  const handleIsNewTabChange = (isNewTab: boolean) =>
    onOptionsChange({ ...options, isNewTab })

    const scopedT = useScopedI18n('build')

  return (
    <Stack spacing={4}>
      <TextInput
        label="Url:"
        defaultValue={options.url ?? ''}
        placeholder={scopedT("Type a URL...")}
        onChange={handleUrlChange}
      />
      <SwitchWithLabel
        label={scopedT("Open in new tab?")}
        initialValue={options.isNewTab}
        onCheckChange={handleIsNewTabChange}
      />
    </Stack>
  )
}
