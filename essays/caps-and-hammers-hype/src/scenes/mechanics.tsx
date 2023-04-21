import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Grid, Txt, Rect, Node,CubicBezier} from '@motion-canvas/2d/lib/components';
import {all, waitFor,sequence} from '@motion-canvas/core/lib/flow';
import {beginSlide, createRef, Reference} from '@motion-canvas/core/lib/utils';
import {Vector2, Direction } from '@motion-canvas/core/lib/types';
import {Img} from '@motion-canvas/2d/lib/components';
import {fadeTransition, slideTransition, useTransition} from '@motion-canvas/core/lib/transitions';
import {waitUntil} from '@motion-canvas/core/lib/flow';
import {createSignal,SimpleSignal, DEFAULT} from '@motion-canvas/core/lib/signals';
import { TimingFunction, easeInBack, easeInBounce, easeInCubic, easeInOutBack, easeInOutBounce, easeInOutCirc, easeInOutElastic, easeOutBack, easeOutBounce, easeOutCirc, easeOutCubic, easeOutElastic, linear } from '@motion-canvas/core/lib/tweening';
import {CodeBlock, insert} from '@motion-canvas/2d/lib/components/CodeBlock';
import nodes from "../../../../common/nodes"

import tiktokOverlaySource from "../../../../common/tiktokOverlay.png"

import CapsAndHammersImages from "../capsAndHammersCards"
import CardHelper from "../card"
import magnifyingSource from "../images/magnifying.png"
import capsAndHammersCards from '../capsAndHammersCards';

type Hand = {
    cardReferences: Reference<Rect>[],
    cardFlipSignals: SimpleSignal<any, void>[],
    cardWidthSignals: SimpleSignal<any, void>[],
    cardHeightSignals: SimpleSignal<any, void>[],
    // cardHandPositionSignals: SimpleSignal<any, void>[]
}

function* createHand(parent: Reference<Node>, handSources: string[], backSource: string) {
    var references = []
    var cardFlipSignals = []
    var cardHandPositionSignals = []
    var cardWidthSignals = []
    var cardHeightSignals = []

    var distance = 300
    var size = 500

    var funcs = []
    for (var s = 0; s < handSources.length; s++) {
        var source = handSources[s]
        const rectReference = createRef<Rect>()
        
        funcs.push(()=>()=>s)

        var flipSignal = createSignal(1)
        cardFlipSignals.push(flipSignal)
        
        // var handPosition = createSignal(thing)
        // cardHandPositionSignals.push(handPosition)

        var widthSignal = createSignal(size*2.5/3.5)
        cardWidthSignals.push(widthSignal)
        var heightSignal = createSignal(size)
        cardHeightSignals.push(heightSignal)
        
        var eachAngleRadian = Math.PI/(handSources.length+1)
        var angleRadian = eachAngleRadian * (s+1)
        
        var x = -Math.cos(angleRadian)*distance
        var y =  -Math.sin(angleRadian)*distance
        var rotation = -90 + (180/(handSources.length+1) * (s+1)) //angleRadian*180

        yield parent().add(<CardHelper.Card 
            frontSrc={source} backSrc={backSource} 
            rectReference={rectReference} 
            rotation={rotation} 
            flipSignal={flipSignal}
            width={widthSignal}
            height={heightSignal}
            x={x}
            y={y}
            compositeOperation='destination-over'
        />)
        references.push(rectReference)
    }

    var hand:Hand = {
        cardReferences: references,
        cardFlipSignals: cardFlipSignals,
        cardWidthSignals: cardWidthSignals,
        cardHeightSignals: cardHeightSignals
        // cardHandPositionSignals: cardHandPositionSignals
    }
    return hand
}
export default makeScene2D(function* (view) {
  
    var mainRef = createRef<Rect>()
    yield view.add(<Rect ref={mainRef} width={"100%"} height={"100%"}>
        {/* <Img zIndex={100} src={tiktokOverlaySource} width={1080} height={1920}/> */}
    </Rect>)

    var widthRatio = 2.5
    var heightRatio = 3.5
    var size = 95

    var shownWidth = size * widthRatio
    var shownHeight = size * heightRatio

    const spyReference = createRef<Rect>()
    const spyWidthSignal = createSignal(shownWidth)
    const spyHeightSignal = createSignal(shownHeight)
    
    yield mainRef().add(<CardHelper.Card rectReference={spyReference} frontSrc={CapsAndHammersImages.spy} backSrc={CapsAndHammersImages.actionBack} width={spyWidthSignal} height={spyHeightSignal} rotation={0} y={50} flipSignal={createSignal(1)}/>)
    
    var magnifyingPositionSignal = createSignal(new Vector2(0, -1920))
    
    const maskRef = createRef<Rect>()
    var size = 600
    yield mainRef().add(<Circle ref={maskRef} position={()=>magnifyingPositionSignal()} fill={"#f00"} width={size} height={size} rotation={0} compositeOperation={"destination-in"}/>)

    const magnifyingRef = createRef<Img>()
    yield mainRef().add(<Img src={magnifyingSource} ref={magnifyingRef} position={()=>magnifyingPositionSignal()} scale={4} rotation={0} compositeOperation={"destination-over"}/>)
    
    const spyBackReference = createRef<Rect>()
    yield mainRef().add(<CardHelper.Card rectReference={spyBackReference} frontSrc={CapsAndHammersImages.spy} backSrc={CapsAndHammersImages.actionBack} width={spyWidthSignal} height={spyHeightSignal} rotation={0} y={50} flipSignal={createSignal(0)} compositeOperation={"destination-over"}/>)
    yield fadeTransition(4/8);

    yield* waitUntil("look")
    yield* magnifyingPositionSignal(new Vector2(0,-1920/2),1, easeInCubic)
    yield mainRef().scale(2,1,easeInOutBack)
    yield* magnifyingPositionSignal(new Vector2(0,0),4/8, easeOutCubic),
    
    yield* waitUntil("shown")
    yield mainRef().scale(1,1)
    yield* magnifyingPositionSignal(new Vector2(0,1920),1)
    yield spyReference().position.y(1920,0)
    yield maskRef().compositeOperation("source-over",0)

    yield* waitUntil("flipCardToEnemy")
    var spinDuration = 4/8
    yield spyBackReference().rotation(180,spinDuration,easeInOutBack)
    yield* waitFor(1/8*spinDuration)
    yield* spyBackReference().position.y(-1920/4, 7/8*spinDuration)

    var handRect = createRef<Rect>()
    yield mainRef().add(<Rect ref={handRect} width={1080} height={1920/3} offsetY={1} y={3000}/>)
    var handSources = [capsAndHammersCards.nuke,capsAndHammersCards.nuke,capsAndHammersCards.nuke,capsAndHammersCards.nuke]
    var hand = yield* createHand(handRect, handSources, capsAndHammersCards.actionBack)
    for(var i = 0 ; i < hand.cardReferences.length ; i++) {
        yield hand.cardReferences[i]().shadowOffset(new Vector2(4,4),0)
        yield hand.cardReferences[i]().shadowColor("303030",0)
        yield hand.cardReferences[i]().compositeOperation("source-over",0)
    }
    const argentinaReference = createRef<Rect>()
    const argentinaWidthSignal = createSignal(shownWidth)
    const argentinaHeightSignal = createSignal(shownHeight)
    const argentinaFlipSignal = createSignal(0.5)
    yield mainRef().add(<CardHelper.Card rectReference={argentinaReference} frontSrc={CapsAndHammersImages.argentina} backSrc={CapsAndHammersImages.countryBack} width={argentinaWidthSignal} height={argentinaHeightSignal} rotation={90} y={-150} flipSignal={argentinaFlipSignal}/>)

    yield* all(
        yield argentinaFlipSignal(1, 4/8, easeOutBack),
        yield handRect().position.y((1920/2)+300,1)
    )
    
    yield* waitUntil("deployCards")
    var rectOffset = new Vector2(-handRect().position().x+0, -handRect().position().y+(handRect().size().y/2))
    var rotations = [5,-5,10,-10]
    var deployDuration = 4/8
    for(var i = 0 ; i < hand.cardReferences.length ; i++) {
        yield* all(
            yield hand.cardReferences[i]().position(rectOffset.addY(200), deployDuration),
            yield hand.cardWidthSignals[i](shownWidth,deployDuration),
            yield hand.cardHeightSignals[i](shownHeight,deployDuration),
            yield hand.cardReferences[i]().rotation(rotations[i],deployDuration)
        )
    }
    var generators = [spyBackReference().position.x(-2000,4/8)]
    for(var i = 0 ; i < hand.cardReferences.length ; i++) {
        generators.push(hand.cardReferences[i]().position.x(2000, 4/8))
    }
    yield* all(...generators)

    yield* waitUntil("mechanicsEnd")
});
