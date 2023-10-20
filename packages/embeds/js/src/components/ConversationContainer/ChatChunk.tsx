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
  beforeNewBubbleDisplayed: (type: string) => void
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
    } else {
      props.beforeNewBubbleDisplayed(props.messages[displayedMessageIndex()].type)
    }
    props.onScrollToBottom(
      inputRef?.offsetTop ? inputRef?.offsetTop - 50 : undefined
    )
  })

  const displayNextMessage = async (bubbleOffsetTop?: number) => {
    const lastMessage = props.messages[displayedMessageIndex()]
    await props.onNewBubbleDisplayed(lastMessage.id)

    setDisplayedMessageIndex(
      displayedMessageIndex() === props.messages.length
        ? displayedMessageIndex()
        : displayedMessageIndex() + 1
    )

    const nextMessage = props.messages[displayedMessageIndex()]
    if (nextMessage !== undefined) {
      props.beforeNewBubbleDisplayed(nextMessage.type)
    }

    props.onScrollToBottom(bubbleOffsetTop)
    if (displayedMessageIndex() === props.messages.length) {
      props.onAllBubblesDisplayed()
    }
  }

  
  


  return (
    <div class="flex flex-col w-full min-w-0 gap-2 md:pl-9 md:pr-9 min-[320px]:pl-4 min-[320px]:pr-4" style="max-width: 100%; width: 100%;">
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
                      <div style={{ "position": "absolute", width: 0, height: 0, "border-style": "solid", "border-width": "0px 10px 10px 0", "border-color": "transparent var(--typebot-host-bubble-bg-color) transparent transparent", "top": "0", "left": "-6px" }} />
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
