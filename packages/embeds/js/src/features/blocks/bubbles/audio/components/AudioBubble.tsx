import { TypingBubble } from '@/components'
import { isMobile } from '@/utils/isMobileSignal'
import type { AudioBubbleContent } from '@typebot.io/schemas'
import { createSignal, onCleanup, onMount } from 'solid-js'
// import  {WaveSurfer}  from 'wavesurfer-react';
// import { Waveform } from './Waveform';
import WaveSurfer from '@typebot.io/lib/wavesurfer'

type Props = {
  url: AudioBubbleContent['url'] 
  onTransitionEnd: (offsetTop?: number) => void
}

const showAnimationDuration = 400
const typingDuration = 100

let typingTimeout: NodeJS.Timeout

export const AudioBubble = (props: Props) => {
  let isPlayed = false
  let ref: HTMLDivElement | undefined
  let audioElement: HTMLAudioElement | undefined
  const [isTyping, setIsTyping] = createSignal(true)

  onMount(() => {
    // if (audioElement) {
    //   audioElement.style.display = 'none'
  
    //   wavesurfer = WaveSurfer.({
    //     container: "waveForm", 
    //     waveColor: 'rgba(0, 0, 0, 0.3)',
    //     progressColor: 'rgba(255, 0, 0, 0.4)',
    //     cursorWidth: 1,
    //     height: 100,
    //     normalize: true,
    //     url: props.url
    //   })
    // }
    const wavesurfer = WaveSurfer.create({
      container: ref,
      waveColor: '#ced0d1',
      progressColor: '#858a8d',
      url: props.url,
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      height: 25,
      cursorWidth: 15,
      cursorColor: '#30b0e8',

    })

    wavesurfer.once('interaction', () => {
      wavesurfer.play()
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

  // onMount(() => {

  //     // wavesurfer.on('ready', () => {
  //     //   if (!isPlayed) {
  //     //     typingTimeout = setTimeout(() => {
  //     //       if (isPlayed) return
  //     //       isPlayed = true
  //     //       setIsTyping(false)
  //     //       setTimeout(() => props.onTransitionEnd(ref?.offsetTop), showAnimationDuration)
  //     //     }, typingDuration)
  //     //   }
  //     // })
    
  //     //   wavesurfer.play()
  //   }
  // })

  onCleanup(() => {
    if (typingTimeout) clearTimeout(typingTimeout)
  })

  // onCleanup(() => {
  //   if (wavesurfer) {
  //     wavesurfer.destroy()
  //   }
  // })

  return (
    <div class="flex flex-col animate-fade-in" ref={ref}>
      <div class="flex w-full items-center">
        <div class={'flex relative z-10 items-start typebot-host-bubble'} style={{width: '100%'}}>
          <div
            class="flex items-center absolute px-4 py-2 bubble-typing z-10 "
            style={{
              width: isTyping() ? '64px' : '100%',
              height: isTyping() ? '32px' : '100%',
            }}
          >
            {isTyping() && <TypingBubble />}
          </div>
          {/* <Waveform url={props.url as string} /> */}
          {/* A tag de áudio não será renderizada */}
          <div ref={ref} class={
              'z-10 text-fade-in' +
              (isTyping() ? 'opacity-0' : 'opacity-100 m-2')
            }
            style={{
              height: isTyping() ? (isMobile() ? '32px' : '36px') : 'revert',
              width: '100%'
            }}/>
          {/* <audio
            ref={audioElement}
            src={props.url}
            autoplay
            class={
              'z-10 text-fade-in ' +
              (isTyping() ? 'opacity-0' : 'opacity-100 m-2')
            }
            style={{
              height: isTyping() ? (isMobile() ? '32px' : '36px') : 'revert'
            }}
            controls
          /> */}
        </div>
      </div>
    </div>
  )
}
