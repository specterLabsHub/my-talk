import { StackProps, HStack, useColorModeValue } from '@chakra-ui/react'
import { BlockType, IntegrationBlockType } from '@typebot.io/schemas'
import { BlockIcon } from './BlockIcon'
import { BlockLabel } from './BlockLabel'

export const BlockCardOverlay = ({
  type,
  ...props
}: StackProps & { type: BlockType }) => {
  return (
    <HStack
      borderWidth="1px"
      rounded="lg"
      cursor={'grabbing'}
      w="147px"
      transition="none"
      pointerEvents="none"
      px="4"
      py="2"
      borderColor={useColorModeValue('blue.200', 'blue.800')}
      bgColor={useColorModeValue('blue.50', 'blue.850')}
      shadow="xl"
      zIndex={2}
      hover={useColorModeValue('gray.200', 'gray.800')}
      display={ IntegrationBlockType.GOOGLE_SHEETS && IntegrationBlockType.GOOGLE_ANALYTICS ? 'none !important' : 'flex'}
      {...props}
    >
      <BlockIcon type={type} />
      <BlockLabel type={type} />
    </HStack>
  )
}
