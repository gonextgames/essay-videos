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
import {CodeBlock, edit, insert, lines, word} from '@motion-canvas/2d/lib/components/CodeBlock';
import {Direction, Vector2} from '@motion-canvas/core/lib/types';

import {Img} from '@motion-canvas/2d/lib/components';
import gamecrafterImg from "../images/gamecrafter.png"
import tabletopPlaygroundImg from "../images/tabletopPlayground.png"
import computerImg from "../images/pc.png"
import personImg from "../images/person.png"
import artImg from "../images/mona-lisa.png"
import gitImg from "../images/gitLogo.png"
import { interpolation } from '@motion-canvas/2d/lib/decorators';
import nodes from "../../../../common/nodes"

function *createTemplative(parent: Reference<Rect>) {
    
}

function *showCommands(templativeRef: Reference<CodeBlock>) {
    yield* templativeRef().edit(1, false)`templative${insert(` init`)}\n\n\n\n`
    yield* templativeRef().edit(6/8, false)`templative init\n${insert(`templative create  `)}\n\n\n`
    yield* templativeRef().edit(6/8, false)`templative init\ntemplative create \n${insert(`templative produce`)}\n\n`
    yield* templativeRef().edit(6/8, false)`templative init\ntemplative create \ntemplative produce\n${insert(`templative playground`)}\n`
    yield* templativeRef().edit(6/8, false)`templative init\ntemplative create \ntemplative produce\ntemplative playground\n${insert(`templative upload`)}`
}

export default makeScene2D(function* (view) {
  const leftRectRef = createRef<Rect>();
  const rightRectRef = createRef<Rect>();
  const commandsRef = createRef<CodeBlock>();
  
  yield view.add(
    
    <>
        <Rect
            // fill={"#ff00ff30"}
            // offset={-1}
            width={960}
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
                language={"txt"}
                fill={"#ffffff00"}
                ref={commandsRef}
                fontSize={40}
                lineHeight={40}
                offsetX={-1}
                x={-350}
                y={-0}
                fontFamily={'JetBrains Mono'}
                code={`templative\n\n\n\n`} />
        </Rect>
        <Rect
            // fill={"#ffffff30"}
            offset={-1}
            width={955}
            height={920}
            x={1000}
            y={-920/2}
            clip
            ref={rightRectRef}
        />
    </>
  );
  yield* slideTransition(Direction.Top, 2 /8);

  yield* waitUntil("showDesigners")
  var gameDesignerImgRef = yield* nodes.showImg(rightRectRef, personImg, 0.75, -300,100,0)
  var artistImgRef = yield* nodes.showImg(rightRectRef, personImg, 0.75, 300,-100,0)
  yield* rightRectRef().position(new Vector2(0, rightRectRef().position.y()), 4/8)
  
  yield* waitUntil("showComputer")
  var computerImgRef = yield* nodes.showImg(rightRectRef, computerImg, 0.4, -125,-10,0)

  yield* waitUntil("showSvgArt")
  var artImgRef = yield* nodes.showImg(rightRectRef, artImg, 0.4, 100,-200,4)

  yield* waitUntil("showGit")
  var gitImgRef = yield* nodes.showImg(rightRectRef, gitImg, 0.20, -115,-120,0)

  yield* waitUntil("tableTopPlayground")
  var tabletopImgRef = yield* nodes.showImg(rightRectRef, tabletopPlaygroundImg, 0.4, -200,-300,0)

  yield* waitUntil("gamecrafter")
  var gamecrafterImgRef = yield* nodes.showImg(rightRectRef, gamecrafterImg, 1.2, 150,200,0)

  yield* waitUntil("showCommands")
  yield* showCommands(commandsRef)

  yield* waitUntil("endScene")



});