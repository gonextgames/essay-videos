import {makeProject} from '@motion-canvas/core';

import introduction from './scenes/introduction?scene'; 
import capsAndHammersVoiceover from "./capsAndHammersVoiceover.mp3"
export default makeProject({
  scenes: [introduction],
  audio: capsAndHammersVoiceover
});
