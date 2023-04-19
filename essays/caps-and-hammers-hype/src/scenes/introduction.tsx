import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Txt, Rect, Node,CubicBezier} from '@motion-canvas/2d/lib/components';
import {all, waitFor} from '@motion-canvas/core/lib/flow';
import {beginSlide, createRef, Reference} from '@motion-canvas/core/lib/utils';
import {Vector2, Direction} from '@motion-canvas/core/lib/types';
import {Img} from '@motion-canvas/2d/lib/components';
import coinsImageSource from "../images/penny.png"
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {waitUntil} from '@motion-canvas/core/lib/flow';

import admiralSource from "../images/actions-admiral.jpg"
import actionBackSource from "../images/actions-back.jpg"

import CardHelper from "../card"

export default makeScene2D(function* (view) {
  
    var mainRef = createRef<Rect>()
    yield view.add(<Rect ref={mainRef}/>)

    var widthRatio = 2.5
    var heightRatio = 3.5
    var size = 100

    var shownWidth = size*widthRatio
    var shownHeight = size* heightRatio
    const admiralCardReference = createRef<Rect>()
    yield mainRef().add(<CardHelper.Card rectReference={admiralCardReference} frontSrc={admiralSource} backSrc={actionBackSource} width={shownWidth} height={shownHeight} rotation={0}/>)

    yield* waitUntil("flip")
    var durationSeconds = 1
    yield admiralCardReference().rotation(360, durationSeconds  * 5)
    yield* CardHelper.flipCard(admiralCardReference, shownWidth, durationSeconds)
    yield* CardHelper.flipCard(admiralCardReference, shownWidth, durationSeconds)
    yield* CardHelper.flipCard(admiralCardReference, shownWidth, durationSeconds)
    yield* CardHelper.flipCard(admiralCardReference, shownWidth, durationSeconds)
    yield* CardHelper.flipCard(admiralCardReference, shownWidth, durationSeconds)
    
    yield* waitFor(1)
});
