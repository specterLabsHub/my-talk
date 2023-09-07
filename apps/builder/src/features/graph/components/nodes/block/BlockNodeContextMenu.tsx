import { MenuList, MenuItem } from '@chakra-ui/react'
import { CopyIcon, TrashIcon } from '@/components/icons'
import { useTypebot } from '@/features/editor/providers/TypebotProvider'
import { BlockIndices } from '@typebot.io/schemas'
import { useScopedI18n } from '@/locales'

type Props = { indices: BlockIndices }
export const BlockNodeContextMenu = ({ indices }: Props) => {
  const { deleteBlock, duplicateBlock } = useTypebot()
  const scopedT = useScopedI18n('blockCard')
  const handleDuplicateClick = () => duplicateBlock(indices)

  const handleDeleteClick = () => deleteBlock(indices)

  return (
    <MenuList>
      <MenuItem icon={<CopyIcon />} onClick={handleDuplicateClick}>
        {scopedT('Duplicate')}
      </MenuItem>
      <MenuItem icon={<TrashIcon />} onClick={handleDeleteClick}>
      {scopedT('Delete')}
      </MenuItem>
    </MenuList>
  )
}
