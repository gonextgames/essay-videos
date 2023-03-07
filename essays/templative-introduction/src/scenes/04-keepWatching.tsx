import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Layout, Text, Line, Rect, Node} from '@motion-canvas/2d/lib/components';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {all, delay,loop,waitFor,waitUntil} from '@motion-canvas/core/lib/flow';
import {createRef, Reference} from '@motion-canvas/core/lib/utils';
import {CodeBlock, edit, insert, lines, word} from '@motion-canvas/2d/lib/components/CodeBlock';
import {Direction, Vector2} from '@motion-canvas/core/lib/types';
import {Image} from '@motion-canvas/2d/lib/components';
import gamecrafterImage from "../images/gamecrafter.png"
import { interpolation } from '@motion-canvas/2d/lib/decorators';
import nodes from "../nodes"

export default makeScene2D(function* (view) {
  const leftRectRef = createRef<Rect>();
  const rightRectRef = createRef<Rect>();
  
  yield view.add(
    
    <>
        <Rect
            // fill={"#ff00ff30"}
            width={960}
            height={920}
            x={-960/2}
            y={0}
            clip
            ref={leftRectRef}
        />
        <Rect
            // fill={"#ffffff30"}
            offset={-1}
            width={955}
            height={920}
            x={1000}
            y={-920/2}
            clip
            ref={rightRectRef}
        />
    </>
  )
  yield* waitFor(2)
});