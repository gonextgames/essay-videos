import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Layout, Text, Line, Rect, Node} from '@motion-canvas/2d/lib/components';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {all, delay,loop,waitFor,waitUntil} from '@motion-canvas/core/lib/flow';
import {createRef, Reference} from '@motion-canvas/core/lib/utils';
import {CodeBlock, edit, insert, lines, word, remove} from '@motion-canvas/2d/lib/components/CodeBlock';
import {Direction, Vector2} from '@motion-canvas/core/lib/types';
import {Image} from '@motion-canvas/2d/lib/components';
import gamecrafterImage from "../images/gamecrafter.png"
import { interpolation } from '@motion-canvas/2d/lib/decorators';
import nodes from "../nodes"

export default makeScene2D(function* (view) {
  const visualStudioRef = createRef<Rect>();
  yield view.add(
    <Rect ref={visualStudioRef}/>
  )
  var panes = yield* nodes.createFakeVisualStudioCode(visualStudioRef, 3, 8)
  yield* panes.fileStructureRef().edit(0, false)`v projects\n\tv potionShmotion\n\t\t> art\n\t\t> artdata\n\t\t> gamedata\n\t\t> output\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json`
  yield* waitUntil("templativeProduce")
  yield* panes.terminalContentsRef().edit(1/8, false)`User$ ${insert(`templative produce --component potionDeck`)}`

  yield* waitUntil("showOutput")
  var newStuff = `v output\n\t\t\tv potionShmotion_2.0.0_2023-03-03\n\t\t\t\t> potionDeck\n\t\t\t\tgame.json\n\t\t\t\trules.pdf\n\t\t\t\tstudio.json`
  yield* panes.fileStructureRef().edit(1, false)`v projects\n\tv potionShmotion\n\t\t> art\n\t\t> artdata\n\t\t> gamedata\n\t\t${edit(`> output`,newStuff)}\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json` 

  yield* waitUntil("showImages")
  var images = `v potionDeck\n\t\t\t\t\tcomponent.json\n\t\t\t\t\tpotionDeck-back.jpg\n\t\t\t\t\tpotionDeck-front.jpg`
  yield* panes.fileStructureRef().edit(1, false)`v projects\n\tv potionShmotion\n\t\t> art\n\t\t> artdata\n\t\t> gamedata\n\t\tv output\n\t\t\tv potionShmotion_2.0.0_2023-03-03\n\t\t\t\t${edit(`> potionDeck`,images)}\n\t\t\t\tgame.json\n\t\t\t\trules.pdf\n\t\t\t\tstudio.json\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json` 
 
  yield* waitUntil("resetStructure")
  

  var createCommand = `templative create

  Create components from templates

Commands:
  accordionpoker        Create a new poker sized accordion
  chitsquarelarge       Create a new medium ring
  deckpoker             Create a new poker sized deck
  ringlarge             Create a new large ring
  ringmedium            Create a new medium ring
  stoutboxsmall         Create a new small cardboard box
  tuckboxpoker108cards  Create a new poker sized tuckbox fitting 108 cards`
  yield* all(
    yield panes.fileStructureRef().edit(1, false)`v projects\n\tv potionShmotion\n\t\t> art\n\t\t> artdata\n\t\t> gamedata\n\t\t${edit(`v output\n\t\t\tv potionShmotion_2.0.0_2023-03-03\n\t\t\t\tv potionDeck\n\t\t\t\t\tcomponent.json\n\t\t\t\t\tpotionDeck-back.jpg\n\t\t\t\t\tpotionDeck-front.jpg\n\t\t\t\tgame.json\n\t\t\t\trules.pdf\n\t\t\t\tstudio.json`,`> output`)}\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json`,
    yield panes.terminalContentsRef().edit(2, false)`User$ ${edit(`templative produce --component potionDeck`, createCommand)}`
  )
  
  yield* waitUntil("clearTerminal")
  yield* panes.terminalContentsRef().edit(1, false)`User$ ${remove(createCommand)}`

  yield* waitUntil("endScene")

});