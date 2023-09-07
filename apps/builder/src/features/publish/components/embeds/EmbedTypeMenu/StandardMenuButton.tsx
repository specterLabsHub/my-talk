import { MotionStack } from '@/components/MotionStack'
import { Stack, Button, StackProps, Text, ButtonProps } from '@chakra-ui/react'
import { StandardIllustration } from './illustrations/StandardIllustration'
import { useScopedI18n } from '@/locales'

type Props = StackProps & Pick<ButtonProps, 'isDisabled'>

export const StandardMenuButton = (props: Props) => {
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
      <StandardIllustration />
      <Stack>
        <Text fontSize="lg" fontWeight="semibold">
        {scopedT('Standard')}
        </Text>
        <Text textColor="gray.500"> {scopedT('Embed in a container on your site')}</Text>
      </Stack>
    </MotionStack>
  )
}
