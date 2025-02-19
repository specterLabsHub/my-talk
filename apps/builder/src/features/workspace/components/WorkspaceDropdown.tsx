import { EmojiOrImageIcon } from '@/components/EmojiOrImageIcon'
import {
  HardDriveIcon,
  ChevronLeftIcon,
  PlusIcon,
  LogOutIcon,
} from '@/components/icons'
import { trpc } from '@/lib/trpc'
import { useScopedI18n } from '@/locales'
import {
  Menu,
  MenuButton,
  Button,
  HStack,
  MenuList,
  MenuItem,
  Text,
} from '@chakra-ui/react'
import { Workspace } from '@typebot.io/schemas'

type Props = {
  currentWorkspace?: Workspace
  onWorkspaceSelected: (workspaceId: string) => void
  onCreateNewWorkspaceClick: () => void
  onLogoutClick: () => void
}

export const WorkspaceDropdown = ({
  currentWorkspace,
  onWorkspaceSelected,
  onLogoutClick,
  onCreateNewWorkspaceClick,
}: Props) => {
  const scopedT = useScopedI18n('workspace.dropdown')
  const { data } = trpc.workspace.listWorkspaces.useQuery()

  const workspaces = data?.workspaces ?? []

  return (
    <Menu placement="bottom-end">
      <MenuButton as={Button} variant="outline" px="2">
        <HStack>
          {currentWorkspace && (
            <>
              <Text noOfLines={1} maxW="220px">
                {currentWorkspace.name}
              </Text>
            </>
          )}
          <ChevronLeftIcon transform="rotate(-90deg)" />
        </HStack>
      </MenuButton>
      <MenuList>
        {workspaces
          ?.filter((workspace) => workspace.id !== currentWorkspace?.id)
          .map((workspace) => (
            <MenuItem
              key={workspace.id}
              onClick={() => onWorkspaceSelected(workspace.id)}
            >
              <HStack>
                <EmojiOrImageIcon
                  icon={workspace.icon}
                  boxSize="16px"
                  defaultIcon={HardDriveIcon}
                />
                <Text>{workspace.name}</Text>
              </HStack>
            </MenuItem>
          ))}
        <MenuItem onClick={onCreateNewWorkspaceClick} icon={<PlusIcon />}>
          {scopedT('newButton.label')}
        </MenuItem>
        <MenuItem
          onClick={onLogoutClick}
          icon={<LogOutIcon />}
          color="orange.500"
        >
          {scopedT('logoutButton.label')}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
