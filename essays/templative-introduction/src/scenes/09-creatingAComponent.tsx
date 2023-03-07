import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Layout, Text, Line, Rect, Node} from '@motion-canvas/2d/lib/components';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {
  all,
  delay,
  loop,
  waitFor,
  waitUntil,
} from '@motion-canvas/core/lib/flow';
import {createRef, Reference} from '@motion-canvas/core/lib/utils';
import {CodeBlock, edit, insert, lines, word, range, remove} from '@motion-canvas/2d/lib/components/CodeBlock';
import {Direction, Vector2} from '@motion-canvas/core/lib/types';

import {Image} from '@motion-canvas/2d/lib/components';
import admiral from "../images/capsAction-admiral.jpg"
import actionBack from "../images/capsAction-back.jpg"
import { interpolation } from '@motion-canvas/2d/lib/decorators';
import nodes from "../nodes"


export default makeScene2D(function* (view) {
  const visualStudioRef = createRef<Rect>();
  yield view.add(
    <Rect ref={visualStudioRef}/>
  )
  var panes = yield* nodes.createFakeVisualStudioCode(visualStudioRef, 3, 8)
  yield* panes.fileNameRef().text(`studio.json`,0)
  yield* panes.contentsRef().edit(0,false)`{\n\t"name": "potionMerchants",\n\t"displayName": "Potion Merchants"\n}`
  yield* panes.fileStructureRef().edit(0, false)`v projects\n\tv potionShmotion\n\t\t> art\n\t\t> artdata\n\t\t> gamedata\n\t\t> output\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json`

  yield* waitUntil('showCreate');
  yield* panes.terminalContentsRef().edit(1/8, false)`User$ ${insert(`templative create TYPE --name COMPONENTNAME`)}`;
  yield* waitUntil('highlightCreate');
  yield* panes.terminalContentsRef().selection(word(0,39-22,6),1/8)
  yield* waitUntil('highlightType');
  yield* panes.terminalContentsRef().selection(word(0,45-22 ,5),1/8)
  yield* waitUntil('highlightName');
  yield* panes.terminalContentsRef().selection(word(0,50-22,25),1/8)
  yield* waitUntil('resetHighlights');
  yield* panes.terminalContentsRef().selection(range(0,0,100,100),4/8)
  yield* waitUntil("replaceValues")
  yield* panes.terminalContentsRef().edit(1, false)`User$ templative create ${edit(`TYPE`, `deckpoker`)} --name ${edit(`COMPONENTNAME`, `potionDeck`)}`;
  
  yield* waitUntil("openFolders")
  yield* panes.fileStructureRef().edit(2/8, false)`v projects\n\tv potionShmotion\n\t\t${edit(`>`,`v`)} art\n\t\t${edit(`>`,`v`)} artdata\n\t\t${edit(`>`,`v`)} gamedata\n\t\t> output\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json`

  yield* waitUntil("showCreatedComponent")
  yield* all(
    yield panes.fileNameRef().text(`component-compose.json`,1),
    yield panes.contentsRef().edit(1,false)`${edit(`{\n\t"name": "potionMerchants",\n\t"displayName": "Potion Merchants"\n}`,`[\n\t{\n\t\t"name": "potionDeck",\n\t\t"type": "PokerDeck",\n\t\t"quantity": 1,\n\t\t"piecesGamedataFilename": "potionDeck",\n\t\t"componentGamedataFilename": "potionDeck",\n\t\t"artdataFilename": "potionDeck-Front",\n\t\t"backArtdataFilename": "potionDeck-Back",\n\t\t"disabled": false\n\t}\n]`)}`,
    yield panes.fileStructureRef().edit(1, false)`v projects\n\tv potionShmotion\n\t\tv art${insert(`\n\t\t\tpotionDeckFront.svg\n\t\t\tpotionDeckBack.svg`)}\n\t\tv artdata${insert(`\n\t\t\tpotionDeck.json`)}\n\t\tv gamedata${insert(`\n\t\t\tv components\n\t\t\t\tpotionDeck.json\n\t\t\tv pieces\n\t\t\t\tpotionDeck.csv`)}\n\t\t> output\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json`
  )
   

  yield* waitUntil("collapse")
  yield* all(
    yield panes.terminalContentsRef().edit(7/8, false)`User$ ${remove(`templative create deckpoker --name potionDeck`)}`,
    yield panes.fileStructureRef().edit(7/8, false)`v projects\n\tv potionShmotion\n\t\t${edit(`v`,`>`)} art${remove(`\n\t\t\tpotionDeckFront.svg\n\t\t\tpotionDeckBack.svg`)}\n\t\t${edit(`v`,`>`)} artdata${remove(`\n\t\t\tpotionDeck.json`)}\n\t\t${edit(`v`,`>`)} gamedata${remove(`\n\t\t\tv components\n\t\t\t\tpotionDeck.json\n\t\t\tv pieces\n\t\t\t\tpotionDeck.csv`)}\n\t\t> output\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json` 
  )
  yield* waitUntil("endScene")



});