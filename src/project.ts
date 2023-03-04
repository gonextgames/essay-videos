import {makeProject} from '@motion-canvas/core/lib';
import creatingAComponent from './scenes/creatingAComponent?scene';
import creatingComponent from "./audio/creatingComponent.mp3"

export default makeProject({
  scenes: [creatingAComponent],
  background: '#141414',
  audio: creatingComponent,
});
