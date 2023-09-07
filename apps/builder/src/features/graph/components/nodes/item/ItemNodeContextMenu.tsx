import { MenuList, MenuItem } from '@chakra-ui/react'
import { CopyIcon, TrashIcon } from '@/components/icons'
import { useTypebot } from '@/features/editor/providers/TypebotProvider'
import { ItemIndices } from '@typebot.io/schemas'
import { useScopedI18n } from '@/locales'

type Props = {
  indices: ItemIndices
}
export const ItemNodeContextMenu = ({ indices }: Props) => {
  const { deleteItem, duplicateItem } = useTypebot()
  const scopedT = useScopedI18n('blockCard')

  return (
    <MenuList>
      <MenuItem icon={<CopyIcon />} onClick={() => duplicateItem(indices)}>
      {scopedT('Duplicate')}
      </MenuItem>
      <MenuItem icon={<TrashIcon />} onClick={() => deleteItem(indices)}>
      {scopedT('Delete')}
      </MenuItem>
    </MenuList>
  )
}
