import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Layout, Txt, Line, Rect, Node} from '@motion-canvas/2d/lib/components';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {all, delay,loop,waitFor,waitUntil} from '@motion-canvas/core/lib/flow';
import {createRef, Reference} from '@motion-canvas/core/lib/utils';
import {CodeBlock, edit, insert, lines,remove, word} from '@motion-canvas/2d/lib/components/CodeBlock';
import {Direction, Vector2} from '@motion-canvas/core/lib/types';
import {Img} from '@motion-canvas/2d/lib/components';
import gamecrafterImg from "../images/gameGrafterUpload.png"
import tabletopImg from "../images/playgroundExample.png"
import { interpolation } from '@motion-canvas/2d/lib/decorators';
import nodes from "../../../../common/nodes"

export default makeScene2D(function* (view) {
  const visualStudioRef = createRef<Rect>();
  yield view.add(
    <Rect ref={visualStudioRef}/>
  )
  var panes = yield* nodes.createFakeVisualStudioCode(visualStudioRef, 3, 8)
  yield* panes.terminalContentsRef().edit(0,false)`$ `
  yield* panes.fileStructureRef().edit(0, false)`v projects\n\tv potionShmotion\n\t\t> art\n\t\t> artdata\n\t\t> gamedata\n\t\t> output\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json`
  yield* panes.fileNameRef().text(`component-compose.json`,0)
  yield* panes.contentsRef().edit(0,false)`${edit(`{\n\t"name": "potionMerchants",\n\t"displayName": "Potion Merchants"\n}`,`[\n\t{\n\t\t"name": "potionDeck",\n\t\t"type": "PokerDeck",\n\t\t"quantity": 1,\n\t\t"piecesGamedataFilename": "potionDeck",\n\t\t"componentGamedataFilename": "potionDeck",\n\t\t"artdataFilename": "potionDeck-Front",\n\t\t"backArtdataFilename": "potionDeck-Back",\n\t\t"disabled": false\n\t}\n]`)}`
  yield* waitUntil("templativePlayground")
  yield* panes.terminalContentsRef().edit(4/8, false)`$ ${insert(`templative playground`)}`;

  yield* waitUntil("showPlayground")
  const playgroundImageRef = createRef<Rect>();
  var size = 2
  yield view.add(<Img src={tabletopImg} ref={playgroundImageRef} width={800*size} height={400*size} x={1920}/>)
  yield* playgroundImageRef().position.x(0,1)
  yield* waitUntil("hidePlayground")
  yield* playgroundImageRef().position.x(-1920,4/8)

  
  yield* waitUntil("templativeUpload")
  yield* panes.terminalContentsRef().edit(4/8, false)`$ templative ${edit(`playground`,`upload`)}`;

  

  yield* waitUntil("showGameCrafter")
  const gameCrafterImageRef = createRef<Rect>();
  yield view.add(<Img src={gamecrafterImg} ref={gameCrafterImageRef } ratio={0.8} x={1920}/>)
  yield* gameCrafterImageRef().position.x(0,1)
  yield* waitUntil("hideGameCrafter")
  yield* gameCrafterImageRef().position.x(-1920,1)


  yield* panes.terminalContentsRef().edit(1/8,false)`$ `

  yield* waitUntil("endScene")

});