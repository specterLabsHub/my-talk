import { CodeEditor } from '@/components/inputs/CodeEditor'
import { OrderedList, ListItem, Code, Stack, Text } from '@chakra-ui/react'
import { Typebot } from '@typebot.io/schemas'
import { useState } from 'react'
import { StandardSettings } from '../../../settings/StandardSettings'
import {
  parseStandardElementCode,
  parseStandardHeadCode,
} from '../../Javascript/JavascriptStandardSnippet'
import { useScopedI18n } from '@/locales'

export const GtmStandardInstructions = ({
  publicId,
}: Pick<Typebot, 'publicId'>) => {
  const [windowSizes, setWindowSizes] = useState<{
    height: string
    width?: string
  }>({
    height: '100%',
    width: '100%',
  })

  const headCode = parseStandardHeadCode(publicId)

  const elementCode = parseStandardElementCode(
    windowSizes.width,
    windowSizes.height
  )
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
          <Text>{scopedT('Paste the code below:')}</Text>
          <CodeEditor value={headCode} isReadOnly lang="html" />
        </Stack>
      </ListItem>
      <ListItem>
        <Stack spacing={4}>
          <StandardSettings
            onUpdateWindowSettings={(sizes) =>
              setWindowSizes({
                height: sizes.heightLabel,
                width: sizes.widthLabel,
              })
            }
          />
          <Text>{scopedT('On your web page, you need to have an element on which the MyTalk will go:')}</Text>
          <CodeEditor value={elementCode} isReadOnly lang="html" />
        </Stack>
      </ListItem>
    </OrderedList>
  )
}
