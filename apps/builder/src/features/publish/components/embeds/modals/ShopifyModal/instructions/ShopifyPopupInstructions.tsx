import { OrderedList, ListItem, Stack, Text, Code } from '@chakra-ui/react'
import { useState } from 'react'
import { PopupSettings } from '../../../settings/PopupSettings'
import { JavascriptPopupSnippet } from '../../Javascript/JavascriptPopupSnippet'
import { useScopedI18n } from '@/locales'

export const ShopifyPopupInstructions = () => {
  const [inputValue, setInputValue] = useState<number>()
  const scopedT = useScopedI18n('share')
  return (
    <OrderedList spacing={4} pl={5}>
      <ListItem>
      {scopedT('On your shop dashboard in the')} <Code>Themes</Code> {scopedT('page, click on')}{' '}
        <Code>Actions {'>'} Edit code</Code>
      </ListItem>
      <ListItem>
        <Stack spacing={4}>
          <PopupSettings
            onUpdateSettings={(settings) =>
              setInputValue(settings.autoShowDelay)
            }
          />
          <Text>
          {scopedT('In')} <Code>Layout {'>'} theme.liquid</Code> {scopedT('file, paste this code just before the closing')} <Code>{'<head>'}</Code>{scopedT('tag:')}
          </Text>
          <JavascriptPopupSnippet autoShowDelay={inputValue} />
        </Stack>
      </ListItem>
    </OrderedList>
  )
}
