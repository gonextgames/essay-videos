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
import {CodeBlock, edit, insert, lines, word, CodeModification} from '@motion-canvas/2d/lib/components/CodeBlock';
import {Direction, Vector2} from '@motion-canvas/core/lib/types';

import {Image} from '@motion-canvas/2d/lib/components';
import admiral from "../images/capsAction-admiral.jpg"
import actionBack from "../images/capsAction-back.jpg"
import { interpolation } from '@motion-canvas/2d/lib/decorators';

function *animateCode(codeBlock: Reference<CodeBlock>) {

}

export default makeScene2D(function* (view) {
  const codeRectRef = createRef<Rect>();
  const folderCodeRef = createRef<CodeBlock>();
  const templativeCommandRef = createRef<CodeBlock>();
  
  yield* view.add(
    <>
      <Rect
        // fill={"#ffffff"} 
        offset={-1}
        x={-1300/2}
        y={-960/2}
        width={1300}
        height={920}
        clip
        ref={codeRectRef}
      >
      <CodeBlock 
        // selection={[
        //   [
        //     [0, 0],
        //     [8, 100],
        //   ],
        // ]}
        ref={folderCodeRef}
        fontSize={40}
        lineHeight={40}
        offsetX={-1}
        x={-200}
        fontFamily={'JetBrains Mono'}
        code={`> art
> artdata
> gamedata
component-compose.json
game-compose.json
game.json
rules.md
studio.json`} />,
      </Rect>
      <CodeBlock
    ref={templativeCommandRef}
    language={"python-console"}
    fontSize={30}
    lineHeight={30}
    offsetX={-1}
    x={-200}
    y={-300}
    fontFamily={'JetBrains Mono'}></CodeBlock>
    </>
  );
  yield* slideTransition(Direction.Bottom, 1);
  
  yield* waitUntil("something")
  yield* waitUntil('showTemplative')
  yield* templativeCommandRef().edit(2/8, false)`${insert(`templative`)}`

  yield* waitUntil('showProduce');
  yield* templativeCommandRef().edit(2/8, false)`templative${insert(` produce`)}`;
  yield* waitUntil('showOutput')
  yield* folderCodeRef().edit(3/8, false)`> art
> artdata
> gamedata${insert(`\n> output`)}
component-compose.json
game-compose.json
game.json
rules.md
studio.json`;
  yield* waitUntil("folderExpand")
  yield* folderCodeRef().edit(4/8, false)`> art
> artdata
> gamedata
${edit(`>`, `v`)} output${edit(``, `\n  > capsAndHammers_2.0.0_2023-03-03`)} 
component-compose.json
game-compose.json
game.json
rules.md
studio.json`;
  yield* waitUntil("highlightOutput")
  yield* folderCodeRef().selection(word(4, 0, 100), 2/8);


  yield* waitUntil("endSceneHold")


});