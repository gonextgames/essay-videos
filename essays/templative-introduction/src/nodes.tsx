import {createRef, Reference} from '@motion-canvas/core/lib/utils'
import {CodeBlock, Image} from '@motion-canvas/2d/lib/components'
import {Circle, Layout, Text, Line, Rect, Node} from '@motion-canvas/2d/lib/components'
import {all, delay,loop,waitFor,waitUntil} from '@motion-canvas/core/lib/flow'
import {Direction, Vector2} from '@motion-canvas/core/lib/types'

function *showImage(parent: Reference<Node>, src: string, scale: number, x: number, y: number, rotation: number) {
    const reference = createRef<Image>()
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
    var halfHeight = maxHeight/2
    var sidebarWidth = maxWidth*sidebarWidthRatio
    var workspaceColumnWidth = maxWidth-sidebarWidth
    var workspaceColumnX = -halfWidth+sidebarWidth+(workspaceColumnWidth/2)
    var dimensions = [
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
        new Vector2(workspaceColumnX, halfHeight-((1-workspaceHeightRatio)*maxHeight)),
    ]
    return dimensions
}

function *createFakeVisualStudioCode(parent: Reference<Node>, sidebarWidthRatio: number, workspaceHeightRatio: number) {
    var sidebarColumnRef = createRef<Rect>()
    var workspaceColumnRef = createRef<Rect>()

    var workspaceRowRef = createRef<Rect>()
    var terminalRowRef = createRef<Rect>()

    var contentsRectRef = createRef<Rect>()
    
    var fileStructureRef = createRef<CodeBlock>()
    var fileNameRef = createRef<Text>()
    var contentsRef = createRef<CodeBlock>()
    var terminalContentsRef = createRef<CodeBlock>()

    const folder = `> projects`
    const terminal = `User$`
    const fileContents = `# Templative Introduction`
    
    const layout = 
    <Layout layout gap={0} width={1920} height={1080}>
        <Rect grow={sidebarWidthRatio} padding={30} ref={sidebarColumnRef} fill={"#202020"} clip>
            <CodeBlock ref={fileStructureRef} language={`c#`} fill={"#ccc"} fontSize={35} lineHeight={50} fontFamily={'JetBrains Mono'} code={folder}></CodeBlock>
        </Rect>
        <Layout ref={workspaceColumnRef} grow={10-sidebarWidthRatio} direction={"column"}>
            <Rect ref={workspaceRowRef} grow={workspaceHeightRatio} direction={"column"} fill={"#070707"} clip>
                <Rect paddingLeft={20} grow={0.1} clip>
                    <Rect width={500} height={"100%"} padding={30} fill={"#141414"} clip>
                        <Text ref={fileNameRef} fill={"#ccc"} fontSize={35} lineHeight={35} fontFamily={'JetBrains Mono'}>readme.md</Text>
                    </Rect>
                </Rect>
                <Rect ref={contentsRectRef} grow={9} padding={50} fill={"#141414"} clip>
                    <CodeBlock ref={contentsRef} language={`c#`} code={fileContents} fill={"#ccc"} fontSize={23} lineHeight={35} fontFamily={'JetBrains Mono'}/>
                </Rect>
            </Rect>
            <Rect ref={terminalRowRef} grow={10-workspaceHeightRatio} padding={30} fill={"#141420"}  clip>
                <CodeBlock ref={terminalContentsRef} language={`c#`} code={terminal} fill={"#ccc"} fontSize={35} lineHeight={35} fontFamily={'JetBrains Mono'}/>
            </Rect>
        </Layout>
    </Layout>

    yield parent().add(layout)
    return {
        "sidebarColumnRef": sidebarColumnRef,
        "workspaceColumnRef": workspaceColumnRef,
        "workspaceRowRef": workspaceRowRef,
        "terminalRowRef": terminalRowRef,

        "contentsRectRef": contentsRectRef,

        "fileStructureRef": fileStructureRef,
        "fileNameRef": fileNameRef,
        "contentsRef": contentsRef,
        "terminalContentsRef": terminalContentsRef,
    }
}

function *updateSidebarWidthRatio(sidebarColumnRef: Reference<Rect>, workspaceColumnRef: Reference<Layout>, workspaceRowRef: Reference<Rect>, terminalRowRef: Reference<Rect>,  
    sidebarWidthRatio: number, workspaceHeightRatio: number, duration: number)
{
    
    yield* all(
        sidebarColumnRef().grow(sidebarWidthRatio, duration),
        workspaceColumnRef().grow(10-sidebarWidthRatio, duration),
        workspaceRowRef().grow(workspaceHeightRatio, duration),
        terminalRowRef().grow(10-workspaceHeightRatio, duration),
    )
}

export default {
    showImage,
    createFakeVisualStudioCode,
    updateSidebarWidthRatio
}