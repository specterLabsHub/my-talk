import { Text } from '@chakra-ui/react'
import {
  BubbleBlockType,
  InputBlockType,
  IntegrationBlockType,
  LogicBlockType,
  BlockType,
} from '@typebot.io/schemas'
import React from 'react'

type Props = { type: BlockType }

export const BlockLabel = ({ type }: Props): JSX.Element => {
  switch (type) {
    case 'start':
      return <Text color='#F22166' fontSize="sm" >Start</Text>
    case BubbleBlockType.TEXT:
    case InputBlockType.TEXT:
      return <Text color='#1a1a1a' fontSize="sm">Text</Text>
    case BubbleBlockType.IMAGE:
      return <Text color='#1a1a1a' fontSize="sm">Image</Text>
    case BubbleBlockType.VIDEO:
      return <Text color='#1a1a1a' fontSize="sm">Video</Text>
    case BubbleBlockType.EMBED:
      return <Text color='#1a1a1a' fontSize="sm">Embed</Text>
    case BubbleBlockType.AUDIO:
      return <Text color='#1a1a1a' fontSize="sm">Audio</Text>
    case InputBlockType.NUMBER:
      return <Text color='#1a1a1a' fontSize="sm">Number</Text>
    case InputBlockType.EMAIL:
      return <Text color='#1a1a1a' fontSize="sm">Email</Text>
    case InputBlockType.URL:
      return <Text color='#1a1a1a' fontSize="sm">Website</Text>
    case InputBlockType.DATE:
      return <Text color='#1a1a1a' fontSize="sm">Date</Text>
    case InputBlockType.PHONE:
      return <Text color='#1a1a1a' fontSize="sm">Phone</Text>
    case InputBlockType.CHOICE:
      return <Text color='#1a1a1a' fontSize="sm">Button</Text>
    case InputBlockType.PICTURE_CHOICE:
      return <Text color='#1a1a1a' fontSize="sm">Pic choice</Text>
    case InputBlockType.PAYMENT:
      return <Text color='#1a1a1a' fontSize="sm">Payment</Text>
    case InputBlockType.RATING:
      return <Text color='#1a1a1a' fontSize="sm">Rating</Text>
    case InputBlockType.FILE:
      return <Text color='#1a1a1a' fontSize="sm">File</Text>
    case LogicBlockType.SET_VARIABLE:
      return <Text color='#1a1a1a' fontSize="sm">Set variable</Text>
    case LogicBlockType.CONDITION:
      return <Text color='#1a1a1a' fontSize="sm">Condition</Text>
    case LogicBlockType.REDIRECT:
      return <Text color='#1a1a1a' fontSize="sm">Redirect</Text>
    case LogicBlockType.SCRIPT:
      return <Text color='#1a1a1a' fontSize="sm">Script</Text>
    case LogicBlockType.TYPEBOT_LINK:
      return <Text color='#1a1a1a' fontSize="sm">Typebot</Text>
    case LogicBlockType.WAIT:
      return <Text color='#1a1a1a' fontSize="sm">Wait</Text>
    case LogicBlockType.JUMP:
      return <Text color='#1a1a1a' fontSize="sm">Jump</Text>
    case LogicBlockType.AB_TEST:
      return <Text color='#1a1a1a' fontSize="sm">AB Test</Text>
    case IntegrationBlockType.GOOGLE_SHEETS:
      return <Text color='#1a1a1a' fontSize="sm">Sheets</Text>
    case IntegrationBlockType.GOOGLE_ANALYTICS:
      return <Text color='#1a1a1a' fontSize="sm">Analytics</Text>
    case IntegrationBlockType.WEBHOOK:
      return <Text color='#1a1a1a' fontSize="sm">Webhook</Text>
    case IntegrationBlockType.ZAPIER:
      return <Text color='#1a1a1a' fontSize="sm">Zapier</Text>
    case IntegrationBlockType.MAKE_COM:
      return <Text color='#1a1a1a' fontSize="sm">Make.com</Text>
    case IntegrationBlockType.PABBLY_CONNECT:
      return <Text color='#1a1a1a' fontSize="sm">Pabbly</Text>
    case IntegrationBlockType.EMAIL:
      return <Text color='#1a1a1a' fontSize="sm">Email</Text>
    case IntegrationBlockType.CHATWOOT:
      return <Text color='#1a1a1a' fontSize="sm">Chatwoot</Text>
    case IntegrationBlockType.OPEN_AI:
      return <Text color='#1a1a1a' fontSize="sm">OpenAI</Text>
    case IntegrationBlockType.PIXEL:
      return <Text color='#1a1a1a' fontSize="sm">Pixel</Text>
  }
}
