import {makeProject} from '@motion-canvas/core';

import introduction from './scenes/introduction?scene';
import loopingIntroduction from './scenes/loopingIntroduction?scene';
import termExplanation from './scenes/termExplanation?scene';
import metrics from './scenes/metrics?scene';
import systemTypes from './scenes/systemTypes?scene';
import documentation from './scenes/documentation?scene';
import thanks from './scenes/thanks?scene';

export default makeProject({
  scenes: [introduction, loopingIntroduction, termExplanation,systemTypes, metrics, documentation, thanks],
});
