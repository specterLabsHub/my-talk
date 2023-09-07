import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  IconButton,
  Tooltip,
} from '@chakra-ui/react'
import { UsersIcon } from '@/components/icons'
import React from 'react'
import { CollaborationList } from './CollaborationList'
import { useScopedI18n } from '@/locales'

export const CollaborationMenuButton = ({
  isLoading,
}: {
  isLoading: boolean
}) => {
  const scopedT = useScopedI18n('header')

  return (
    <Popover isLazy placement="bottom-end">
      <PopoverTrigger>
        <span>
          <Tooltip label={scopedT('InviteUsers')}>
            <IconButton
              isLoading={isLoading}
              icon={<UsersIcon />}
              aria-label={scopedT('InviteShow')}
              size="sm"
            />
          </Tooltip>
        </span>
      </PopoverTrigger>
      <PopoverContent shadow="lg" width="430px">
        <CollaborationList />
      </PopoverContent>
    </Popover>
  )
}
