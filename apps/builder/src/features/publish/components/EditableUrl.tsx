import {
  HStack,
  Tooltip,
  EditablePreview,
  EditableInput,
  Text,
  Editable,
  Button,
  ButtonProps,
  useEditableControls,
} from '@chakra-ui/react'
import { EditIcon } from '@/components/icons'
import { CopyButton } from '@/components/CopyButton'
import React, { useState } from 'react'
import { useScopedI18n } from '@/locales'

type EditableUrlProps = {
  hostname: string
  pathname?: string
  isValid: (newPathname: string) => Promise<boolean> | boolean
  onPathnameChange: (pathname: string) => void
}

export const EditableUrl = ({
  hostname,
  pathname,
  isValid,
  onPathnameChange,
}: EditableUrlProps) => {
  const [value, setValue] = useState(pathname)
  const scopedT = useScopedI18n('share')
  const handleSubmit = async (newPathname: string) => {
    if (newPathname === pathname) return
    if (await isValid(newPathname)) return onPathnameChange(newPathname)
    setValue(pathname)
  }

  return (
    <Editable
      as={HStack}
      spacing={3}
      value={value}
      onChange={setValue}
      onSubmit={handleSubmit}
    >
      <HStack spacing={1}>
        <Text>{hostname}/</Text>
        <Tooltip label={scopedT("Edit")}>
          <EditablePreview
            mx={1}
            borderWidth="1px"
            px={3}
            rounded="md"
            cursor="text"
            display="flex"
            fontWeight="semibold"
          />
        </Tooltip>
        <EditableInput px={2} />
      </HStack>

      <HStack>
        <EditButton size="xs" />
        <CopyButton size="xs" textToCopy={`${hostname}/${value ?? ''}`} />
      </HStack>
    </Editable>
  )
}

const EditButton = (props: ButtonProps) => {
  const { isEditing, getEditButtonProps } = useEditableControls()
  const scopedT = useScopedI18n('share')
  return isEditing ? null : (
    <Button leftIcon={<EditIcon />} {...props} {...getEditButtonProps()}>
      {scopedT("Edit")}
    </Button>
  )
}
