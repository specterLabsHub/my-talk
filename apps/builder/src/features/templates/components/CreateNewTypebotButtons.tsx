import {
  VStack,
  Heading,
  Stack,
  Button,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react'
import { ToolIcon, TemplateIcon, DownloadIcon } from '@/components/icons'
import { Typebot } from '@typebot.io/schemas'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ImportTypebotFromFileButton } from './ImportTypebotFromFileButton'
import { TemplatesModal } from './TemplatesModal'
import { useWorkspace } from '@/features/workspace/WorkspaceProvider'
import { useUser } from '@/features/account/hooks/useUser'
import { useToast } from '@/hooks/useToast'
import { createTypebotQuery } from '@/features/dashboard/queries/createTypebotQuery'
import { importTypebotQuery } from '@/features/dashboard/queries/importTypebotQuery'
import { useScopedI18n } from '@/locales'

export const CreateNewTypebotButtons = () => {
  const { workspace } = useWorkspace()
  const { user } = useUser()
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const scopedT = useScopedI18n('account.preferences.language')

  const [isLoading, setIsLoading] = useState(false)

  const { showToast } = useToast()

  const handleCreateSubmit = async (typebot?: Typebot) => {
    if (!user || !workspace) return
    setIsLoading(true)
    const folderId = router.query.folderId?.toString() ?? null
    const { error, data } = typebot
      ? await importTypebotQuery(
          {
            ...typebot,
            folderId,
            workspaceId: workspace.id,
            theme: {
              ...typebot.theme,
              chat: {
                ...typebot.theme.chat,
                hostAvatar: {
                  isEnabled: true,
                  url:
                    typebot.theme.chat.hostAvatar?.url ??
                    user.image ??
                    undefined,
                },
              },
            },
          },
          workspace.plan
        )
      : await createTypebotQuery({
          folderId,
          workspaceId: workspace.id,
        })
    if (error) showToast({ description: error.message })
    if (data)
      router.push({
        pathname: `/typebots/${data.id}/edit`,
        query:
          router.query.isFirstBot === 'true'
            ? {
                isFirstBot: 'true',
              }
            : {},
      })
    setIsLoading(false)
  }

  
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Função para atualizar a largura da tela quando a janela for redimensionada
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      // Adiciona um ouvinte de evento para detectar as alterações de tamanho da tela
      window.addEventListener('resize', handleResize);

      // Remove o ouvinte de evento quando o componente é desmontado
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // Define o limite da tela onde o ícone deve ser exibido
  const maxScreenLimit = windowWidth < 600;

  return (
    <VStack maxW="600px" w="full" flex="1" pt="20" spacing={10}>
      <Heading>{scopedT('createNew')}</Heading>
      <Stack w="full" spacing={6} style={{padding: maxScreenLimit ? '0 24px' : ''}}>
        <Button
          variant="outline"
          w="full"
          py="8"
          fontSize="lg"
          leftIcon={
            <ToolIcon
              color={useColorModeValue('blue.500', 'blue.300')}
              boxSize="25px"
              mr="2"
            />
          }
          onClick={() => handleCreateSubmit()}
          isLoading={isLoading}
        >
          {scopedT('startFromScratch')}
        </Button>
        <Button
          variant="outline"
          w="full"
          py="8"
          fontSize="lg"
          leftIcon={
            <TemplateIcon
              color={useColorModeValue('orange.500', 'orange.300')}
              boxSize="25px"
              mr="2"
            />
          }
          onClick={onOpen}
          isLoading={isLoading}
        >
             {scopedT('startFromTemplate')}
        </Button>
        <ImportTypebotFromFileButton
          variant="outline"
          w="full"
          py="8"
          fontSize="lg"
          leftIcon={
            <DownloadIcon
              color={useColorModeValue('purple.500', 'purple.300')}
              boxSize="25px"
              mr="2"
            />
          }
          isLoading={isLoading}
          onNewTypebot={handleCreateSubmit}
        >
          {scopedT('importAFile')}
        </ImportTypebotFromFileButton>
      </Stack>
      <TemplatesModal
        isOpen={isOpen}
        onClose={onClose}
        onTypebotChoose={handleCreateSubmit}
      />
    </VStack>
  )
}
