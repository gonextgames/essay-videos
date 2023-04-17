import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Txt, Rect, Node,CubicBezier} from '@motion-canvas/2d/lib/components';
import {all,waitFor} from '@motion-canvas/core/lib/flow';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {beginSlide, createRef, Reference} from '@motion-canvas/core/lib/utils';
import {Direction, Vector2} from '@motion-canvas/core/lib/types';
import {Img} from '@motion-canvas/2d/lib/components';
import {Gradient} from '@motion-canvas/2d/lib/partials';
import { Bezier } from '@motion-canvas/2d/lib/components/Bezier';


function* createBezierBetweenPositions(bezierRef: Reference<Bezier>, a: Vector2, b: Vector2) {
    var spacing = 120
    var toEnd = new Vector2(
        b.x - a.x,
        b.y - a.y)
    
    var startingPoint = new Vector2(
        a.x + (toEnd.normalized.x*spacing),
        a.y + (toEnd.normalized.y*spacing))
    
    var endingPoint = new Vector2(
        a.x + (toEnd.x-(spacing * toEnd.normalized.x)),
        a.y + (toEnd.y-(spacing * toEnd.normalized.y)))

    return <CubicBezier
        ref={bezierRef}
        lineWidth={6}
        stroke={'lightseagreen'}
        p0={startingPoint}
        p1={endingPoint}
        p2={endingPoint}
        p3={endingPoint}
        endArrow
        end={0}
        shadowColor={"#030303"} shadowOffset={new Vector2(5,5)} shadowBlur={5}
    />
}

function* createSlider(parent: Reference<Node>, position: Vector2, longSideLength: number, sliderRatio: number, sliderRectRef: Reference<Rect>, controlRectRef: Reference<Rect>) {
    
    var width = longSideLength/3
    var height = longSideLength

    const gradient = new Gradient({
        from: new Vector2(0,-longSideLength/2),
        to: new Vector2(0,longSideLength/2),
        stops: [
          {offset: 0, color: 'lightseagreen'},
          {offset: 1, color: '#ffaa00'},
        ],
      });

    yield parent().add(<Rect ref={sliderRectRef} position={position} width={width} height={height} radius={60} smoothCorners fill={gradient} shadowColor={"#030303"} shadowOffset={new Vector2(5,5)} shadowBlur={5}>
        <Txt fontSize={30} y={(height/2)-50} fill={"#030303"} lineHeight={35} fontFamily={'JetBrains Mono'}>Less -</Txt>
        <Txt fontSize={30} y={(-height/2)+50} fill={"#030303"} lineHeight={35} fontFamily={'JetBrains Mono'}>More +</Txt>
        <Rect width={10*(longSideLength/200)} height={height-200} x={0} y={0} fill={"#000000"} radius={60} smoothCorners/>
        <Rect width={40*(longSideLength/200)} ref={controlRectRef} height={15*(longSideLength/200)} x={0} y={0 - 50 + (sliderRatio*100)} fill={"#fff"} radius={60} smoothCorners shadowColor={"#030303"} shadowOffset={new Vector2(5,5)} shadowBlur={5}/>
    </Rect>)
}

export default {
    createSlider: createSlider,
    createBezierBetweenPositions: createBezierBetweenPositions,
}