import {createRef, Reference} from '@motion-canvas/core/lib/utils';
import {Image} from '@motion-canvas/2d/lib/components';
import {Circle, Layout, Text, Line, Rect, Node} from '@motion-canvas/2d/lib/components';
import {all, delay,loop,waitFor,waitUntil} from '@motion-canvas/core/lib/flow';
import {Direction, Vector2} from '@motion-canvas/core/lib/types';

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

function createWorkspaceDimensions(sidebarWidthRatio: number, workspaceHeightRatio: number) {
    var maxWidth = 1920
    var halfWidth = maxWidth/2
    var maxHeight = 1080
    var sidebarWidth = maxWidth*sidebarWidthRatio
    var workspaceColumnWidth = maxWidth-sidebarWidth
    var workspaceColumnX = -halfWidth+sidebarWidth+(workspaceColumnWidth/2)
    return [
        // Sidebar, Width, Height, X, Y
        new Vector2(sidebarWidth, maxHeight),
        new Vector2(-halfWidth + (sidebarWidth/2), 0),

        // Workspace
        new Vector2(workspaceColumnWidth, maxHeight*workspaceHeightRatio),
        new Vector2(workspaceColumnX, (-maxHeight/2) + (maxHeight*workspaceHeightRatio/2)),

        // Terminal
        new Vector2(workspaceColumnWidth, maxHeight*(1-workspaceHeightRatio)),
        new Vector2(workspaceColumnX, (maxHeight/2) - (maxHeight*(1-workspaceHeightRatio)/2)),

        // Terminal divider
        new Vector2(workspaceColumnWidth, 10),
        new Vector2(workspaceColumnX, halfWidth-(workspaceHeightRatio*maxHeight)),
    ]
}

function *createFakeVisualStudioCode(parent: Reference<Node>, sidebarWidthRatio: number, workspaceHeightRatio: number) {
    var sidebarRef = createRef<Rect>();
    var workspaceRef = createRef<Rect>();
    var terminalRef = createRef<Rect>();
    var dividerRef = createRef<Rect>();
    var dimensions = createWorkspaceDimensions(sidebarWidthRatio, workspaceHeightRatio)
    console.log(workspaceHeightRatio)
    yield* all(
        yield parent().add(<Rect ref={sidebarRef} fill={"#202020"} size={dimensions[0]} position={dimensions[1]} clip />),
        yield parent().add(<Rect ref={workspaceRef} fill={"#201414"} size={dimensions[2]} position={dimensions[3]} clip />),
        yield parent().add(<Rect ref={terminalRef} fill={"#141420"} size={dimensions[4]} position={dimensions[5]} clip />),
        yield parent().add(<Rect ref={dividerRef} fill={"#202020"} size={dimensions[6]} position={dimensions[7]} clip />)
    )
    return [ sidebarRef, workspaceRef, terminalRef, dividerRef ]
}

function *updateSidebarWidthRatio(sidebarRef: Reference<Rect>, workspaceRef: Reference<Rect>, terminalRef: Reference<Rect>, dividerRef: Reference<Rect>, 
    sidebarWidthRatio: number, workspaceHeightRatio: number, duration: number)
{
    var dimensions = createWorkspaceDimensions(sidebarWidthRatio, workspaceHeightRatio)
    
    yield* all(
        yield sidebarRef().position(dimensions[0], duration),    
        yield sidebarRef().size(dimensions[1], duration),

        yield workspaceRef().position(dimensions[2], duration),    
        yield workspaceRef().size(dimensions[3], duration),    

        yield terminalRef().position(dimensions[4], duration),    
        yield terminalRef().size(dimensions[5], duration),    

        yield dividerRef().position(dimensions[6], duration),    
        yield dividerRef().size(dimensions[7], duration),   
    )
}

export default {
    showImage,
    createFakeVisualStudioCode,
    updateSidebarWidthRatio
}