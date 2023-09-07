import { CodeEditor } from '@/components/inputs/CodeEditor'
import { useTypebot } from '@/features/editor/providers/TypebotProvider'
import { Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { PopupSettings } from '../../../settings/PopupSettings'
import { parseInitPopupCode } from '../../../snippetParsers'
import {
  parseApiHostValue,
  parseInlineScript,
  typebotImportCode,
} from '../../../snippetParsers/shared'
import { useScopedI18n } from '@/locales'

export const ScriptPopupInstructions = () => {
  const { typebot } = useTypebot()
  const [inputValue, setInputValue] = useState<number>()

  const scriptSnippet = parseInlineScript(
    `${typebotImportCode}

${parseInitPopupCode({
  typebot: typebot?.publicId ?? '',
  apiHost: parseApiHostValue(typebot?.customDomain),
  autoShowDelay: inputValue,
})}`
  )

  const scopedT = useScopedI18n('share')

  return (
    <Stack spacing={4}>
      <PopupSettings
        onUpdateSettings={(settings) => setInputValue(settings.autoShowDelay)}
      />
      <Text>{scopedT('Run this script to initialize the MyTalk')}</Text>
      <CodeEditor isReadOnly value={scriptSnippet} lang="javascript" />
    </Stack>
  )
}
