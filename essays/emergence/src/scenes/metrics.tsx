import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Txt, Rect, Node,CubicBezier} from '@motion-canvas/2d/lib/components';
import {all,waitFor} from '@motion-canvas/core/lib/flow';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {beginSlide, createRef, Reference} from '@motion-canvas/core/lib/utils';
import {Direction, Vector2} from '@motion-canvas/core/lib/types';
import {Img} from '@motion-canvas/2d/lib/components';
import onionImageSource from "../images/onion.png"
import cryOnionOneImageSource from "../images/cryOnionOne.jpg"
import cryOnionTwoImageSource from "../images/cryOnionTwo.jpg"
import cryOnionThreeImageSource from "../images/cryOnionThree.jpg"
import {waitUntil} from '@motion-canvas/core/lib/flow';

import {Gradient} from '@motion-canvas/2d/lib/partials';
import { Bezier } from '@motion-canvas/2d/lib/components/Bezier';
import nodes from "../nodes"
import { easeOutSine } from '@motion-canvas/core/lib/tweening';

export default makeScene2D(function* (view) {
    var mainRef = createRef<Rect>();
    var titleTxtRef = createRef<Txt>();
    var depthTxtRef = createRef<Txt>();
    var leverageTxtRef = createRef<Txt>();
    var eleganceTxtRef = createRef<Txt>();
    var blur = 1
    var blurOffset = new Vector2(3,3)
    yield view.add(
        <Rect ref={mainRef}>
            <Txt ref={titleTxtRef} offsetX={-1} offsetY={-1} x={-300} y={0} fontSize={30} fill={"#fff"} lineHeight={35} fontFamily={'JetBrains Mono'} shadowColor={"#030303"} shadowOffset={blurOffset} shadowBlur={blur}>Measuring our Success</Txt>
            <Txt ref={depthTxtRef} x={300} y={-60} offsetY={-1} fontSize={30} fill={"#fff"} lineHeight={35} fontFamily={'JetBrains Mono'} shadowColor={"#030303"} shadowOffset={blurOffset} shadowBlur={blur}>Depth</Txt>
            <Txt ref={eleganceTxtRef} x={300} y={0} offsetY={-1} fontSize={30} fill={"#fff"} lineHeight={35} fontFamily={'JetBrains Mono'} shadowColor={"#030303"} shadowOffset={blurOffset} shadowBlur={blur}>Elegance</Txt>
            <Txt ref={leverageTxtRef} x={300} y={60} offsetY={-1} fontSize={30} fill={"#fff"} lineHeight={35} fontFamily={'JetBrains Mono'} shadowColor={"#030303"} shadowOffset={blurOffset} shadowBlur={blur}>Leverage</Txt>
        </Rect>
    )
    yield* slideTransition(Direction.Top);
    yield* waitUntil("explain")

    var onionImageRef = createRef<Img>()
    var onionPosition = new Vector2(-150,25)
    yield mainRef().add(<Img ref={onionImageRef} src={onionImageSource} position={onionPosition} width={0} height={0}/>)

    var margin = 60
    
    var depthLine = createRef<CubicBezier>()
    var onionArrowStart = new Vector2(onionPosition.x, onionPosition.y)
    var onionArrowEnd = new Vector2(onionPosition.x+110, onionPosition.y-110)
    yield mainRef().add(<CubicBezier
        ref={depthLine}
        lineWidth={12}
        stroke={'#ffaa00'}
        p0={onionArrowStart}
        p1={onionArrowStart}
        p2={onionArrowEnd}
        p3={onionArrowEnd}
        end={0}
        shadowColor={"#030303"} shadowOffset={new Vector2(3,3)} shadowBlur={3}
    />)

    yield* all(
        yield titleTxtRef().position(new Vector2((-1920/2)+margin, (-1080/2)+margin), 1),
        yield onionImageRef().size(new Vector2(300,300), 1),
        yield leverageTxtRef().position.x(150, 1),
        yield eleganceTxtRef().position.x(150, 1),
        yield depthTxtRef().position.x(150, 1),
        yield depthTxtRef().fill("#ffaa00", 1),
    )
    yield* depthLine().end(1,1)
    yield* waitUntil("elegantExplanation")
    onionArrowStart = new Vector2(onionPosition.x+125, onionPosition.y+125)
    onionArrowEnd = new Vector2(onionPosition.x+25, onionPosition.y+25)
    
    var elegantArrow = createRef<CubicBezier>()
    yield mainRef().add(<CubicBezier
        ref={elegantArrow}
        lineWidth={30}
        arrowSize={40}
        stroke={'#ffaa00'}
        p0={onionArrowStart}
        p1={onionArrowStart}
        p2={onionArrowEnd}
        p3={onionArrowEnd}
        endArrow
        end={0}
        shadowColor={"#030303"} shadowOffset={new Vector2(5,5)} shadowBlur={5}
    />)
    yield* all(
        yield depthTxtRef().fill("#fff", 1),
        yield eleganceTxtRef().fill("#ffaa00", 1),
        yield depthLine().start(1,4/8),
        yield elegantArrow().end(1,1)
    )
    var drift = 90
    var newStart = new Vector2(onionArrowStart.x+drift, onionArrowStart.y-drift)
    var newEnd = new Vector2(onionArrowEnd.x+drift, onionArrowEnd.y-drift)
    yield* all(
        yield elegantArrow().p0(newStart,2),
        yield elegantArrow().p1(newStart,2),
        yield elegantArrow().p2(newEnd,2),
        yield elegantArrow().p3(newEnd,2),
    )
    yield* elegantArrow().start(1,1)

    yield* waitUntil("explainLeverage")
    yield* all(
        yield eleganceTxtRef().fill("#fff", 1),
        yield leverageTxtRef().fill("#ffaa00", 1)
    )

    var imageReferences = Array<Reference<Img>>()
    var themeCircleRef = createRef<Circle>()
    yield mainRef().add(<Circle ref={themeCircleRef} fill={"lightseagreen"} x={0} y={-(1080/2)-100} size={new Vector2(200,200)}>
        <Txt fontSize={45} fill={"#fff"} lineHeight={45} fontFamily={'JetBrains Mono'} shadowColor={"#030303"} shadowOffset={blurOffset} shadowBlur={blur}>Theme</Txt>
    </Circle>)
    var generators = [themeCircleRef().position.y(-300, 1)]
    for(var i = 0 ; i < 3 ; i++) {
        var otherOnionRef = createRef<Img>()
        yield mainRef().add(<Img 
            ref={otherOnionRef} 
            src={onionImageSource}  
            position={onionPosition}
            width={0} height={0}
            zIndex={-1}
        />)
        imageReferences.push(otherOnionRef)
        generators.push(yield otherOnionRef().size(new Vector2(200, 200),1))
        generators.push(yield otherOnionRef().position(new Vector2(-70-(i*75),-80),1))
    }
    yield* all(...generators) 

    var leverageLine = createRef<CubicBezier>()
    onionArrowStart = new Vector2(onionPosition.x, onionPosition.y)
    onionArrowEnd = new Vector2(-50, onionPosition.y-220)
    yield mainRef().add(<CubicBezier
        ref={leverageLine}
        lineWidth={12}
        stroke={'#ffaa00'}
        p0={onionArrowStart}
        p1={onionArrowStart}
        p2={onionArrowEnd}
        p3={onionArrowEnd}
        end={0}
        endArrow
        shadowColor={"#030303"} shadowOffset={new Vector2(3,3)} shadowBlur={3}
    />)
    yield* leverageLine().end(1,1)

    yield* waitUntil("endMetrics")
})