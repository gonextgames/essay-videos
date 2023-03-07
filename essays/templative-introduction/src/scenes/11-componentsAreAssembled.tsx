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
  yield* waitUntil("gameData")
  yield* panes.fileStructureRef().selection(lines(4),4/8)
  yield* waitUntil("artdata")
  yield* panes.fileStructureRef().selection(lines(3),4/8)
  yield* waitUntil("art")
  yield* panes.fileStructureRef().selection(lines(2),4/8)
  yield* panes.fileStructureRef().selection(range(0,0,100,100),4/8)

  yield* waitUntil("showArtFiles")
  yield* panes.fileStructureRef().edit(1, false)`v projects\n\tv potionShmotion\n\t\t${edit(`> art`, `v art\n\t\t\tpotionDeck-Front.svg\n\t\t\tpotionDeck-Back .svg`)}\n\t\t> artdata\n\t\t> gamedata\n\t\t> output\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json`
  yield* waitUntil("hideArtFiles")
  yield* panes.fileStructureRef().edit(1, false)`v projects\n\tv potionShmotion\n\t\t${edit(`v art\n\t\t\tpotionDeck-Front.svg\n\t\t\tpotionDeck-Back .svg`, `> art`)}\n\t\t> artdata\n\t\t> gamedata\n\t\t> output\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json`

  yield* waitUntil("showGameData")
  yield* panes.fileStructureRef().edit(1, false)`v projects\n\tv potionShmotion\n\t\t> art\n\t\t> artdata\n\t\t${edit(`> gamedata`, `v gameData\n\t\t\tv components\n\t\t\t\tpotionDeck.json\n\t\t\tv pieces\n\t\t\t\tpotionDeck.csv`)}\n\t\t> output\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json`

  yield* waitUntil("showPieceFile")
  yield* all(
    yield panes.fileNameRef().text("potionDeck.csv", 4/8),
    yield panes.contentsRef().edit(4/8, false)`${edit(`# Templative Introduction`, `name,displayName,quantity\n`)}`,
  )
  yield* waitUntil("potionName")
  yield* panes.contentsRef().edit(4/8, false)`name,displayName,quantity\n${insert(`poisonDrip,PoisonDrip,1`)}`,
  yield* waitUntil("power")
  yield* panes.contentsRef().edit(4/8, false)`name,displayName,quantity${insert(`,power`)}\npoisonDrip,PoisonDrip,1${insert(`,6`)}`,
  yield* waitUntil("cost")
  yield* panes.contentsRef().edit(4/8, false)`name,displayName,quantity,power${insert(`,cost`)}\npoisonDrip,PoisonDrip,1,6${insert(`,3`)}`,
  yield* waitUntil("graphic")
  yield* panes.contentsRef().edit(4/8, false)`name,displayName,quantity,power,cost${insert(`,graphic`)}\npoisonDrip,PoisonDrip,1,6,3${insert(`,droplet`)}`,

  yield* waitUntil("endScene")

});