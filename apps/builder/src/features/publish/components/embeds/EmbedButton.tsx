import {
  Button,
  useDisclosure,
  VStack,
  WrapItem,
  Text,
} from '@chakra-ui/react'
import {
  GtmLogo,
  IframeLogo,
} from './logos'
import React from 'react'
import {
  GtmModal,
  IframeModal,
} from './modals'

export type ModalProps = {
  publicId: string
  isPublished: boolean
  isOpen: boolean
  onClose: () => void
}

type EmbedButtonProps = Pick<ModalProps, 'publicId' | 'isPublished'> & {
  logo: JSX.Element
  label: string
  Modal: (props: ModalProps) => JSX.Element
}




export const EmbedButton = ({
  logo,
  label,
  Modal,
  ...modalProps
}: EmbedButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <WrapItem
      as={Button}
      alignItems="center"
      variant="outline"
      style={{ width: '225px', height: '270px' }}
      onClick={onOpen}
      whiteSpace={'normal'}
    >
      <VStack>
        {logo}
        <Text>{label}</Text>
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose} {...modalProps} />
    </WrapItem>
  )
}

export const integrationsList = [
  (props: Pick<ModalProps, 'publicId' | 'isPublished'>) => (
    <EmbedButton
      logo={<GtmLogo height={100} width="70px" />}
      label="Google Tag Manager"
      Modal={GtmModal}
      {...props}
    />
  ),
  (props: Pick<ModalProps, 'publicId' | 'isPublished'>) => (
    <EmbedButton
      logo={<IframeLogo height={100} width="70px" />}
      label="Iframe"
      Modal={IframeModal}
      {...props}
    />
  ),
]
