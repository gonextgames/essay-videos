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

  var defaultSidebar = 2
  var defaultWorkspace = 8
  var panes = yield* nodes.createFakeVisualStudioCode(visualStudioRef, 2, 8)  
  yield* waitUntil("columns")
  yield* nodes.updateSidebarWidthRatio(panes.sidebarColumnRef, panes.workspaceColumnRef, panes.workspaceRowRef, panes.terminalRowRef, 6, defaultWorkspace, 1)
  yield* waitUntil("resetColumns")
  yield* nodes.updateSidebarWidthRatio(panes.sidebarColumnRef, panes.workspaceColumnRef, panes.workspaceRowRef, panes.terminalRowRef, defaultSidebar, defaultWorkspace, 1)
  
  yield* waitUntil("rows")
  yield* nodes.updateSidebarWidthRatio(panes.sidebarColumnRef, panes.workspaceColumnRef, panes.workspaceRowRef, panes.terminalRowRef, defaultSidebar, 3, 1)
  yield* waitUntil("resetRows")
  yield* nodes.updateSidebarWidthRatio(panes.sidebarColumnRef, panes.workspaceColumnRef, panes.workspaceRowRef, panes.terminalRowRef, defaultSidebar, defaultWorkspace, 1)

  
  yield* waitUntil("both")
  yield* nodes.updateSidebarWidthRatio(panes.sidebarColumnRef, panes.workspaceColumnRef, panes.workspaceRowRef, panes.terminalRowRef, 6, 3 , 1)
  yield* waitUntil("resetBoth")
  yield* nodes.updateSidebarWidthRatio(panes.sidebarColumnRef, panes.workspaceColumnRef, panes.workspaceRowRef, panes.terminalRowRef, defaultSidebar, defaultWorkspace, 1)


  yield* waitUntil("endScene")
});