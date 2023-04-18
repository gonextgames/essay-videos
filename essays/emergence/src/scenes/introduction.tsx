import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Txt, Rect, Node,CubicBezier} from '@motion-canvas/2d/lib/components';
import {all, waitFor} from '@motion-canvas/core/lib/flow';
import {beginSlide, createRef, Reference} from '@motion-canvas/core/lib/utils';
import {Vector2} from '@motion-canvas/core/lib/types';
import {Img} from '@motion-canvas/2d/lib/components';
import {waitUntil} from '@motion-canvas/core/lib/flow';

export default makeScene2D(function* (view) {
    var txtRef = createRef<Txt>()
  yield view.add(
    <Rect>
        <Txt ref={txtRef} fontSize={40} fill={"#fff"} lineHeight={35} fontFamily={'JetBrains Mono'}>Compilation of Emergence Learnings</Txt>
    </Rect>
  );
  yield* beginSlide('endOfIntroduction');
    yield* txtRef().fill("#ffffff00", 4/8)
});