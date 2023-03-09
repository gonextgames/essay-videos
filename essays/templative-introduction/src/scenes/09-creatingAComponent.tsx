import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Layout, Txt, Line, Rect, Node} from '@motion-canvas/2d/lib/components';
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

import {Img} from '@motion-canvas/2d/lib/components';
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
  yield* panes.fileStructureRef().edit(0, false)`v projects\n\tv potionShmotion\n\t\t> art\n\t\t> artdata\n\t\t> gamedata\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json`

  yield* waitUntil('showCreate');
  yield* panes.terminalContentsRef().edit(1/8, false)`$ ${insert(`templative create TYPE --name COMPONENTNAME`)}`;
  yield* waitUntil('highlightCreate');
  yield* panes.terminalContentsRef().selection(word(0,35-22,6),1/8)
  yield* waitUntil('highlightType');
  yield* panes.terminalContentsRef().selection(word(0,42-22 ,5),1/8)
  yield* waitUntil('highlightName');
  yield* panes.terminalContentsRef().selection(word(0,47-22,25),1/8)
  yield* waitUntil('resetHighlights');
  yield* panes.terminalContentsRef().selection(range(0,0,100,100),4/8)

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

  yield* waitUntil("showTypeOptions")

  yield panes.terminalContentsRef().edit(2, false)`$ ${edit(`templative create TYPE --name COMPONENTNAME`, createCommand)}`
  yield* waitUntil("clearTerminal")
  yield* panes.terminalContentsRef().edit(1, false)`$ ${remove(createCommand)}`
  yield* waitUntil("endScene")



});