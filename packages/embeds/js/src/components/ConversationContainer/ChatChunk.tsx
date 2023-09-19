import { BotContext, ChatChunk as ChatChunkType } from '@/types'
import { isMobile } from '@/utils/isMobileSignal'
import type { ChatReply, Settings, Theme } from '@typebot.io/schemas'
import { createSignal, For, onMount, Show } from 'solid-js'
import { HostBubble } from '../bubbles/HostBubble'
import { InputChatBlock } from '../InputChatBlock'
import { AvatarSideContainer } from './AvatarSideContainer'
import { StreamingBubble } from '../bubbles/StreamingBubble'
import { BubbleBlockType } from '@typebot.io/schemas/features/blocks/bubbles/enums'

type Props = Pick<ChatReply, 'messages' | 'input'> & {
  theme: Theme
  settings: Settings
  inputIndex: number
  context: BotContext
  hasError: boolean
  hideAvatar: boolean
  streamingMessageId: ChatChunkType['streamingMessageId']
  onNewBubbleDisplayed: (blockId: string) => Promise<void>
  onScrollToBottom: (top?: number) => void
  onSubmit: (input: string) => void
  onSkip: () => void
  onAllBubblesDisplayed: () => void
  isLoading?: boolean
}

export const ChatChunk = (props: Props) => {
  let inputRef: HTMLDivElement | undefined
  const [displayedMessageIndex, setDisplayedMessageIndex] = createSignal(0)

  onMount(() => {
    if (props.streamingMessageId) return
    if (props.messages.length === 0) {
      props.onAllBubblesDisplayed()
    }
    props.onScrollToBottom(
      inputRef?.offsetTop ? inputRef?.offsetTop - 50 : undefined
    )
  })

  const displayNextMessage = async (bubbleOffsetTop?: number) => {
    const lastBubbleBlockId = props.messages[displayedMessageIndex()].id
    await props.onNewBubbleDisplayed(lastBubbleBlockId)
    setDisplayedMessageIndex(
      displayedMessageIndex() === props.messages.length
        ? displayedMessageIndex()
        : displayedMessageIndex() + 1
    )
    props.onScrollToBottom(bubbleOffsetTop)
    if (displayedMessageIndex() === props.messages.length) {
      props.onAllBubblesDisplayed()
    }
  }

  function formatCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${formattedHours}:${formattedMinutes}`;
  }

  return (
    <div class="flex flex-col w-full min-w-0 gap-2" style={{ "max-width": '776px', "width": '100%', "padding-left": "38px" }}>
      {/* <div  class="flex items-center absolute px-4 py-2 bubble-typing z-10 "> */}
      <Show when={props.messages.length > 0}>
        <div class={'flex' + (isMobile() ? ' gap-1' : ' gap-2')}>
          <div
            class="flex flex-col gap-2"
            style={{
              'margin-right': props.theme.chat.guestAvatar?.isEnabled
                ? isMobile()
                  ? '32px'
                  : '48px'
                : undefined,
            }}
          >
            <For each={props.messages.slice(0, displayedMessageIndex() + 1)}>
              {(message, index) => {
                const currentIndex = index();

                return (
                  <div class="relative" style={{ "width": "fit-content" }}>
                    {currentIndex === 0 && (
                      <div style={{ "position": "absolute", width: 0, height: 0, "border-style": "solid", "border-width": "0px 10px 10px 0", "border-color": "transparent #f7f8ff transparent transparent", "top": "0", "left": "-6px" }} />
                    )}
                    <HostBubble
                      children={<Show
                        when={
                          true
                        }
                      >
                        {BubbleBlockType.AUDIO && (
                          <AvatarSideContainer
                            hostAvatarSrc={props.theme.chat.hostAvatar?.url}
                            hideAvatar={props.hideAvatar}
                            isNotAbsolute
                            seccondary={true}
                          />
                        )}
                      </Show>}
                      message={message}
                      typingEmulation={props.settings.typingEmulation}
                      onTransitionEnd={displayNextMessage}
                    />
                    <Show when={!props.isLoading}>
                      <div style={{ "font-size": "11px", "color": "#667781", "position": "absolute", "right": `${message.type === BubbleBlockType.AUDIO ? '57px' : '8px'}`, "bottom": "0px" }} class="z-10">
                        {formatCurrentTime()}
                      </div>
                    </Show>
                  </div>
                );
              }}
            </For>
          </div>

        </div>
      </Show>
      {props.input && displayedMessageIndex() === props.messages.length && (
        <>
          <InputChatBlock
            ref={inputRef}
            block={props.input}
            inputIndex={props.inputIndex}
            onSubmit={props.onSubmit}
            onSkip={props.onSkip}
            guestAvatar={props.theme.chat.guestAvatar}
            context={props.context}
            isInputPrefillEnabled={
              props.settings.general.isInputPrefillEnabled ?? true
            }
            hasError={props.hasError}
          />
        </>
      )}
      <Show when={props.streamingMessageId} keyed>
        {(streamingMessageId) => (
          <div class={'flex' + (isMobile() ? ' gap-1' : ' gap-2')}>
            <Show when={props.theme.chat.hostAvatar?.isEnabled}>
              <AvatarSideContainer
                hostAvatarSrc={props.theme.chat.hostAvatar?.url}
                hideAvatar={props.hideAvatar}
              />
            </Show>

            <div
              class="flex flex-col flex-1 gap-2"
              style={{
                'margin-right': props.theme.chat.guestAvatar?.isEnabled
                  ? isMobile()
                    ? '32px'
                    : '48px'
                  : undefined,
              }}
            >
              <StreamingBubble streamingMessageId={streamingMessageId} />
            </div>
          </div>
        )}
      </Show>
    </div>
  )
}
