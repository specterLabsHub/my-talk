import { WithVariableContent } from '@/features/graph/components/nodes/block/WithVariableContent'
import { useScopedI18n } from '@/locales'
import { Text } from '@chakra-ui/react'
import { RatingInputBlock } from '@typebot.io/schemas'

type Props = {
  variableId?: string
  block: RatingInputBlock
}

export const RatingInputContent = ({ variableId, block }: Props) => {
  const scopedT = useScopedI18n('build')
  return (variableId ? (
    <WithVariableContent variableId={variableId} />
    ) : (
      <Text noOfLines={1} pr="6">
      {scopedT('Rate from')} {block.options.buttonType === 'Icons' ? 1 : 0} {scopedT('to')}{' '}
      {block.options.length}
    </Text>
  ))
}
  