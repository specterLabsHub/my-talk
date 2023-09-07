import { OrderedList, ListItem, Code, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { PopupSettings } from '../../../settings/PopupSettings'
import { JavascriptPopupSnippet } from '../../Javascript/JavascriptPopupSnippet'
import { TextLink } from '@/components/TextLink'
import { useScopedI18n } from '@/locales'

export const WebflowPopupInstructions = () => {
  const [inputValue, setInputValue] = useState<number>()
  const scopedT = useScopedI18n('share')

  return (
    <>
      <OrderedList spacing={4} pl={5}>
        <ListItem>
        {scopedT('Press')} <Code>A</Code> {scopedT('to open the')}<Code>Add elements</Code> {scopedT('panel')}
        </ListItem>
        <ListItem>
          <Stack spacing={4}>
            <PopupSettings
              onUpdateSettings={(settings) =>
                setInputValue(settings.autoShowDelay)
              }
            />
            <Text>
            {scopedT('Add an')} <Code>Embed</Code> {scopedT('element from the')}<Code>components</Code>{' '}
            {scopedT('section and paste this code:')}
            </Text>
            <JavascriptPopupSnippet autoShowDelay={inputValue} />
          </Stack>
        </ListItem>
      </OrderedList>
      <Text fontSize="sm" colorScheme="gray" pl="5">
       {scopedT('Check out the')}{' '}
        <TextLink href="https://docs.typebot.io/embed/webflow#popup" isExternal>
          Webflow embed documentation
        </TextLink>{' '}
        {scopedT('for more options.')}
      </Text>
    </>
  )
}
