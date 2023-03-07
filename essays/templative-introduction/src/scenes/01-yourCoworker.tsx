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
  const visualStudioRef = createRef<Rect>();
  yield view.add(
    <Rect ref={visualStudioRef}/>
  )

  var panes = yield* nodes.createFakeVisualStudioCode(visualStudioRef, 0.25,0.9)
  var sideBarRef = panes[0]
  var workspaceRef = panes[1]
  var terminalRef = panes[2]
  var dividerRef = panes[2]
  yield* waitUntil("first")
  yield* nodes.updateSidebarWidthRatio(sideBarRef, workspaceRef, terminalRef, dividerRef, 0.4, 0.65, 1)
  yield* waitUntil("second")
  yield* nodes.updateSidebarWidthRatio(sideBarRef, workspaceRef, terminalRef, dividerRef, 0.4, 0.4, 1)
  yield* waitUntil("third")
  yield* nodes.updateSidebarWidthRatio(sideBarRef, workspaceRef, terminalRef, dividerRef, 0.25, 0.65, 1)
  yield* waitFor(15.3)
});