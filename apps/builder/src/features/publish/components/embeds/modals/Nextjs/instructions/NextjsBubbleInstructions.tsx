import { useTypebot } from '@/features/editor/providers/TypebotProvider'
import { ListItem, OrderedList, Stack, Text } from '@chakra-ui/react'
import { BubbleProps } from '@typebot.io/nextjs'
import { useState } from 'react'
import { BubbleSettings } from '../../../settings/BubbleSettings/BubbleSettings'
import { InstallNextjsPackageSnippet } from '../InstallNextjsPackageSnippet'
import { NextjsBubbleSnippet } from '../NextjsBubbleSnippet'
import { parseDefaultBubbleTheme } from '../../Javascript/instructions/JavascriptBubbleInstructions'
import { useScopedI18n } from '@/locales'

export const NextjsBubbleInstructions = () => {
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
        <Stack spacing={4}>
          <Text>{scopedT('Install the packages')}</Text>
          <InstallNextjsPackageSnippet />
        </Stack>
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
          <NextjsBubbleSnippet theme={theme} previewMessage={previewMessage} />
        </Stack>
      </ListItem>
    </OrderedList>
  )
}
