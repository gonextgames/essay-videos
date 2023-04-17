import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Txt, Rect, Node,CubicBezier} from '@motion-canvas/2d/lib/components';
import {all, waitFor} from '@motion-canvas/core/lib/flow';
import {beginSlide, createRef, Reference} from '@motion-canvas/core/lib/utils';
import {Vector2, Direction} from '@motion-canvas/core/lib/types';
import {Img} from '@motion-canvas/2d/lib/components';
import coinsImageSource from "../images/penny.png"
import {slideTransition} from '@motion-canvas/core/lib/transitions';

export default makeScene2D(function* (view) {
    var mainRef = createRef<Rect>();
    var fileExplorerRectRef = createRef<Rect>();
    var fileBodyRectRef = createRef<Rect>();
    yield view.add(
        <Rect size={new Vector2(1920,1080)} layout gap={10} direction={"row"} ref={mainRef}>
            <Rect ref={fileExplorerRectRef} fill={"#202020"} grow={1} paddingTop={60} direction={"column"} gap={0}/>
            <Rect ref={fileBodyRectRef} fill={"#202020"} grow={9} padding={30} paddingTop={45} direction={"column"}/>
        </Rect>
    )

    var files = [
        {
            name: "1 Effort & Meaning Economy",
            explanation: "",
            indents: 0
        },
        {
            name: "1a Time Investment Ecology",
            explanation: "",
            indents: 1
        },
        
        {
            name: "1a1 Money & QoL Economy",
            explanation: "",
            indents: 2
        },
        {
            name: "1a1a Banking Engine",
            explanation: "",
            indents: 3
        },
        {
            name: "1b Boredom Brake",
            explanation: "",
            indents: 2
        },
    ]
    for(var i = 0 ; i < files.length; i++) {
        yield fileExplorerRectRef().add(<Rect fill={i != 3 ? "#202020":"#303030"} width={"100%"} height={60} paddingLeft={30+(files[i]["indents"]*20)}>
            <Txt offsetX={-1} fontSize={30} fill={i != 3 ? "#aaa":"#fff"} lineHeight={60} fontFamily={'JetBrains Mono'} shadowColor={"#030303"} shadowOffset={new Vector2(3,3)} shadowBlur={3}>
                {files[i]["name"]}
            </Txt>
        </Rect>)
    }
    var documentInfo = [
        "Banking Engine",
        "A system that makes money through interest with the bank.",
        "Value Chains",
        "- Find a new card",
        "- Meet my banker",
    ]
    for(var i = 0 ; i < documentInfo.length; i++) {
        yield fileBodyRectRef().add(
            <Txt offsetX={-1} fontSize={30} fill={"#fff"} lineHeight={60} fontFamily={'JetBrains Mono'} shadowColor={"#030303"} shadowOffset={new Vector2(3,3)} shadowBlur={3}>
                {documentInfo[i]}
            </Txt>)
    }

    yield* slideTransition(Direction.Right);
    yield* beginSlide("endDocExplanation")
})