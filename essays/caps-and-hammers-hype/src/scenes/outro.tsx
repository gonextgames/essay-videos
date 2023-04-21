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

export default makeScene2D(function* (view) {
  
    var countryCardColor = "#13162b"
    var mainRef = createRef<Rect>()
    yield view.add(<Rect ref={mainRef} width={"100%"} height={"100%"} fill={"#141414"}>
        {/* <Img zIndex={100} src={tiktokOverlaySource} width={1080} height={1920}/> */}
    </Rect>)

    var widthRatio = 2.5
    var heightRatio = 3.5

    var shownWidth = 95 * widthRatio
    var shownHeight = 95 * heightRatio

    const argentinaReference = createRef<Rect>()
    const argentinaWidthSignal = createSignal(shownWidth)
    const argentinaHeightSignal = createSignal(shownHeight)
    const argentinaFlipSignal = createSignal(0.5)
    yield mainRef().add(<CardHelper.Card rectReference={argentinaReference} frontSrc={CapsAndHammersImages.argentina} backSrc={CapsAndHammersImages.countryBack} width={argentinaWidthSignal} height={argentinaHeightSignal} y={-150} rotation={90} flipSignal={argentinaFlipSignal}/>)
    
    yield* waitUntil("showOriginalCountry")
    yield argentinaFlipSignal(0,2/8, easeOutBack)
    yield* waitUntil("zoomOriginalCountry")
    yield* all(
        yield argentinaWidthSignal(300 * widthRatio,1),
        yield argentinaHeightSignal(300 * heightRatio,1),
        yield argentinaReference().position.y(0,1, easeInBack),
        yield mainRef().fill(countryCardColor,1)
    )

    yield* waitUntil("end")
});
