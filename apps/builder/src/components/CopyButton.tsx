import React, { useEffect } from 'react'
import { ButtonProps, Button, useClipboard } from '@chakra-ui/react'
import { useScopedI18n } from '@/locales'

interface CopyButtonProps extends ButtonProps {
  textToCopy: string
  onCopied?: () => void
}

export const CopyButton = (props: CopyButtonProps) => {
  const { textToCopy, onCopied, ...buttonProps } = props
  const { hasCopied, onCopy, setValue } = useClipboard(textToCopy)
  const scopedT = useScopedI18n('share')
  useEffect(() => {
    setValue(textToCopy)
  }, [setValue, textToCopy])

  return (
    <Button
      isDisabled={hasCopied}
      onClick={() => {
        onCopy()
        if (onCopied) onCopied()
      }}
      {...buttonProps}
    >
      {!hasCopied ? `${scopedT("Copy")}` : `${scopedT("Copied")}`}
    </Button>
  )
}
