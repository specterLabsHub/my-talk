import { ListItem, OrderedList, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { StandardSettings } from '../../../settings/StandardSettings'
import { InstallNextjsPackageSnippet } from '../InstallNextjsPackageSnippet'
import { NextjsStandardSnippet } from '../NextjsStandardSnippet'
import { useScopedI18n } from '@/locales'

export const NextjsStandardInstructions = () => {
  const [inputValues, setInputValues] = useState<{
    widthLabel?: string
    heightLabel: string
  }>({
    heightLabel: '100%',
    widthLabel: '100%',
  })

  const scopedT = useScopedI18n('share')

  return (
    <OrderedList spacing={4} pl={5}>
      <ListItem>
        <Stack spacing={4}>
          <Text>{scopedT('Install the packages')}</Text>
          <InstallNextjsPackageSnippet />
        </Stack>
      </ListItem>
      <ListItem>
        <Stack spacing={4}>
          <StandardSettings
            onUpdateWindowSettings={(settings) =>
              setInputValues({ ...settings })
            }
          />
          <NextjsStandardSnippet {...inputValues} />
        </Stack>
      </ListItem>
    </OrderedList>
  )
}
