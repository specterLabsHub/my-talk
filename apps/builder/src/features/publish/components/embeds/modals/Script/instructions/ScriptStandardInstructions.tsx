import { CodeEditor } from '@/components/inputs/CodeEditor'
import { useTypebot } from '@/features/editor/providers/TypebotProvider'
import { Stack, Code, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { StandardSettings } from '../../../settings/StandardSettings'
import { parseInitStandardCode } from '../../../snippetParsers/standard'
import { parseStandardElementCode } from '../../Javascript/JavascriptStandardSnippet'
import {
  parseApiHostValue,
  parseInlineScript,
  typebotImportCode,
} from '../../../snippetParsers/shared'
import { useScopedI18n } from '@/locales'

export const ScriptStandardInstructions = () => {
  const { typebot } = useTypebot()
  const [inputValues, setInputValues] = useState<{
    heightLabel: string
    widthLabel?: string
  }>({
    heightLabel: '100%',
    widthLabel: '100%',
  })

  const standardElementSnippet = parseStandardElementCode(
    inputValues.widthLabel,
    inputValues.heightLabel
  )

  const scriptSnippet = parseInlineScript(`${typebotImportCode}
  
${parseInitStandardCode({
  typebot: typebot?.publicId ?? '',
  apiHost: parseApiHostValue(typebot?.customDomain),
})}`)
const scopedT = useScopedI18n('share')

  return (
    <Stack spacing={4}>
      <StandardSettings
        onUpdateWindowSettings={(settings) => setInputValues({ ...settings })}
      />
      <Text>
        {scopedT('Make sure you have this')} <Code>mytalk-standard</Code> {scopedT('element in you')}{' '}
        <Code>{'<body>'}</Code>:
      </Text>
      <CodeEditor isReadOnly value={standardElementSnippet} lang="html" />
      <Text>{scopedT('Then, run this script to initialize the MyTalk')}</Text>
      <CodeEditor isReadOnly value={scriptSnippet} lang="javascript" />
    </Stack>
  )
}
