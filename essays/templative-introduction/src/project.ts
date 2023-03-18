import {makeProject} from '@motion-canvas/core';

import yourCoworker from "./scenes/01-yourCoworker?scene"
import processBreakdown from "./scenes/02-processBreakdown?scene"
import weDesignedTemplative from "./scenes/03-weDesignedTemplative?scene"
import keepWatching from "./scenes/04-keepWatching?scene"
import basicCommands from "./scenes/05-basicCommands?scene"
import afterInit from "./scenes/06-afterInit?scene"
import output from "./scenes/07-output?scene"
import updatingGameStudio from "./scenes/08-updatingGameStudio?scene"
import creatingAComponent from "./scenes/09-creatingAComponent?scene"
import createPotionDeck from "./scenes/10-createPotionDeck?scene"
import componentsAreAssembled from "./scenes/11-componentsAreAssembled?scene"
import artdataBreadAndButter from "./scenes/12-artdataBreadAndButter?scene"
import commandAndGit from "./scenes/15-commandAndGit?scene"

import audioFile from "./audio/fixedAudio.mp3"

export default makeProject({
  scenes: [
    yourCoworker,
    processBreakdown,
    weDesignedTemplative,
    basicCommands,
    updatingGameStudio,
    creatingAComponent,
    createPotionDeck,
    output,
    componentsAreAssembled,
    artdataBreadAndButter,
    commandAndGit,
  ],
  audio: audioFile,
});
