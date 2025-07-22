import {Circle, Rect, Txt, Path, makeScene2D, Img, Line, CubicBezier} from '@motion-canvas/2d';
import {createRef, all, waitFor, Vector2, tween, waitUntil, linear, easeOutCubic, easeInCubic} from '@motion-canvas/core';
import {easeInOutCubic} from '@motion-canvas/core';
import bloke from './bloke.png';
import inkscape from './inkscape.png';
import overlay from './overlay.png';
import theBack from './theBack.png';
import blokesBack from './Blokes-back.png';
import evil from './evilblokemon.png';
import AppIcon from './components/AppIcon';
export default makeScene2D(function* (view) {

  yield* waitUntil("start")
  
  // Create refs for individual data rows
  const rulesRowRef = createRef<Rect>();
  const attackRowRef = createRef<Rect>();
  const defenseRowRef = createRef<Rect>();
  const typeRowRef = createRef<Rect>();
  const graphicRowRef = createRef<Rect>();
  const graphicTextRef = createRef<Txt>();
  view.x(650);
  view.scale(1.3)
  
  // Create the table structure manually
  const tableColor = "#1e252e"
  const headerColor = "#71718e"
  const valueColor = "#c1c1cd"
  const cellColor = "#181e25"
  const borderColor = tableColor
  const lineWidth = 3
  const fontSize = 28
  const pieceIconReference = createRef<Path>();
  view.add(
    <AppIcon
      ref={pieceIconReference}
      data="m 101.96158,26.964779 c -1.25905,-0.50458 -2.66412,-0.50458 -3.92316,0 l -62.93926,25.17359 64.90083,25.95401 64.90085,-25.95401 z M 94.72693,170.90877 V 87.341329 L 26.17714,59.931959 V 143.48885 Z M 94.1258,17.167439 c 3.77094,-1.50811 7.97745,-1.50811 11.74839,0 l 75.18331,30.07753 c 1.99985,0.80147 3.31098,2.73894 3.31148,4.8934 v 91.350481 c -0.003,4.31154 -2.62967,8.18722 -6.63351,9.7868 l -75.77389,30.30956 c -1.25905,0.50458 -2.66412,0.50458 -3.92316,0 L 22.27508,153.27565 c -4.00799,-1.59623 -6.63961,-5.47265 -6.64406,-9.7868 V 52.138369 c 5e-4,-2.15446 1.31163,-4.09193 3.31148,-4.8934 z"
      // scale={0.5}
      fill={'#69d1d2'}
      x={-400}
      y={-275}
      scale={0.5}
      opacity={1}
    />
  )
  const pieceTextRef = createRef<Txt>();
  view.add(
    <Txt
      ref={pieceTextRef}
      text="The Bloke Composition's Piece Content"
      fill={'#69d1d2'}
      fontSize={36}
      x={25}
      y={-225}
      opacity={1}
      shadowColor={'#000'}
      shadowBlur={12}
      shadowOffsetX={4}
      shadowOffsetY={4}
    />
  )
  const firstPieceRect = createRef<Rect>();
  view.add(
    <Rect 
      ref={firstPieceRect}
      layout 
      direction="column" 
      fill={tableColor} 
      radius={10} 
      padding={6} 
      shadowColor={'#000'}
      shadowBlur={12}
      shadowOffsetX={4}
      shadowOffsetY={4}
    >
      {/* Header row */}
      <Rect layout direction="row" fill={cellColor} stroke={borderColor} lineWidth={lineWidth}>
        <Rect layout direction="row">
          <Rect layout paddingRight={10} stroke={borderColor} lineWidth={lineWidth} padding={10}>
            <Txt text="name" fill={headerColor} fontSize={fontSize} />
          </Rect>
          <Rect layout paddingRight={10} stroke={borderColor} lineWidth={lineWidth} padding={10}>
            <Txt text="Bloke" fill={valueColor} fontSize={fontSize} />
          </Rect>
        </Rect>
        <Rect layout direction="row">
          <Rect layout paddingRight={10} stroke={borderColor} lineWidth={lineWidth} padding={10}>
            <Txt text="quantity" fill={headerColor} fontSize={fontSize}/>
          </Rect>
          <Rect layout paddingRight={10} stroke={borderColor} lineWidth={lineWidth} padding={10}>
            <Txt text="1" fill={valueColor} fontSize={fontSize}/>
          </Rect>
        </Rect>
      </Rect>
      <Rect fill="gray" width={800} height={3}/>
      
      {/* Data rows - initially hidden */}
      <Rect 
        ref={rulesRowRef}
        layout direction="row" 
        fill={cellColor}
        opacity={0}
        scaleY={0.8}
      >
        <Rect layout paddingRight={10} width={300} stroke={borderColor} lineWidth={lineWidth} padding={10}>
          <Txt text="rules" fill={valueColor} fontSize={fontSize} />
        </Rect>
        <Rect layout stroke={borderColor} lineWidth={lineWidth} width={500} padding={10}>
          <Txt text="Attack to win the game." fill={valueColor} fontSize={fontSize} />
        </Rect>
      </Rect>
      
      <Rect 
        ref={attackRowRef}
        layout direction="row" 
        fill={cellColor}
        opacity={0}
        scaleY={0.8}
      >
        <Rect layout paddingRight={10} width={300} stroke={borderColor} lineWidth={lineWidth} padding={10}>
          <Txt text="attack" fill={valueColor} fontSize={fontSize} />
        </Rect>
        <Rect layout stroke={borderColor} lineWidth={lineWidth} width={500} padding={10}>
          <Txt text="3" fill={valueColor} fontSize={fontSize} />
        </Rect>
      </Rect>
      
      <Rect 
        ref={defenseRowRef}
        layout direction="row" 
        fill={cellColor}
        opacity={0}
        scaleY={0.8}
      >
        <Rect layout paddingRight={10} width={300} stroke={borderColor} lineWidth={lineWidth} padding={10}>
          <Txt text="defense" fill={valueColor} fontSize={fontSize} />
        </Rect>
        <Rect layout stroke={borderColor} lineWidth={lineWidth} width={500} padding={10}>
          <Txt text="1" fill={valueColor} fontSize={fontSize} />
        </Rect>
      </Rect>
      
      <Rect 
        ref={typeRowRef}
        layout direction="row" 
        fill={cellColor}
        opacity={0}
        scaleY={0.8}
      >
        <Rect layout paddingRight={10} width={300} stroke={borderColor} lineWidth={lineWidth} padding={10}>
          <Txt text="type" fill={valueColor} fontSize={fontSize} />
        </Rect>
        <Rect layout stroke={borderColor} lineWidth={lineWidth} width={500} padding={10}>
          <Txt text="Bingo Bongle" fill={valueColor} fontSize={fontSize} />
        </Rect>
      </Rect>
      
      <Rect 
        ref={graphicRowRef}
        layout direction="row" 
        fill={cellColor}
        opacity={0}
        scaleY={0.8}
      >
        <Rect layout paddingRight={10} width={300} stroke={borderColor} lineWidth={lineWidth} padding={10}>
          <Txt text="graphic" fill={valueColor} fontSize={fontSize} />
        </Rect>
        <Rect layout stroke={borderColor} lineWidth={lineWidth} width={500} padding={10}>
          <Txt ref={graphicTextRef} text="Bloke" fill={valueColor} fontSize={fontSize} />
        </Rect>
      </Rect>
    </Rect>
  );
  
  yield* waitUntil("whatEachCardSays")
  
  yield* tween(1/8, value => {
    rulesRowRef().opacity(value);
    rulesRowRef().scale.y(0.8 + value * 0.2);
    defenseRowRef().opacity(value);
    defenseRowRef().scale.y(0.8 + value * 0.2);
    typeRowRef().opacity(value);
    typeRowRef().scale.y(0.8 + value * 0.2);
    attackRowRef().opacity(value);
    attackRowRef().scale.y(0.8 + value * 0.2);
  });
  
  
  
  yield* waitUntil("andwhatart")

  yield* tween(1/8, value => {
    graphicRowRef().opacity(value);
    graphicRowRef().scale.y(0.8 + value * 0.2);
  });
  
  yield* waitUntil("ituses")
  const blokeRect = createRef<Rect>();
  view.add(<Rect x={800} y={-75} width={166*4} height={100*4} opacity={0} ref={blokeRect}>
    <AppIcon
      data="m 38.30506,14.52925 c -11.357659,0 -20.564636,9.206978 -20.564636,20.564636 V 164.90612 c 0,11.35766 9.206977,20.56463 20.564636,20.56463 h 123.38936 c 11.35765,0 20.56515,-9.20697 20.56515,-20.56463 V 35.093886 c 0,-11.357658 -9.2075,-20.564636 -20.56515,-20.564636 z m 0,10.28206 h 123.38936 c 5.67884,0 10.28258,4.603747 10.28258,10.282576 V 104.57543 L 133.14009,84.555978 c -1.97748,-0.99057 -4.36687,-0.60571 -5.93297,0.95602 L 89.059584,123.66006 61.708283,105.43946 c -2.036036,-1.35552 -4.745427,-1.08874 -6.478158,0.63769 L 28.023,130.28188 V 35.093886 c 0,-5.678829 4.603231,-10.282576 10.28206,-10.282576 z m 24.554057,23.787178 c -8.047107,0.602821 -14.269259,7.306668 -14.27148,15.376322 -0.023,8.534464 6.889117,15.465218 15.423606,15.465218 8.534489,0 15.446604,-6.930754 15.423606,-15.465218 -0.0025,-8.970463 -7.630328,-16.046371 -16.575732,-15.376322 z"
      x={-325}
      y={-200}
      scale={0.4}
      fill={'#ebe412'}
    />
    <Txt
      text="Bloke.svg"
      fill={'#ebe412'}
      fontSize={48}
      x={-130}
      y={-160}
      shadowColor={'#000'}
      shadowBlur={12}
      shadowOffsetX={4}
      shadowOffsetY={4}
    />
    <Img src={bloke} radius={10} x={-115} y={30} scale={0.75} opacity={1} shadowColor={'#000'} shadowBlur={8} shadowOffsetX={8} shadowOffsetY={8}/>
  </Rect>); 
  const artArrowRef = createRef<CubicBezier>();
  view.add(<CubicBezier
    ref={artArrowRef}
    lineWidth={6}
    stroke={'#ebe412'}
    p0={[425, 145]}
    p1={[500, 145]}
    p2={[670, 145]}
    p3={[670, 105]}
    endArrow
    arrowSize={16}
    end={0}
  />);
  yield* all(
    graphicTextRef().fill("#ebe412", 1/8),
    blokeRect().opacity(1, 1),
    artArrowRef().end(1, 1)
  )
  // yield* artArrowRef().start(1, 1).to(0, 1);
  
  yield* waitUntil("inyourcontentfiles")
  yield* all(
    artArrowRef().opacity(0, 1),
    blokeRect().opacity(0, 1),
    pieceTextRef().opacity(0, 1),
    pieceIconReference().opacity(0, 1),
    graphicTextRef().fill(valueColor, 1),
  )
  yield* waitUntil("getOnTheRoad")
  yield* all(
    
    view.scale(1, 1),
    firstPieceRect().position([300,-300], 1),
  )
  
  const newPieceRect = createRef<Rect>();
  view.add(
    <Rect 
      ref={newPieceRect} layout direction="column" 
      fill={tableColor} radius={10} padding={6} 
      shadowColor={'#000'} shadowBlur={12} shadowOffsetX={4} shadowOffsetY={4} 
      x={-2000} y={0} width={600} height={200}
    >
      {/* Header row */}
      <Rect layout direction="row" fill={cellColor} stroke={borderColor} lineWidth={lineWidth} width={600-12} height={50}>
        <Rect layout direction="row">
          <Rect layout paddingRight={10} stroke={borderColor} lineWidth={lineWidth} padding={10}>
            <Txt text="name" fill={headerColor} fontSize={fontSize} />
          </Rect>
          <Rect layout paddingRight={10} stroke={borderColor} lineWidth={lineWidth} padding={10}>
            <Txt text="Lad" fill={valueColor} fontSize={fontSize} />
          </Rect>
        </Rect>
        <Rect layout direction="row">
          <Rect layout paddingRight={10} stroke={borderColor} lineWidth={lineWidth} padding={10}>
            <Txt text="quantity" fill={headerColor} fontSize={fontSize}/>
          </Rect>
          <Rect layout paddingRight={10} stroke={borderColor} lineWidth={lineWidth} padding={10}>
            <Txt text="1" fill={valueColor} fontSize={fontSize}/>
          </Rect>
        </Rect>
      </Rect>
      <Rect fill="gray" width={600-12} height={3}/>      
    </Rect>
  );
  yield* waitUntil("addingPieces")
  yield newPieceRect().x(195, 1);
  yield* waitFor(0.25)
  const newestPieceRect = createRef<Rect>();
  view.add(
    <Rect 
      ref={newestPieceRect} layout direction="column" 
      fill={tableColor} radius={10} padding={6} 
      shadowColor={'#000'} shadowBlur={12} shadowOffsetX={4} shadowOffsetY={4} 
      x={-2000} y={225} width={600} height={200}
    >
      {/* Header row */}
      <Rect layout direction="row" fill={cellColor} stroke={borderColor} lineWidth={lineWidth} width={600-12} height={50}>
        <Rect layout direction="row">
          <Rect layout paddingRight={10} stroke={borderColor} lineWidth={lineWidth} padding={10}>
            <Txt text="name" fill={headerColor} fontSize={fontSize} />
          </Rect>
          <Rect layout paddingRight={10} stroke={borderColor} lineWidth={lineWidth} padding={10}>
            <Txt text="Fella" fill={valueColor} fontSize={fontSize} />
          </Rect>
        </Rect>
        <Rect layout direction="row">
          <Rect layout paddingRight={10} stroke={borderColor} lineWidth={lineWidth} padding={10}>
            <Txt text="quantity" fill={headerColor} fontSize={fontSize}/>
          </Rect>
          <Rect layout paddingRight={10} stroke={borderColor} lineWidth={lineWidth} padding={10}>
            <Txt text="1" fill={valueColor} fontSize={fontSize}/>
          </Rect>
        </Rect>
      </Rect>
      <Rect fill="gray" width={600-12} height={3}/>      
    </Rect>
  );
  yield* all(
    newestPieceRect().x(195, 1),
  )
  
  yield* waitUntil("illustrating")
  var inkscapeImgRef = createRef<Img>();
  view.add(<Img ref={inkscapeImgRef} src={inkscape} x={2000} y={0} scale={1} opacity={1}/>)
  
  yield* all(
    newestPieceRect().x(-2000, 4/8),
    newPieceRect().x(-2000, 4/8),
    firstPieceRect().x(-2000, 4/8),
    inkscapeImgRef().x(300, 4/8),
  )
  yield* waitUntil("overlay")
  var overlayImgRef = createRef<Img>();
  view.add(<Img ref={overlayImgRef} src={overlay} x={2000} y={0} scale={1} opacity={1}/>)
  yield* all(
    inkscapeImgRef().x(-2000, 4/8),
    overlayImgRef().x(300, 4/8),
  )
  yield* waitUntil("modify")
  
  var designerTextRef = createRef<Txt>();
  overlayImgRef().add(<Txt ref={designerTextRef} text="" fill={valueColor} fontSize={16} x={-325} y={220}/>)
  yield* all(
    designerTextRef().text("{designerName}", 0.5),
  )
  
  yield* waitUntil("comeupwithlogo")
  var theBackImgRef = createRef<Img>();
  var blokeBackImgRef = createRef<Img>();
  var newBackImgRef = createRef<Img>();
  view.add(<Img ref={theBackImgRef} src={theBack} x={2000} y={0} scale={1} opacity={1}>
    <Img ref={blokeBackImgRef} src={blokesBack} x={-250} y={0} scaleX={0.4} scaleY={0.4} opacity={1}/>
    <Img ref={newBackImgRef} src={evil} x={-250} y={0} scaleX={0} scaleY={0.4} opacity={1}/>
  </Img>)
  yield* all(
    overlayImgRef().x(-2000, 4/8),
    theBackImgRef().x(300, 4/8),
  )
  yield* waitUntil("fortheback")
  
  yield* blokeBackImgRef().scale.x(0, 4/8, easeInCubic)
  yield* newBackImgRef().scale.x(0.4, 4/8, easeOutCubic)
  
  
  yield* waitFor(5)
});
