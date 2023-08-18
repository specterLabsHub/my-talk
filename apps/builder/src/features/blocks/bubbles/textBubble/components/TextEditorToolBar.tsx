import {
  StackProps,
  HStack,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
} from '@udecode/plate-basic-marks'
import { getPluginType, usePlateEditorRef } from '@udecode/plate-core'
import { LinkToolbarButton } from '@udecode/plate-ui-link'
import { MarkToolbarButton } from '@udecode/plate-ui-toolbar'
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  LinkIcon,
  UserIcon,
} from '@/components/icons'

type Props = {
  onVariablesButtonClick: () => void
} & StackProps

export const TextEditorToolBar = ({
  onVariablesButtonClick,
  ...props
}: Props) => {
  const editor = usePlateEditorRef()
  const handleVariablesButtonMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onVariablesButtonClick()
  }
  return (
    <HStack
      bgColor={useColorModeValue('#A1A1A1', '#A1A1A1')}
      borderTopRadius="md"
      p={2}
      w="full"
      boxSizing="border-box"
      borderBottomWidth={1}
      {...props}
    >
      <IconButton
        aria-label="Insert variable"
        size="sm"
        onMouseDown={handleVariablesButtonMouseDown}
        icon={<UserIcon stroke={'#1a1a1a'}/>}
      />
      <span data-testid="bold-button">
        <MarkToolbarButton
          type={getPluginType(editor, MARK_BOLD)}
          icon={<BoldIcon stroke={'#1a1a1a'}/>}
        />
      </span>
      <span data-testid="italic-button">
        <MarkToolbarButton
          type={getPluginType(editor, MARK_ITALIC)}
          icon={<ItalicIcon stroke={'#1a1a1a'}/>}
        />
      </span>
      <span data-testid="underline-button">
        <MarkToolbarButton
          type={getPluginType(editor, MARK_UNDERLINE)}
          icon={<UnderlineIcon stroke={'#1a1a1a'}/>}
        />
      </span>
      <span data-testid="link-button">
        <LinkToolbarButton icon={<LinkIcon stroke={'#1a1a1a'}/>} />
      </span>
    </HStack>
  )
}
