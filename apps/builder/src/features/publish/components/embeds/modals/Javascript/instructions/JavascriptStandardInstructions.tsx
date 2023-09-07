import { Stack, Code, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { StandardSettings } from '../../../settings/StandardSettings'
import { JavascriptStandardSnippet } from '../JavascriptStandardSnippet'
import { useScopedI18n } from '@/locales'

export const JavascriptStandardInstructions = () => {
  const [inputValues, setInputValues] = useState<{
    heightLabel: string
    widthLabel?: string
  }>({
    heightLabel: '100%',
    widthLabel: '100%',
  })
  const scopedT = useScopedI18n('share')
  return (
    <Stack spacing={4}>
      <StandardSettings
        onUpdateWindowSettings={(settings) => setInputValues({ ...settings })}
      />
      <Text>
      {scopedT('Paste this anywhere in the')} <Code>{'<body>'}</Code>:
      </Text>
      <JavascriptStandardSnippet {...inputValues} />
    </Stack>
  )
}
