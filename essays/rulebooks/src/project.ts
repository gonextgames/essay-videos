import {makeProject} from '@motion-canvas/core/lib';

import scene from "./scenes/01-scene?scene"

// import audioFile from "./audio/all.mp3"

export default makeProject({
  scenes: [
    scene,
  ],
  background: '#141414',
  // audio: audioFile,
  // audioOffset: 0
});
