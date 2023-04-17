import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Txt, Rect, Node,CubicBezier} from '@motion-canvas/2d/lib/components';
import {all,waitFor} from '@motion-canvas/core/lib/flow';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {beginSlide, createRef, Reference} from '@motion-canvas/core/lib/utils';
import {Direction, Vector2} from '@motion-canvas/core/lib/types';
import {Img} from '@motion-canvas/2d/lib/components';
import {Gradient} from '@motion-canvas/2d/lib/partials';
import { Bezier } from '@motion-canvas/2d/lib/components/Bezier';
import nodes from "../nodes"
function* createRadialCircles(parent: Reference<Node>, circleCount: number, shownCircleCount: number) {
    var children = new Array<Reference<Circle>>

    var angle = Math.PI * 2 / shownCircleCount
    for(var i = 0 ; i < circleCount ; i++) {
        var angleIndex = i < shownCircleCount ? i : shownCircleCount
        var xPosition = Math.cos(angle*angleIndex) * 200
        var yPosition = Math.sin(angle*angleIndex) * 200
        var reference = createRef<Circle>()
        parent().add(<Circle 
            ref={reference}
            x={200+xPosition}
            y={yPosition}
            width={0} 
            height={0} 
            fill={"#ffaa00"}
            shadowColor={"#a36d00"}
            shadowOffset={new Vector2(0,15)}
        />)
        children.push(reference)
    }
    return children
}

function* createBezierReferences(parent: Reference<Node>, count: number, radialCircles: Array<Reference<Circle>>){
    var bezierReferences = Array<Reference<Bezier>>()
    for (var i = 0; i < count ; i++) {
        const bezierRef = createRef<CubicBezier>();
        var outgoingIndex = i+1
        if (outgoingIndex >= count) {
            outgoingIndex -= count
        }
        parent().add(yield* nodes.createBezierBetweenPositions(bezierRef, radialCircles[i]().position(), radialCircles[outgoingIndex]().position()))
        bezierReferences.push(bezierRef)
        if (Math.floor(count / 2) >= 2){
            const otherBezierRef = createRef<CubicBezier>();
            var newOutgoingIndex = i+2
            if (newOutgoingIndex >= count) {
                newOutgoingIndex -= count
            }
            parent().add(yield* nodes.createBezierBetweenPositions(otherBezierRef, radialCircles[i]().position(), radialCircles[newOutgoingIndex]().position()))
            bezierReferences.push(otherBezierRef)
        }
    }
    return bezierReferences
}

function* createThreeChildren(parent: Reference<Circle>, result: Array<Reference<Circle>>, color: string) {
    var width = parent().size().x / 2
    var height = parent().size().y / 2

    var radianAngle = Math.PI * 2 / 3
    var distance = parent().size().x/2
    
    for (var c = 0; c < 3; c++) {
        var circleRef = createRef<Circle>()
        parent().add(<Circle
            ref={circleRef}
            fill={color} 
            width={0} 
            height={0} 
            x={Math.cos(radianAngle*c)*distance} 
            y={Math.sin(radianAngle*c)*distance * (height/width)}
            shadowColor={color} 
            shadowOffset={new Vector2(0,3)}
        />)
        result.push(circleRef)
    }
}

export default makeScene2D(function* (view) {
    var mainRef = createRef<Rect>();
    var titleTxtRef = createRef<Txt>();
    var complexityTxtRef = createRef<Txt>();
    var agencyTxtRef = createRef<Txt>();
    var abstractionTxtRef = createRef<Txt>();
    yield view.add(
        <Rect ref={mainRef}>
            <Txt ref={titleTxtRef} offsetX={-1} offsetY={-1} x={-300} y={0} fontSize={30} fill={"#fff"} lineHeight={35} fontFamily={'JetBrains Mono'}>Controlling Emergence</Txt>
            <Txt ref={complexityTxtRef} x={300} y={-60} offsetY={-1} fontSize={30} fill={"#fff"} lineHeight={35} fontFamily={'JetBrains Mono'}>Complexity</Txt>
            <Txt ref={agencyTxtRef} x={300} y={0} offsetY={-1} fontSize={30} fill={"#fff"} lineHeight={35} fontFamily={'JetBrains Mono'}>Agency</Txt>
            <Txt ref={abstractionTxtRef} x={300} y={60} offsetY={-1} fontSize={30} fill={"#fff"} lineHeight={35} fontFamily={'JetBrains Mono'}>Abstraction</Txt>
        </Rect>
    )
    yield* slideTransition(Direction.Right);
    yield* beginSlide('showComplexity');
    var margin = 60

    var sliderRectRef = createRef<Rect>();
    var controlRectRef = createRef<Rect>();

    yield* nodes.createSlider(mainRef, new Vector2((1920/2) + 100, 0), 600, 0.5, sliderRectRef, controlRectRef);
    
    yield* all(
        yield titleTxtRef().position(new Vector2((-1920/2)+margin, (-1080/2)+margin), 1),
        yield complexityTxtRef().position(new Vector2(-300, 0), 1),
        yield agencyTxtRef().position(new Vector2(-300, 0), 1),
        yield abstractionTxtRef().position(new Vector2(-300, 0), 1),
        yield agencyTxtRef().fill("#ffffff00", 1/8),
        yield abstractionTxtRef().fill("#ffffff00", 1/8),
        yield sliderRectRef().position.x((1920/2)-200,1)
    )

    var radialCircles = yield* createRadialCircles(mainRef, 5, 3)
    var bezierReferences = yield* createBezierReferences(mainRef, 3, radialCircles)

    yield* all(
        radialCircles[0]().size(new Vector2(150,150), 1),
        radialCircles[1]().size(new Vector2(150,150), 1),
        radialCircles[2]().size(new Vector2(150,150), 1),
        radialCircles[3]().size(new Vector2(150,150), 1),
        radialCircles[4]().size(new Vector2(150,150), 1),
        bezierReferences[0]().end(1,1),
        bezierReferences[1]().end(1,1),
        bezierReferences[2]().end(1,1),
    )

    yield* beginSlide('explainMaxComplexity');

    yield* all(
        bezierReferences[0]().end(0,1),
        bezierReferences[1]().end(0,1),
        bezierReferences[2]().end(0,1),
    )

    var angle = Math.PI * 2 / 5
    var newPositions = Array<Vector2>()
    for (var i = 0 ; i < 5 ; i++){
        newPositions.push(new Vector2(200+(Math.cos(angle*i) * 300), Math.sin(angle*i) * 300))
    }

    var generators = [
        yield controlRectRef().position.y(-(600/2)+105,1)
    ];
    for (var i = 0 ; i < radialCircles.length ; i++) {
        generators.push(radialCircles[i]().position(newPositions[i], 1));
    }
    yield* all(...generators)

    bezierReferences = yield* createBezierReferences(mainRef, 5, radialCircles)
    
    generators = [];
    for (const ref of Object.values(bezierReferences)) {
        generators.push(ref().end(1,1));
    }
    yield* all(...generators);

    yield* beginSlide('explainMinComplexity');
    yield* all(
        yield controlRectRef().position.y((600/2)-105,1),
        yield bezierReferences[0]().end(0,1),
        yield bezierReferences[1]().end(0,1),
        yield bezierReferences[3]().end(0,1),
        yield bezierReferences[5]().end(0,1),
        yield bezierReferences[6]().end(0,1),
        yield bezierReferences[8]().end(0,1),
    )

    yield* beginSlide('showAgency');
    generators = [
        yield controlRectRef().position.y(0,1),
        yield agencyTxtRef().fill("#fff", 1),
        yield complexityTxtRef().fill("#ffffff00", 1),
        yield abstractionTxtRef().fill("#ffffff00", 1),
    ];
    for (const ref of Object.values(bezierReferences)) {
        generators.push(ref().end(0,1));
    }    
    yield* all(...generators);

    yield* beginSlide('explainMaxAgency');
    yield* controlRectRef().position.y(-(600/2)+105,1)

    // HEllo
    // mainRef().add(<Bezier></Bezier>)

    yield* beginSlide('explainMinAgency');

    generators = [controlRectRef().position.y((600/2)-105,1)]
    for (var i = 0 ; i < radialCircles.length; i ++) {
        generators.push(radialCircles[i]().size(new Vector2(0,0), 1))
    }    
    yield* all(...generators);

    yield* beginSlide('showAbstraction');
    var systemExampleRef = createRef<Circle>()
    mainRef().add(<Circle 
        ref={systemExampleRef}
        zIndex={-1}
        x={200}
        width={0} 
        height={0} 
        fill={"#ffaa00"}
        shadowColor={"#a36d00"}
        shadowOffset={new Vector2(0,15)}/>)
        
    var children = new Array<Reference<Circle>>
    
    var newSize = new Vector2(300,150)
    yield* all(
        yield controlRectRef().position.y(0,1),
        yield abstractionTxtRef().fill("#fff", 1),
        yield complexityTxtRef().fill("#ffffff00", 1),
        yield agencyTxtRef().fill("#ffffff00", 1),

        yield systemExampleRef().size(new Vector2(600,300), 1),
        
    )
    yield* createThreeChildren(systemExampleRef, children, "#a36d00");
    
    generators = []
    for (var i = 0 ; i < 3; i ++) {
        generators.push(children[i]().size(newSize, 4/8))
    }    
    yield* all(...generators);

    yield* beginSlide('explainMaxAbstraction');
    
    var childrensChildren = new Array<Array<Reference<Circle>>>()
    for(var c = 0 ; c < children.length ; c++) {
        var newChildren = new Array<Reference<Circle>>()
        yield* createThreeChildren(children[c], newChildren, "#825700");
        childrensChildren.push(newChildren)
    }
    generators = [
        yield controlRectRef().position.y(-(600/2)+105,1)
    ]
    var newerSize = new Vector2(children[0]().size().x/2, children[0]().size().y/2)
    for (var i = 0 ; i < 3; i ++) {
        for (var z = 0 ; z < 3; z ++) {
            generators.push(childrensChildren[i][z]().size(newerSize, 1))
        }
    }    
    yield* all(...generators);


    yield* beginSlide('explainMinAbstraction');

    var sizeZero = new Vector2(0,0)
    generators = [
        yield controlRectRef().position.y((600/2)-105,1),
    ]
    for (var i = 0 ; i < 3; i ++) {
        for (var z = 0 ; z < 3; z ++) {
            generators.push(childrensChildren[i][z]().position(sizeZero, 1))
            generators.push(childrensChildren[i][z]().size(sizeZero, 1))
        }
        generators.push(children[i]().position(sizeZero, 1))
        generators.push(children[i]().size(sizeZero, 1))
    }    
    yield* all(...generators);

    yield* beginSlide('endOfTerms');
});