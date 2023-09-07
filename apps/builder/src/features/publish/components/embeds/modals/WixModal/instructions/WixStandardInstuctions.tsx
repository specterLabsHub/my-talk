import { OrderedList, ListItem, Code, Stack, Text } from '@chakra-ui/react'
import { JavascriptStandardSnippet } from '../../Javascript/JavascriptStandardSnippet'
import { useScopedI18n } from '@/locales'

export const WixStandardInstructions = () => {
  const scopedT = useScopedI18n('share')
  return (
    <OrderedList spacing={4} pl={5}>
      <ListItem>
        {scopedT('In the Wix Website Editor')}:
        <Code>
          Add {'>'} Embed Code {'>'} Embed HTML
        </Code>
      </ListItem>
      <ListItem>
        <Stack spacing={4}>
          <Text>
            {scopedT('Click on')} <Code>Enter code</Code> {scopedT('and paste this code:')}
          </Text>
          <JavascriptStandardSnippet widthLabel="100%" heightLabel="100%" />
        </Stack>
      </ListItem>
    </OrderedList>
  )
}
