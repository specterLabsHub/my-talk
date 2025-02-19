import { SaveIcon } from '@/components/icons'
import { trpc } from '@/lib/trpc'
import { Button, SimpleGrid, Stack, useDisclosure } from '@chakra-ui/react'
import { ThemeTemplate } from '@typebot.io/schemas'
import { areThemesEqual } from '../helpers/areThemesEqual'
import { SaveThemeModal } from './SaveThemeModal'
import { ThemeTemplateCard } from './ThemeTemplateCard'
import { useScopedI18n } from '@/locales'

type Props = {
  selectedTemplateId: string | undefined
  currentTheme: ThemeTemplate['theme']
  workspaceId: string
  onTemplateSelect: (
    template: Partial<Pick<ThemeTemplate, 'id' | 'theme'>>
  ) => void
}

export const MyTemplates = ({
  selectedTemplateId,
  currentTheme,
  workspaceId,
  onTemplateSelect,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data } = trpc.theme.listThemeTemplates.useQuery({
    workspaceId,
  })
  const selectedTemplate = data?.themeTemplates.find(
    (themeTemplate) => themeTemplate.id === selectedTemplateId
  )
  const scopedT = useScopedI18n('template')
  const closeModalAndSelectTemplate = (
    template?: Pick<ThemeTemplate, 'id' | 'theme'>
  ) => {
    if (template) onTemplateSelect(template)
    onClose()
  }

  return (
    <Stack spacing={4}>
      {(!selectedTemplate ||
        !areThemesEqual(selectedTemplate?.theme, currentTheme)) && (
        <Button leftIcon={<SaveIcon />} onClick={onOpen} colorScheme="blue">
          {scopedT('Save current theme')}
        </Button>
      )}
      <SaveThemeModal
        workspaceId={workspaceId}
        selectedTemplate={selectedTemplate}
        isOpen={isOpen}
        onClose={closeModalAndSelectTemplate}
        theme={currentTheme}
      />
      <SimpleGrid columns={2} spacing={4}>
        {data?.themeTemplates.map((themeTemplate) => (
          <ThemeTemplateCard
            key={themeTemplate.id}
            workspaceId={workspaceId}
            themeTemplate={themeTemplate}
            isSelected={themeTemplate.id === selectedTemplateId}
            onClick={() => onTemplateSelect(themeTemplate)}
            onRenameClick={onOpen}
            onDeleteSuccess={() => onTemplateSelect({ id: '' })}
          />
        ))}
      </SimpleGrid>
    </Stack>
  )
}
