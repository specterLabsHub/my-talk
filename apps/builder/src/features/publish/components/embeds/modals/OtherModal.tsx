import React, { useState } from 'react'
import { isDefined } from '@udecode/plate-common'
import { EmbedModal } from '../EmbedModal'
import { JavascriptInstructions } from './Javascript/instructions/JavascriptInstructions'
import { ModalProps } from '../EmbedButton'
import { useScopedI18n } from '@/locales'

export const OtherModal = ({ isOpen, onClose, isPublished }: ModalProps) => {
  const [selectedEmbedType, setSelectedEmbedType] = useState<
    'standard' | 'popup' | 'bubble' | undefined
  >()

  const scopedT = useScopedI18n('share')

  return (
    <EmbedModal
      titlePrefix={scopedT('Other')}
      isOpen={isOpen}
      onClose={onClose}
      isPublished={isPublished}
      onSelectEmbedType={setSelectedEmbedType}
      selectedEmbedType={selectedEmbedType}
    >
      {isDefined(selectedEmbedType) && (
        <JavascriptInstructions type={selectedEmbedType} />
      )}
    </EmbedModal>
  )
}
