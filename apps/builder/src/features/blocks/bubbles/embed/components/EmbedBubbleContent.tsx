import { useScopedI18n } from '@/locales'
import { Text } from '@chakra-ui/react'
import { EmbedBubbleBlock } from '@typebot.io/schemas'

export const EmbedBubbleContent = ({ block }: { block: EmbedBubbleBlock }) => {
  const scopedT = useScopedI18n('build')
  if (!block.content?.url) return <Text color="gray.500">{scopedT('Click to edit...')}</Text>
  return <Text>Show embed</Text>
}
