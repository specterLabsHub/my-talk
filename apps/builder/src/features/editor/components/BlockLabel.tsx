import { Text } from '@chakra-ui/react'
import {
  BubbleBlockType,
  InputBlockType,
  IntegrationBlockType,
  LogicBlockType,
  BlockType,
} from '@typebot.io/schemas'
import React from 'react'
import { useScopedI18n } from '@/locales'

type Props = { type: BlockType }

export const BlockLabel = ({ type }: Props): JSX.Element => {
  const scopedT = useScopedI18n('blockCard')

  switch (type) {
    case 'start':
      return <Text color='#1a1a1a !important' fontSize="sm">{scopedT('Start')}</Text>
    case BubbleBlockType.TEXT:
    case InputBlockType.TEXT:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('Text')}</Text>
    case BubbleBlockType.IMAGE:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('Image')}</Text>
    case BubbleBlockType.VIDEO:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('Video')}</Text>
    case BubbleBlockType.EMBED:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('Embed')}</Text>
    case BubbleBlockType.AUDIO:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('Audio')}</Text>
    case InputBlockType.NUMBER:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('Number')}</Text>
    case InputBlockType.EMAIL:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('Email')}</Text>
    case InputBlockType.URL:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('Website')}</Text>
    case InputBlockType.DATE:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('Date')}</Text>
    case InputBlockType.PHONE:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('Phone')}</Text>
    case InputBlockType.CHOICE:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('Button')}</Text>
    case InputBlockType.PICTURE_CHOICE:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('Pic choice')}</Text>
    case InputBlockType.PAYMENT:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('Payment')}</Text>
    case InputBlockType.RATING:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('Rating')}</Text>
    case InputBlockType.FILE:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('FileLabel')}</Text>
    case LogicBlockType.SET_VARIABLE:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('SetVariable')}</Text>
    case LogicBlockType.CONDITION:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('Condition')}</Text>
    case LogicBlockType.REDIRECT:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('Redirect')}</Text>
    case LogicBlockType.SCRIPT:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('Script')}</Text>
    case LogicBlockType.TYPEBOT_LINK:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('MyTalk')}</Text>
    case LogicBlockType.WAIT:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('Wait')}</Text>
    case LogicBlockType.JUMP:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('Jump')}</Text>
    case LogicBlockType.AB_TEST:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('AB Test')}</Text>
    case IntegrationBlockType.GOOGLE_SHEETS:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('Sheets')}</Text>
    case IntegrationBlockType.GOOGLE_ANALYTICS:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('Analytics')}</Text>
    case IntegrationBlockType.WEBHOOK:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('Webhook')}</Text>
    case IntegrationBlockType.ZAPIER:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('Zapier')}</Text>
    case IntegrationBlockType.MAKE_COM:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('Make.com')}</Text>
    case IntegrationBlockType.PABBLY_CONNECT:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('Pabbly')}</Text>
    case IntegrationBlockType.EMAIL:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('Email')}</Text>
    case IntegrationBlockType.CHATWOOT:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('Chatwoot')}</Text>
    case IntegrationBlockType.OPEN_AI:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('OpenAI')}</Text>
    case IntegrationBlockType.PIXEL:
      return <Text color='#1a1a1a' fontSize="sm">{scopedT('Pixel')}</Text>
    default:
      return <Text fontSize="sm">Unknown</Text>
  }
}
