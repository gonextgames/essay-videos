import {Node} from '@motion-canvas/2d/lib/components';
import {createRef, Reference} from '@motion-canvas/core/lib/utils';
import {Image} from '@motion-canvas/2d/lib/components';

function *showImage(parent: Reference<Node>, src: string, scale: number, x: number, y: number, rotation: number) {
    const reference = createRef<Image>();
    var gameDesignerComputerImage = <Image 
        src={src}
        ref={reference}
        scale={scale}
        x={x}
        y={y}
        rotation={rotation} />

    yield parent().add(gameDesignerComputerImage)
    
    return reference
}

export default {
    showImage
}