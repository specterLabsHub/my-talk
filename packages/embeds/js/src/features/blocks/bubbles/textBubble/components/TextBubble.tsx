import { TypingBubble } from '@/components'
import type { TextBubbleContent, TypingEmulation } from '@typebot.io/schemas'
import { For, createSignal, onCleanup, onMount } from 'solid-js'
import { computeTypingDuration } from '../helpers/computeTypingDuration'
import { PlateBlock } from './plate/PlateBlock'
import { computePlainText } from '../helpers/convertRichTextToPlainText'
import { clsx } from 'clsx'
import { isMobile } from '@/utils/isMobileSignal'

type Props = {
  content: TextBubbleContent
  typingEmulation: TypingEmulation
  onTransitionEnd: (offsetTop?: number) => void
}

export const showAnimationDuration = 400

const defaultTypingEmulation = {
  enabled: true,
  speed: 300,
  maxDelay: 1.5,
}

let typingTimeout: NodeJS.Timeout

export const TextBubble = (props: Props) => {
  let ref: HTMLDivElement | undefined
  const [isTyping, setIsTyping] = createSignal(true)
  const [isTypingEnd, setIsTypingEnd] = createSignal(true)

  const onTypingEnd = () => {
    if (!isTyping()) return
    setIsTyping(false)
    setTimeout(() => {
      props.onTransitionEnd(ref?.offsetTop)
    }, showAnimationDuration)
  }

  onMount(() => {
    if (!isTyping) return
    const plainText = computePlainText(props.content.richText)
    const typingDuration =
      props.typingEmulation?.enabled === false
        ? 0
        : computeTypingDuration(
          plainText,
          props.typingEmulation ?? defaultTypingEmulation
        )
    typingTimeout = setTimeout(onTypingEnd, typingDuration)
  })

  onCleanup(() => {
    if (typingTimeout) clearTimeout(typingTimeout)
  })

  function formatCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${formattedHours}:${formattedMinutes}`;
  }


  onMount(() => {
    if(isTyping()){
      setTimeout(() => {
        setIsTypingEnd(false);
      }, 1000)
    }
  });


  return (
    <div class="flex flex-col animate-fade-in" ref={ref} style={{position: 'relative'}}>
      <div class="flex w-full items-center">
        <div class="flex relative items-start typebot-host-bubble" style={{ "padding-right": "32px" }}>
          <div
            class="flex items-center absolute px-4 py-2 bubble-typing "
            style={{
              width: isTyping() ? '64px' : '100%',
              height: isTyping() ? '32px' : '100%',
            }}
            data-testid="host-bubble"
          >
            {isTyping() && <TypingBubble />}
          </div>
          <div
            class={clsx(
              'overflow-hidden text-fade-in mx-4 my-2 whitespace-pre-wrap slate-html-container relative text-ellipsis',
              isTyping() ? 'opacity-0' : 'opacity-100'
            )}
            style={{
              height: isTyping() ? (isMobile() ? '16px' : '20px') : '100%',
            }}
          >
            <For each={props.content.richText}>
              {(element) => <PlateBlock element={element} />}
            </For>
          </div>
        </div>
      </div>
      {!isTypingEnd() && (
        <div style={{ "font-size": "11px", "color": "#667781", "position": "absolute", "right": '8px', "bottom": "0px" }} class="z-10">
           {formatCurrentTime()}
        </div>
        )}
    </div>
  )
}
