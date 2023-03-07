import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Layout, Text, Line, Rect, Node} from '@motion-canvas/2d/lib/components';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {all, delay,loop,waitFor,waitUntil} from '@motion-canvas/core/lib/flow';
import {createRef, Reference} from '@motion-canvas/core/lib/utils';
import {CodeBlock, edit, insert, lines, word, range} from '@motion-canvas/2d/lib/components/CodeBlock';
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
  yield* waitUntil("highlightStudio")
  yield* panes.fileStructureRef().selection(word(10,0,100), 1/8)
  yield* waitUntil("highlightGame")
  yield* panes.fileStructureRef().selection(word(8,0,100), 1/8)
  yield* waitUntil("resetHighlights")
  yield* panes.fileStructureRef().selection(range(0,0,100,100), 1/8)

  yield* waitUntil("updateGame")
  yield* all(
    yield panes.fileNameRef().text("game.json", 4/8),
    yield panes.contentsRef().edit(4/8, false)`${edit(`# Templative Introduction`, `{\n\t"name": "gameName",\n\t"displayName": "Game Name",\n\t"version": "0.0.0",\n\t"versionName": "Template"\n}`)}`,
  )

  yield* waitUntil("updateGameName")
  yield* panes.contentsRef().edit(4/8, false)`{\n\t"name": "${edit(`gameName`,`potionShmotion`)}",\n\t"displayName": "${edit(`Game Name`,`Potion Shmotion`)}",\n\t"version": "0.0.0",\n\t"versionName": "${edit(`Template`,`Template`)}"\n}`

  yield* waitUntil("updateStudio")
  yield* all(
    yield panes.fileNameRef().text("studio.json", 4/8),
    yield panes.contentsRef().edit(4/8, false)`${edit(`{\n\t"name": "potionShmotion",\n\t"displayName": "Potion Shmotion",\n\t"version": "0.0.0",\n\t"versionName": "Template"\n}`, `{\n\t"name": "templateStudio",\n\t"displayName": "Template Studio"\n}`)}`,
  )

  yield* waitUntil("updateStudioName")
  yield panes.contentsRef().edit(4/8, false)`{\n\t"name": "${edit(`templateStudio`,`potionMerchants`)}",\n\t"displayName": "${edit(`Template Studio`,`Potion Merchants`)}"\n}`

  yield* waitUntil("endScene")
});