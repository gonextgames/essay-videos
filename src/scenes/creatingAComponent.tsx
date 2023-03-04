import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Layout, Text, Line, Rect, Node} from '@motion-canvas/2d/lib/components';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {
  all,
  delay,
  loop,
  waitFor,
  waitUntil,
} from '@motion-canvas/core/lib/flow';
import {createRef, Reference} from '@motion-canvas/core/lib/utils';
import {CodeBlock, edit, insert, lines, word} from '@motion-canvas/2d/lib/components/CodeBlock';
import {Direction, Vector2} from '@motion-canvas/core/lib/types';

import {Image} from '@motion-canvas/2d/lib/components';
import admiral from "../images/capsAction-admiral.jpg"
import actionBack from "../images/capsAction-back.jpg"
import { interpolation } from '@motion-canvas/2d/lib/decorators';

function *animateCode(codeBlock: Reference<CodeBlock>) {

}

export default makeScene2D(function* (view) {
  const codeRectRef = createRef<Rect>();
  const componentsRectRef = createRef<Rect>();
  const codeRef = createRef<CodeBlock>();
  
  yield view.add(
    <>
      <Rect
        // fill={"#ffffff"}
        offset={-1}
        x={-960 + 80}
        y={2000}
        height={1080 - 160}
        width={960}
        clip
        ref={codeRectRef}
      >
      <CodeBlock 
        selection={[
          [
            [0, 0],
            [8, 100],
          ],
        ]}
        ref={codeRef}
        fontSize={24}
        lineHeight={36}
        offsetX={-1}
        x={-960 / 2}
        fontFamily={'JetBrains Mono'}
        code={`templative`} />,
      </Rect>
      <Rect
        // fill={"#ffffff"}
        offset={-1}
        x={0 + 80}
        y={-2000}
        height={1080 - 160}
        width={800}
        clip
        ref={componentsRectRef}
      >
        <Image src={actionBack} x={-30} scale={0.4} rotation={-5}/>
        <Image src={admiral} x={30} scale={0.4} rotation={5}/>
      </Rect>
    </>
  );
  yield* waitUntil('showComponentsRect')
  yield* componentsRectRef().position(new Vector2(0 + 80, -540 + 80), 2/8)
  yield* waitUntil('showCodeRect')
  yield* codeRectRef().position(new Vector2(-960 + 80, -540 + 80), 2/8)
  yield* waitUntil('showCreate');
  yield* codeRef().edit(1/8, true)`templative${insert(` create`)}`;
  yield* waitUntil('showType');
  yield* codeRef().edit(1/8, true)`templative create ${insert(`TYPE`)}`;
  yield* waitUntil('showDash');
  yield* codeRef().edit(1/8, true)`templative create TYPE ${insert(`--name`)}`;
  yield* waitUntil('showComponentName');
  yield* codeRef().edit(1/8, true)`templative create TYPE --name ${insert(`COMPONENTNAME`)}`;
  yield* waitUntil("replaceValues")
  yield* codeRef().edit(1/4, true)`templative create ${edit(`TYPE`, `deckpoker`)} --name ${edit(`COMPONENTNAME`, `assetDeck`)}`;
  yield* waitUntil("resetHighlights")
  yield* codeRef().selection(word(0,0,100), 1/8)

  yield* waitUntil("endSceneHold")


});