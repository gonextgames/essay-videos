import {createRef, Reference} from '@motion-canvas/core/lib/utils'
import {Img} from '@motion-canvas/2d/lib/components'
import {CodeBlock} from '@motion-canvas/2d/lib/components/CodeBlock';
import {Circle, Layout, Txt, Line, Rect, Node} from '@motion-canvas/2d/lib/components'
import {all, delay,loop,waitFor,waitUntil} from '@motion-canvas/core/lib/flow'
import {Direction, Vector2} from '@motion-canvas/core/lib/types'

function *showImg(parent: Reference<Node>, src: string, scale: number, x: number, y: number, rotation: number) {
    const reference = createRef<Img>()
    var gameDesignerComputerImg = <Img 
        src={src}
        ref={reference}
        scale={scale}
        x={x}
        y={y}
        rotation={rotation} />

    yield parent().add(gameDesignerComputerImg)
    
    return reference
}

function *thrustNode(thing: Reference<Node>, duration: number) {
    var originalX = thing().position.x() 
  
    yield* thing().position.x(originalX+25, 4/8) 
    yield* thing().position.x(originalX-25, 1/8)
    yield* thing().position.x(originalX, 4/8) 
  }
  
  function *shakeNode(thing: Reference<Node>) {
    var originalX = thing().position.x() 
  
    yield* thing().position.x(originalX+25, 2/16) 
    yield* thing().position.x(originalX-25, 1/16)
    yield* thing().position.x(originalX+25, 2/16) 
    yield* thing().position.x(originalX-25, 1/16)
    yield* thing().position.x(originalX, 1/16) 
  }

function *createFakeVisualStudioCode(parent: Reference<Node>, sidebarWidthRatio: number, workspaceHeightRatio: number) {
    var sidebarColumnRef = createRef<Rect>()
    var workspaceColumnRef = createRef<Rect>()

    var workspaceRowRef = createRef<Rect>()
    var terminalRowRef = createRef<Rect>()

    var contentsRectRef = createRef<Rect>()
    
    var fileStructureRef = createRef<CodeBlock>()
    var fileNameRef = createRef<Txt>()
    var contentsRef = createRef<CodeBlock>()
    var terminalContentsRef = createRef<CodeBlock>()

    const folder = `> projects`
    const terminal = `$`
    const fileContents = `# Templative Introduction`
    
    const layout = 
    <Layout layout gap={0} width={1920} height={1080}>
        <Rect grow={sidebarWidthRatio} padding={30} ref={sidebarColumnRef} fill={"#202020"} clip>
            <CodeBlock ref={fileStructureRef} language={`txt`} fill={"#ccc"} fontSize={35} lineHeight={50} fontFamily={'JetBrains Mono'} code={folder}></CodeBlock>
        </Rect>
        <Layout ref={workspaceColumnRef} grow={10-sidebarWidthRatio} direction={"column"}>
            <Rect ref={workspaceRowRef} grow={workspaceHeightRatio} direction={"column"} fill={"#070707"} clip>
                <Rect paddingLeft={20} grow={0.1} clip>
                    <Rect width={600} height={"100%"} padding={30} fill={"#141414"} clip>
                        <Txt ref={fileNameRef} fill={"#ccc"} fontSize={35} lineHeight={35} fontFamily={'JetBrains Mono'}>readme.md</Txt>
                        <Txt layout={false} offsetX={1} x={280} y={-5} fill={"#ccc"} fontSize={40} lineHeight={35} fontFamily={'JetBrains Mono'}>x</Txt>
                    </Rect>
                </Rect>
                <Rect ref={contentsRectRef} grow={9} padding={50} fill={"#141414"} clip>
                    <CodeBlock ref={contentsRef} language={`txt`} code={fileContents} fill={"#ccc"} fontSize={27} lineHeight={35} fontFamily={'JetBrains Mono'}/>
                </Rect>
            </Rect>
            <Rect ref={terminalRowRef} grow={10-workspaceHeightRatio} padding={30} fill={"#141420"}  clip>
                <CodeBlock  ref={terminalContentsRef} language={"txt"} code={terminal} fill={"#ccc"} fontSize={35} lineHeight={35} fontFamily={'JetBrains Mono'}/>
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
    showImg,
    createFakeVisualStudioCode,
    updateSidebarWidthRatio,
    thrustNode,
    shakeNode
}