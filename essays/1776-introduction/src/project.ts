import {makeProject} from '@motion-canvas/core/lib';

import warOfRing from "./scenes/00-fitWarOfRing?scene"

// import audioFile from "./audio/all.mp3"

export default makeProject({
  scenes: [
    warOfRing,
  ],
  background: '#141414',
  // audio: audioFile,
  // audioOffset: 0
});
