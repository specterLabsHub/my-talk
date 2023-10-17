import { Textarea, ShortTextInput } from '@/components'
import { SendButton } from '@/components/SendButton'
import { CommandData } from '@/features/commands'
import { InputSubmitContent } from '@/types'
import { isMobile } from '@/utils/isMobileSignal'
import type { TextInputBlock } from '@typebot.io/schemas'
import { createSignal, onCleanup, onMount } from 'solid-js'

type Props = {
  block: TextInputBlock
  defaultValue?: string
  onSubmit: (value: InputSubmitContent) => void
}

export const TextInput = (props: Props) => {
  const [inputValue, setInputValue] = createSignal(props.defaultValue ?? '')
  let inputRef: HTMLInputElement | HTMLTextAreaElement | undefined

  const handleInput = (inputValue: string) => setInputValue(inputValue)

  const checkIfInputIsValid = () =>
    inputValue() !== '' && inputRef?.reportValidity()

  const submit = () => {
    if (checkIfInputIsValid()) props.onSubmit({ value: inputValue() })
  }

  const submitWhenEnter = (e: KeyboardEvent) => {
    if (props.block.options.isLong) return
    if (e.key === 'Enter') submit()
  }

  const submitIfCtrlEnter = (e: KeyboardEvent) => {
    if (!props.block.options.isLong) return
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submit()
  }

  onMount(() => {
    if (!isMobile() && inputRef) inputRef.focus()
    window.addEventListener('message', processIncomingEvent)
  })

  onCleanup(() => {
    window.removeEventListener('message', processIncomingEvent)
  })

  const processIncomingEvent = (event: MessageEvent<CommandData>) => {
    const { data } = event
    if (!data.isFromTypebot) return
    if (data.command === 'setInputValue') setInputValue(data.value)
  }

  return (
    <div
      class={'flex items-end justify-between typebot-input w-full'}
      data-testid="input"
      style={{
        'max-width': props.block.options.isLong ? undefined : '100%',
        "border-radius": "50px",
        "display": "flex", "align-items": "center"
      }}
      onKeyDown={submitWhenEnter}
    >
      {props.block.options.isLong ? (
        <Textarea
          ref={inputRef as HTMLTextAreaElement}
          onInput={handleInput}
          onKeyDown={submitIfCtrlEnter}
          value={inputValue()}
          placeholder={
            props.block.options?.labels?.placeholder ?? 'Digite sua resposta...'
          }
        />
      ) : (
        <ShortTextInput
          ref={inputRef as HTMLInputElement}
          onInput={handleInput}
          value={inputValue()}
          placeholder={
            props.block.options?.labels?.placeholder ?? 'Digite sua resposta...'
          }
        />
      )}
      <button on: click={submit} style="cursor: pointer;background: rgb(0, 138, 124);border-radius: 50px;height: 50px;display: flex;justify-content: center;align-items: center;width: 50px;padding: 8px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="22px"><path d="M476.59 226.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z" fill="white" /></svg>
      </button>
    </div>
  )
}
