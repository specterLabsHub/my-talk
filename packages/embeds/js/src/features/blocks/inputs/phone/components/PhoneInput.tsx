import { ShortTextInput } from '@/components'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import { InputSubmitContent } from '@/types'
import { isMobile } from '@/utils/isMobileSignal'
import type { PhoneNumberInputOptions } from '@typebot.io/schemas'
import { createSignal, For, onCleanup, onMount } from 'solid-js'
import { isEmpty } from '@typebot.io/lib'
import { phoneCountries } from '@typebot.io/lib/phoneCountries'
import { CommandData } from '@/features/commands/types'

type PhoneInputProps = Pick<
  PhoneNumberInputOptions,
  'labels' | 'defaultCountryCode'
> & {
  defaultValue?: string
  onSubmit: (value: InputSubmitContent) => void
}

export const PhoneInput = (props: PhoneInputProps) => {
  const [selectedCountryCode, setSelectedCountryCode] = createSignal(
    isEmpty(props.defaultCountryCode) ? 'INT' : props.defaultCountryCode
  )
  const [inputValue, setInputValue] = createSignal(props.defaultValue ?? '')
  let inputRef: HTMLInputElement | undefined

  const handleInput = (inputValue: string | undefined) => {
    setInputValue(inputValue as string)
    if (
      (inputValue === '' || inputValue === '+') &&
      selectedCountryCode() !== 'INT'
    )
      setSelectedCountryCode('INT')
    const matchedCountry =
      inputValue?.startsWith('+') &&
      inputValue.length > 2 &&
      phoneCountries.reduce<(typeof phoneCountries)[number] | null>(
        (matchedCountry, country) => {
          if (
            !country?.dial_code ||
            (matchedCountry !== null && !matchedCountry.dial_code)
          ) {
            return matchedCountry
          }
          if (
            inputValue?.startsWith(country.dial_code) &&
            country.dial_code.length > (matchedCountry?.dial_code.length ?? 0)
          ) {
            return country
          }
          return matchedCountry
        },
        null
      )
    if (matchedCountry) setSelectedCountryCode(matchedCountry.code)
  }

  const checkIfInputIsValid = () =>
    inputValue() !== '' && inputRef?.reportValidity()

  const submit = () => {
    const selectedCountryDialCode = phoneCountries.find(
      (country) => country.code === selectedCountryCode()
    )?.dial_code
    if (checkIfInputIsValid())
      props.onSubmit({
        value: inputValue().startsWith('+')
          ? inputValue()
          : `${selectedCountryDialCode ?? ''}${inputValue()}`,
      })
  }

  const submitWhenEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') submit()
  }

  const selectNewCountryCode = (
    event: Event & { currentTarget: { value: string } }
  ) => {
    const code = event.currentTarget.value
    setSelectedCountryCode(code)
    const dial_code = phoneCountries.find(
      (country) => country.code === code
    )?.dial_code
    if (inputValue() === '' && dial_code) setInputValue(dial_code)
    inputRef?.focus()
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
      class={'flex items-end justify-between typebot-input'}
      data-testid="input"
      style={{
        'max-width': '100%',
        "border-radius": '50px',
        "width": '100%'
      }}
      onKeyDown={submitWhenEnter}
    >
      <div class="flex" style={{width: '100%'}}>
        <div class="relative typebot-country-select flex justify-center items-center" style={{"border-radius": '50px'}}>
          <div class="pl-2 pr-1 flex items-center gap-2">
            <span>
              {
                phoneCountries.find(
                  (country) => selectedCountryCode() === country.code
                )?.flag
              }
            </span>
            <ChevronDownIcon class="w-3" />
          </div>

          <select
            onChange={selectNewCountryCode}
            class="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
          >
            <For each={phoneCountries}>
              {(country) => (
                <option
                  value={country.code}
                  selected={country.code === selectedCountryCode()}
                >
                  {country.name}{' '}
                  {country.dial_code ? `(${country.dial_code})` : ''}
                </option>
              )}
            </For>
          </select>
        </div>

        <ShortTextInput
          type="tel"
          ref={inputRef}
          value={inputValue()}
          onInput={handleInput}
          placeholder={props.labels.placeholder ?? 'Your phone number...'}
          autofocus={!isMobile()}
        />
      </div>

      {/* <SendButton
        type="button"
        isDisabled={inputValue() === ''}
        class="my-2 ml-2"
        on:click={submit}
      >
        {props.labels?.button ?? 'Enviar'}
      </SendButton> */}
     <button  disabled={inputValue() === ''}  onClick={submit} style="cursor: pointer; background: rgb(0, 138, 124); border-radius: 50px; height: 50px; display: flex;justify-content: center;align-items: center;width: 50px;padding: 8px">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="22px"><path d="M476.59 226.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z" fill="white" /></svg>
      </button>
    </div>
  )
}
