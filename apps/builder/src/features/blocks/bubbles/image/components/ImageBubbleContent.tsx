import { useScopedI18n } from '@/locales'
import { Box, Text, Image } from '@chakra-ui/react'
import { ImageBubbleBlock } from '@typebot.io/schemas'

export const ImageBubbleContent = ({ block }: { block: ImageBubbleBlock }) => {
  const containsVariables =
    block.content?.url?.includes('{{') && block.content.url.includes('}}')
    const scopedT = useScopedI18n('build')
  return !block.content?.url ? (
    <Text color={'gray.500'}>{scopedT('Click to edit...')}</Text>
  ) : (
    <Box w="full">
      <Image
        pointerEvents="none"
        src={
          containsVariables ? '/images/dynamic-image.png' : block.content?.url
        }
        alt="Group image"
        rounded="md"
        objectFit="cover"
      />
    </Box>
  )
}
