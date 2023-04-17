import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Layout, Txt, Line, Rect, Node} from '@motion-canvas/2d/lib/components';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {all, delay,loop,waitFor,waitUntil} from '@motion-canvas/core/lib/flow';
import {createRef, Reference} from '@motion-canvas/core/lib/utils';
import {CodeBlock, edit, insert, lines, word} from '@motion-canvas/2d/lib/components/CodeBlock';
import {Direction, Vector2} from '@motion-canvas/core/lib/types';
import {Img} from '@motion-canvas/2d/lib/components';
import gitImg from "../images/gitLogo.png"
import { interpolation } from '@motion-canvas/2d/lib/decorators';
import nodes from "../../../../common/nodes"

export default makeScene2D(function* (view) {
  
  var branchRef = createRef<CodeBlock>()
  var filesRef = createRef<CodeBlock>()

  var branchButton = <Rect width={335} height={75} stroke={'#404040'} lineWidth={2} radius={30} paddingLeft={16} paddingTop={24}>
    <CodeBlock ref={branchRef} fill={"#fff"} fontSize={35} lineHeight={50} fontFamily={'JetBrains Mono'}>master v</CodeBlock>
  </Rect>

  var folder = `\n\t\t> art\n\t\t> artdata\n\t\t> gamedata\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json`


  
  yield view.add(
    <Layout layout direction={"column"} gap={0} width={1920} height={1080}>
        <Rect grow={1} padding={30} paddingLeft={50} clip fill={"#242424"} direction={"row"} gap={30}>
            <Img src={gitImg} width={50} height={50}/>
            <Txt fill={"#ccc"} fontSize={35} lineHeight={50} fontFamily={'JetBrains Mono'}>potionMerchants/potionShmotion</Txt>
        </Rect>
        <Rect grow={9} direction={"row"}>
          <Rect grow={2}></Rect>
          <Rect grow={6} fill={"#202020"} direction={"column"} paddingLeft={30} paddingRight={30}>
            <Rect grow={1} padding={50}>{branchButton}</Rect>
            <Rect grow={9}>
              <Rect width={"100%"} height={700} padding={30}>
                <CodeBlock ref={filesRef} language={`txt`} fill={"#ccc"} fontSize={35} lineHeight={50} fontFamily={'JetBrains Mono'} code={folder}></CodeBlock>
              </Rect>
            </Rect>
          </Rect>
          <Rect padding={50} grow={2} direction={"column"}>
            {/* <Txt fill={"#aaa"} fontSize={35} lineHeight={50} fontFamily={'JetBrains Mono'}>A fun game about potions</Txt> */}
          </Rect>
        </Rect>
    </Layout>
  )
  yield* slideTransition(Direction.Bottom, 1);
  yield* waitUntil("branchTransition")
  yield* all(
    yield filesRef().edit(1,false)`\n\t\t> art\n\t\t> artdata\n\t\t> gamedata\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json\n\t\t${insert(`experimentNotes.md`)}`,
    yield branchRef().edit(1,false)`${edit(`master`,`experimental`)} v`,
  )

  yield* waitUntil("endScene")

});