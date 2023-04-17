import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Layout, Txt, Line, Rect, Node} from '@motion-canvas/2d/lib/components';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {all, delay,loop,waitFor,waitUntil} from '@motion-canvas/core/lib/flow';
import {createRef, Reference} from '@motion-canvas/core/lib/utils';
import {CodeBlock, edit, insert, lines, word} from '@motion-canvas/2d/lib/components/CodeBlock';
import {Direction, Vector2} from '@motion-canvas/core/lib/types';
import {Img} from '@motion-canvas/2d/lib/components';
import gamecrafterImg from "../images/gamecrafter.png"
import artImg from "../images/mona-lisa.png"
import notebookImg from "../images/notebook.png"
import stressImg from "../images/stress.png"
import { interpolation } from '@motion-canvas/2d/lib/decorators';
import nodes from "../../../../common/nodes"


function *swingImgIn(parent: Reference<Node>, src: string, sizeRatio:number, position: Vector2) {
  var imageRef = yield* nodes.showImg(parent, src, sizeRatio, 2000, position.y, 0)
  yield* imageRef().position.x(position.x, 2/8)
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
        >
          <Rect
            fill={"#ffffff"}
            offset={new Vector2(0,1)}
            width={"100%"}
            height={200}
            x={0}
            y={1080/2}
            clip/>
          <Img src={stressImg} x={0} y={387} offset={new Vector2(0,1)} width={500} height={400}></Img>
        </Rect>
    </>
  )
  yield* slideTransition(Direction.Left , 2 /8);

  var distance = 75
  yield* swingImgIn(rightRectRef, notebookImg, 0.25, new Vector2(-4*distance,distance/2))
  yield* swingImgIn(rightRectRef, artImg, 0.25, new Vector2(-distance,-distance))
  yield* swingImgIn(rightRectRef, gamecrafterImg, 0.6, new Vector2(distance*-2,distance))
  yield* swingImgIn(rightRectRef, notebookImg, 0.25, new Vector2(distance*-4,distance*-3))
  yield* swingImgIn(rightRectRef, notebookImg, 0.25, new Vector2(distance*2,distance*-2))
  yield* swingImgIn(rightRectRef, artImg, 0.25, new Vector2(distance*3,0))
  yield* swingImgIn(rightRectRef, gamecrafterImg, 0.6, new Vector2(distance*4,distance*3))
  yield* swingImgIn(rightRectRef, artImg, 0.25, new Vector2(-distance*6,-1.5*distance))
  yield* swingImgIn(rightRectRef, gamecrafterImg, 0.6, new Vector2(0,-distance*5))

  yield* waitUntil("endScene")
});