import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Layout, Txt, Line, Rect, Node,CubicBezier} from '@motion-canvas/2d/lib/components';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {all, delay,loop,waitFor,waitUntil} from '@motion-canvas/core/lib/flow';
import {createRef, Reference} from '@motion-canvas/core/lib/utils';
import {CodeBlock, edit, insert, lines, word} from '@motion-canvas/2d/lib/components/CodeBlock';
import {Direction, Vector2} from '@motion-canvas/core/lib/types';
import {Img} from '@motion-canvas/2d/lib/components';
import coinsImageSource from "../images/coins.png"
import { interpolation } from '@motion-canvas/2d/lib/decorators';

function *createLabeledCircle(parent: Reference<Node>, name: string, radius: number, position: Vector2) {
  const circleRef = createRef<Circle>()
  const textRef = createRef<Circle>()
  var fontSize = (radius*2)-5
  yield parent().add(<Circle ref={circleRef} width={radius*2} height={radius*2} x={position.x} y={position.y} fill={'lightseagreen'}>
    <Txt x={0} y={fontSize/10} fill={"white"} offsetX={0} offsetY={0} fontSize={fontSize} lineHeight={35} fontFamily={'JetBrains Mono'}>{name}</Txt>
  </Circle>)

  return circleRef
}

export default makeScene2D(function* (view) {
  var mainRef = createRef<Rect>()
  yield view.add(
    <Rect ref={mainRef}/>
  )
  const systemCircleRef = createRef<Circle>()
  yield mainRef().add(<Circle ref={systemCircleRef} width={0} height={0} x={0} y={0} fill={"#ffaa00"}/>)


  var circleRadius = 75
  var bCircle = yield* createLabeledCircle(mainRef, "B", circleRadius, new Vector2(0,0))
  var aCircle = yield* createLabeledCircle(mainRef, "A", circleRadius, new Vector2(0,0))
  
  yield* aCircle().position.x(-circleRadius*2,1)
  yield* bCircle().position.x(circleRadius*2,1)

  
  const lineMargin = 12
  const aToBBezier = createRef<CubicBezier>();
  yield mainRef().add(<CubicBezier
        ref={aToBBezier}
        lineWidth={6}
        stroke={'lightseagreen'}
        p0={[-circleRadius+lineMargin, 0]}
        p1={[circleRadius-lineMargin, 0]}
        p2={[circleRadius-lineMargin, 0]}
        p3={[circleRadius-lineMargin, 0]}
        endArrow
        end={0}
    />)
  
  yield* aToBBezier().end(1, 1);

  const bToABezier = createRef<CubicBezier>();
  yield mainRef().add(<CubicBezier
    ref={bToABezier}
    lineWidth={6}
    stroke={'lightseagreen'}
    p0={[circleRadius, -circleRadius]}
    p1={[0, -circleRadius*2]}
    p2={[-circleRadius, -circleRadius]}
    p3={[-circleRadius, -circleRadius]}
    endArrow
    end={0}
/>)
  yield* bToABezier().end(1, 1);

  const coinImageRef = createRef<Img>();
  yield mainRef().add(<Img ref={coinImageRef} src={coinsImageSource} width={0} height={0} x={-circleRadius} y={0} />)
  yield* coinImageRef().size(new Vector2(100,100), 4/8)

  var positions = [
    new Vector2(-circleRadius,0),
    new Vector2(circleRadius,0),
    new Vector2(circleRadius, -circleRadius),
    new Vector2(0, -circleRadius*2),
    new Vector2(-circleRadius, -circleRadius),
  ]

  yield* coinImageRef().position(positions[0],0.5)
  yield* coinImageRef().position(positions[1],0.5)
  yield* coinImageRef().position(positions[2],0.5)
  yield* coinImageRef().position(positions[3],0.5)
  yield* coinImageRef().position(positions[4],0.5)
  yield* coinImageRef().position(positions[0],0.5)
  yield* coinImageRef().position(positions[1],0.5)
  yield* coinImageRef().position(positions[2],0.5)
  yield* coinImageRef().position(positions[3],0.5)
  yield* coinImageRef().position(positions[4],0.5)
  yield* coinImageRef().size(new Vector2(0,0), 4/8)

  
  yield* systemCircleRef().size(new Vector2(600,600), 1)

  const systemLabelRef = createRef<Txt>()
  yield mainRef().add(<Txt ref={systemLabelRef} x={0} y={-150} offsetX={0} offsetY={1} fontSize={35} fill={"#06060600"} lineHeight={35} fontFamily={'JetBrains Mono'}>Investment Engine</Txt>)
  yield* systemLabelRef().fill("#060606ff",6/8)

  yield* aToBBezier().start(1, 1/8);
  yield* bToABezier().start(1, 1/8);

  yield* aCircle().size(new Vector2(0,0),1/8)
  var aText = aCircle().children()[0] as Txt
  yield* aText.fill("ffffff00",1/8)

  yield* bCircle().size(new Vector2(0,0),1/8)
  var bText = bCircle().children()[0] as Txt
  yield* bText.fill("ffffff00",1/8)

  yield* systemLabelRef().position.y(0,1)
  yield* systemCircleRef().size(new Vector2(400,400),1)

});
