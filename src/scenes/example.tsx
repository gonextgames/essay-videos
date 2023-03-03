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
import {createRef} from '@motion-canvas/core/lib/utils';
import {CodeBlock, edit, insert, lines, word} from '@motion-canvas/2d/lib/components/CodeBlock';
import {Direction, Vector2} from '@motion-canvas/core/lib/types';

export default makeScene2D(function* (view) {
  const code = createRef<CodeBlock>();
  const textStyle = {
    fontWeight: 700,
    fontFamily: 'JetBrains Mono',
    fontSize: 32,
    offsetY: -1,
    padding: 10,
    cache: true,
  };
  yield view.add(
    <>
      <Rect
        offset={-1}
        x={-960 + 80}
        y={-540 + 80}
        height={1080 - 160}
        width={960}
        clip
      >
      <CodeBlock 
        selection={[
          [
            [0, 0],
            [8, 100],
          ],
        ]}
        ref={code}
        fontSize={24}
        lineHeight={36}
        offsetX={-1}
        x={-960 / 2}
        fontFamily={'JetBrains Mono'}
        code={`templative`} />,
      </Rect>
    </>
  );

  yield* slideTransition(Direction.Bottom, 1);
  yield* waitUntil('showInit');
  // yield* code().selection(lines(1), 0.3);
  yield* code().edit(2, false)`templative${insert(` init`)}`;
  yield* waitUntil("highlightInit")
  yield* code().selection(word(0, 11, 4), 1);
  // yield* waitUntil('showProduce');
  // yield* code().edit(0.8)`templative produce`;

  yield* waitUntil("hold")


});