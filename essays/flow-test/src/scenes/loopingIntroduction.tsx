import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Txt, Rect, Node,CubicBezier} from '@motion-canvas/2d/lib/components';
import {all} from '@motion-canvas/core/lib/flow';
import {beginSlide, createRef, Reference} from '@motion-canvas/core/lib/utils';
import {Vector2, Direction} from '@motion-canvas/core/lib/types';
import {Img} from '@motion-canvas/2d/lib/components';
import coinsImageSource from "../images/penny.png"
import {slideTransition} from '@motion-canvas/core/lib/transitions';

function *createLabeledCircle(parent: Reference<Node>, name: string, radius: number, position: Vector2) {
  const circleRef = createRef<Circle>()
  var fontSize = (radius*2)-5
  yield parent().add(<Circle ref={circleRef} width={0} height={0} x={position.x} y={position.y} fill={'lightseagreen'} shadowColor={"#030303"} shadowOffset={new Vector2(5,5)} shadowBlur={5}>
    <Txt x={0} y={15} fill={"#ffffff00"} offsetX={0} offsetY={0} fontSize={0} lineHeight={35} fontFamily={'JetBrains Mono'}>{name}</Txt>
  </Circle>)

  return circleRef
}

export default makeScene2D(function* (view) {
  var mainRef = createRef<Rect>()
  yield view.add(
    <Rect ref={mainRef}/>
  )

  const newSystemCircle = createRef<Circle>()
  yield mainRef().add(<Circle ref={newSystemCircle} width={0} height={0} x={0} y={0} fill={"lightseagreen"} shadowColor={"#030303"} shadowOffset={new Vector2(5,5)} shadowBlur={5}/>)

  var radianAngle = Math.PI*2/3
  var distance = 100
  const secondSystemCircleRef = createRef<Circle>()
  yield mainRef().add(<Circle ref={secondSystemCircleRef} width={0} height={0} x={Math.cos(radianAngle*2)*distance} y={Math.sin(radianAngle*2)*distance} fill={"#ffaa00"} shadowColor={"#030303"} shadowOffset={new Vector2(5,5)} shadowBlur={5}>
    <Txt x={0} y={0} fontSize={30} fill={"#141414"} lineHeight={35} fontFamily={'JetBrains Mono'}>Spending</Txt>
  </Circle>)

  const thirdSystemCircleRef = createRef<Circle>()
  yield mainRef().add(<Circle ref={thirdSystemCircleRef} width={0} height={0} x={Math.cos(radianAngle*3)*distance} y={Math.sin(radianAngle*3)*distance} fill={"#ffaa00"} shadowColor={"#030303"} shadowOffset={new Vector2(5,5)} shadowBlur={5}>
    <Txt x={0} y={0} fontSize={30} fill={"#141414"} lineHeight={35} fontFamily={'JetBrains Mono'}>Salary</Txt>
  </Circle>)

  const systemCircleRef = createRef<Circle>()
  yield mainRef().add(<Circle ref={systemCircleRef} width={0} height={0} x={0} y={0} fill={"#ffaa00"} shadowColor={"#030303"} shadowOffset={new Vector2(5,5)} shadowBlur={5}/>)
  
  var circleRadius = 75
  var bCircle = yield* createLabeledCircle(mainRef, "B", circleRadius, new Vector2(0,0))
  var aCircle = yield* createLabeledCircle(mainRef, "A", circleRadius, new Vector2(0,0))
  var aText = aCircle().children()[0] as Txt
  var bText = bCircle().children()[0] as Txt

  yield* all(
    yield aCircle().size(new Vector2(circleRadius*2,circleRadius*2),1),
    yield bCircle().size(new Vector2(circleRadius*2,circleRadius*2),1),
    yield aText.fill("#fff",1),
    yield aText.fontSize(150, 1),
    yield bText.fill("#fff",1),
    yield bText.fontSize(150, 1),
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
        shadowColor={"#030303"} shadowOffset={new Vector2(5,5)} shadowBlur={5}
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
    shadowColor={"#030303"} shadowOffset={new Vector2(5,5)} shadowBlur={5}
/>)
  yield* all(
    yield aToBBezier().end(1, 1),
    yield bToABezier().end(1, 1)
  )
  const coinImageRef = createRef<Img>();
  yield mainRef().add(<Img ref={coinImageRef} src={coinsImageSource} width={0} height={0} x={-circleRadius} y={0} shadowColor={"#030303"} shadowOffset={new Vector2(5,5)} shadowBlur={5}/>)
  
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
  yield* coinImageRef().size(new Vector2(0,0), 4/8)
  
  yield* beginSlide('labelBankingSystem');

  yield* systemCircleRef().size(new Vector2(600,600), 1)
  const systemLabelRef = createRef<Txt>()
  yield systemCircleRef().add(<Txt ref={systemLabelRef} x={0} y={-150} offsetX={0} offsetY={1} fontSize={35} fill={"#14141400"} lineHeight={35} fontFamily={'JetBrains Mono'}>Banking</Txt>)
  yield* systemLabelRef().fill("#141414ff",6/8)

  yield* beginSlide('hide BankingSystem');  

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
  
  yield newSystemCircle().add(<Txt y={-200} fontSize={30} fill={"#141414"} lineHeight={35} fontFamily={'JetBrains Mono'}>Money & QoL Economy</Txt>)
  yield* newSystemCircle().size(new Vector2(600,600), 6/8)

  yield* beginSlide('outSystems');
  
  const outerSystemCircle = createRef<Circle>()
  yield mainRef().add(<Circle ref={outerSystemCircle} width={0} zIndex={-2} height={0} x={-300} y={-300} fill={"#ffaa00"} shadowColor={"#030303"} shadowOffset={new Vector2(5,5)} shadowBlur={5}/>)
  yield* outerSystemCircle().size(new Vector2(1600,1600), 1)

  const otherSystemCircle = createRef<Circle>()
  yield mainRef().add(<Circle ref={otherSystemCircle} width={0} zIndex={-1} height={0} x={-600} y={-200} fill={"lightseagreen"} shadowColor={"#030303"} shadowOffset={new Vector2(5,5)} shadowBlur={5}/>)
  yield* otherSystemCircle().size(new Vector2(600,600), 1)

  var effortMeaningTxtRef = createRef<Txt>()
  yield outerSystemCircle().add(<Txt ref={effortMeaningTxtRef} x={200} y={-100} fontSize={0} fill={"#141414"} lineHeight={35} fontFamily={'JetBrains Mono'}>Effort & Meaning Economy</Txt>)
  yield* effortMeaningTxtRef().fontSize(30, 4/8)

  yield* beginSlide('endSlide');

});
