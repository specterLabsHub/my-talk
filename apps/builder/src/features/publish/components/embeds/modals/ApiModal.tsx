import { AlertInfo } from '@/components/AlertInfo'
import { CodeEditor } from '@/components/inputs/CodeEditor'
import { TextLink } from '@/components/TextLink'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Heading,
  ModalCloseButton,
  ModalBody,
  OrderedList,
  ListItem,
  Code,
  ModalFooter,
  Text,
  Stack,
} from '@chakra-ui/react'
import { ModalProps } from '../EmbedButton'
import { parseApiHost } from '../snippetParsers/shared'
import { useTypebot } from '@/features/editor/providers/TypebotProvider'
import { useScopedI18n } from '@/locales'

export const ApiModal = ({
  isPublished,
  publicId,
  isOpen,
  onClose,
}: ModalProps): JSX.Element => {
  const { typebot } = useTypebot()
  const startParamsBody = `{
  "startParams": {
    "typebot": "${publicId}",
  }
}`

  const replyBody = `{
  "message": "This is my reply",
  "sessionId": "<ID_FROM_FIRST_RESPONSE>"
}`
const scopedT = useScopedI18n('share')

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="md">API</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody as={Stack} spacing="6">
          {!isPublished && (
            <AlertInfo>{scopedT('You need to publish your bot first.')}</AlertInfo>
          )}
          <OrderedList spacing={4} pl="4">
            <ListItem>
              <Stack>
                <Text>
                 {scopedT('To start the chat, send a')} <Code>POST</Code>  {scopedT('request to')}
                </Text>
                <CodeEditor
                  isReadOnly
                  lang={'shell'}
                  value={`${parseApiHost(
                    typebot?.customDomain
                  )}/api/v1/sendMessage`}
                />
                <Text>{scopedT('with the following JSON body:')}</Text>
                <CodeEditor isReadOnly lang={'json'} value={startParamsBody} />
              </Stack>
            </ListItem>
            <ListItem>
            {scopedT('The first response will contain a')}<Code>sessionId</Code> {scopedT('that you will need for subsequent requests.')}
            </ListItem>
            <ListItem>
              <Stack>
                <Text>
                  {scopedT('To send replies, send')} <Code>POST</Code> {scopedT('request to')}
                </Text>
                <CodeEditor
                  isReadOnly
                  lang={'shell'}
                  value={`${parseApiHost(
                    typebot?.customDomain
                  )}/api/v1/sendMessage`}
                />
                <Text>{scopedT("With the following JSON body:")}</Text>
                <CodeEditor isReadOnly lang={'json'} value={replyBody} />
                <Text>
                {scopedT('Replace')} <Code>{'<ID_FROM_FIRST_RESPONSE>'}</Code>  {scopedT('with')}
                  <Code>sessionId</Code>.
                </Text>
              </Stack>
            </ListItem>
          </OrderedList>
          <Text fontSize="sm" colorScheme="gray">
          {scopedT('Check out the')}
            <TextLink
              href="https://docs.typebot.io/api/send-a-message"
              isExternal
            >
              API reference
            </TextLink>{' '}
            {scopedT('for more information')}
          </Text>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}
