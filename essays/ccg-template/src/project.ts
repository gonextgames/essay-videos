import {makeProject} from '@motion-canvas/core';

import example from './scenes/artRecipeExplanation?scene';
import contentFiles from './scenes/contentFiles?scene';
import Sequence from "./ccg_voiceover.wav"

export default makeProject({
  name: "gettingUpToSpeed",
  scenes: [ contentFiles],
  audio: Sequence,
});
