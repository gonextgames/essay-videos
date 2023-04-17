import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Layout, Txt, Line, Rect, Node} from '@motion-canvas/2d/lib/components';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {all, delay,loop,waitFor,waitUntil} from '@motion-canvas/core/lib/flow';
import {createRef, Reference} from '@motion-canvas/core/lib/utils';
import {CodeBlock, edit, insert, lines, word} from '@motion-canvas/2d/lib/components/CodeBlock';
import {Direction, Vector2} from '@motion-canvas/core/lib/types';
import {Img} from '@motion-canvas/2d/lib/components';
import personSource from "../images/person.png"
import { interpolation } from '@motion-canvas/2d/lib/decorators';
import nodes from "../../../../common/nodes"

function *createHealthBarRects(parent: Reference<Node>, ratio:number) {
  
}

function *createHealthBar(parent: Reference<Node>, name: string, position: Vector2) {
  const healthBarRef = createRef<Rect>()
  var sizeRatio = 5
  yield parent().add(<Rect position={position} width={162*sizeRatio} height={42*sizeRatio} fill={"#ccc"} radius={30}>
    <Txt x={-90} y={-50} fontSize={50} lineHeight={50} fontFamily={'JetBrains Mono'}>{name}</Txt>
    <Txt x={300} y={-50} fontSize={50} lineHeight={50} fontFamily={'JetBrains Mono'}>Lv11</Txt>
    <Rect x={90} y={50} fill={"#202020"} width={118*sizeRatio} height={14*sizeRatio} radius={60} >
      <Rect ref={healthBarRef} offsetX={-1} x={-114*sizeRatio/2} fill={"#00ff00"} width={114*sizeRatio} height={10*sizeRatio} radius={60}/>
    </Rect>
  </Rect>)

  return healthBarRef
}

function *thrustNode(thing: Reference<Node>, duration: number) {
  var originalX = thing().position.x() 

  yield* thing().position.x(originalX+25, 4/8) 
  yield* thing().position.x(originalX-25, 1/8)
  yield* thing().position.x(originalX, 4/8) 
}

function *shakeNode(thing: Reference<Node>) {
  var originalX = thing().position.x() 

  yield* thing().position.x(originalX+25, 2/16) 
  yield* thing().position.x(originalX-25, 1/16)
  yield* thing().position.x(originalX+25, 2/16) 
  yield* thing().position.x(originalX-25, 1/16)
  yield* thing().position.x(originalX, 1/16) 
}

export default makeScene2D(function* (view) {
  var mainRef = createRef<Rect>()
  var playerImgRef = createRef<Img>()
  var enemyImgRef = createRef<Img>()
  var messageRef = createRef<Txt>()
  yield view.add(
    <Rect ref={mainRef}>
      <Circle width={600} height={200} x={-400} y={300} fill={"#146014"}/>
      <Img ref={playerImgRef} src={personSource} width={400} height={400} x={-400} y={140}/>
      <Circle width={600} height={200} x={400} y={-100} fill={"#146014"}/>
      <Img ref={enemyImgRef} src={personSource} width={400} height={400} x={2000} y={-300}/>
      <Rect width={"100%"} height={200} offsetY={1} x={0} y={1080/2} fill={"#eee"}>
        <Txt ref={messageRef} fill={"#000"} fontSize={60} lineHeight={60} fontFamily={'JetBrains Mono'}></Txt>
      </Rect>
    </Rect>
  )

  var enemyHealthbarRef = yield* createHealthBar(mainRef, "GameDesign Coworker", new Vector2(-400,-300))
  var yourHealthBarRef = yield* createHealthBar(mainRef, "Downtrodden Everyman", new Vector2(400,150))

  yield* waitUntil("enemyAppears")
  yield* all(
    yield enemyImgRef().position.x(400, 6/8),
    yield messageRef().text(`A wild GAMEDESIGN COWORKER appears!`, 6/8)
  )

  yield* waitUntil("idea")
  yield* messageRef().text(`GAMEDESIGN COWORKER uses EXPERIMENT!`, 6/8)
  yield* thrustNode(enemyImgRef, 6/8)
  yield* shakeNode(playerImgRef)
  yield* yourHealthBarRef().width(100*5,4/8)
  yield* messageRef().text(`The team is not very effective.`, 6/8)

  yield* waitUntil("endScene")
});