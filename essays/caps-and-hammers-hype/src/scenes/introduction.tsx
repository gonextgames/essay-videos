import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Txt, Rect, Node,CubicBezier} from '@motion-canvas/2d/lib/components';
import {all, waitFor} from '@motion-canvas/core/lib/flow';
import {beginSlide, createRef, Reference} from '@motion-canvas/core/lib/utils';
import {Vector2, Direction} from '@motion-canvas/core/lib/types';
import {Img} from '@motion-canvas/2d/lib/components';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {waitUntil} from '@motion-canvas/core/lib/flow';
import {createSignal} from '@motion-canvas/core/lib/signals';

import tiktokOverlaySource from "../../../../common/tiktokOverlay.png"

import CapsAndHammersImages from "../capsAndHammersCards"
import CardHelper from "../card"
import communismSource from "../images/communism.png"
import { easeInBack, easeInBounce, easeInCubic, easeInOutBack, easeInOutBounce, easeInOutCirc, easeInOutElastic, easeOutBack, easeOutBounce, easeOutCirc, easeOutCubic, easeOutElastic } from '@motion-canvas/core/lib/tweening';
import capsAndHammersCards from '../capsAndHammersCards';


function* incrementNumber(influenceReference: Reference<Txt>, newNumber: string) {
    var duration = 2/8
    var rotationMax = 20
    yield* all(
        yield influenceReference().text(newNumber+"+", 0),
        yield influenceReference().fontSize(190*1.5, duration/2, easeInCubic),
        yield influenceReference().fill("#ffaa00", duration/2, easeInCubic),
        yield influenceReference().rotation(-(rotationMax/2) +(Math.random()*rotationMax), duration/2)
    )
    yield* all(
        yield influenceReference().fontSize(190, duration/2, easeInCubic),
        yield influenceReference().fill("#fff", duration/2, easeOutCubic)
    )
}

function* showCard(parent: Reference<Node>, cardSource:string, rotation:number) {

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
    yield* cardReference().position.x(0,4/8, easeOutCubic)

    yield* waitUntil("hide"+cardName)
    yield* cardReference().position.x(-1080,4/8,easeInCubic)
    // yield* waitFor(0.3)

    yield* waitUntil("showTiny"+cardName)
    yield* tinyCardReference().position.x(0,6/8, easeOutCubic)
}


export default makeScene2D(function* (view) {
  
    var countryCardColor = "#13162b"
    var mainRef = createRef<Rect>()
    yield view.add(<Rect ref={mainRef} width={"100%"} height={"100%"} fill={countryCardColor}>
        <Img zIndex={100} src={tiktokOverlaySource} width={1080} height={1920}/>
    </Rect>)

    var widthRatio = 2.5
    var heightRatio = 3.5
    var size = 300

    var shownWidth = size * widthRatio
    var shownHeight = size * heightRatio

    const countryBackReference = createRef<Rect>()
    const widthSignal = createSignal(shownWidth)
    const heightSignal = createSignal(shownHeight)
    const argentinaFlipSignal = createSignal(0)
    yield mainRef().add(<CardHelper.Card rectReference={countryBackReference} frontSrc={CapsAndHammersImages.argentina} backSrc={CapsAndHammersImages.countryBack} width={widthSignal} height={heightSignal} rotation={90} flipSignal={argentinaFlipSignal}/>)
    
    yield* waitUntil("showCommunism")

    var communismRef = createRef<Img>()
    var questionRef = createRef<Txt>()
    yield mainRef().add(<Img src={communismSource} size={new Vector2(0,0)} ref={communismRef} y={-500} shadowColor={"#141414"} shadowOffset={new Vector2(5,5)}/>)
    yield mainRef().add(<Txt fontFamily={'JetBrains Mono'} x={300} y={-450} rotation={5} fill={"#fff"} shadowColor={"#141414"} shadowOffset={new Vector2(5,5)} fontSize={0} ref={questionRef}>?</Txt>)

    yield* all(
        yield communismRef().size(new Vector2(400,400), 6/8, easeOutBack),
        yield questionRef().fontSize(400, 6/8, easeOutBack)
    )

    var shrunkenSize = 95
    var cardSize = new Vector2(shrunkenSize*widthRatio, shrunkenSize*heightRatio)
    yield* waitUntil("hideCommunism")
    yield* all(
        yield communismRef().position.y(-1200, 5/8),
        yield questionRef().position.y(-1200, 5/8)
    )
    yield* waitUntil("shrink")
    yield* all(
        yield widthSignal(cardSize.x, 1, easeInOutBack),
        yield heightSignal(cardSize.y, 1, easeInOutBack),
        yield countryBackReference().position.y(-550, 1, easeInOutBack)
    )
    yield countryBackReference().rotation(countryBackReference().rotation()+3, 4, easeOutCubic)
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
    yield mainRef().add(<Txt ref={influenceReference} fontFamily={'JetBrains Mono'} x={0} y={-100} rotation={0} fill={"#fff"} shadowColor={"#141414"} shadowOffset={new Vector2(5,5)} fontSize={0}>0+</Txt>)
    
    yield* waitUntil("showNumber")
    yield* influenceReference().fontSize(190,4/8, easeOutBack)

    for (var c = 0 ; c < cards.length ; c++) {
        yield showCard(mainRef, cards[c], rotations[c])
        yield* waitFor(1.2)
        value += values[c]
        yield incrementNumber(influenceReference, value.toString())
    }    

    yield* waitFor(1)
});

// var chinaReference = createRef<Rect>()
// var chinaFlipSignal = createSignal(0.5)
// yield mainRef().add(<CardHelper.Card rectReference={chinaReference} x={-(1080/3)+20} y={-550} frontSrc={CapsAndHammersImages.china} backSrc={CapsAndHammersImages.countryBack} width={createSignal(cardSize.x)} height={createSignal(cardSize.y)} rotation={90} flipSignal={chinaFlipSignal}/>)
// yield* chinaFlipSignal(1,2/8)

// var brazilReference = createRef<Rect>()
// var brazilFlipSignal = createSignal(0.5)
// yield mainRef().add(<CardHelper.Card rectReference={brazilReference} x={(1080/3)-20} y={-550} frontSrc={CapsAndHammersImages.brazil} backSrc={CapsAndHammersImages.countryBack} width={createSignal(cardSize.x)} height={createSignal(cardSize.y)} rotation={90} flipSignal={brazilFlipSignal}/>)
// yield* brazilFlipSignal(1,2/8)
