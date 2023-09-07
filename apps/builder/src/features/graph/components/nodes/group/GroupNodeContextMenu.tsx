import { MenuList, MenuItem } from '@chakra-ui/react'
import { CopyIcon, TrashIcon } from '@/components/icons'
import { useTypebot } from '@/features/editor/providers/TypebotProvider'
import { useScopedI18n } from '@/locales'

export const GroupNodeContextMenu = ({
  groupIndex,
}: {
  groupIndex: number
}) => {
  const { deleteGroup, duplicateGroup } = useTypebot()
  const scopedT = useScopedI18n('blockCard')
  const handleDeleteClick = () => deleteGroup(groupIndex)

  const handleDuplicateClick = () => duplicateGroup(groupIndex)

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
