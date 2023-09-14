import { TextInput } from '@/components/inputs/TextInput'
import { TextLink } from '@/components/TextLink'
import { useWorkspace } from '@/features/workspace/WorkspaceProvider'
import { useToast } from '@/hooks/useToast'
import { trpc } from '@/lib/trpc'
import { useScopedI18n } from '@/locales'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  ModalFooter,
  Button,
} from '@chakra-ui/react'
import React, { useState } from 'react'

const openAITokensPage = 'https://platform.openai.com/account/api-keys'

type Props = {
  isOpen: boolean
  onClose: () => void
  onNewCredentials: (id: string) => void
}

export const OpenAICredentialsModal = ({
  isOpen,
  onClose,
  onNewCredentials,
}: Props) => {
  const { workspace } = useWorkspace()
  const { showToast } = useToast()
  const [apiKey, setApiKey] = useState('')
  const [name, setName] = useState('')

  const [isCreating, setIsCreating] = useState(false)

  const {
    credentials: {
      listCredentials: { refetch: refetchCredentials },
    },
  } = trpc.useContext()
  const { mutate } = trpc.credentials.createCredentials.useMutation({
    onMutate: () => setIsCreating(true),
    onSettled: () => setIsCreating(false),
    onError: (err) => {
      showToast({
        description: err.message,
        status: 'error',
      })
    },
    onSuccess: (data) => {
      refetchCredentials()
      onNewCredentials(data.credentialsId)
      onClose()
    },
  })

  const createOpenAICredentials = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!workspace) return
    mutate({
      credentials: {
        type: 'openai',
        workspaceId: workspace.id,
        name,
        data: {
          apiKey,
        },
      },
    })
  }

  const scopedT = useScopedI18n('build')

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{scopedT('Add OpenAI account')}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={createOpenAICredentials}>
          <ModalBody as={Stack} spacing="6">
            <TextInput
              isRequired
              label={scopedT("Name")}
              onChange={setName}
              placeholder={scopedT("My account")}
              withVariableButton={false}
              debounceTimeout={0}
            />
            <TextInput
              isRequired
              type="password"
              label={scopedT("API key")}
              helperText={
                <>
                  {scopedT('You can generate an API key')}{' '}
                  <TextLink href={openAITokensPage} isExternal>
                    {scopedT("here")}
                  </TextLink>
                  .
                </>
              }
              onChange={setApiKey}
              placeholder="sk-..."
              withVariableButton={false}
              debounceTimeout={0}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              isLoading={isCreating}
              isDisabled={apiKey === '' || name === ''}
              colorScheme="blue"
            >
              {scopedT("Create")}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
