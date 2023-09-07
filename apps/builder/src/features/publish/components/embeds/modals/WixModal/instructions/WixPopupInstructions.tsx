import { OrderedList, ListItem, Code, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { PopupSettings } from '../../../settings/PopupSettings'
import { JavascriptPopupSnippet } from '../../Javascript/JavascriptPopupSnippet'
import { useScopedI18n } from '@/locales'

export const WixPopupInstructions = () => {
  const [inputValue, setInputValue] = useState<number>()
  const scopedT = useScopedI18n('share')

  return (
    <OrderedList spacing={4} pl={5}>
      <ListItem>
      {scopedT('Go to')} <Code>Settings</Code> {scopedT('in your dashboard on Wix')}
      </ListItem>
      <ListItem>
      {scopedT('Click on')} <Code>Custom Code</Code> {scopedT('under')} <Code>Advanced</Code> {scopedT('section')}
      </ListItem>
      <ListItem>
      {scopedT('Click')} <Code>+ Add Custom Code</Code> {scopedT('at the top right.')}
      </ListItem>
      <ListItem>
        <Stack spacing={4}>
          <PopupSettings
            onUpdateSettings={(settings) =>
              setInputValue(settings.autoShowDelay)
            }
          />
          <Text>{scopedT('Paste this snippet in the code box')}:</Text>
          <JavascriptPopupSnippet autoShowDelay={inputValue} />
        </Stack>
      </ListItem>
      <ListItem>
      {scopedT('Select')} &quot;Body - start&quot; {scopedT('under')} <Code>Place Code in</Code>
      </ListItem>
      <ListItem>{scopedT('Click Apply')}</ListItem>
    </OrderedList>
  )
}
