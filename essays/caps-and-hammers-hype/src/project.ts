import {makeProject} from '@motion-canvas/core';

import introduction from './scenes/introduction?scene'; 
import mechanics from './scenes/mechanics?scene'; 
import outro from './scenes/outro?scene'; 
import capsAndHammersVoiceover from "./capsAndHammersVoiceover_01.mp3"
export default makeProject({
  scenes: [introduction,mechanics, outro],
  audio: capsAndHammersVoiceover
});
