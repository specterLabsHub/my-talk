import { OrderedList, ListItem, Code, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { PopupSettings } from '../../../settings/PopupSettings'
import { JavascriptPopupSnippet } from '../../Javascript/JavascriptPopupSnippet'
import { useScopedI18n } from '@/locales'

export const GtmPopupInstructions = () => {
  const [inputValue, setInputValue] = useState<number>()
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
          <PopupSettings
            onUpdateSettings={(settings) =>
              setInputValue(settings.autoShowDelay)
            }
          />
          <Text>{scopedT('Paste the code below:')}</Text>
          <JavascriptPopupSnippet autoShowDelay={inputValue} />
        </Stack>
      </ListItem>
    </OrderedList>
  )
}
