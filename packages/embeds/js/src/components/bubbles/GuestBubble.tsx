import { Show } from 'solid-js'
import { Avatar } from '../avatars/Avatar'
import { DoubleCheckIcon } from '../icons/DoubleCheckIcon'

type Props = {
  message: string
  showAvatar: boolean
  time?: string
  avatarSrc?: string
  currentIndex?: number
}

export const GuestBubble = (props: Props) => (
  <div
    class="flex justify-end items-end animate-fade-in gap-2 guest-container relative"
  >
    {props.currentIndex === 0 && (
      <div style="position: absolute;width: 0px;height: 0px;border-style: solid;border-width: 0 0 10px 10px;border-color: transparent transparent transparent  var(--typebot-host-bubble-bg-color);top: 0px;right: -6px;" />
    )}
    <span
      class="px-4 py-2 whitespace-pre-wrap max-w-full typebot-guest-bubble"
      data-testid="guest-bubble"
    >
      {props.message}
      <span class='flex gap-1 text-xs text-right' style="justify-content: flex-end;margin-right: -5px;font-size: 11px;">
        {new Date().getHours().toPrecision(2) + ':' + new Date().getMinutes().toPrecision(2)}
        <span style={{ display: 'inline' }}>
          <DoubleCheckIcon font-size='6px' color='#53bdeb' />
        </span>
      </span>
    </span>
    <Show when={props.showAvatar}>
      <Avatar initialAvatarSrc={props.avatarSrc} />
    </Show>
  </div>
)
