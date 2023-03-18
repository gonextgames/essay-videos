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
import {CodeBlock, edit, insert, lines, word, remove} from '@motion-canvas/2d/lib/components/CodeBlock';
import {Direction, Vector2} from '@motion-canvas/core/lib/types';

import {Image} from '@motion-canvas/2d/lib/components';
import gamecrafterImage from "../images/gamecrafter.png"
import tabletopPlaygroundImage from "../images/tabletopPlayground.png"
import computerImage from "../images/pc.png"
import personImage from "../images/person.png"
import artImage from "../images/mona-lisa.png"
import gitImage from "../images/gitLogo.png"
import { interpolation } from '@motion-canvas/2d/lib/decorators';
import nodes from "../../../../common/nodes"

function *createTemplative(parent: Reference<Rect>) {
    const commandsRef = createRef<CodeBlock>();
    var codeblock = <CodeBlock 
        selection={[
        [
            [0, 0],
            [100, 100],
        ],
        ]}
        fill={"#ffffff00"}
        ref={commandsRef}
        fontSize={40}
        lineHeight={40}
        offsetX={-1}
        x={-350}
        y={-200}
        fontFamily={'JetBrains Mono'}
        code={`templative\n\n\n\n`} />

    yield parent().add(codeblock)
    return commandsRef
}

export default makeScene2D(function* (view) {
  const leftRectRef = createRef<Rect>();
  const rightRectRef = createRef<Rect>();
  const textRef = createRef<CodeBlock>();
  
  yield view.add(
    
    <>
        <CodeBlock 
            ref={textRef} 
            language={"txt"}
            fontSize={30}
            lineHeight={30}
            offsetX={-1}
            // wrap={true}
            x={-900}
            y={0}
            fontFamily={'JetBrains Mono'}
            code={`Play tricks\n - The player to the left of the dealer leads the first trick of a hand. After that, the winner of the trick leads the next trick.`}/>
        
    </>
  );
  
  yield* slideTransition(Direction.Bottom, 1/8);
  yield* waitUntil("start")
  yield* textRef().edit(1, false)`Play ${insert(`a `)}${edit(`t`,`T`)}rick${remove(`s`)}\n - The player to the left of the dealer leads the first trick of a hand. After that, the winner of the trick leads the next trick.`
  yield* textRef().edit(1, false)`Play a Trick\n - ${edit(`The player to the left of the dealer leads the first trick of a hand.`,`Lead the first trick of a hand if you are to the left of the dealer.`)} After that, the winner of the trick leads the next trick.`
  yield* waitUntil("hello")


});