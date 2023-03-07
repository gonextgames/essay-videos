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
import {CodeBlock, edit, insert,remove, lines,range, word, CodeModification} from '@motion-canvas/2d/lib/components/CodeBlock';
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
  yield* panes.fileStructureRef().edit(1/8, false)`v projects\n\tv potionShmotion\n\t\t> art\n\t\t> artdata\n\t\t> gamedata\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json`
  
  yield* waitUntil('showTemplative')
  yield* panes.terminalContentsRef().edit(2/8, false)`User$ ${insert(`templative`)}`

  yield* waitUntil('showProduce');
  yield* panes.terminalContentsRef().edit(2/8, false)`User$ templative${insert(` produce`)}`;
  yield* waitUntil('showOutput')
  yield* panes.fileStructureRef().edit(3/8, false)
`v projects\n\tv potionShmotion\n\t\t> art\n\t\t> artdata\n\t\t> gamedata${insert(`\n\t\t> output`)}\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json`;
  yield* waitUntil("folderExpand")
  yield* panes.fileStructureRef().edit(4/8, false)`v projects\n\tv potionShmotion\n\t\t> art\n\t\t> artdata\n\t\t> gamedata\n\t\t${edit(`>`, `v`)} output${insert(`\n\t\t\t> capsAndHammers_2.0.0_2023-03-03`)}\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json`;
  yield* waitUntil("highlightOutput")
  yield* panes.fileStructureRef().selection(word(6 , 0, 100), 2/8);

  yield* waitUntil("resetScene")
  yield* all(
    yield panes.fileStructureRef().edit(1, false)`v projects\n\tv potionShmotion\n\t\t> art\n\t\t> artdata\n\t\t> gamedata\n\t\t${edit(`v`, `>`)} output${remove(`\n\t\t\t> capsAndHammers_2.0.0_2023-03-03`)}\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json`,
    yield panes.fileStructureRef().selection(range(0,0,100,100), 1),
    yield panes.terminalContentsRef().edit(2/8, false)`User$ ${remove(`templative produce`)}`
  )

  yield* waitUntil("endScene")



});