import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Layout, Txt, Line, Rect, Node} from '@motion-canvas/2d/lib/components';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {all, delay,loop,waitFor,waitUntil} from '@motion-canvas/core/lib/flow';
import {createRef, Reference} from '@motion-canvas/core/lib/utils';
import {CodeBlock, edit, insert, lines, word, remove, range} from '@motion-canvas/2d/lib/components/CodeBlock';
import {Direction, Vector2} from '@motion-canvas/core/lib/types';
import {Img} from '@motion-canvas/2d/lib/components';
import gamecrafterImg from "../images/gamecrafter.png"
import { interpolation } from '@motion-canvas/2d/lib/decorators';
import nodes from "../nodes"

export default makeScene2D(function* (view) {
  const visualStudioRef = createRef<Rect>();
  yield view.add(
    <Rect ref={visualStudioRef}/>
  )
  var panes = yield* nodes.createFakeVisualStudioCode(visualStudioRef, 3, 8)
  yield* panes.fileStructureRef().edit(0, false)`v projects\n\tv potionShmotion\n\t\t> art\n\t\t> artdata\n\t\t> gamedata\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json`
  yield* panes.fileNameRef().text(`studio.json`,0)
  yield* panes.contentsRef().edit(0,false)`{\n\t"name": "potionMerchants",\n\t"displayName": "Potion Merchants"\n}`


  yield* waitUntil("replaceValues")
  yield* panes.terminalContentsRef().edit(1, false)`$ ${insert(`templative create deckpoker --name potionDeck`)} `;

  yield* waitUntil("highlightDeckPoker")
  yield* panes.terminalContentsRef().selection(word(0, 20,10),1/8)
  yield* waitUntil("highlightPotionName")
  yield* panes.terminalContentsRef().selection(word(0, 37 ,11),1/8)

  yield* waitUntil("showCreateOutput")
  yield* all(
    yield panes.terminalContentsRef().selection(word(0, 0 ,100),1/8),
    yield panes.fileNameRef().text(`component-compose.json`,1),
    yield panes.contentsRef().edit(1,false)`${edit(`{\n\t"name": "potionMerchants",\n\t"displayName": "Potion Merchants"\n}`,`[\n\t{\n\t\t"name": "potionDeck",\n\t\t"type": "PokerDeck",\n\t\t"quantity": 1,\n\t\t"piecesGamedataFilename": "potionDeck",\n\t\t"componentGamedataFilename": "potionDeck",\n\t\t"artdataFilename": "potionDeck-Front",\n\t\t"backArtdataFilename": "potionDeck-Back",\n\t\t"disabled": false\n\t}\n]`)}`,
    yield panes.fileStructureRef().edit(1, false)`v projects\n\tv potionShmotion\n\t\tv art${insert(`\n\t\t\tpotionDeckFront.svg\n\t\t\tpotionDeckBack.svg`)}\n\t\tv artdata${insert(`\n\t\t\tpotionDeck-Front.json\n\t\t\tpotionDeck-Back.json`)}\n\t\tv gamedata${insert(`\n\t\t\tv components\n\t\t\t\tpotionDeck.json\n\t\t\tv pieces\n\t\t\t\tpotionDeck.csv`)}\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json`
  )  

  yield* waitUntil("showCreatedArtFiles")
  yield* all(
    yield panes.fileStructureRef().selection(range(2,0,4,100), 1/8),
    // yield panes.contentsRef().selection(range(7,0,8,100), 1/8),
  )
  yield* waitUntil("showCreatedArtDataFiles")
  yield* all(
    yield panes.fileStructureRef().selection(range(5,0,7,100), 1/8),
    yield panes.contentsRef().selection(range(7,0,8,100), 1/8),
  )
  yield* waitUntil("showCreatedGameDataFiles")
  yield* all(
    yield panes.fileStructureRef().selection(range(8,0,12,100), 1/8),
    yield panes.contentsRef().selection(range(5,0,6,100), 1/8),
  )

  yield* waitUntil("hideCreatedHighlights")
  yield* all(
    yield panes.fileStructureRef().selection(range(0,0,100,100), 1/8),
    yield panes.contentsRef().selection(range(0,0,100,100), 1/8),
  )

  yield* waitUntil("hideFolderStructure")
  yield panes.fileStructureRef().edit(1, false)`v projects\n\tv potionShmotion\n\t\t${edit(`v`,`>`)} art${remove(`\n\t\t\tpotionDeckFront.svg\n\t\t\tpotionDeckBack.svg`)}\n\t\t${edit(`v`,`>`)} artdata${remove(`\n\t\t\tpotionDeck-Front.json\n\t\t\tpotionDeck-Back.json`)}\n\t\t${edit(`v`,`>`)} gamedata${remove(`\n\t\t\tv components\n\t\t\t\tpotionDeck.json\n\t\t\tv pieces\n\t\t\t\tpotionDeck.csv`)}\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json`

  yield* waitUntil("templativeProduce")
  yield* panes.terminalContentsRef().edit(1/8, false)`$ templative ${edit(`create deckpoker --name potionDeck`,`produce --component potionDeck`)}`

  yield* waitUntil("showTemplativeProduceOutput")
  var newStuff = `v output\n\t\t\tv potionShmotion_2.0.0_2023-03-03\n\t\t\t\tv potionDeck\n\t\t\t\t\tcomponent.json\n\t\t\t\t\tpotionDeck-back.jpg\n\t\t\t\t\tpotionDeck-front.jpg\n\t\t\t\tgame.json\n\t\t\t\trules.pdf\n\t\t\t\tstudio.json`
  yield* panes.fileStructureRef().edit(1, false)`v projects\n\tv potionShmotion\n\t\tv art\n\t\tv artdata\n\t\tv gamedata\n\t\t${insert(newStuff)}\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json` 
  yield* panes.fileStructureRef().selection(range(5,0,13,100),4/8)
  
  yield* waitUntil("resetStructure")
    
  yield* all(
    yield panes.fileStructureRef().selection(range(0,0,100,100),1/8),
    yield panes.terminalContentsRef().edit(1, false)`$ ${remove(`templative produce --component potionDeck`)}`,

    yield panes.fileStructureRef().edit(1, false)`v projects\n\tv potionShmotion\n\t\t> art\n\t\t> artdata\n\t\t> gamedata\n\t\t${edit(`v output\n\t\t\tv potionShmotion_2.0.0_2023-03-03\n\t\t\t\tv potionDeck\n\t\t\t\t\tcomponent.json\n\t\t\t\t\tpotionDeck-back.jpg\n\t\t\t\t\tpotionDeck-front.jpg\n\t\t\t\tgame.json\n\t\t\t\trules.pdf\n\t\t\t\tstudio.json`,`> output`)}\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json`,
  )
  
  

  yield* waitUntil("endScene")

});