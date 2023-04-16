import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Layout, Txt, Line, Rect, Node,CubicBezier} from '@motion-canvas/2d/lib/components';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {waitFor, all} from '@motion-canvas/core/lib/flow';
import {beginSlide, createRef, Reference} from '@motion-canvas/core/lib/utils';
import {Vector2} from '@motion-canvas/core/lib/types';
import {Img} from '@motion-canvas/2d/lib/components';
import coinsImageSource from "../images/penny.png"
import {ThreadGenerator} from '@motion-canvas/core/lib/threading';
import { Bezier } from '@motion-canvas/2d/lib/components/Bezier';

function *createLabeledCircle(parent: Reference<Node>, name: string, radius: number, position: Vector2) {
  const circleRef = createRef<Circle>()
  const textRef = createRef<Circle>()
  var fontSize = (radius*2)-5
  yield parent().add(<Circle ref={circleRef} width={radius*2} height={radius*2} x={position.x} y={position.y} fill={'lightseagreen'}>
    <Txt x={0} y={fontSize/10} fill={"white"} offsetX={0} offsetY={0} fontSize={fontSize} lineHeight={35} fontFamily={'JetBrains Mono'}>{name}</Txt>
  </Circle>)

  return circleRef
}

function* createConcentricSystemCircle(circleCount: number, parent: Reference<Node>){
  var references = Array<Reference<Circle>>()
  var currentParent = parent
  var diameter = 1000
  var fill = "d18d04"
  for(var i = 0; i < circleCount; i++)
  {
    var newRef = createRef<Circle>()
    yield currentParent().add(<Circle ref={newRef} width={diameter} height={diameter} x={0} y={0} fill={fill}/>)
    currentParent = newRef
    diameter = diameter * 0.95
    fill = fill == "d18d04" ? "#ffaa00" : "d18d04"
    references.push(newRef)
  }
  return references
}

export default makeScene2D(function* (view) {
  var mainRef = createRef<Rect>()
  yield view.add(
    <Rect ref={mainRef}/>
  )

  const newSystemCircle = createRef<Circle>()
  yield mainRef().add(<Circle ref={newSystemCircle} width={0} height={0} x={0} y={0} fill={"lightseagreen"}/>)

  var radianAngle = Math.PI*2/3
  var distance = 100
  const secondSystemCircleRef = createRef<Circle>()
  yield mainRef().add(<Circle ref={secondSystemCircleRef} width={0} height={0} x={Math.cos(radianAngle*2)*distance} y={Math.sin(radianAngle*2)*distance} fill={"#ffaa00"}>
    <Txt x={0} y={0} fontSize={30} fill={"#060606"} lineHeight={35} fontFamily={'JetBrains Mono'}>Spending</Txt>
  </Circle>)

  const thirdSystemCircleRef = createRef<Circle>()
  yield mainRef().add(<Circle ref={thirdSystemCircleRef} width={0} height={0} x={Math.cos(radianAngle*3)*distance} y={Math.sin(radianAngle*3)*distance} fill={"#ffaa00"}>
    <Txt x={0} y={0} fontSize={30} fill={"#060606"} lineHeight={35} fontFamily={'JetBrains Mono'}>Salary</Txt>
  </Circle>)

  const systemCircleRef = createRef<Circle>()
  yield mainRef().add(<Circle ref={systemCircleRef} width={0} height={0} x={0} y={0} fill={"#ffaa00"}/>)
  
  var circleRadius = 75
  var bCircle = yield* createLabeledCircle(mainRef, "B", circleRadius, new Vector2(0,0))
  var aCircle = yield* createLabeledCircle(mainRef, "A", circleRadius, new Vector2(0,0))
  
  yield* all(
    yield aCircle().position.x(-circleRadius*2,1),
    yield bCircle().position.x(circleRadius*2,1)
  )
  yield* beginSlide('drawBeziers');


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
  yield* all(
    yield aToBBezier().end(1, 1),
    yield bToABezier().end(1, 1)
  )

  yield* beginSlide('drawCoinMovement');

  const coinImageRef = createRef<Img>();
  yield mainRef().add(<Img ref={coinImageRef} src={coinsImageSource} width={0} height={0} x={-circleRadius} y={0} />)
  
  var positions = [
    new Vector2(-circleRadius,0),
    new Vector2(circleRadius,0),
    new Vector2(circleRadius, -circleRadius),
    new Vector2(0, -circleRadius*2),
    new Vector2(-circleRadius, -circleRadius),
  ]
  yield* all(
    yield coinImageRef().size(new Vector2(100,100), 6/8),
    yield coinImageRef().position(positions[1],6/8)
  )
  yield* coinImageRef().position(positions[2],0.5)
  yield* coinImageRef().position(positions[3],0.5)
  yield* coinImageRef().position(positions[4],0.5)
  yield* coinImageRef().position(positions[0],0.5)
  yield* coinImageRef().position(positions[1],0.5)
  yield* coinImageRef().position(positions[2],0.5)
  yield* coinImageRef().position(positions[3],0.5)
  yield* coinImageRef().position(positions[4],0.5)
  yield* coinImageRef().size(new Vector2(0,0), 4/8)
  
  yield* beginSlide('labelBankingSystem');

  yield* systemCircleRef().size(new Vector2(600,600), 1)
  const systemLabelRef = createRef<Txt>()
  yield systemCircleRef().add(<Txt ref={systemLabelRef} x={0} y={-150} offsetX={0} offsetY={1} fontSize={35} fill={"#06060600"} lineHeight={35} fontFamily={'JetBrains Mono'}>Banking</Txt>)
  yield* systemLabelRef().fill("#060606ff",6/8)

  yield* beginSlide('hide BankingSystem');

  var aText = aCircle().children()[0] as Txt
  var bText = bCircle().children()[0] as Txt

  var durationSeconds = 6/8
  yield* all(
    yield aToBBezier().start(1, durationSeconds*1.5),
    yield bToABezier().start(1, durationSeconds*1.5),

    yield aCircle().size(new Vector2(0,0),durationSeconds),
    yield aText.fill("ffffff00",durationSeconds*2/8),

    yield bCircle().size(new Vector2(0,0),durationSeconds),
    yield bText.fill("ffffff00",durationSeconds*2/8),
  )

  var showDuration = 6/8
  yield* all(
    yield systemCircleRef().position(new Vector2(Math.cos(radianAngle*1)*distance, Math.sin(radianAngle*1)*distance), showDuration),
    yield systemCircleRef().size(new Vector2(150,150), showDuration),
    yield systemLabelRef().fontSize(30,showDuration),
    yield systemLabelRef().position.y(15,showDuration),
    yield secondSystemCircleRef().size(new Vector2(150,150), showDuration),
    yield thirdSystemCircleRef().size(new Vector2(150,150), showDuration)
  )
  
  yield newSystemCircle().add(<Txt y={-200} fontSize={30} fill={"#060606"} lineHeight={35} fontFamily={'JetBrains Mono'}>Money & QoL Economy</Txt>)
  yield* newSystemCircle().size(new Vector2(600,600), 6/8)
  

  yield* beginSlide('otherSlide');
  yield* beginSlide('endSlide');

});
