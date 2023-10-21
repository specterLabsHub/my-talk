import { CodeEditor } from '@/components/inputs/CodeEditor'
import { OrderedList, ListItem, Stack, Text, Code } from '@chakra-ui/react'
import { useState } from 'react'
import { StandardSettings } from '../../../settings/StandardSettings'
import {
  parseStandardElementCode,
  parseStandardHeadCode,
} from '../../Javascript/JavascriptStandardSnippet'
import { useScopedI18n } from '@/locales'

type Props = {
  publicId: string
}

export const ShopifyStandardInstructions = ({ publicId }: Props) => {
  const [windowSizes, setWindowSizes] = useState<{
    width?: string
    height: string
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
      {scopedT('On your shop dashboard in the')} <Code>Themes</Code> {scopedT('page, click on')}{' '}
        <Code>Actions {'>'} Edit code</Code>
      </ListItem>
      <ListItem>
        <Stack spacing={4}>
          <Text>
          {scopedT('In')} <Code>Layout {'>'} theme.liquid</Code> {scopedT('file, paste this code just before the closing')} <Code>{'<head>'}</Code>{scopedT('tag:')}
          </Text>

          <CodeEditor value={headCode} lang="html" isReadOnly />
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
          <Text>
            {scopedT('Place an element on which the MyTalk will go in any file in the')}{' '}
            <Code>{'<body>'}</Code>:
          </Text>
          <CodeEditor value={elementCode} lang="html" isReadOnly />
        </Stack>
      </ListItem>
    </OrderedList>
  )
}
