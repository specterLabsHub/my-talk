import { Flex, HStack, Tooltip, useColorModeValue } from '@chakra-ui/react'
import {
  BubbleBlockType,
  DraggableBlockType,
  InputBlockType,
  IntegrationBlockType,
  LogicBlockType,
} from '@typebot.io/schemas'
import { useBlockDnd } from '@/features/graph/providers/GraphDndProvider'
import React, { useEffect, useState } from 'react'
import { BlockIcon } from './BlockIcon'
import { isFreePlan } from '@/features/billing/helpers/isFreePlan'
import { Plan } from '@typebot.io/prisma'
import { useWorkspace } from '@/features/workspace/WorkspaceProvider'
import { BlockLabel } from './BlockLabel'
import { LockTag } from '@/features/billing/components/LockTag'
import { useScopedI18n } from '@/locales'

type Props = {
  type: DraggableBlockType
  tooltip?: string
  isDisabled?: boolean
  children: React.ReactNode
  onMouseDown: (e: React.MouseEvent, type: DraggableBlockType) => void
}

export const BlockCard = (
  props: Pick<Props, 'type' | 'onMouseDown'>
): JSX.Element => {
  const { workspace } = useWorkspace()
  const scopedT = useScopedI18n('blockCard')

  switch (props.type) {
    case BubbleBlockType.EMBED:
      return (
        <BlockCardLayout
          {...props}
          tooltip={scopedT('File')}
        >
          <BlockIcon type={props.type} />
          <BlockLabel type={props.type} />
        </BlockCardLayout>
      )
    case InputBlockType.FILE:
      return (
        <BlockCardLayout {...props} tooltip={scopedT('Upload')} >
          <BlockIcon type={props.type} />
          <HStack>
            <BlockLabel type={props.type} />
            {isFreePlan(workspace) && <LockTag plan={Plan.STARTER} />}
          </HStack>
        </BlockCardLayout>
      )
    case LogicBlockType.SCRIPT:
      return (
        <BlockCardLayout {...props} tooltip={scopedT('JsCode')}>
          <BlockIcon type={props.type} />
          <BlockLabel type={props.type} />
        </BlockCardLayout>
      )
    case LogicBlockType.TYPEBOT_LINK:
      return (
        <BlockCardLayout {...props} tooltip={scopedT('LinkTalk')}>
          <BlockIcon type={props.type} />
          <BlockLabel type={props.type} />
        </BlockCardLayout>
      )
    case LogicBlockType.JUMP:
      return (
        <BlockCardLayout
          {...props}
          tooltip={scopedT('FlowGroup')}
        >
          <BlockIcon type={props.type} />
          <BlockLabel type={props.type} />
        </BlockCardLayout>
      )
    case IntegrationBlockType.GOOGLE_SHEETS:
      return (
        <></>
      )
    case IntegrationBlockType.GOOGLE_ANALYTICS:
      return (
        <></>
      )
    default:
      return (
        <BlockCardLayout {...props}>
          <BlockIcon type={props.type} />
          <BlockLabel type={props.type} />
        </BlockCardLayout>
      )
  }
}

const BlockCardLayout = ({ type, onMouseDown, tooltip, children }: Props) => {
  const { draggedBlockType } = useBlockDnd()
  const [isMouseDown, setIsMouseDown] = useState(false)

  useEffect(() => {
    setIsMouseDown(draggedBlockType === type)
  }, [draggedBlockType, type])

  const handleMouseDown = (e: React.MouseEvent) => onMouseDown(e, type)

  return (
    <Tooltip label={tooltip}>
      <Flex pos="relative" style={{display: type ===  InputBlockType.PAYMENT ? 'none' : 'flex'}}>
        <HStack
          borderWidth="1px"
          rounded="lg"
          flex="1"
          cursor={'grab'}
          opacity={isMouseDown ? '0.4' : '1'}
          onMouseDown={handleMouseDown}
          bgColor={useColorModeValue('gray.50', 'gray.850')}
          px="4"
          py="2"
          _hover={useColorModeValue({ shadow: 'md' }, { bgColor: 'blue.800' })}
          transition="box-shadow 200ms, background-color 200ms"
        >
          {!isMouseDown ? children : null}
        </HStack>
      </Flex>
    </Tooltip>
  )
}
