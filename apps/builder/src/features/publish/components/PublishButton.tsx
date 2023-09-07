import {
  Button,
  HStack,
  IconButton,
  Stack,
  Tooltip,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  ButtonProps,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  ChevronLeftIcon,
  CloudOffIcon,
  LockedIcon,
  UnlockedIcon,
} from '@/components/icons'
import { useTypebot } from '@/features/editor/providers/TypebotProvider'
import { useWorkspace } from '@/features/workspace/WorkspaceProvider'
import { InputBlockType } from '@typebot.io/schemas'
import { useRouter } from 'next/router'
import { isNotDefined } from '@typebot.io/lib'
import { ChangePlanModal } from '@/features/billing/components/ChangePlanModal'
import { isFreePlan } from '@/features/billing/helpers/isFreePlan'
import { parseTimeSince } from '@/helpers/parseTimeSince'
import { useI18n, useScopedI18n } from '@/locales'

export const PublishButton = (props: ButtonProps) => {
  const scopedT = useScopedI18n('header')
  const t = useI18n()
  const warningTextColor = useColorModeValue('red.300', 'red.600')
  const { workspace } = useWorkspace()
  const { push, query } = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isPublishing,
    isPublished,
    publishTypebot,
    publishedTypebot,
    restorePublishedTypebot,
    typebot,
    isSavingLoading,
    updateTypebot,
    unpublishTypebot,
    save,
  } = useTypebot()

  const hasInputFile = typebot?.groups
    .flatMap((g) => g.blocks)
    .some((b) => b.type === InputBlockType.FILE)

  const handlePublishClick = () => {
    if (isFreePlan(workspace) && hasInputFile) return onOpen()
    publishTypebot()
    if (!publishedTypebot) push(`/typebots/${query.typebotId}/share`)
  }

  const closeTypebot = async () => {
    updateTypebot({ isClosed: true })
    await save()
  }

  const openTypebot = async () => {
    updateTypebot({ isClosed: false })
    await save()
  }

  return (
    <HStack spacing="1px">
      <ChangePlanModal
        isOpen={isOpen}
        onClose={onClose}
        type={t('billing.limitMessage.fileInput')}
      />
      <Tooltip
        placement="bottom-end"
        label={
          <Stack>
            {!publishedTypebot?.version ? (
              <Text color={warningTextColor} fontWeight="semibold">
                {scopedT('PublishDeploy')}
              </Text>
            ) : (
              <Text> {scopedT('PublishNoDeploy')}</Text>
            )}
            <Text fontStyle="italic">
             {scopedT('PublishVersion')}{' '}
              {publishedTypebot &&
                parseTimeSince(publishedTypebot.updatedAt.toString())}{' '}
              atrás
            </Text>
          </Stack>
        }
        isDisabled={isNotDefined(publishedTypebot) || isPublished}
      >
        <Button
          colorScheme="blue"
          isLoading={isPublishing || isSavingLoading}
          isDisabled={isPublished}
          onClick={handlePublishClick}
          borderRightRadius={publishedTypebot ? 0 : undefined}
          {...props}
        >
          {isPublished
            ? typebot?.isClosed
              ? `${scopedT('Closed')}`
              : `${scopedT('Published')}`
            : `${scopedT('Publish')}`}
        </Button>
      </Tooltip>

      {publishedTypebot && (
        <Menu>
          <MenuButton
            as={IconButton}
            colorScheme={'blue'}
            borderLeftRadius={0}
            icon={<ChevronLeftIcon transform="rotate(-90deg)" />}
            aria-label="Show published typebot menu"
            size="sm"
            isDisabled={isPublishing || isSavingLoading}
          />
          <MenuList>
            {!isPublished && (
              <MenuItem onClick={restorePublishedTypebot}>
               {scopedT('PublishRestore')}
              </MenuItem>
            )}
            {!typebot?.isClosed ? (
              <MenuItem onClick={closeTypebot} icon={<LockedIcon />}>
                    {scopedT('PublishIIsClosed')}
              </MenuItem>
            ) : (
              <MenuItem onClick={openTypebot} icon={<UnlockedIcon />}>
                    {scopedT('PublishReOpen')}
              </MenuItem>
            )}
            <MenuItem onClick={unpublishTypebot} icon={<CloudOffIcon />}>
            {scopedT('Unpublish')}
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </HStack>
  )
}
