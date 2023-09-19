import { Show } from 'solid-js'
import { Avatar } from '../avatars/Avatar'
import { DoubleCheckIcon } from '../icons/DoubleCheckIcon'

type Props = {
  message: string
  showAvatar: boolean
  time?: string
  avatarSrc?: string
}

export const GuestBubble = (props: Props) => (
  <div
    class="flex justify-end items-end animate-fade-in gap-2 guest-container"
    style={{ 'margin-left': '50px' }}
  >
    <span
      class="px-4 py-2 whitespace-pre-wrap max-w-full typebot-guest-bubble"
      data-testid="guest-bubble"
    >
      {props.message}
      <span class='text-xs text-right'>
        <span style={{ display: 'inline' }}>
          <DoubleCheckIcon font-size='6px' color='#0000ff'/>
        </span>
        {new Date().getHours().toPrecision(2) + ':' + new Date().getMinutes().toPrecision(2)}
      </span>
    </span>
    <Show when={props.showAvatar}>
      <Avatar initialAvatarSrc={props.avatarSrc} />
    </Show>
  </div>
)
