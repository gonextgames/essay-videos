import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Txt, Rect, Node,CubicBezier} from '@motion-canvas/2d/lib/components';
import {all,waitFor} from '@motion-canvas/core/lib/flow';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {beginSlide, createRef, Reference} from '@motion-canvas/core/lib/utils';
import {Direction, Vector2} from '@motion-canvas/core/lib/types';
import {Img} from '@motion-canvas/2d/lib/components';
import onionImageSource from "../images/onion.png"
import cryOnionOneImageSource from "../images/cryOnionOne.jpg"
import cryOnionTwoImageSource from "../images/cryOnionTwo.jpg"
import cryOnionThreeImageSource from "../images/cryOnionThree.jpg"

import {Gradient} from '@motion-canvas/2d/lib/partials';
import { Bezier } from '@motion-canvas/2d/lib/components/Bezier';
import nodes from "../nodes"
import { easeOutSine } from '@motion-canvas/core/lib/tweening';
import {CodeBlock} from '@motion-canvas/2d/lib/components/CodeBlock';

export default makeScene2D(function* (view) {
    var mainRef = createRef<Rect>();
    var titleTxtRef = createRef<Txt>();
    var depthTxtRef = createRef<Txt>();
    var leverageTxtRef = createRef<Txt>();
    var eleganceTxtRef = createRef<Txt>();
    var blur = 1
    var blurOffset = new Vector2(3,3)
    var margin = 60
    yield view.add(
        <Rect ref={mainRef}>
            <Txt ref={titleTxtRef} offsetX={-1} offsetY={-1} position={new Vector2((-1920/2)+margin, (-1080/2)+margin)} fontSize={30} fill={"#fff"} lineHeight={35} fontFamily={'JetBrains Mono'} shadowColor={"#030303"} shadowOffset={blurOffset} shadowBlur={blur}>Types of Systems</Txt>
            <Txt ref={titleTxtRef} offsetX={-1} offsetY={-1} position={new Vector2((-1920/2)+margin+50, (-1080/2)+margin+50)} fontSize={30} fill={"#fff"} lineHeight={35} fontFamily={'JetBrains Mono'} shadowColor={"#030303"} shadowOffset={blurOffset} shadowBlur={blur}>Systems are either reinforcing or diminishing.</Txt>
            <Txt ref={titleTxtRef} offsetX={-1} offsetY={-1} position={new Vector2((-1920/2)+margin+50, (-1080/2)+margin+100)} fontSize={30} fill={"#fff"} lineHeight={35} fontFamily={'JetBrains Mono'} shadowColor={"#030303"} shadowOffset={blurOffset} shadowBlur={blur}>Systems either handle one resource or several.</Txt>
        </Rect>
    )

    var rectReferences = Array<Reference<Rect>>()
    var padding = 25
    var exteriorPadding = 60
    var width = ((1920-exteriorPadding- (padding*3))/4) 
    var headers = [
        {
            name:"Engine",
            reinforcing:true,
            multiResource:false,
            example: "Factories make money letting you buy more factories."
        },
        {
            name:"Economy",
            reinforcing:true,
            multiResource:true,
            example: "Factories make money, letting you unlock better factories"
        },
        {
            name:"Brake",
            reinforcing:false,
            multiResource:false,
            example:"Factories cost more the more factories you have."
        },
        {
            name:"Ecology",
            reinforcing:false,
            multiResource:true,
            example: "Players compete for factory space in a cramped canyon."
        },
    ]
    for(var i = 0; i < 4; i++)
    {
        var rectReference = createRef<Rect>()
        yield mainRef().add(<Rect 
            ref={rectReference} 
            fill={"#202020"}
            width={width}
            smoothCorners
            radius={30}
            height={1080-100}
            offset={new Vector2(-1,1)}
            x={(-1920/2) +(exteriorPadding/2)+ ((width+padding)*i)}
            y={1600}
            shadowColor={"#030303"} shadowOffset={new Vector2(5,5)} shadowBlur={2}
        >
            <Rect fill={headers[i]["reinforcing"]?"#ffaa00":"lightseagreen"} size={new Vector2(15,15)} x={80} y={(-1080/2)+27}/>
            <Txt fontSize={30} fill={"#fff"} y={(-1080/2)+30} lineHeight={35} fontFamily={'JetBrains Mono'} shadowColor={"#030303"} shadowOffset={blurOffset} shadowBlur={blur}>
                {headers[i]["name"]}
            </Txt>
            <Txt fontSize={30} fill={"#fff"} y={(-1080/2)+120} lineHeight={35} fontFamily={'JetBrains Mono'} shadowColor={"#030303"} shadowOffset={blurOffset} shadowBlur={blur}>
                {headers[i]["reinforcing"] ? "Reinforcing" : "Diminishing"}
            </Txt>
            <Txt fontSize={30} fill={"#fff"} y={(-1080/2)+170} lineHeight={35} fontFamily={'JetBrains Mono'} shadowColor={"#030303"} shadowOffset={blurOffset} shadowBlur={blur}>
                {headers[i]["multiResource"] ? "Multiple Resources" : "Single Resource"}
            </Txt>
            <Rect layout width={375} fill={"00000000"} y={-20} height={600}>
                <Txt fill={"#fff"} lineHeight={25} fontSize={25} fontFamily={'JetBrains Mono'} shadowColor={"#030303"} shadowOffset={blurOffset} shadowBlur={blur}  textWrap={true} >{headers[i]["example"]}</Txt>
            </Rect>
        </Rect>)
        rectReferences.push(rectReference)
    }

    yield* slideTransition(Direction.Right);

    
    var moveRectTo = (1080/2)+200
    yield* beginSlide("showSystems")
    var totalTime = 1
    
    yield* rectReferences[0]().position.y(moveRectTo, 6/8)
    yield* beginSlide("showEconomy")
    yield* rectReferences[1]().position.y(moveRectTo, 6/8)
    yield* beginSlide("showBrake")
    yield* rectReferences[2]().position.y(moveRectTo, 6/8)
    yield* beginSlide("showEcology")
    yield* rectReferences[3]().position.y(moveRectTo, 6/8)

    yield* beginSlide("endSlide")
})