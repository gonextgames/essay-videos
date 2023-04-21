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

function* incrementNumber(influenceReference: Reference<Txt>, newNumber: string) {
    var duration = 1/8
    var rotationMax = 20
    yield* all(
        yield influenceReference().text(newNumber+"/13", 0),
        yield influenceReference().fontSize(190*1.5, duration/2, easeInCubic),
        yield influenceReference().fill("#ffaa00", duration/2, easeInCubic),
        yield influenceReference().rotation(-(rotationMax/2) +(Math.random()*rotationMax), duration/2)
    )
    yield* all(
        yield influenceReference().fontSize(190, duration/2, easeInCubic),
        yield influenceReference().fill("#fff", duration/2, easeOutCubic)
    )
}

function* showCard(parent: Reference<Node>, cardSource:string, rotation:number, duration: number) {

    var shownRatio = 300
    var shownSize = new Vector2(shownRatio*2.5, shownRatio*3.5)
    var cardReference = createRef<Rect>()
    yield parent().add(<CardHelper.Card rectReference={cardReference} frontSrc={cardSource} backSrc={CapsAndHammersImages.actionBack} width={createSignal(shownSize.x)} height={createSignal(shownSize.y)} x={1080/2+(shownSize.x)} y={-50} flipSignal={createSignal(1)} rotation={rotation}/>)
    var shrunkRatio = 100
    var shrunkSize = new Vector2(shrunkRatio*2.5, shrunkRatio*3.5)
    var tinyCardReference = createRef<Rect>()
    yield parent().add(<CardHelper.Card rectReference={tinyCardReference} frontSrc={cardSource} backSrc={CapsAndHammersImages.actionBack} width={createSignal(shrunkSize.x)} height={createSignal(shrunkSize.y)} x={-(1080/2+(shrunkSize.x))} y={270} flipSignal={createSignal(1)} rotation={rotation}/>)
    
    var cardName = cardSource.replace(/^.*[\\\/]/, '')
    yield* waitUntil("show"+cardName)
    yield* cardReference().position.x(0,4/8*duration, easeOutCubic)

    yield* waitUntil("hide"+cardName)
    yield* cardReference().position.x(-1080,2/8*duration,easeInCubic)
    // yield* waitFor(0.3)

    yield* waitUntil("showTiny"+cardName)
    yield tinyCardReference().position.x(0,3/8*duration, easeOutCubic)
    yield* waitFor(2/8)

    return tinyCardReference
}

function* showDefconCard(defconCardRectReference: Reference<Rect>, flipSignal: SimpleSignal<any, void>, duration: number) {
    yield* all(
        yield defconCardRectReference().shadowOffset(new Vector2(15,15),duration),
        yield defconCardRectReference().shadowColor("#060606",duration),
        yield defconCardRectReference().rotation(0,duration),
        yield flipSignal(1,duration),
        yield defconCardRectReference().position(new Vector2(0,0), duration)
    )
}

function* peelCardAway(defconCardRectReference: Reference<Rect>, flipSignal: SimpleSignal<any, void>, duration: number) {
    yield* all(
        yield defconCardRectReference().position(new Vector2(-1920/2,-1920/2),duration),
        yield flipSignal(0.6, duration)
    )
}

function* shake(reference: Reference<Node>, shakeHalfDisplacement: Vector2, duration: number) {
    var originalPosition = reference().position()
    var a = new Vector2(originalPosition.x - shakeHalfDisplacement.x, originalPosition.y - shakeHalfDisplacement.y)
    var b = new Vector2(originalPosition.x + shakeHalfDisplacement.x, originalPosition.y + shakeHalfDisplacement.y)
    var count = 12
    var shakeDuration = count/duration
    
    yield* reference().position(a, shakeDuration/2)
    yield* reference().position(b, shakeDuration)
    yield* reference().position(a, shakeDuration)
    yield* reference().position(b, shakeDuration)
    yield* reference().position(a, shakeDuration)
    yield* reference().position(b, shakeDuration)
    yield* reference().position(a, shakeDuration)
    yield* reference().position(b, shakeDuration)
    yield* reference().position(a, shakeDuration)
    yield* reference().position(b, shakeDuration)
    yield* reference().position(a, shakeDuration)
    yield* reference().position(b, shakeDuration)
    
}

function* createMuteAnimation(mainRef: Reference<Rect>) {
    var muteTxtRef = createRef<Txt>()
    yield mainRef().add(<Txt ref={muteTxtRef} fontFamily={'JetBrains Mono'} fontSize={0} fill={"#fff"} stroke={"#303030"} strokeFirst={true} lineWidth={5} shadowColor={"#303030"} shadowOffset={new Vector2(5,5)}>🔊</Txt>)

    var mouseRef = createRef<Img>()
    yield mainRef().add(<Img ref={mouseRef} src={mousePointerSource} scale={0.25} offsetX={1} offsetY={1} x={1080/2+100} y={1920/4}/>)

    var muteButtonPosition = new Vector2(1080/4, -1920/8)
    yield* all(
        yield muteTxtRef().fontSize(200, 4/8),
        yield muteTxtRef().position(muteButtonPosition, 4/8),
    )
    yield* mouseRef().position(new Vector2(muteButtonPosition.x +50, muteButtonPosition.y+100), 4/8)
    yield* muteTxtRef().text("🔇", 0)
    yield* waitFor(4/8)
    yield* mouseRef().position(new Vector2(1080/2+100, -1920/8), 4/8)
    yield* muteTxtRef().fontSize(0, 2/8)
}

export default makeScene2D(function* (view) {
  
    var countryCardColor = "#13162b"
    var mainRef = createRef<Rect>()
    yield view.add(<Rect ref={mainRef} width={"100%"} height={"100%"} fill={countryCardColor}>
        {/* <Img zIndex={100} src={tiktokOverlaySource} width={1080} height={1920}/> */}
    </Rect>)

    var widthRatio = 2.5
    var heightRatio = 3.5
    var size = 300
    var shrunkenSize = 95

    var shownWidth = size * widthRatio
    var shownHeight = size * heightRatio
    var cardSize = new Vector2(shrunkenSize*widthRatio, shrunkenSize*heightRatio)


    const argentinaReference = createRef<Rect>()
    const argentinaWidthSignal = createSignal(shownWidth)
    const argentinaHeightSignal = createSignal(shownHeight)
    const argentinaFlipSignal = createSignal(0)
    yield mainRef().add(<CardHelper.Card rectReference={argentinaReference} frontSrc={CapsAndHammersImages.argentina} backSrc={CapsAndHammersImages.countryBack} width={argentinaWidthSignal} height={argentinaHeightSignal} rotation={90} flipSignal={argentinaFlipSignal}/>)

    const brazilReference = createRef<Rect>()
    const brazilWidthSignal = createSignal(cardSize.x)
    const brazilHeightSignal = createSignal(cardSize.y)
    const brazilFlipSignal = createSignal(0.5)
    yield mainRef().add(<CardHelper.Card rectReference={brazilReference} frontSrc={CapsAndHammersImages.brazil} backSrc={CapsAndHammersImages.countryBack} width={brazilWidthSignal} height={brazilHeightSignal} x={350} y={-550} rotation={90+5} flipSignal={brazilFlipSignal}/>)

    const chinaReference = createRef<Rect>()
    const chinaWidthSignal = createSignal(cardSize.x)
    const chinaHeightSignal = createSignal(cardSize.y)
    const chinaFlipSignal = createSignal(0.5)
    yield mainRef().add(<CardHelper.Card rectReference={chinaReference} frontSrc={CapsAndHammersImages.china} backSrc={CapsAndHammersImages.countryBack} width={chinaWidthSignal} height={chinaHeightSignal} x={-350} y={-550} rotation={90-3} flipSignal={chinaFlipSignal}/>)
    
    yield* waitUntil("showCommunism")

    var communismRef = createRef<Img>()
    var thinkingRef = createRef<Img>()
    var questionRef = createRef<Txt>()
    yield mainRef().add(<Img src={communismSource} size={new Vector2(0,0)} ref={communismRef} y={-500} shadowColor={"#141414"} shadowOffset={new Vector2(5,5)}/>)
    yield mainRef().add(<Img src={thinkingSource}  size={new Vector2(500,500)} ref={thinkingRef} x={(1080/2)+350} y={300} shadowColor={"#141414"} shadowOffset={new Vector2(5,5)}/>)
    yield mainRef().add(<Txt fontFamily={'JetBrains Mono'} x={300} y={-450} rotation={5} fill={"#fff"} shadowColor={"#141414"} shadowOffset={new Vector2(5,5)} fontSize={0} ref={questionRef}>?</Txt>)

    var sceneSetupDuration = 4/8
    yield* all(
        yield communismRef().size(new Vector2(400,400), sceneSetupDuration, easeOutBack),
        yield questionRef().fontSize(400, sceneSetupDuration, easeOutBack),
        yield thinkingRef().position(new Vector2(200,175),sceneSetupDuration, easeOutCubic),
        yield thinkingRef().size(new Vector2(700,700),sceneSetupDuration, easeOutCubic)
    )

    yield* waitUntil("hideCommunism")
    yield* all(
        yield communismRef().position.y(-1200, 5/8),
        yield questionRef().position.y(-1200, 5/8),
        yield thinkingRef().position(new Vector2(200,1920),1),
    )
    yield* waitUntil("shrink")
    yield* all(
        yield argentinaWidthSignal(cardSize.x, 1, easeInOutBack),
        yield argentinaHeightSignal(cardSize.y, 1, easeInOutBack),
        yield argentinaReference().position.y(-550, 1, easeInOutBack)
    )
    yield argentinaReference().rotation(argentinaReference().rotation()+3, 4, easeOutCubic)
    yield* all(
        yield mainRef().fill("#141414", 2/8),
        yield argentinaFlipSignal(1,2/8),
    )

    yield* waitUntil("showCards")
    var cards = [
        capsAndHammersCards.guerilla, 
        capsAndHammersCards.nuke,
        capsAndHammersCards.spy, 
        capsAndHammersCards.defector,
        capsAndHammersCards.diplomat,
        capsAndHammersCards.policeman,
    ]
    var rotations = [5, -3, 1, -2, 1, -5]
    var values = [3, 3, 3, 1, 1, 3]
    var value = 0

    var influenceReference = createRef<Txt>()
    yield mainRef().add(<Txt ref={influenceReference} fontFamily={'JetBrains Mono'} x={0} y={-100} rotation={0} fill={"#fff"} shadowColor={"#141414"} shadowOffset={new Vector2(5,5)} fontSize={0}>0/13</Txt>)
    
    yield* waitUntil("showNumber")
    yield* brazilFlipSignal(1, 2/8)
    yield* chinaFlipSignal(1, 2/8)
    yield* influenceReference().fontSize(190,4/8, easeOutBack)

    var tinyActionCardReferences = []
    for (var c = 0 ; c < cards.length ; c++) {
        var tinyActionCardReference = yield* showCard(mainRef, cards[c], rotations[c], 4/8)
        tinyActionCardReferences.push(tinyActionCardReference)
        
        value += values[c]
        yield* incrementNumber(influenceReference, value.toString())
        yield* waitFor(2/8)
    }
    yield influenceReference().fill("#ff0000",4/8)

    var pointReference = createRef<CubicBezier>()
    yield mainRef().add(<nodes.QuickBezier reference={pointReference} startingPosition={new Vector2(300,300)} endingPosition={new Vector2(75,5)} lineWidth={40}/>)

    yield* waitUntil("wait")
    yield* pointReference().end(1,4/8)
    yield* waitUntil("holdArrow")
    yield* pointReference().start(1,4/8)

    var defconSources = [
        capsAndHammersCards.defconOne,
        capsAndHammersCards.defconTwo,
        capsAndHammersCards.defconThree,
        capsAndHammersCards.defconFour,
        capsAndHammersCards.defconFive
    ]
    var defconReferences = []
    var defconWidthSignals = []
    var defconHeightSignals = []
    var defconFlipSignals = []

    yield* waitUntil("showDefconCards")
    for (var i = 0 ; i < 5; i++) {
        var defconReference = createRef<Rect>()
        var flipSignal = createSignal(0.9)
        defconFlipSignals.push(flipSignal)

        var defconWidthSignal = createSignal(shownWidth)
        defconWidthSignals.push(defconWidthSignal)

        var defconHeightSignal = createSignal(shownHeight)
        defconHeightSignals.push(defconHeightSignal)

        yield mainRef().add(<CardHelper.Card rectReference={defconReference} frontSrc={defconSources[i]} backSrc={CapsAndHammersImages.defconBack} width={defconWidthSignal} x={i*15} y={-1920} height={defconHeightSignal} rotation={-30} flipSignal={flipSignal}/>)
        defconReferences.push(defconReference)
        yield* defconReference().position.y(-i*30, 2/8, easeOutCubic)
    }
    yield* waitUntil("removeDefconCards")
    for (var i = 4 ; i >= 1; i--) {
        yield* peelCardAway(defconReferences[i], defconFlipSignals[i], 2/8)
    }
    yield* waitUntil("showDefconOne")
    yield* all(
        yield defconWidthSignals[0](1920*2.4/3.5, 6/8),
        yield defconHeightSignals[0](1920, 6/8),
        yield showDefconCard(defconReferences[0], defconFlipSignals[0], 6/8)
    )
    
    var explosionRef = createRef<Img>()
    var earthRef = createRef<Img>()
    yield mainRef().add(<Img ref={explosionRef} src={explosionSource}y={250}  width={0} height={0} offsetY={1}/>)
    yield mainRef().add(<Img ref={earthRef} src={earthSource} width={0} height={0}/>)

    var earthWidth = 600
    yield* waitUntil("showEarth")
    yield influenceReference().fontSize(0,0)
    yield argentinaFlipSignal(0.5,0)
    yield chinaFlipSignal(0.5,0)
    yield brazilFlipSignal(0.5,0)
    for(var reference of tinyActionCardReferences) {
        yield reference().position(-1000,0)
    }
    yield* peelCardAway(defconReferences[0], defconFlipSignals[0], 2/8)    
    yield createMuteAnimation(mainRef)
    yield earthRef().size(new Vector2(earthWidth,earthWidth),4/8, easeOutBack)
    
    yield explosionRef().size(new Vector2(700, 800),4/8, easeOutBack)
    var swayAmount = 5
    var totalEarthTime = 1
    yield* explosionRef().rotation(-swayAmount,2/8*totalEarthTime)
    yield* explosionRef().rotation(swayAmount,3/8*totalEarthTime)
    yield explosionRef().rotation(-swayAmount,3/8*totalEarthTime)
    yield* waitFor(0.4)
    yield* explosionRef().size(new Vector2(0,0),0)
    // yield* shake(earthRef, new Vector2(10,10), 2)

    yield* waitUntil("removeDefconOne")
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
