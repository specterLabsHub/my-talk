import { OrderedList, ListItem, Code, Stack, Text } from '@chakra-ui/react'
import { JavascriptStandardSnippet } from '../../Javascript/JavascriptStandardSnippet'
import { useScopedI18n } from '@/locales'

export const WebflowStandardInstructions = () =>{ 
  const scopedT = useScopedI18n('share')
  return (
  
  <OrderedList spacing={4} pl={5}>
    <ListItem>
    {scopedT('Press')} <Code>A</Code> {scopedT('to open the')}<Code>Add elements</Code> {scopedT('panel')}
    </ListItem>
    <ListItem>
      <Stack spacing={4}>
        <Text>
        {scopedT('Add an')} <Code>Embed</Code> {scopedT('element from the')}<Code>components</Code>{' '}
            {scopedT('section and paste this code:')}
        </Text>
        <JavascriptStandardSnippet />
      </Stack>
    </ListItem>
  </OrderedList>
)}
