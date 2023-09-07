import { useTypebot } from '@/features/editor/providers/TypebotProvider'
import { OrderedList, ListItem, Stack, Text, Code } from '@chakra-ui/react'
import { BubbleProps } from '@typebot.io/nextjs'
import { useState } from 'react'
import { BubbleSettings } from '../../../settings/BubbleSettings/BubbleSettings'
import { parseDefaultBubbleTheme } from '../../Javascript/instructions/JavascriptBubbleInstructions'
import { JavascriptBubbleSnippet } from '../../Javascript/JavascriptBubbleSnippet'
import { useScopedI18n } from '@/locales'

export const ShopifyBubbleInstructions = () => {
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
        {scopedT('On your shop dashboard in the')} <Code>Themes</Code> {scopedT('page, click on')}{' '}
        <Code>Actions {'>'} Edit code</Code>
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
          <Text>
            {scopedT('In')} <Code>Layout {'>'} theme.liquid</Code> {scopedT('file, paste this code just before the closing')} <Code>{'<head>'}</Code>{scopedT('tag:')}
          </Text>
          <JavascriptBubbleSnippet
            theme={theme}
            previewMessage={previewMessage}
          />
        </Stack>
      </ListItem>
    </OrderedList>
  )
}
