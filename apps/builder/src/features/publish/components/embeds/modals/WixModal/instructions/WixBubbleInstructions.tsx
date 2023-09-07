import { useTypebot } from '@/features/editor/providers/TypebotProvider'
import { OrderedList, ListItem, Code, Stack, Text } from '@chakra-ui/react'
import { BubbleProps } from '@typebot.io/nextjs'
import { useState } from 'react'
import { BubbleSettings } from '../../../settings/BubbleSettings/BubbleSettings'
import { parseDefaultBubbleTheme } from '../../Javascript/instructions/JavascriptBubbleInstructions'
import { JavascriptBubbleSnippet } from '../../Javascript/JavascriptBubbleSnippet'
import { useScopedI18n } from '@/locales'

export const WixBubbleInstructions = () => {
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
        {scopedT('Go to')} <Code>Settings</Code> {scopedT('in your dashboard on Wix')}
      </ListItem>
      <ListItem>
      {scopedT('Click on')} <Code>Custom Code</Code> {scopedT('under')} <Code>Advanced</Code>
      </ListItem>
      <ListItem>
        {scopedT('Click')} <Code>+ Add Custom Code</Code> {scopedT('at the top right.')}
      </ListItem>
      <ListItem>
        <Stack spacing={4}>
          <BubbleSettings
            previewMessage={previewMessage}
            defaultPreviewMessageAvatar={
              typebot?.theme.chat.hostAvatar?.url ?? ''
            }
            theme={theme}
            onPreviewMessageChange={setPreviewMessage}
            onThemeChange={setTheme}
          />
          <Text> {scopedT('Paste this snippet in the code box')}:</Text>
          <JavascriptBubbleSnippet
            theme={theme}
            previewMessage={previewMessage}
          />
        </Stack>
      </ListItem>
      <ListItem>
        {scopedT('Select')} &quot;Body - start&quot; {scopedT('under')} <Code>Place Code in</Code>
      </ListItem>
      <ListItem>{scopedT('Click Apply')}</ListItem>
    </OrderedList>
  )
}
