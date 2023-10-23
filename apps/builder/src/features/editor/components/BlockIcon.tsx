import { IconProps } from '@chakra-ui/react'
import {
  BubbleBlockType,
  InputBlockType,
  IntegrationBlockType,
  LogicBlockType,
  BlockType,
} from '@typebot.io/schemas'
import React from 'react'
import { FlagIcon, SendEmailIcon, WebhookIcon } from '@/components/icons'
import { WaitIcon } from '@/features/blocks/logic/wait/components/WaitIcon'
import { ScriptIcon } from '@/features/blocks/logic/script/components/ScriptIcon'
import { JumpIcon } from '@/features/blocks/logic/jump/components/JumpIcon'
import { OpenAILogo } from '@/features/blocks/integrations/openai/components/OpenAILogo'
import { AudioBubbleIcon } from '@/features/blocks/bubbles/audio/components/AudioBubbleIcon'
import { EmbedBubbleIcon } from '@/features/blocks/bubbles/embed/components/EmbedBubbleIcon'
import { ImageBubbleIcon } from '@/features/blocks/bubbles/image/components/ImageBubbleIcon'
import { TextBubbleIcon } from '@/features/blocks/bubbles/textBubble/components/TextBubbleIcon'
import { VideoBubbleIcon } from '@/features/blocks/bubbles/video/components/VideoBubbleIcon'
import { ButtonsInputIcon } from '@/features/blocks/inputs/buttons/components/ButtonsIcon'
import { DateInputIcon } from '@/features/blocks/inputs/date/components/DateInputIcon'
import { EmailInputIcon } from '@/features/blocks/inputs/emailInput/components/EmailInputIcon'
import { FileInputIcon } from '@/features/blocks/inputs/fileUpload/components/FileInputIcon'
import { NumberInputIcon } from '@/features/blocks/inputs/number/components/NumberInputIcon'
import { PaymentInputIcon } from '@/features/blocks/inputs/payment/components/PaymentInputIcon'
import { PhoneInputIcon } from '@/features/blocks/inputs/phone/components/PhoneInputIcon'
import { RatingInputIcon } from '@/features/blocks/inputs/rating/components/RatingInputIcon'
import { TextInputIcon } from '@/features/blocks/inputs/textInput/components/TextInputIcon'
import { UrlInputIcon } from '@/features/blocks/inputs/url/components/UrlInputIcon'
import { ChatwootLogo } from '@/features/blocks/integrations/chatwoot/components/ChatwootLogo'
import { MakeComLogo } from '@/features/blocks/integrations/makeCom/components/MakeComLogo'
import { PabblyConnectLogo } from '@/features/blocks/integrations/pabbly/components/PabblyConnectLogo'
import { ZapierLogo } from '@/features/blocks/integrations/zapier/components/ZapierLogo'
import { ConditionIcon } from '@/features/blocks/logic/condition/components/ConditionIcon'
import { RedirectIcon } from '@/features/blocks/logic/redirect/components/RedirectIcon'
import { SetVariableIcon } from '@/features/blocks/logic/setVariable/components/SetVariableIcon'
import { TypebotLinkIcon } from '@/features/blocks/logic/typebotLink/components/TypebotLinkIcon'
import { AbTestIcon } from '@/features/blocks/logic/abTest/components/AbTestIcon'
import { PictureChoiceIcon } from '@/features/blocks/inputs/pictureChoice/components/PictureChoiceIcon'
import { PixelLogo } from '@/features/blocks/integrations/pixel/components/PixelLogo'

type BlockIconProps = { type: BlockType } & IconProps

export const BlockIcon = ({ type, ...props }: BlockIconProps): JSX.Element => {

  switch (type) {
    case BubbleBlockType.TEXT:
      return <TextBubbleIcon color={'#1a1a1a'} {...props}  />
    case BubbleBlockType.IMAGE:
      return <ImageBubbleIcon color={'#1a1a1a'} {...props} />
    case BubbleBlockType.VIDEO:
      return <VideoBubbleIcon color={'#1a1a1a'} {...props} />
    case BubbleBlockType.EMBED:
      return <EmbedBubbleIcon color={'#1a1a1a'} {...props} />
    case BubbleBlockType.AUDIO:
      return <AudioBubbleIcon color={'#1a1a1a'} {...props} />
    case InputBlockType.TEXT:
      return <TextInputIcon color={'#1a1a1a'} {...props} />
    case InputBlockType.NUMBER:
      return <NumberInputIcon color={'#1a1a1a'} {...props} />
    case InputBlockType.EMAIL:
      return <EmailInputIcon color={'#1a1a1a'} {...props} />
    case InputBlockType.URL:
      return <UrlInputIcon color={'#1a1a1a'} {...props} />
    case InputBlockType.DATE:
      return <DateInputIcon color={'#1a1a1a'} {...props} />
    case InputBlockType.PHONE:
      return <PhoneInputIcon color={'#1a1a1a'} {...props} />
    case InputBlockType.CHOICE:
      return <ButtonsInputIcon color={'#1a1a1a'} {...props} />
    case InputBlockType.PICTURE_CHOICE:
      return <PictureChoiceIcon color={'#1a1a1a'} {...props} />
    case InputBlockType.PAYMENT:
      return <PaymentInputIcon color={'#1a1a1a'} {...props} />
    case InputBlockType.RATING:
      return <RatingInputIcon color={'#1a1a1a'} {...props} />
    case InputBlockType.FILE:
      return <FileInputIcon color={'#1a1a1a'} {...props} />
    case LogicBlockType.SET_VARIABLE:
      return <SetVariableIcon color={'#1a1a1a'} {...props} />
    case LogicBlockType.CONDITION:
      return <ConditionIcon color={'#1a1a1a'} {...props} />
    case LogicBlockType.REDIRECT:
      return <RedirectIcon color={'#1a1a1a'} {...props} />
    case LogicBlockType.SCRIPT:
      return <ScriptIcon color={'#1a1a1a'} {...props} />
    case LogicBlockType.WAIT:
      return <WaitIcon color={'#1a1a1a'} {...props} />
    case LogicBlockType.JUMP:
      return <JumpIcon color={'#1a1a1a'} {...props} />
    case LogicBlockType.TYPEBOT_LINK:
      return <TypebotLinkIcon color={'#1a1a1a'} {...props} />
    case LogicBlockType.AB_TEST:
      return <AbTestIcon color={'#1a1a1a'} {...props} />
    case IntegrationBlockType.GOOGLE_SHEETS:
      return <></>
    case IntegrationBlockType.GOOGLE_ANALYTICS:
      return <></>
    case IntegrationBlockType.WEBHOOK:
      return <WebhookIcon {...props} color={'#1a1a1a'}/>
    case IntegrationBlockType.ZAPIER:
      return <ZapierLogo {...props} />
    case IntegrationBlockType.MAKE_COM:
      return <MakeComLogo {...props} />
    case IntegrationBlockType.PABBLY_CONNECT:
      return <PabblyConnectLogo {...props} />
    case IntegrationBlockType.EMAIL:
      return <SendEmailIcon {...props} color={'#1a1a1a'}/>
    case IntegrationBlockType.CHATWOOT:
      return <ChatwootLogo {...props} />
    case IntegrationBlockType.OPEN_AI:
      return <OpenAILogo fill={'#1a1a1a'} {...props} />
    case IntegrationBlockType.PIXEL:
      return <PixelLogo {...props} />
    case 'start':
      return <FlagIcon {...props} color={'#1a1a1a'}/>
  }
}
