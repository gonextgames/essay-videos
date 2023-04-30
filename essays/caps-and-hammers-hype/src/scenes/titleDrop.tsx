import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Grid, Txt, Rect, Node,CubicBezier} from '@motion-canvas/2d/lib/components';
import {all, waitFor,sequence} from '@motion-canvas/core/lib/flow';
import {beginSlide, createRef, Reference} from '@motion-canvas/core/lib/utils';
import {Vector2, Direction } from '@motion-canvas/core/lib/types';
import {Img} from '@motion-canvas/2d/lib/components';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {waitUntil} from '@motion-canvas/core/lib/flow';
import {createSignal,SimpleSignal, DEFAULT} from '@motion-canvas/core/lib/signals';
import { TimingFunction, easeInBack, easeInBounce, easeInCubic, easeInOutBack, easeInOutBounce, easeInOutCirc, easeInOutElastic, easeOutBack, easeOutBounce, easeOutCirc, easeOutCubic, easeOutElastic, linear } from '@motion-canvas/core/lib/tweening';
import {CodeBlock, insert} from '@motion-canvas/2d/lib/components/CodeBlock';

import tiktokOverlaySource from "../../../../common/tiktokOverlay.png"

import CapsAndHammersImages from "../capsAndHammersCards"
import CardHelper from "../card"
import communismSource from "../images/communism.png"
import mousePointerSource from "../images/mousePointer.png"
import thinkingSource from "../images/thinking.png"
import armSource from "../images/arm.png"
import charactersSource from "../images/charactersSource.png"
import scienceLabBackSource from "../images/scienceLabs-back.jpg"
import moonLandingSource from "../images/scienceLabs-moonLanding.jpg"
import earthSource from "../images/earth.png"
import explosionSource from "../images/fire.png"
import capsAndHammersCards from '../capsAndHammersCards';
import nodes from "../../../../common/nodes"

export default makeScene2D(function* (view) {
  
    var mainRef = createRef<Rect>()
    yield view.add(<Rect ref={mainRef} width={"100%"} height={"100%"} >
        {/* <Img zIndex={100} src={tiktokOverlaySource} width={1080} height={1920}/> */}
    </Rect>)

    var explosionRef = createRef<Img>()
    var earthRef = createRef<Img>()
    yield mainRef().add(<Img ref={explosionRef} src={explosionSource}y={250}  width={0} height={0} offsetY={1}/>)
    yield mainRef().add(<Img ref={earthRef} src={earthSource} width={0} height={0}/>)

    var earthWidth = 600
    yield* waitUntil("showEarth")
    var muteTxtRef = createRef<Txt>()
    yield mainRef().add(<Txt ref={muteTxtRef} fontFamily={'JetBrains Mono'} fontSize={0} fill={"#fff"} stroke={"#303030"} strokeFirst={true} lineWidth={5} shadowColor={"#303030"} shadowOffset={new Vector2(5,5)}>🔊</Txt>)

    var mouseRef = createRef<Img>()
    yield mainRef().add(<Img ref={mouseRef} src={mousePointerSource} scale={0.25} offsetX={1} offsetY={1} x={1080/2+100} y={1920/4}/>)

    var muteButtonPosition = new Vector2(1080/4, -1920/8)
    yield* all(
        yield earthRef().size(new Vector2(earthWidth,earthWidth),4/8, easeOutBack),
        yield muteTxtRef().fontSize(200, 4/8),
        yield muteTxtRef().position(muteButtonPosition, 4/8),
    )
    yield* explosionRef().size(new Vector2(700, 800),4/8, easeOutBack)
    yield* waitUntil("click")
    yield* mouseRef().position(new Vector2(muteButtonPosition.x +50, muteButtonPosition.y+100), 4/8)
    yield* muteTxtRef().text("🔇", 0)
    yield* waitUntil("something")
    yield* explosionRef().size(new Vector2(0,0),0)
    yield* mouseRef().position(new Vector2(1080/2+100, -1920/8), 4/8)
    yield* muteTxtRef().fontSize(0, 2/8)
    
    var swayAmount = 5
    var totalEarthTime = 1
    // yield* explosionRef().rotation(-swayAmount,2/8*totalEarthTime)
    // yield* explosionRef().rotation(swayAmount,3/8*totalEarthTime)
    // yield explosionRef().rotation(-swayAmount,3/8*totalEarthTime)
    // yield* waitFor(0.4)
    // yield* shake(earthRef, new Vector2(10,10), 2)

    yield earthRef().size(new Vector2(400, 400), 4/8, easeInOutBack)

    var armReference = createRef<Img>()

    yield mainRef().add(<Img ref={armReference} src={armSource} scale={0.85} x={1200} y={-600} rotation={0}/>)
    
    yield* waitUntil("raiseHand")
    yield* all(
        yield armReference().position(new Vector2(350, -500), 6/8),
        yield armReference().rotation(30, 6/8)
    )
    yield* waitUntil("crunchDown")
    yield* all(
        yield armReference().position(new Vector2(410, -625), 3/8, easeInCubic),
        yield armReference().rotation(5, 3/8, easeInCubic)
    )
    var gameNameReference = createRef<Txt>()
    yield mainRef().add(<Txt ref={gameNameReference} fontFamily={'JetBrains Mono'} fontSize={100} fill={"#fff"} stroke={"#303030"} strokeFirst={true} lineWidth={5} shadowColor={"#303030"} shadowOffset={new Vector2(5,5)}>Caps and Hammers</Txt>)
    yield* all(
        yield armReference().position.y(armReference().position.y()+10, 1/8, easeInCubic),
        yield earthRef().position.y(earthRef().position.y()+10, 1/8, easeInCubic),
    )
    yield* all(
        yield armReference().position.y(armReference().position.y()-10, 1/8, easeOutCubic),
        yield earthRef().position.y(earthRef().position.y()-10, 1/8, easeOutCubic),
    )

    yield* waitUntil("liftHand")

    var liftSpeed = 6/8

    function map(from: number, to: number, value: number) {
        return from + (to - from) * value;
    }
    const createEaseInBackMild = (s = 1.70158):TimingFunction => {
        var antiExplosiveNess = 5
        return (value: number, from = 0, to = 1) => {
          value = (s + 1) * Math.pow(value, antiExplosiveNess) - s * Math.pow(value, antiExplosiveNess-1);
      
          return map(from, to, value);
        };
    }
    var easeInBackMild = createEaseInBackMild()
    yield* all(
        yield armReference().position.y(-1400, liftSpeed, easeInBackMild),
        yield armReference().rotation(20, liftSpeed, easeInBackMild),
        yield earthRef().position.y(1920, liftSpeed*1.2, easeInBackMild),
        yield gameNameReference().position.y(1920, liftSpeed*1.2, easeInBackMild)
    )

    yield* waitUntil("introEnd")
});
