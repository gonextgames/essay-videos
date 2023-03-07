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
import {CodeBlock, edit, insert, lines, word, remove} from '@motion-canvas/2d/lib/components/CodeBlock';
import {Direction, Vector2} from '@motion-canvas/core/lib/types';

import {Image} from '@motion-canvas/2d/lib/components';
import gamecrafterImage from "../images/gamecrafter.png"
import tabletopPlaygroundImage from "../images/tabletopPlayground.png"
import computerImage from "../images/pc.png"
import personImage from "../images/person.png"
import artImage from "../images/mona-lisa.png"
import gitImage from "../images/gitLogo.png"
import { interpolation } from '@motion-canvas/2d/lib/decorators';
import nodes from "../nodes"

export default makeScene2D(function* (view) {
  const visualStudioRef = createRef<Rect>();
  yield view.add(
    <Rect ref={visualStudioRef}/>
  )
  var panes = yield* nodes.createFakeVisualStudioCode(visualStudioRef, 3, 8)

  yield* slideTransition(Direction.Bottom, 2 /8);
  yield* waitUntil("showTemplative")
  yield* panes.terminalContentsRef().edit(1/8, false)`User$ ${insert(`templative`)}`
  yield* waitUntil("showOutput")

  const insertText = `

Templative CLI

Commands:
    init        Create the default game project here
    create      Create components from templates
    produce     Produce the game in the current directory
    playground  Create a Tabletop Playground package
    upload      Upload to the GameCrafter
    components  Get a list of component quantities in the current directory`

    yield* panes.terminalContentsRef().edit(1.5, false)`User$ templative${insert(insertText)}`
    
    yield* waitUntil("doneShowingCommands")
    yield* panes.terminalContentsRef().edit(1.25, false)`User$ ${remove(`templative`)}${remove(insertText)}`

    yield* waitUntil("makeDirectory")
    yield* panes.terminalContentsRef().edit(1, false)`User$ ${insert(`mkdir potionShmotion`)}`
    yield* panes.fileStructureRef().edit(1, false)`${edit('>', `v`)} projects${insert(`\n  > potionShmotion\n`)}`
    
    yield* waitUntil("clearMakeDirectory")
    yield* panes.terminalContentsRef().edit(2/8, false)`User$ ${remove(`mkdir potionShmotion`)}`

    yield* waitUntil("showTemplativeInit")
    yield* panes.terminalContentsRef().edit(1/8, false)`User$ ${insert(`templative init`)}`
    yield* panes.fileStructureRef().edit(1, false)`v projects\n\t${edit(`>`,`v`)} potionShmotion${insert(`\n\t\t> art\n\t\t> artdata\n\t\t> gamedata\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json`)}`,
     
    yield* waitUntil("clearTemplativeInit")
    yield* panes.terminalContentsRef().edit(2/8, false)`User$ ${remove(`templative init`)}`

    yield* waitUntil("showGit")
    yield* panes.terminalContentsRef().edit(1/8, false)`User$ ${insert(`git`)}` 
    yield* waitUntil("showGitInit")
    yield* panes.terminalContentsRef().edit(1/8, false)`User$ git ${insert(`init`)}` 
    yield* waitUntil("clearGit")
    yield* panes.terminalContentsRef().edit(1/8, false)`User$ ${remove(`git init`)}` 


    yield* waitUntil("endScene")



});