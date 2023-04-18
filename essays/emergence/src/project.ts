import {makeProject} from '@motion-canvas/core';

import introduction from './scenes/introduction?scene';
import loopingIntroduction from './scenes/loopingIntroduction?scene';
import termExplanation from './scenes/termExplanation?scene';
import metrics from './scenes/metrics?scene';
import systemTypes from './scenes/systemTypes?scene';
import valueChains from './scenes/valueChains?scene';
import documentation from './scenes/documentation?scene';
import thanks from './scenes/thanks?scene';
import emergencePresentationFull from './audio/emergencePresentationFull.wav';
export default makeProject({
  scenes: [introduction, loopingIntroduction,systemTypes, termExplanation, valueChains, metrics,  documentation, thanks],
  audio: emergencePresentationFull
});
