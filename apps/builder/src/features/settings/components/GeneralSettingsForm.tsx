import {
  FormControl,
  FormLabel,
  HStack,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react'
import { GeneralSettings, rememberUserStorages } from '@typebot.io/schemas'
import React from 'react'
import { isDefined } from '@typebot.io/lib'
import { SwitchWithLabel } from '@/components/inputs/SwitchWithLabel'
import { SwitchWithRelatedSettings } from '@/components/SwitchWithRelatedSettings'
import { DropdownList } from '@/components/DropdownList'
import { MoreInfoTooltip } from '@/components/MoreInfoTooltip'
import { useScopedI18n } from '@/locales'

type Props = {
  generalSettings: GeneralSettings
  onGeneralSettingsChange: (generalSettings: GeneralSettings) => void
}

export const GeneralSettingsForm = ({
  generalSettings,
  onGeneralSettingsChange,
}: Props) => {
  const toggleRememberUser = (isEnabled: boolean) =>
    onGeneralSettingsChange({
      ...generalSettings,
      rememberUser: {
        ...generalSettings.rememberUser,
        isEnabled,
      },
    })

  const handleInputPrefillChange = (isInputPrefillEnabled: boolean) =>
    onGeneralSettingsChange({
      ...generalSettings,
      isInputPrefillEnabled,
    })

  const handleHideQueryParamsChange = (isHideQueryParamsEnabled: boolean) =>
    onGeneralSettingsChange({
      ...generalSettings,
      isHideQueryParamsEnabled,
    })

  const updateRememberUserStorage = (
    storage: NonNullable<GeneralSettings['rememberUser']>['storage']
  ) =>
    onGeneralSettingsChange({
      ...generalSettings,
      rememberUser: {
        ...generalSettings.rememberUser,
        storage,
      },
    })
    const scopedT = useScopedI18n('settings')

  return (
    <Stack spacing={6}>
     <SwitchWithLabel
  label={scopedT('Prefill input')}
  initialValue={generalSettings.isInputPrefillEnabled ?? true}
  onCheckChange={handleInputPrefillChange}
  moreInfoContent={scopedT('Inputs are automatically pre-filled whenever their associated variable has a value')}
/>
<SwitchWithLabel
  label={scopedT('Hide query params on bot start')}
  initialValue={generalSettings.isHideQueryParamsEnabled ?? true}
  onCheckChange={handleHideQueryParamsChange}
  moreInfoContent={scopedT('If your URL contains query params, they will be automatically hidden when the bot starts.')}
/>
<SwitchWithRelatedSettings
  label={scopedT('Remember user')}
  moreInfoContent={scopedT('If enabled, user previous variables will be prefilled and his new answers will override the previous ones.')}
  initialValue={
    generalSettings.rememberUser?.isEnabled ??
    (isDefined(generalSettings.isNewResultOnRefreshEnabled)
      ? !generalSettings.isNewResultOnRefreshEnabled
      : false)
  }
  onCheckChange={toggleRememberUser}
  >
        <FormControl as={HStack} justifyContent="space-between">
          <FormLabel mb="0">
            {scopedT('Storage')}:&nbsp;
            <MoreInfoTooltip>
              <Stack>
                <Text>
                {scopedT('Choose')} <Tag size="sm">{scopedT('session')}</Tag> t{scopedT('to remember the user as long as he does not close the tab or the browser.')}
                </Text>
                <Text>
                {scopedT('Choose')} <Tag size="sm">{scopedT('local')}</Tag> {scopedT('to remember the user forever.')}
                </Text>
              </Stack>
            </MoreInfoTooltip>
          </FormLabel>
          <DropdownList
            currentItem={generalSettings.rememberUser?.storage ?? 'session'}
            onItemSelect={updateRememberUserStorage}
            items={rememberUserStorages}
          ></DropdownList>
        </FormControl>
      </SwitchWithRelatedSettings>
    </Stack>
  )
}
