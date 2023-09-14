import { Button, Flex, HStack, Stack, Text } from '@chakra-ui/react'
import { AudioBubbleContent } from '@typebot.io/schemas'
import { TextInput } from '@/components/inputs'
import { useState } from 'react'
import { UploadButton } from '@/components/ImageUploadContent/UploadButton'
import { useScopedI18n } from '@/locales'

type Props = {
  fileUploadPath: string
  content: AudioBubbleContent
  onSubmit: (content: AudioBubbleContent) => void
}

export const AudioBubbleForm = ({
  fileUploadPath,
  content,
  onSubmit,
}: Props) => {
  const [currentTab, setCurrentTab] = useState<'link' | 'upload'>('link')

  const submit = (url: string) => onSubmit({ url })
  const scopedT = useScopedI18n('build')

  return (
    <Stack>
      <HStack>
        <Button
          variant={currentTab === 'upload' ? 'solid' : 'ghost'}
          onClick={() => setCurrentTab('upload')}
          size="sm"
        >
          {scopedT('Upload')}
        </Button>
        <Button
          variant={currentTab === 'link' ? 'solid' : 'ghost'}
          onClick={() => setCurrentTab('link')}
          size="sm"
        >
          {scopedT('Embed link')}
        </Button>
      </HStack>
      <Stack p="2">
        {currentTab === 'upload' && (
          <Flex justify="center" py="2">
            <UploadButton
              fileType="audio"
              filePath={fileUploadPath}
              onFileUploaded={submit}
              colorScheme="blue"
            >
              {scopedT('Choose a file')}
            </UploadButton>
          </Flex>
        )}
        {currentTab === 'link' && (
          <>
            <TextInput
              placeholder={scopedT('Paste the audio file link...')}
              defaultValue={content.url ?? ''}
              onChange={submit}
            />
            <Text fontSize="sm" color="gray.400" textAlign="center">
              {scopedT('Works with .MP3s and .WAVs')}
            </Text>
          </>
        )}
      </Stack>
    </Stack>
  )
}
