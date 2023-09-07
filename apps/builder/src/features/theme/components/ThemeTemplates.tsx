import { Button, HStack, Stack } from '@chakra-ui/react'
import { ThemeTemplate } from '@typebot.io/schemas'
import { useState } from 'react'
import { MyTemplates } from './MyTemplates'
import { TemplatesGallery } from './TemplatesGallery'
import { useScopedI18n } from '@/locales'

type Tab = 'my-templates' | 'gallery'

type Props = {
  workspaceId: string
  selectedTemplateId: string | undefined
  currentTheme: ThemeTemplate['theme']
  onTemplateSelect: (
    template: Partial<Pick<ThemeTemplate, 'id' | 'theme'>>
  ) => void
}

export const ThemeTemplates = ({
  workspaceId,
  selectedTemplateId,
  currentTheme,
  onTemplateSelect,
}: Props) => {
  const [selectedTab, setSelectedTab] = useState<Tab>('my-templates')
  const scopedT = useScopedI18n('template')

  return (
    <Stack spacing={4}>
      <HStack>
        <Button
          flex="1"
          variant="outline"
          _hover={{color: 'white'}}
          colorScheme={selectedTab === 'my-templates' ? 'blue' : 'gray'}
          onClick={() => setSelectedTab('my-templates')}
        >
          {scopedT('My templates')}
        </Button>
        <Button
          flex="1"
          variant="outline"
          _hover={{color: 'white'}}
          colorScheme={selectedTab === 'gallery' ? 'blue' : 'gray'}
          onClick={() => setSelectedTab('gallery')}
        >
           {scopedT('Gallery')}
        </Button>
      </HStack>
      <ThemeTemplatesBody
        tab={selectedTab}
        currentTheme={currentTheme}
        workspaceId={workspaceId}
        selectedTemplateId={selectedTemplateId}
        onTemplateSelect={onTemplateSelect}
      />
    </Stack>
  )
}

const ThemeTemplatesBody = ({
  tab,
  workspaceId,
  selectedTemplateId,
  currentTheme,
  onTemplateSelect,
}: {
  tab: Tab
} & Props) => {
  switch (tab) {
    case 'my-templates':
      return (
        <MyTemplates
          onTemplateSelect={onTemplateSelect}
          currentTheme={currentTheme}
          selectedTemplateId={selectedTemplateId}
          workspaceId={workspaceId}
        />
      )
    case 'gallery':
      return (
        <TemplatesGallery
          onTemplateSelect={onTemplateSelect}
          currentTheme={currentTheme}
          selectedTemplateId={selectedTemplateId}
          workspaceId={workspaceId}
        />
      )
  }
}
