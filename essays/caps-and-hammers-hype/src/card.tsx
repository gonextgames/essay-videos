import {createRef, Reference} from '@motion-canvas/core/lib/utils'
import {Img} from '@motion-canvas/2d/lib/components'
import {CodeBlock} from '@motion-canvas/2d/lib/components/CodeBlock';
import {Circle, Layout, Txt, Line, Rect, Node} from '@motion-canvas/2d/lib/components'
import {all, delay,loop,waitFor,waitUntil} from '@motion-canvas/core/lib/flow'
import {Direction, Vector2} from '@motion-canvas/core/lib/types'
import { linear } from '@motion-canvas/core/lib/tweening';

type CardProps = {
    rectReference: Reference<Rect>,
    width: number, height: number,
    frontSrc: string, backSrc: string,
    x?: number, y?: number,
    rotation?: number,
}

const Card = (props:CardProps) => (
    <Rect 
        ref={props.rectReference} clip
        width={props.width} height={props.height}
        position={new Vector2(props.x != null ? props.x : 0, props.x != null ? props.x : 0)}
        rotation={props.rotation != null ? props.rotation : 0}>
        <Img src={props.frontSrc} width={props.width} height={props.height}/>
        <Img src={props.backSrc} width={0} height={props.height}/>
    </Rect>
)

function* flipCard(card: Reference<Rect>, width: number, duration: number) {
    var front = card().children()[0] as Img
    var back = card().children()[1] as Img

    var isFlipped = front.width() == 0

    if (!isFlipped) {
        yield* front.width(0, duration, linear)
        yield* back.width(width, duration, linear)
    }
    else {
        yield* back.width(0, duration, linear)
        yield* front.width(width, duration, linear)
    }
}

export default {
    Card,
    flipCard
}