import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Layout, Txt, Line, Rect, Node} from '@motion-canvas/2d/lib/components';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {all, delay,loop,waitFor,waitUntil} from '@motion-canvas/core/lib/flow';
import {createRef, Reference} from '@motion-canvas/core/lib/utils';
import {CodeBlock, edit, insert, lines, word} from '@motion-canvas/2d/lib/components/CodeBlock';
import {Direction, Vector2} from '@motion-canvas/core/lib/types';
import {Img} from '@motion-canvas/2d/lib/components';
import worBox from "../images/worBox.png"
import altoids from "../images/altoids.webp"
import worBoard from "../images/worBoard.webp"
import {interpolation} from '@motion-canvas/2d/lib/decorators';
import nodes from "../../../../common/nodes"

export default makeScene2D(function* (view) {
  const boardRef = createRef<Img>();
  const boxRef = createRef<Img>();
  const altoidsRef = createRef<Img>();

  var screenDimensions = new Vector2(1080,1920)
  var halfScreenDimensions = new Vector2(screenDimensions.x/2,screenDimensions.y/2)

  var width = screenDimensions.y * screenDimensions.y/1440
  yield view.add(
    <>
      <Img ref={boardRef} src={worBoard} x={-halfScreenDimensions.x} offsetX={-1} width={width} height={screenDimensions.y}/>
      <Img ref={boxRef} src={worBox} x={0} y={halfScreenDimensions.y} offsetY={-1} scale={0.25}/>
      <Img ref={altoidsRef} src={altoids} x={0} y={halfScreenDimensions.y} offsetY={-1} scale={0.25}/>
    </>
  )
  yield* waitUntil("panAcrossBoard")
  // yield* nodes.thrustNode(boardRef, 1)
  yield* boardRef().position.x(-screenDimensions.x*1.5,1)
  yield* waitUntil("showBox")
  var moveDuration = 4/8
  yield* all(
    yield boardRef().offset.y(1,moveDuration),
    yield boardRef().position.y(0,moveDuration),
    yield boxRef().position.y(0,moveDuration),
    yield boxRef().offset.y(0,moveDuration)
  )
  yield* waitUntil("shrinkBoard")
  var shrinkDuration = 4/8
  yield* all(
    yield boardRef().position.y(0,shrinkDuration),
    yield boardRef().position.x(0,shrinkDuration),
    yield boardRef().size(new Vector2(0,0),shrinkDuration),
  )

  yield* waitUntil("showAltoids")
  var altoidMoveDuration = 4/8
  yield* all(
    yield boxRef().offset.y(-1,altoidMoveDuration),
    yield boxRef().position.y(-halfScreenDimensions.y/2,altoidMoveDuration),
    yield altoidsRef().position.y(0,altoidMoveDuration),
    yield altoidsRef().offset.y(0,altoidMoveDuration)
  )

  yield* waitUntil("shrinkBox")
  var shrinkBoxDuration = 4/8
  yield* all(
    yield boxRef().position.y(0,shrinkDuration),
    yield boxRef().position.x(0,shrinkDuration),
    yield boxRef().size(new Vector2(0,0),shrinkDuration),
  )

  yield* waitUntil("endScene")
});