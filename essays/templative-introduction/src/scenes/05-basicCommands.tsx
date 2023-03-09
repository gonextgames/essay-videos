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
import {CodeBlock, edit, insert, lines, word, remove} from '@motion-canvas/2d/lib/components/CodeBlock';
import {Direction, Vector2} from '@motion-canvas/core/lib/types';

import {Img} from '@motion-canvas/2d/lib/components';
import gamecrafterImg from "../images/gamecrafter.png"
import tabletopPlaygroundImg from "../images/tabletopPlayground.png"
import computerImg from "../images/pc.png"
import personImg from "../images/person.png"
import artImg from "../images/mona-lisa.png"
import gitImg from "../images/gitLogo.png"
import { interpolation } from '@motion-canvas/2d/lib/decorators';
import nodes from "../nodes"

export default makeScene2D(function* (view) {
  const visualStudioRef = createRef<Rect>();
  yield view.add(
    <Rect ref={visualStudioRef}/>
  )
  var panes = yield* nodes.createFakeVisualStudioCode(visualStudioRef, 1, 9)

  yield* slideTransition(Direction.Bottom, 2 /8);
  yield* waitUntil("showTemplative")
  yield* panes.terminalContentsRef().edit(1/8, false)`$ ${insert(`templative`)}`
  yield* waitUntil("showOutput")

  const insertTxt = `

Commands:
    init        Create the default game project here
    create      Create components from templates
    produce     Produce the game
    playground  Create a Tabletop Playground package
    upload      Upload to the GameCrafter
    components  Get a list of component quantities`

    yield* panes.terminalContentsRef().edit(1.5, false)`$ templative${insert(insertTxt)}`
    
    yield* waitUntil("doneShowingCommands")
    yield* panes.terminalContentsRef().edit(1.25, false)`$ ${remove(`templative`)}${remove(insertTxt)}`

    yield* waitUntil("makeDirectory")
    yield* all(
      yield panes.terminalContentsRef().edit(1/8, false)`$ ${insert(`mkdir potionShmotion`)}`,
      yield panes.fileStructureRef().edit(1, false)`${edit('>', `v`)} projects${insert(`\n\tv potionShmotion\n`)}`
    )
  
    yield* waitUntil("showTemplativeInit")
    yield* panes.terminalContentsRef().edit(4/8, false)`$ ${edit(`mkdir potionShmotion`,`templative init`)}`
    yield* panes.fileStructureRef().edit(1, false)`v projects\n\tv potionShmotion${insert(`\n\t\t> art\n\t\t> artdata\n\t\t> gamedata\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json`)}`,
     
    yield* waitUntil("clearTemplativeInit")
    yield* panes.terminalContentsRef().edit(1, false)`$ ${remove(`templative init`)}`

    yield* waitUntil("showGit")
    yield* panes.terminalContentsRef().edit(1/8, false)`$ ${insert(`git`)}` 
    yield* waitUntil("showGitInit")
    yield* panes.terminalContentsRef().edit(1/8, false)`$ git ${insert(`init`)}` 
    yield* waitUntil("clearGit")
    yield* panes.terminalContentsRef().edit(1/8, false)`$ ${remove(`git init`)}` 


    yield* waitUntil("endScene")



});