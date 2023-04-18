import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Txt, Rect, CubicBezier} from '@motion-canvas/2d/lib/components';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {Direction, Vector2} from '@motion-canvas/core/lib/types';
import {beginSlide, createRef, Reference,useLogger} from '@motion-canvas/core/lib/utils';
import {all,waitUntil} from '@motion-canvas/core/lib/flow';
import { Bezier } from '@motion-canvas/2d/lib/components/Bezier';
import { diff } from 'code-fns';

function* createValueChain(parent: Reference<Rect>, title: string, systemName: string, output: string, position: Vector2)
{
    var reference = createRef<Rect>()
    var size = 225
    yield parent().add(<Rect ref={reference} layout smoothCorners radius={30} width={size*1.6} height={size} position={position} fill={"#303030"} shadowColor={"#030303"} shadowOffset={new Vector2(5,5)} shadowBlur={5} padding={15} direction={"column"} gap={15}>
        <Txt fontSize={27} fill={"#ffaa00"} lineHeight={35} fontFamily={'JetBrains Mono'} textAlign={"left"} shadowColor={"#030303"} shadowOffset={new Vector2(5,5)} shadowBlur={5}>{title + "  Action"}</Txt>
        <Txt fontSize={27} fill={"#fff"} lineHeight={35} fontFamily={'JetBrains Mono'} textAlign={"left"} shadowColor={"#030303"} shadowOffset={new Vector2(5,5)} shadowBlur={5}>{systemName}</Txt>
        <Txt fontSize={27} fill={"#fff"} lineHeight={35} fontFamily={'JetBrains Mono'} textAlign={"center"} shadowColor={"#030303"} shadowOffset={new Vector2(5,5)} shadowBlur={5}>{"->"}</Txt>
        <Txt fontSize={27} fill={"#fff"} lineHeight={35} fontFamily={'JetBrains Mono'} textAlign={"left"} shadowColor={"#030303"} shadowOffset={new Vector2(5,5)} shadowBlur={5}>{output}</Txt>        
    </Rect>)
    return reference
}

function* createBezierBetween(parent: Reference<Rect>, a: Reference<Rect>, b: Reference<Rect>) {
    var reference = createRef<CubicBezier>()

    var startPosition = a().position().add(new Vector2(a().size().x/4, -a().size().y/2))
    var endPosition = b().position().add(new Vector2(-b().size().x/4, -b().size().y/2))
    
    var difference = endPosition.add(startPosition.mul(-1))

    var p1 = startPosition.add(new Vector2(difference.x*0.25, -90))
    var p2 = startPosition.add(new Vector2(difference.x*0.75, -90))

    yield parent().add(<CubicBezier ref={reference}
        lineWidth={6}
        stroke={'lightseagreen'}
        p0={startPosition}
        p1={p1}
        p2={p2}
        p3={endPosition}
        endArrow
        end={0}
        shadowColor={"#030303"} shadowOffset={new Vector2(5,5)} shadowBlur={5}/>)
    return reference
}

export default makeScene2D(function* (view) {
    var mainRef = createRef<Rect>()
    yield view.add(
        <Rect ref={mainRef}>
            <Txt offsetX={-1} offsetY={-1} position={new Vector2((-1920/2)+60, (-1080/2)+60)} fontSize={30} fill={"#fff"} lineHeight={35} fontFamily={'JetBrains Mono'} shadowColor={"#030303"} shadowOffset={new Vector2(15,15)} shadowBlur={5}>Examples of Planned Agency</Txt>
        </Rect>
    )

    var valueChains = [
        {
            action:"Deposit",
            system:"Credits Engine",
            output:"+Credits"
        },
        {
            action:"Unlock Award",
            system:"Credit Award Economy",
            output:"+Award -Credits"
        },
        {
            action:"Place Award",
            system:"Shelf Space Ecology",
            output:"Collect Every Award"
        }
    ]

    var valueChainReferences = []
    var bezierReferences = []
    for(var v = 0 ; v < valueChains.length ; v++)
    {
        var valueChain = valueChains[v]
        var xPosition = ((1920/(valueChains.length+2))*(v+1)) - (1920/2)
        var position = new Vector2(xPosition, (1080/2)+(250/2));
        var valueChainReference = yield* createValueChain(mainRef, valueChain.action, valueChain.system, valueChain.output, position)
        valueChainReferences.push(valueChainReference)        
    }

    yield* slideTransition(Direction.Right);
    yield* waitUntil("showValueChains")

    var generators = []
    for (var valueChainReference of valueChainReferences)
    {
        generators.push(valueChainReference().position.y(0,1))
    }
    yield* all(...generators)

    var generators = []
    for (var v = 1 ; v < valueChainReferences.length ; v++)
    {
        var bezierReference = yield* createBezierBetween(mainRef, valueChainReferences[v-1], valueChainReferences[v])
        bezierReferences.push(bezierReference)
        generators.push(bezierReference().end(1,1))
    }
    yield* all(...generators)

    var meaning = [
        "Destruction",
        "Excitement",
        "Competition",
        "Community",
        "Challenge",
        "Stategy",
        "Completion",
        "Power",
        "Fantasy",
        "Story",
        "Design",
        "Discovery"
    ]

    var destinationX = (1920/2)+30
    var meaningRectRef = createRef<Rect>()
    yield mainRef().add(<Rect 
        ref={meaningRectRef} 
        width={300} height={1080*0.8} 
        layout 
        direction={"column"} 
        x={(1920/2)+300} 
        offsetX={1} 
        fill={"#303030"} 
        smoothCorners radius={30}
        padding={15}
        gap={45}
    />)

    var meaningTxtReferences = []
    for (var m = 1 ; m < meaning.length ; m++)
    {
        var txtReference = createRef<Txt>()
        yield meaningRectRef().add(<Txt ref={txtReference} fontSize={30} fill={"#fff"} lineHeight={35} fontFamily={'JetBrains Mono'} textAlign={"left"} shadowColor={"#030303"} shadowOffset={new Vector2(5,5)} shadowBlur={5}>{meaning[m]}</Txt>)
        meaningTxtReferences.push(txtReference)
    }

    yield* waitUntil("showMeaning")
    yield* meaningRectRef().position.x(destinationX,1)

    yield* waitUntil("showCorrectMeaning")

    var lastValueChainReference = valueChainReferences[valueChainReferences.length-1]
    var shelf = lastValueChainReference().children()[3] as Txt

    var correctMeaningBezierRef = createRef<CubicBezier>()
    var startingPosition = shelf.position().add(new Vector2(370,0))
    var meaningPosition = new Vector2((1920/2)-275, 5)
    yield mainRef().add(<CubicBezier ref={correctMeaningBezierRef}
        lineWidth={6}
        stroke={'lightseagreen'}
        p0={startingPosition}
        p1={startingPosition}
        p2={meaningPosition}
        p3={meaningPosition}
        endArrow
        end={0}
        shadowColor={"#030303"} shadowOffset={new Vector2(5,5)} shadowBlur={5}/>)

    yield* all(
        yield shelf.fill("lightseagreen",1),
        yield correctMeaningBezierRef().end(1,1),
        yield meaningTxtReferences[5]().fill("lightseagreen", 1)
    )
    console.log(meaningTxtReferences[5]().position())

    yield* waitUntil("endValueChain")
})