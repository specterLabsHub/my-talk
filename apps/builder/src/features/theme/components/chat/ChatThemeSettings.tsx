import {
  LargeRadiusIcon,
  MediumRadiusIcon,
  NoRadiusIcon,
} from '@/components/icons'
import { RadioButtons } from '@/components/inputs/RadioButtons'
import { Heading, Stack } from '@chakra-ui/react'
import {
  AvatarProps,
  ChatTheme,
  ContainerColors,
  InputColors,
} from '@typebot.io/schemas'
import React from 'react'
import { AvatarForm } from './AvatarForm'
import { ButtonsTheme } from './ButtonsTheme'
import { GuestBubbles } from './GuestBubbles'
import { HostBubbles } from './HostBubbles'
import { InputsTheme } from './InputsTheme'
import { useScopedI18n } from '@/locales'

type Props = {
  typebotId: string
  chatTheme: ChatTheme
  onChatThemeChange: (chatTheme: ChatTheme) => void
}

export const ChatThemeSettings = ({
  typebotId,
  chatTheme,
  onChatThemeChange,
}: Props) => {
  const handleHostBubblesChange = (hostBubbles: ContainerColors) =>
    onChatThemeChange({ ...chatTheme, hostBubbles })
  const handleGuestBubblesChange = (guestBubbles: ContainerColors) =>
    onChatThemeChange({ ...chatTheme, guestBubbles })
  const handleButtonsChange = (buttons: ContainerColors) =>
    onChatThemeChange({ ...chatTheme, buttons })
  const handleInputsChange = (inputs: InputColors) =>
    onChatThemeChange({ ...chatTheme, inputs })

  const handleHostAvatarChange = (hostAvatar: AvatarProps) =>
    onChatThemeChange({ ...chatTheme, hostAvatar })
  const handleGuestAvatarChange = (guestAvatar: AvatarProps) =>
    onChatThemeChange({ ...chatTheme, guestAvatar })
    const scopedT = useScopedI18n('template')

  return (
    <Stack spacing={6}>
      <AvatarForm
        uploadFilePath={`typebots/${typebotId}/hostAvatar`}
        title={scopedT('Bot avatar')}
        avatarProps={chatTheme.hostAvatar}
        isDefaultCheck
        onAvatarChange={handleHostAvatarChange}
      />
      <AvatarForm
        uploadFilePath={`typebots/${typebotId}/guestAvatar`}
        title={scopedT('User avatar')}
        avatarProps={chatTheme.guestAvatar}
        onAvatarChange={handleGuestAvatarChange}
      />
      <Stack borderWidth={1} rounded="md" p="4" spacing={4}>
        <Heading fontSize="lg">{scopedT('Bot bubbles')}</Heading>
        <HostBubbles
          hostBubbles={chatTheme.hostBubbles}
          onHostBubblesChange={handleHostBubblesChange}
        />
      </Stack>

      <Stack borderWidth={1} rounded="md" p="4" spacing={4}>
        <Heading fontSize="lg">{scopedT('User bubbles')}</Heading>
        <GuestBubbles
          guestBubbles={chatTheme.guestBubbles}
          onGuestBubblesChange={handleGuestBubblesChange}
        />
      </Stack>
      <Stack borderWidth={1} rounded="md" p="4" spacing={4}>
        <Heading fontSize="lg">{scopedT('Buttons')}</Heading>
        <ButtonsTheme
          buttons={chatTheme.buttons}
          onButtonsChange={handleButtonsChange}
        />
      </Stack>
      <Stack borderWidth={1} rounded="md" p="4" spacing={4}>
        <Heading fontSize="lg">{scopedT('Inputs')}</Heading>
        <InputsTheme
          inputs={chatTheme.inputs}
          onInputsChange={handleInputsChange}
        />
      </Stack>
      <Stack borderWidth={1} rounded="md" p="4" spacing={4}>
        <Heading fontSize="lg">{scopedT('Corners roundness')}</Heading>
        <RadioButtons
          options={[
            {
              label: <NoRadiusIcon />,
              value: 'none',
            },
            {
              label: <MediumRadiusIcon />,
              value: 'medium',
            },
            {
              label: <LargeRadiusIcon />,
              value: 'large',
            },
          ]}
          value={chatTheme.roundness ?? 'medium'}
          onSelect={(roundness) =>
            onChatThemeChange({ ...chatTheme, roundness })
          }
        />
      </Stack>
    </Stack>
  )
}
