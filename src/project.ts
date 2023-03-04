import {makeProject} from '@motion-canvas/core/lib';

import creatingAComponentScene from './scenes/creatingAComponent?scene';
import creatingComponentAudio from "./audio/creatingComponent.mp3"

import afterInitScene from './scenes/afterInit?scene';
import afterInitAudio from "./audio/afterInit.mp3"

export default makeProject({
  scenes: [afterInitScene],
  background: '#141414',
  audio: afterInitAudio,
});
