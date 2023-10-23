import { SendButton } from '@/components/SendButton'
import { InputSubmitContent } from '@/types'
import type { DateInputOptions } from '@typebot.io/schemas'
import { createSignal } from 'solid-js'
import { parseReadableDate } from '../utils/parseReadableDate'

type Props = {
  onSubmit: (inputValue: InputSubmitContent) => void
  options?: DateInputOptions
  defaultValue?: string
}

export const DateForm = (props: Props) => {
  const [inputValues, setInputValues] = createSignal(
    parseDefaultValue(props.defaultValue ?? '')
  )

  return (
    <div class="flex flex-col"  style={{
      'max-width': '100%',
      "width": '100%'
    }}>
      <div class="flex items-center">
        <form
          class={'flex justify-between typebot-input items-end'}
          onSubmit={(e) => {
            if (inputValues().from === '' && inputValues().to === '') return
            e.preventDefault()
            props.onSubmit({
              value: parseReadableDate({
                ...inputValues(),
                hasTime: props.options?.hasTime,
                isRange: props.options?.isRange,
              }),
            })
          }}
          style={{
            'max-width': '100%',
            'border-radius': '50px',
            width: '100%', display: 'flex', height: '52px',
            "align-items": 'center'
          }}
        >
          <div class="flex flex-col">
            <div
              class={
                'flex items-center p-4 ' +
                (props.options?.isRange ? 'pb-0 gap-2' : '')
              }
            >
              {props.options?.isRange && (
                <p class="font-semibold">
                  {props.options.labels?.from ?? 'From:'}
                </p>
              )}
              <input
                class="focus:outline-none flex-1 w-full text-input typebot-date-input"
                style={{
                  'min-height': '32px',
                  'min-width': '100px',
                  'font-size': '16px',
                }}
                value={inputValues().from}
                type={props.options?.hasTime ? 'datetime-local' : 'date'}
                onChange={(e) =>
                  setInputValues({
                    ...inputValues(),
                    from: e.currentTarget.value,
                  })
                }
                data-testid="from-date"
              />
            </div>
            {props.options?.isRange && (
              <div class="flex items-center p-4">
                {props.options.isRange && (
                  <p class="font-semibold">
                    {props.options.labels?.to ?? 'To:'}
                  </p>
                )}
                <input
                  class="focus:outline-none flex-1 w-full text-input ml-2 typebot-date-input"
                  style={{
                    'min-height': '32px',
                    'min-width': '100px',
                    'font-size': '16px',
                  }}
                  value={inputValues().to}
                  type={props.options.hasTime ? 'datetime-local' : 'date'}
                  onChange={(e) =>
                    setInputValues({
                      ...inputValues(),
                      to: e.currentTarget.value,
                    })
                  }
                  data-testid="to-date"
                />
              </div>
            )}
          </div>

          {/* <SendButton
            isDisabled={inputValues().to === '' && inputValues().from === ''}
            class="my-2 ml-2"
          >
            {props.options?.labels?.button ?? 'Enviar'}
          </SendButton> */}
          <div style={{width: '100%', display: 'flex', "justify-content": 'flex-end', "align-items": 'center'}}>
          <button type='submit' disabled={inputValues().to === '' && inputValues().from === ''} style="cursor: pointer; background: rgb(0, 138, 124); border-radius: 50px; height: 50px; display: flex;justify-content: center;align-items: center;width: 50px;padding: 8px">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="22px"><path d="M476.59 226.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z" fill="white" /></svg>
      </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const parseDefaultValue = (defaultValue: string) => {
  if (!defaultValue.includes('to')) return { from: defaultValue, to: '' }
  const [from, to] = defaultValue.split(' to ')
  return { from, to }
}
