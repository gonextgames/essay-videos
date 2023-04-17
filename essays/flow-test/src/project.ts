import {makeProject} from '@motion-canvas/core';

import introduction from './scenes/introduction?scene';
import loopingIntroduction from './scenes/loopingIntroduction?scene';
import termExplanation from './scenes/termExplanation?scene';

export default makeProject({
  scenes: [introduction, loopingIntroduction, termExplanation],
});
