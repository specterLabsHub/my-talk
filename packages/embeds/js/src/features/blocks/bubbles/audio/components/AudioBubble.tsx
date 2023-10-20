import { TypingBubble } from '@/components'
import { isMobile } from '@/utils/isMobileSignal'
import type { AudioBubbleContent } from '@typebot.io/schemas'
import { createSignal, onCleanup, onMount } from 'solid-js'
import WaveSurfer from '@typebot.io/lib/wavesurfer'

type Props = {
  url: AudioBubbleContent['url']
  onTransitionEnd: (offsetTop?: number) => void
  children?: any
}

const showAnimationDuration = 400
const typingDuration = 100

let typingTimeout: NodeJS.Timeout

export const AudioBubble = (props: Props) => {
  let isPlayed = false
  let ref: HTMLDivElement | undefined
  const [isTyping, setIsTyping] = createSignal(true)
  const [isPlaying, setIsPlaying] = createSignal(false)
  const [isTypingEnd, setIsTypingEnd] = createSignal(true)
  const [audioDuration, setAudioDuration] = createSignal<number | null>(null) // Estado para armazenar a duração do áudio
  let wavesurfer: WaveSurfer | null = null

  onMount(() => {
    wavesurfer = WaveSurfer.create({
      container: ref as any,
      waveColor: '#ced0d1',
      progressColor: '#858a8d',
      url: props.url,
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      height: 25,
      cursorWidth: 10,
      cursorColor: '#30b0e8',
    })

    wavesurfer.once('interaction', () => {
      wavesurfer?.play()
      setIsPlaying(false)
    })

    // Obtém a duração do áudio assim que estiver pronto
    wavesurfer.on('ready', () => {
      const duration = wavesurfer?.getDuration() || null
      setAudioDuration(duration)
    })

    typingTimeout = setTimeout(() => {
      if (isPlayed) return
      isPlayed = true
      setIsTyping(false)
      setTimeout(
        () => props.onTransitionEnd(ref?.offsetTop),
        showAnimationDuration
      )
    }, typingDuration)
  })

  onCleanup(() => {
    if (typingTimeout) clearTimeout(typingTimeout)
  })

  function togglePlay() {
    if (isPlaying()) {
      wavesurfer?.pause()
    } else {
      wavesurfer?.play()
    }
    setIsPlaying(!isPlaying())
  }

  function formatDuration(duration: number | null): string {
    if (duration === null) {
      return '0:00';
    }

    if (duration < 60) {
      // Menos de 1 minuto
      const seconds = Math.floor(duration);
      const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `0:${formattedSeconds}`;
    } else if (duration < 600) {
      // Entre 1 minuto e 10 minutos
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);
      const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${minutes}:${formattedSeconds}`;
    } else if (duration < 3600) {
      // Entre 10 minutos e 1 hora
      const minutes = Math.floor(duration / 60);
      const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(duration % 60);
      const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formattedMinutes}:${formattedSeconds}`;
    } else {
      // Mais de 1 hora
      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor((duration % 3600) / 60);
      const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(duration % 60);
      const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${hours}:${formattedMinutes}:${formattedSeconds}`;
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
  
  onMount(() => {
    if(isTyping()){
      setTimeout(() => {
        setIsTypingEnd(false);
      }, 600)
    }
  });

  return (
    <div class="flex flex-col animate-fade-in relative sm:w-[21rem] min-[320px]:w-[20rem]" ref={ref} style={{position: 'relative'}}>
      <div class="flex items-center" style={{ width: '100%' }}>
        <div class={'flex relative z-10 items-center typebot-host-bubble'} style={{ width: '100%', height: "60px" }}>
          <div class="flex items-center absolute px-4 py-2 bubble-typing z-10 "
            style={{
              width: isTyping() ? '64px' : '100%',
              height: isTyping() ? '32px' : '100%'
            }}
          >
            {isTyping() && <TypingBubble />}
          </div>
          <div style={{ "padding-right": '8px', "padding-top": '6px', "padding-left": '16px' }} class="z-10">
            <button style={{ cursor: 'pointer' }} class="z-10" on: click={togglePlay}>
              {isPlaying() ? (
                <svg class="z-10" width="20px" height="20px" viewBox="0 0 24 24" fill="#a9a9a9" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V18C10 19.8856 10 20.8284 9.41421 21.4142C8.82843 22 7.88562 22 6 22C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V6Z" />
                  <path d="M14 6C14 4.11438 14 3.17157 14.5858 2.58579C15.1716 2 16.1144 2 18 2C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V6Z" />
                </svg>
              ) : (
                <svg class="z-10" width="20px" height="20px" viewBox="0 0 24 24" fill="#a9a9a9" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"></path>
                </svg>
              )}
            </button>
          </div>
          <div ref={ref} class={
            'z-10 text-fade-in' +
            (isTyping() ? 'opacity-0' : 'opacity-100 m-2')
          }
            style={{
              height: isTyping() ? (isMobile() ? '32px' : '36px') : 'revert',
              width: '100%'
            }} />
          {audioDuration() !== null && (
            <div style={{ "font-size": "11px", "color": "#8696a0", "position": "absolute", "bottom": "0px", "left": "52px" }} class="z-10" >{formatDuration(audioDuration())}</div>
          )}
          <div class="z-10" style={{ "padding-right": "6px" }}>
            {props.children}
          </div>
        </div>
      </div>
      {!isTypingEnd() && (
        <div style={{ "font-size": "11px", "color": "#667781", "position": "absolute", "right": '57px', "bottom": "0px" }} class="z-10">
           {formatCurrentTime()}
        </div>
        )}
    </div>
  )
}
