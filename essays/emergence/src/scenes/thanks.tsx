import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Txt} from '@motion-canvas/2d/lib/components';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {beginSlide} from '@motion-canvas/core/lib/utils';
import {Direction, Vector2} from '@motion-canvas/core/lib/types';
import {waitUntil} from '@motion-canvas/core/lib/flow';

export default makeScene2D(function* (view) {
    yield view.add(
        <>
        <Txt fontSize={60} fill={"#fff"} lineHeight={35} fontFamily={'JetBrains Mono'}>Thanks for listening!</Txt>
        </>
    )
    yield* slideTransition(Direction.Right);
    yield* waitUntil("endOfPresentation")
})