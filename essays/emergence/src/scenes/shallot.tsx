import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Layout, Txt, Line, Rect, Node,CubicBezier} from '@motion-canvas/2d/lib/components';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {all, delay,loop,waitFor,waitUntil} from '@motion-canvas/core/lib/flow';
import {createRef, Reference} from '@motion-canvas/core/lib/utils';
import {CodeBlock, edit, insert, lines, word} from '@motion-canvas/2d/lib/components/CodeBlock';
import {Direction, Vector2} from '@motion-canvas/core/lib/types';
import {Img} from '@motion-canvas/2d/lib/components';
import coinsImageSource from "../images/coins.png"
import { interpolation } from '@motion-canvas/2d/lib/decorators';

export default makeScene2D(function* (view) {
  var mainRef = createRef<Rect>()
  yield view.add(
    <Rect ref={mainRef}/>
  )

  
  
});
