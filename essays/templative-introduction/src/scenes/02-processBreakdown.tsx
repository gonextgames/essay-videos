import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Layout, Text, Line, Rect, Node} from '@motion-canvas/2d/lib/components';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {all, delay,loop,waitFor,waitUntil} from '@motion-canvas/core/lib/flow';
import {createRef, Reference} from '@motion-canvas/core/lib/utils';
import {CodeBlock, edit, insert, lines, word} from '@motion-canvas/2d/lib/components/CodeBlock';
import {Direction, Vector2} from '@motion-canvas/core/lib/types';
import {Image} from '@motion-canvas/2d/lib/components';
import gamecrafterImage from "../images/gamecrafter.png"
import artImage from "../images/mona-lisa.png"
import notebookImage from "../images/notebook.png"
import { interpolation } from '@motion-canvas/2d/lib/decorators';
import nodes from "../../../../common/nodes"
export default makeScene2D(function* (view) {
  const leftRectRef = createRef<Rect>();
  const rightRectRef = createRef<Rect>();
  
  yield view.add(
    
    <>
        <Rect
            fill={"#ff00ff30"}
            width={960}
            height={920}
            x={-960/2}
            y={0}
            clip
            ref={leftRectRef}
        />
        <Rect
            // fill={"#ffffff"}
            offset={-1}
            width={955}
            height={920}
            x={0}
            y={-920/2}
            clip
            ref={rightRectRef}
        />
    </>
  )

  var artImageRef = yield* nodes.showImage(rightRectRef, artImage, 0.20, 1000,100,0)
  var csvImageRef = yield* nodes.showImage(rightRectRef, notebookImage, 0.20, 1000,0,0)
  var gameCrafterImageRef = yield* nodes.showImage(rightRectRef, gamecrafterImage, 0.5, 1000,-100,0)
  
  yield* waitUntil("showCsvs")
  yield* csvImageRef().position(new Vector2(0,csvImageRef().position().y),1)
  yield* waitUntil("showImages")
  yield* artImageRef().position(new Vector2(0,artImageRef().position().y),1)
  yield* waitUntil("showGameCrafter")
  yield* gameCrafterImageRef().position(new Vector2(0,gameCrafterImageRef().position().y),1)

  yield* waitFor(3.4)
});