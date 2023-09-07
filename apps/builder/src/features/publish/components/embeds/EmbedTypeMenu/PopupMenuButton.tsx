import { MotionStack } from '@/components/MotionStack'
import { Stack, Button, StackProps, Text, ButtonProps } from '@chakra-ui/react'
import { PopupIllustration } from './illustrations/PopupIllustration'
import { useScopedI18n } from '@/locales'

type Props = StackProps & Pick<ButtonProps, 'isDisabled'>

export const PopupMenuButton = (props: Props) => {
  const scopedT = useScopedI18n('share')
  return (
    <MotionStack
      as={Button}
      fontWeight="normal"
      alignItems="center"
      variant="outline"
      colorScheme="gray"
      whiteSpace={'normal'}
      spacing="6"
      height="250px"
      flex="1"
      animate="default"
      whileHover="animateBubbles"
      transition={{ staggerChildren: 0.1 }}
      {...props}
    >
      <PopupIllustration />
      <Stack>
        <Text fontSize="lg" fontWeight="semibold">
        {scopedT('Popup')}
        </Text>
        <Text textColor="gray.500">
        {scopedT('Embed in a popup on top of your website')}
        </Text>
      </Stack>
    </MotionStack>
  )
}
