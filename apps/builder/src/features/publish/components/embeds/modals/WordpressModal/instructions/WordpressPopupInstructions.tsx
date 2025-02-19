import { CodeEditor } from '@/components/inputs/CodeEditor'
import { ExternalLinkIcon } from '@/components/icons'
import {
  OrderedList,
  ListItem,
  useColorModeValue,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { PopupSettings } from '../../../settings/PopupSettings'
import { parseInitPopupCode } from '../../../snippetParsers/popup'
import { parseApiHostValue } from '../../../snippetParsers'
import { useScopedI18n } from '@/locales'

type Props = {
  publicId: string
  customDomain?: string
}
export const WordpressPopupInstructions = ({
  publicId,
  customDomain,
}: Props) => {
  const [autoShowDelay, setAutoShowDelay] = useState<number>()

  const initCode = parseInitPopupCode({
    typebot: publicId,
    apiHost: parseApiHostValue(customDomain),
    autoShowDelay,
  })
  const scopedT = useScopedI18n('share')

  return (
    <OrderedList spacing={4} pl={5}>
      <ListItem>
      {scopedT('Install')}{' '}
        <Link
          href="https://wordpress.org/plugins/typebot/"
          isExternal
          color={useColorModeValue('blue.500', 'blue.300')}
        >
          the official MyTalk WordPress plugin
          <ExternalLinkIcon mx="2px" />
        </Link>
      </ListItem>
      <ListItem>
        <Stack spacing={4}>
          <PopupSettings
            onUpdateSettings={(settings) =>
              setAutoShowDelay(settings.autoShowDelay)
            }
          />
         <Text>{scopedT('You can now place the following code snippet in the MyTalk panel in your WordPress admin:')}</Text>
          <CodeEditor value={initCode} lang="javascript" isReadOnly />
        </Stack>
      </ListItem>
    </OrderedList>
  )
}
