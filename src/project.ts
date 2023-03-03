import {makeProject} from '@motion-canvas/core/lib';
import introAudio from "./intro.mp3" 
import example from './scenes/example?scene';

export default makeProject({
  scenes: [example],
  background: '#141414',
  audio: introAudio,
});
