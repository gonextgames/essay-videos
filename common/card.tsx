import {createRef, Reference} from '@motion-canvas/core/lib/utils'
import {Img} from '@motion-canvas/2d/lib/components'
import {CodeBlock} from '@motion-canvas/2d/lib/components/CodeBlock';
import {Circle, Layout, Txt, Line, Rect, Node} from '@motion-canvas/2d/lib/components'
import {all, delay,loop,waitFor,waitUntil} from '@motion-canvas/core/lib/flow'
import {Direction, Vector2} from '@motion-canvas/core/lib/types'
import { easeInBack, easeInCubic, easeOutBack, easeOutCubic, linear } from '@motion-canvas/core/lib/tweening';

import {createSignal, SimpleSignal, SignalValue} from '@motion-canvas/core/lib/signals';


type CardProps = {
    rectReference: Reference<Rect>,
    width: SimpleSignal<any, void>, height: SimpleSignal<any, void>,
    flipSignal: SimpleSignal<any, void>
    frontSrc: string, backSrc: string,
    x?: SignalValue<number>, y?: SignalValue<number>,
    rotation?: number,
    compositeOperation?: GlobalCompositeOperation,
}

const Card = (props:CardProps) => {

    var widths = () => {
        var width = props.width()
        var flip = props.flipSignal()
        var front = 0
        var back = 0

        if (flip >= 0.5) {
            front = (flip - 0.5) / 0.5
        }
        else {
            back = (0.5 - flip) / 0.5
        }
        return [front*width, back*width]
    }
    return (<Rect 
        ref={props.rectReference}
        width={()=>props.width()} height={()=>props.height()}
        x={props.x} y={props.y}
        rotation={props.rotation != null ? props.rotation : 0}
        clip compositeOperation={props.compositeOperation != null ? props.compositeOperation : "source-over"}>
        
        <Img src={props.frontSrc} 
            width={() => widths()[0]} 
            height={()=>props.height()}/>

        <Img src={props.backSrc} 
            width={() => widths()[1]} 
            height={()=>props.height()}/>

    </Rect>)
}

function* flipCard(card: Reference<Rect>, width: number, duration: number) {
    var front = card().children()[0] as Img
    var back = card().children()[1] as Img

    var isFlipped = front.width() == 0

    if (!isFlipped) {
        yield* front.width(0, duration/2, linear)
        yield* back.width(width, duration/2, linear)
    }
    else {
        yield* back.width(0, duration/2, linear)
        yield* front.width(width, duration/2, linear)
    }
}

export default {
    Card,
    flipCard
}