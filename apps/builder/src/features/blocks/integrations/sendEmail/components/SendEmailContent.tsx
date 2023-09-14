import { useScopedI18n } from '@/locales'
import { Tag, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { SendEmailBlock } from '@typebot.io/schemas'

type Props = {
  block: SendEmailBlock
}

export const SendEmailContent = ({ block }: Props) => {
  const scopedT = useScopedI18n('build')
  if (block.options.recipients.length === 0)
    return <Text color="gray.500">Configurar...</Text>
  return (
    <Wrap noOfLines={2} pr="6">
      <WrapItem>
        <Text>{scopedT('Send email to')}</Text>
      </WrapItem>
      {block.options.recipients.map((to) => (
        <WrapItem key={to}>
          <Tag>{to}</Tag>
        </WrapItem>
      ))}
    </Wrap>
  )
}
