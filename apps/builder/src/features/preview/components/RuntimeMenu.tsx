import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  HStack,
  Text,
} from '@chakra-ui/react'
import { runtimes } from '../data'

type Runtime = (typeof runtimes)[number]

type Props = {
  selectedRuntime: Runtime
  onSelectRuntime: (runtime: Runtime) => void
}

export const RuntimeMenu = ({ selectedRuntime, onSelectRuntime }: Props) => (
  <Menu>
    <MenuButton
      as={Button}
      leftIcon={selectedRuntime.icon}
    >
      <HStack justifyContent="space-between">
        <Text>{selectedRuntime.name}</Text>
      </HStack>
    </MenuButton>
    <MenuList w="0" style={{display: 'none'}}>
      {runtimes
        .filter((runtime) => runtime.name !== selectedRuntime.name)
        .map((runtime) => (
          <MenuItem
            key={runtime.name}
            icon={runtime.icon}
            onClick={() => onSelectRuntime(runtime)}
          >
            <HStack justifyContent="space-between">
              <Text>{runtime.name}</Text>
            </HStack>
          </MenuItem>
        ))}
    </MenuList>
  </Menu>
)
