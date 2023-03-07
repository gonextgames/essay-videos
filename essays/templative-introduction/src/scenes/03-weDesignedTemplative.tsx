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
import {CodeBlock, edit, insert, lines, word} from '@motion-canvas/2d/lib/components/CodeBlock';
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

function *createTemplative(parent: Reference<Rect>) {
    
}

function *showCommands(templativeRef: Reference<CodeBlock>) {
    yield* templativeRef().edit(1, false)`templative${insert(` init`)}\n\n\n\n`
    yield* templativeRef().edit(6/8, false)`templative init\n${insert(`templative create deckpoker --name potionDeck`)}\n\n\n`
    yield* templativeRef().edit(6/8, false)`templative init\ntemplative create deckpoker --name potionDeck\n${insert(`templative produce`)}\n\n`
    yield* templativeRef().edit(6/8, false)`templative init\ntemplative create deckpoker --name potionDeck\ntemplative produce\n${insert(`templative playground`)}\n`
    yield* templativeRef().edit(6/8, false)`templative init\ntemplative create deckpoker --name potionDeck\ntemplative produce\ntemplative playground\n${insert(`templative upload`)}`
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
  yield* slideTransition(Direction.Bottom, 2 /8);

  yield* waitUntil("showDesigners")
  var gameDesignerImageRef = yield* nodes.showImage(rightRectRef, personImage, 0.75, -300,100,0)
  var artistImageRef = yield* nodes.showImage(rightRectRef, personImage, 0.75, 300,-100,0)
  yield* rightRectRef().position(new Vector2(0, rightRectRef().position.y()), 4/8)
  
  yield* waitUntil("showComputer")
  var computerImageRef = yield* nodes.showImage(rightRectRef, computerImage, 0.4, -125,-10,0)

  yield* waitUntil("showSvgArt")
  var artImageRef = yield* nodes.showImage(rightRectRef, artImage, 0.4, 100,-200,4)

  yield* waitUntil("showGit")
  var gitImageRef = yield* nodes.showImage(rightRectRef, gitImage, 0.20, -115,-120,0)

  yield* waitUntil("tableTopPlayground")
  var tabletopImageRef = yield* nodes.showImage(rightRectRef, tabletopPlaygroundImage, 0.4, -200,-300,0)

  yield* waitUntil("gamecrafter")
  var gamecrafterImageRef = yield* nodes.showImage(rightRectRef, gamecrafterImage, 1.2, 150,200,0)

  yield* waitUntil("showCommands")
  yield* showCommands(commandsRef)

  yield* waitUntil("endScene")



});