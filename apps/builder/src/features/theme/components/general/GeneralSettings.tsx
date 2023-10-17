import { Flex, FormLabel, Stack, Switch, useDisclosure } from '@chakra-ui/react'
import {  GeneralTheme } from '@typebot.io/schemas'
import React from 'react'
import { FontSelector } from './FontSelector'
import { LockTag } from '@/features/billing/components/LockTag'
import { Plan } from '@typebot.io/prisma'
import { isFreePlan } from '@/features/billing/helpers/isFreePlan'
import { useWorkspace } from '@/features/workspace/WorkspaceProvider'
import { ChangePlanModal } from '@/features/billing/components/ChangePlanModal'
import { useI18n, useScopedI18n } from '@/locales'

type Props = {
  isBrandingEnabled: boolean
  generalTheme: GeneralTheme
  onGeneralThemeChange: (general: GeneralTheme) => void
  onBrandingChange: (isBrandingEnabled: boolean) => void
}

export const GeneralSettings = ({
  isBrandingEnabled,
  generalTheme,
  onGeneralThemeChange,
  onBrandingChange,
}: Props) => {
  const t = useI18n()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { workspace } = useWorkspace()
  const isWorkspaceFreePlan = isFreePlan(workspace)

  const handleSelectFont = (font: string) =>
    onGeneralThemeChange({ ...generalTheme, font })

  const updateBranding = () => {
    if (isBrandingEnabled && isWorkspaceFreePlan) return
    onBrandingChange(!isBrandingEnabled)
  }
  const scopedT = useScopedI18n('template')

  return (
    <Stack spacing={6}>
      <ChangePlanModal
        isOpen={isOpen}
        onClose={onClose}
        type={t('billing.limitMessage.brand')}
      />
      <Flex
        justifyContent="space-between"
        align="center"
        onClick={isWorkspaceFreePlan ? onOpen : undefined}
      >
        <FormLabel htmlFor="branding" mb="0" cursor="pointer">
        {scopedT('Show MyTalk brand')}
          {isWorkspaceFreePlan && <LockTag plan={Plan.STARTER} />}
        </FormLabel>
        <Switch
          id="branding"
          isChecked={isBrandingEnabled}
          onChange={updateBranding}
        />
      </Flex>
      <FontSelector
        activeFont={generalTheme.font}
        onSelectFont={handleSelectFont}
      />
    </Stack>
  )
}
