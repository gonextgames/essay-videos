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
import nodes from "../nodes"

function *swingImageIn(parent: Reference<Node>, src: string, sizeRatio:number, position: Vector2) {
  var imageRef = yield* nodes.showImage(parent, src, sizeRatio, 2000, position.y, 0)
  yield* imageRef().position.x(position.x, 7/8)
}

export default makeScene2D(function* (view) {
  const leftRectRef = createRef<Rect>();
  const rightRectRef = createRef<Rect>();
  
  yield view.add(
    
    <>
        <Rect
            // fill={"#ffffff"}
            offset={0}
            width={"100%"}
            height={"100%"}
            x={0}
            y={0}
            clip
            ref={rightRectRef}
        />
    </>
  )
  yield* slideTransition(Direction.Top , 2 /8);

  var distance = 75
  yield* swingImageIn(rightRectRef, notebookImage, 0.25, new Vector2(distance,distance))
  yield* swingImageIn(rightRectRef, artImage, 0.25, new Vector2(-distance,-distance))
  yield* swingImageIn(rightRectRef, gamecrafterImage, 0.6, new Vector2(distance*-2,distance))
  yield* swingImageIn(rightRectRef, notebookImage, 0.25, new Vector2(distance*-2,distance*-2))
  yield* swingImageIn(rightRectRef, notebookImage, 0.25, new Vector2(distance*2,distance*-2))
  yield* swingImageIn(rightRectRef, artImage, 0.25, new Vector2(distance*3,0))
  yield* swingImageIn(rightRectRef, gamecrafterImage, 0.6, new Vector2(distance*1,distance*3))
  yield* swingImageIn(rightRectRef, artImage, 0.25, new Vector2(-distance*4,-1*distance))
  yield* swingImageIn(rightRectRef, gamecrafterImage, 0.6, new Vector2(0,-distance*5))

  yield* waitUntil("endScene")
});