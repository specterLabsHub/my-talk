

import { createSignal, onMount } from "solid-js";
import WaveSurfer from "wavesurfer.js";

const formWaveSurferOptions = (ref: any) => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "red",
  cursorColor: "red",
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 150,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true
});

interface WaveFormProps {
    url: string
}

export const Waveform = (props: WaveFormProps) =>  {
  let waveformRef: any
  let wavesurfer: any
  const [playing, setPlay] = createSignal(false);
  const [volume, setVolume] = createSignal(0.5);

  // create new WaveSurfer instance
  // On component mount and when url changes
  onMount(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef);
    wavesurfer = WaveSurfer.create(options);

    wavesurfer.load(props.url);

    wavesurfer.on("ready", function() {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.play();
      // setPlay(true);

      // make sure object stillavailable when file loaded
      if (wavesurfer) {
        wavesurfer.setVolume(volume);
        setVolume(volume);
      }
    });

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    // return () => wavesurfer.destroy();
  });

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.playPause();
  };

  const onVolumeChange = (e: any) => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.setVolume(newVolume || 1);
    }
  };

  return (
    <div>
      <div id="waveform" ref={waveformRef} />
      <div class="controls">
        <button onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</button>
        <input
          type="range"
          id="volume"
          name="volume"
          // waveSurfer recognize value of `0` same as `1`
          //  so we need to set some zero-ish value for silence
          min="0.01"
          max="1"
          step=".025"
          onChange={onVolumeChange}
          value={volume()}
        />
      </div>
    </div>
  );
}
