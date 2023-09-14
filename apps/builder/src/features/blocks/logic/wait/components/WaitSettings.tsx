import { Stack } from '@chakra-ui/react'
import { WaitOptions } from '@typebot.io/schemas'
import React from 'react'
import { TextInput } from '@/components/inputs'
import { useScopedI18n } from '@/locales'

type Props = {
  options: WaitOptions
  onOptionsChange: (options: WaitOptions) => void
}

export const WaitSettings = ({ options, onOptionsChange }: Props) => {
  const handleSecondsChange = (secondsToWaitFor: string | undefined) => {
    onOptionsChange({ ...options, secondsToWaitFor })
  }

  const scopedT = useScopedI18n('build')

  return (
    <Stack spacing={4}>
      <TextInput
        label={scopedT("Seconds to wait for:")}
        defaultValue={options.secondsToWaitFor}
        onChange={handleSecondsChange}
        placeholder="0"
      />
    </Stack>
  )
}
