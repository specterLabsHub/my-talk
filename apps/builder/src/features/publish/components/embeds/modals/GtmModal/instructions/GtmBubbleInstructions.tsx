import { useTypebot } from '@/features/editor/providers/TypebotProvider'
import { OrderedList, ListItem, Stack, Text, Code } from '@chakra-ui/react'
import { BubbleProps } from '@typebot.io/nextjs'
import { useState } from 'react'
import { BubbleSettings } from '../../../settings/BubbleSettings/BubbleSettings'
import { parseDefaultBubbleTheme } from '../../Javascript/instructions/JavascriptBubbleInstructions'
import { JavascriptBubbleSnippet } from '../../Javascript/JavascriptBubbleSnippet'
import { useScopedI18n } from '@/locales'

export const GtmBubbleInstructions = () => {
  const { typebot } = useTypebot()
  const [theme, setTheme] = useState<BubbleProps['theme']>(
    parseDefaultBubbleTheme(typebot)
  )
  const [previewMessage, setPreviewMessage] =
    useState<BubbleProps['previewMessage']>()

    const scopedT = useScopedI18n('share')

  return (
    <OrderedList spacing={4} pl={5}>
      <ListItem>
        {scopedT('On your GTM account dashboard, click on')} <Code>Add a new tag</Code>
      </ListItem>
      <ListItem>
        {scopedT('Choose')} <Code>Custom HTML</Code> {scopedT('tag type')}
      </ListItem>
      <ListItem>
        {scopedT('Check')} <Code>Support document.write</Code>
      </ListItem>
      <ListItem>
        <Stack spacing={4}>
          <BubbleSettings
            theme={theme}
            previewMessage={previewMessage}
            defaultPreviewMessageAvatar={
              typebot?.theme.chat.hostAvatar?.url ?? ''
            }
            onThemeChange={setTheme}
            onPreviewMessageChange={setPreviewMessage}
          />
          <Text>{scopedT('Paste the code below:')}</Text>
          <JavascriptBubbleSnippet
            theme={theme}
            previewMessage={previewMessage}
          />
        </Stack>
      </ListItem>
    </OrderedList>
  )
}
