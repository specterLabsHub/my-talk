import { ShortTextInput } from '@/components/inputs/ShortTextInput'
import { SendButton } from '@/components/SendButton'
import { InputSubmitContent } from '@/types'
import { NumberInputBlock } from '@typebot.io/schemas'
import React, { MutableRefObject, useRef, useState } from 'react'

type NumberInputProps = {
  block: NumberInputBlock
  onSubmit: (value: InputSubmitContent) => void
  defaultValue?: string
  hasGuestAvatar: boolean
}

export const NumberInput = ({
  block,
  onSubmit,
  defaultValue,
  hasGuestAvatar,
}: NumberInputProps) => {
  const [inputValue, setInputValue] = useState(defaultValue ?? '')
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)

  const handleChange = (inputValue: string) => setInputValue(inputValue)

  const checkIfInputIsValid = () =>
    inputValue !== '' && inputRef.current?.reportValidity()

  const submit = () => {
    if (checkIfInputIsValid()) onSubmit({ value: inputValue })
  }

  const submitWhenEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') submit()
  }

  return (
    <div
      className={
        'flex items-end justify-between rounded-lg pr-2 typebot-input w-full'
      }
      data-testid="input"
      style={{
        marginRight: hasGuestAvatar ? '50px' : '0.5rem',
        maxWidth: '100%',
      }}
      onKeyDown={submitWhenEnter}
    >
      <ShortTextInput
        ref={inputRef as MutableRefObject<HTMLInputElement>}
        value={inputValue}
        placeholder={
          block.options?.labels?.placeholder ?? 'Type your answer...'
        }
        onChange={handleChange}
        type="number"
        style={{ appearance: 'auto' }}
        min={block.options?.min}
        max={block.options?.max}
        step={block.options?.step ?? 'any'}
      />
        <button  disabled={inputValue === ''} className="my-2 ml-2" onClick={submit} style={{cursor: 'pointer', background: 'rgb(0, 138, 124)', borderRadius: 50, height: 50, display: 'flex',justifyContent: 'center',alignItems: 'center',width: 50,padding: '8px',}}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="22px"><path d="M476.59 226.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z" fill="white" /></svg>
      </button>
    </div>
  )
}
