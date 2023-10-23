import React, { useEffect, useState } from 'react'
import { HStack, Flex, Button, useDisclosure } from '@chakra-ui/react'
import { HardDriveIcon, SettingsIcon } from '@/components/icons'
import { signOut } from 'next-auth/react'
import { useUser } from '@/features/account/hooks/useUser'
import { isNotDefined } from '@typebot.io/lib'
import Link from 'next/link'
import { EmojiOrImageIcon } from '@/components/EmojiOrImageIcon'
import { useScopedI18n } from '@/locales'
import { useWorkspace } from '@/features/workspace/WorkspaceProvider'
import { WorkspaceDropdown } from '@/features/workspace/components/WorkspaceDropdown'
import { WorkspaceSettingsModal } from '@/features/workspace/components/WorkspaceSettingsModal'

export const DashboardHeader = () => {
  const scopedT = useScopedI18n('dashboard.header')
  const { user } = useUser()
  const { workspace, switchWorkspace, createWorkspace } = useWorkspace()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleLogOut = () => {
    signOut()
  }

  const handleCreateNewWorkspace = () =>
    createWorkspace(user?.name ?? undefined)

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
    <Flex w="full" borderBottomWidth="1px" justify="center" style={{padding: maxScreenLimit ?'0 24px' : ''}}>
      <Flex
        justify="space-between"
        alignItems="center"
        h="16"
        maxW="1000px"
        flex="1"
      >
        <Link href="/typebots" data-testid="typebot-logo">
          <EmojiOrImageIcon
            boxSize="30px"
            icon={workspace?.icon}
            defaultIcon={HardDriveIcon}
          />
        </Link>
        <HStack>
          {user && workspace && (
            <WorkspaceSettingsModal
              isOpen={isOpen}
              onClose={onClose}
              user={user}
              workspace={workspace}
            />
          )}
            
            <Button
            leftIcon={<SettingsIcon />}
            onClick={onOpen}
            isLoading={isNotDefined(workspace)}
            style={{paddingLeft: maxScreenLimit ? 22 : ''}}
            >
            {!maxScreenLimit && (
            scopedT('settingsButton.label')
            )}
          </Button>
          <WorkspaceDropdown
            currentWorkspace={workspace}
            onLogoutClick={handleLogOut}
            onCreateNewWorkspaceClick={handleCreateNewWorkspace}
            onWorkspaceSelected={switchWorkspace}
          />
        </HStack>
      </Flex>
    </Flex>
  )
}
