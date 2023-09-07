import { ColorPicker } from '@/components/ColorPicker'
import { useScopedI18n } from '@/locales'
import { Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { PreviewMessageTheme } from '@typebot.io/nextjs'
import React from 'react'

type Props = {
  previewMessageTheme?: PreviewMessageTheme
  onChange: (newPreviewMessageTheme?: PreviewMessageTheme) => void
}

export const PreviewMessageThemeSettings = ({
  previewMessageTheme,
  onChange,
}: Props) => {
  const updateBackgroundColor = (backgroundColor: string) => {
    onChange({
      ...previewMessageTheme,
      backgroundColor,
    })
  }

  const updateTextColor = (textColor: string) => {
    onChange({
      ...previewMessageTheme,
      textColor,
    })
  }

  const updateCloseButtonBackgroundColor = (
    closeButtonBackgroundColor: string
  ) => {
    onChange({
      ...previewMessageTheme,
      closeButtonBackgroundColor,
    })
  }

  const updateCloseButtonIconColor = (closeButtonIconColor: string) => {
    onChange({
      ...previewMessageTheme,
      closeButtonIconColor,
    })
  }

  const scopedT = useScopedI18n('share')

  return (
    <Stack spacing={4} borderWidth="1px" rounded="md" p="4">
      <Heading size="sm">{scopedT('Preview message')}</Heading>
      <Stack spacing={4}>
        <HStack justify="space-between">
          <Text>{scopedT('Background color')}</Text>
          <ColorPicker
            defaultValue={previewMessageTheme?.backgroundColor}
            onColorChange={updateBackgroundColor}
          />
        </HStack>
        <HStack justify="space-between">
          <Text>{scopedT('Text color')}</Text>
          <ColorPicker
            defaultValue={previewMessageTheme?.textColor}
            onColorChange={updateTextColor}
          />
        </HStack>
        <HStack justify="space-between">
          <Text>{scopedT('Close button background')}</Text>
          <ColorPicker
            defaultValue={previewMessageTheme?.closeButtonBackgroundColor}
            onColorChange={updateCloseButtonBackgroundColor}
          />
        </HStack>
        <HStack justify="space-between">
          <Text>{scopedT('Close icon color')}</Text>
          <ColorPicker
            defaultValue={previewMessageTheme?.closeButtonIconColor}
            onColorChange={updateCloseButtonIconColor}
          />
        </HStack>
      </Stack>
    </Stack>
  )
}
