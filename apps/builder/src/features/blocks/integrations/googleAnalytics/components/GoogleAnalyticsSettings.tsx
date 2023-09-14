import { NumberInput, TextInput } from '@/components/inputs'
import { useScopedI18n } from '@/locales'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Stack,
} from '@chakra-ui/react'
import { GoogleAnalyticsOptions } from '@typebot.io/schemas'
import React from 'react'

type Props = {
  options?: GoogleAnalyticsOptions
  onOptionsChange: (options: GoogleAnalyticsOptions) => void
}

export const GoogleAnalyticsSettings = ({
  options,
  onOptionsChange,
}: Props) => {
  const updateTrackingId = (trackingId: string) =>
    onOptionsChange({ ...options, trackingId })

  const updateCategory = (category: string) =>
    onOptionsChange({ ...options, category })

  const updateAction = (action: string) =>
    onOptionsChange({ ...options, action })

  const updateLabel = (label: string) => onOptionsChange({ ...options, label })

  const updateValue = (value: number | `{{${string}}}` | undefined) =>
    onOptionsChange({
      ...options,
      value,
    })

  const updateSendTo = (sendTo?: string) =>
    onOptionsChange({
      ...options,
      sendTo,
    })

    const scopedT = useScopedI18n('build')

  return (
    <Stack spacing={4}>
      <TextInput
        label={scopedT("Measurement ID")}
        moreInfoTooltip={scopedT("Can be found by clicking on your data stream in Google Analytics dashboard")}
        defaultValue={options?.trackingId ?? ''}
        placeholder="G-123456..."
        onChange={updateTrackingId}
      />
      <TextInput
        label={scopedT("Event action")}
        defaultValue={options?.action ?? ''}
        placeholder={scopedT("Example: conversion")}
        onChange={updateAction}
      />
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {scopedT("Advanced")}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} as={Stack} spacing="6">
            <TextInput
              label={scopedT("Event category")}
              defaultValue={options?.category ?? ''}
              placeholder={scopedT("Example: MyTalk")}
              onChange={updateCategory}
            />
            <TextInput
              label={scopedT("Event label")}
              defaultValue={options?.label ?? ''}
              placeholder={scopedT("Example: Campaign Z")}
              onChange={updateLabel}
            />
            <NumberInput
              direction="column"
              label={scopedT("Event value")}
              defaultValue={options?.value}
              placeholder={scopedT("Example: 0")}
              onValueChange={updateValue}
            />
            <TextInput
              label={scopedT("Send to")}
              moreInfoTooltip={scopedT("Useful to send a conversion event to Google Ads")}
              defaultValue={options?.sendTo?.toString() ?? ''}
              placeholder={scopedT("Example: AW-123456789")}
              onChange={updateSendTo}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Stack>
  )
}
