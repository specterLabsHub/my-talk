import { Stack, Code, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { PopupSettings } from '../../../settings/PopupSettings'
import { JavascriptPopupSnippet } from '../JavascriptPopupSnippet'
import { useScopedI18n } from '@/locales'

export const JavascriptPopupInstructions = () => {
  const [inputValue, setInputValue] = useState<number>()
  const scopedT = useScopedI18n('share')
  return (
    <Stack spacing={4}>
      <PopupSettings
        onUpdateSettings={(settings) => setInputValue(settings.autoShowDelay)}
      />
      <Text>
      {scopedT('Paste this anywhere in the')} <Code>{'<body>'}</Code>:
      </Text>
      <JavascriptPopupSnippet autoShowDelay={inputValue} />
    </Stack>
  )
}
