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
  const leftRectRef = createRef<Rect>();
  const codeRef = createRef<CodeBlock>();
  
  yield view.add(
    
    <>
        <Rect
            fill={"#ff00ff30"}
            width={2900}
            height={920}
            x={-960/2}
            y={0}
            clip
            ref={leftRectRef}
        >
        <CodeBlock 
            selection={[
            [
                [0, 0],
                [100, 100],
            ],
            ]}
            fill={"#ffffff00"}
            ref={codeRef}
            language={"txt"}
            fontSize={40}
            lineHeight={40}
            offsetX={-1}
            x={-350}
            y={0}
            fontFamily={'JetBrains Mono'}
            code={`UserComputer:projects User$ `} />
        </Rect>
    </>
  );
  yield* slideTransition(Direction.Bottom, 2 /8);
  yield* waitUntil("showTemplative")
  yield* codeRef().edit(1/8, false)`UserComputer:projects User$ ${insert(`templative`)}`
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

    yield* codeRef().edit(1.5, false)`UserComputer:projects User$ templative${insert(insertText)}`
    
    yield* waitUntil("doneShowingCommands")
    yield* codeRef().edit(1.25, false)`UserComputer:projects User$ ${remove(`templative`)}${remove(insertText)}`

    yield* waitUntil("makeDirectory")
    yield* codeRef().edit(1, false)`UserComputer:projects User$ ${insert(`mkdir potionShmotion`)}`
    yield* waitUntil("clearMakeDirectory")
    yield* codeRef().edit(2/8, false)`UserComputer:projects User$ ${remove(`mkdir potionShmotion`)}`

    yield* waitUntil("showTemplativeInit")
    yield* codeRef().edit(1, false)`UserComputer:projects User$ ${insert(`templative init`)}` 
    yield* waitUntil("clearTemplativeInit")
    yield* codeRef().edit(2/8, false)`UserComputer:projects User$ ${remove(`templative init`)}`

    yield* waitUntil("showGit")
    yield* codeRef().edit(1, false)`UserComputer:projects User$ ${insert(`git`)}` 
    yield* waitUntil("showGitInit")
    yield* codeRef().edit(1, false)`UserComputer:projects User$ git ${insert(`init`)}` 



    yield* waitFor(4)


});