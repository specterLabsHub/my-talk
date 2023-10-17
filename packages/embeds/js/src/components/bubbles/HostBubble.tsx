import { AudioBubble } from '@/features/blocks/bubbles/audio'
import { EmbedBubble } from '@/features/blocks/bubbles/embed'
import { ImageBubble } from '@/features/blocks/bubbles/image'
import { TextBubble } from '@/features/blocks/bubbles/textBubble'
import { VideoBubble } from '@/features/blocks/bubbles/video'
import type {
  AudioBubbleContent,
  ChatMessage,
  EmbedBubbleContent,
  ImageBubbleContent,
  TextBubbleContent,
  TypingEmulation,
  VideoBubbleContent,
} from '@typebot.io/schemas'
import { BubbleBlockType } from '@typebot.io/schemas/features/blocks/bubbles/enums'
import { Match, Show, Switch } from 'solid-js'

type Props = {
  message: ChatMessage
  typingEmulation: TypingEmulation
  onTransitionEnd: (offsetTop?: number) => void
  children?: any
  loading: boolean | undefined
}

export const HostBubble = (props: Props) => {
  const onTransitionEnd = (offsetTop?: number) => {
    props.onTransitionEnd(offsetTop)
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
    <Show when={!props.loading}>
    <Switch>
      <Match when={props.message.type === BubbleBlockType.TEXT}>
        <TextBubble
          content={props.message.content as TextBubbleContent}
          typingEmulation={props.typingEmulation}
          onTransitionEnd={onTransitionEnd}
          />
      </Match>
      <Match when={props.message.type === BubbleBlockType.IMAGE}>
        <ImageBubble
          content={props.message.content as ImageBubbleContent}
          onTransitionEnd={onTransitionEnd}
          />
      </Match>
      <Match when={props.message.type === BubbleBlockType.VIDEO}>
        <VideoBubble
          content={props.message.content as VideoBubbleContent}
          onTransitionEnd={onTransitionEnd}
          />
      </Match>
      <Match when={props.message.type === BubbleBlockType.EMBED}>
        <EmbedBubble
          content={props.message.content as EmbedBubbleContent}
          onTransitionEnd={onTransitionEnd}
          />
      </Match>
      <Match when={props.message.type === BubbleBlockType.AUDIO}>
        <AudioBubble
          url={(props.message.content as AudioBubbleContent).url}
          onTransitionEnd={onTransitionEnd}
          children={props.children}
          />
      </Match>

    </Switch>
    <div style={{ "font-size": "11px", "color": "#667781", "position": "absolute", "right": `${props.message.type === BubbleBlockType.AUDIO ? '57px' : '8px'}`, "bottom": "0px" }} class="z-10">
                        {formatCurrentTime()}
      </div>
          </Show>
  )
}
