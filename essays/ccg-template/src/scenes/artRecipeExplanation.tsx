import {Circle, Rect, Txt, Path, makeScene2D, Img, Line} from '@motion-canvas/2d';
import {createRef, all, waitFor, Vector2} from '@motion-canvas/core';
import {easeInOutCubic} from '@motion-canvas/core';
import bloke from './bloke.png';
export default makeScene2D(function* (view) {
  // Create a blank 2.5x3.5 inch card (standard card size)
  const blankCard = createRef<Rect>();
  
  // 2.5x3.5 inches = 240x336 pixels at 96 DPI
  view.add(
    <Rect
      ref={blankCard}
      width={240}
      height={317}
      fill={'#f0f0f0'}

      stroke={'#333'}
      lineWidth={0}
      radius={12}
      shadowColor={'#000'}
      shadowBlur={4}
      shadowOffsetX={4}
      shadowOffsetY={4}
    />
  );

  // Create what looks like a Magic the Gathering card on top of it, fading in from opacity 0 to 1 but slightly to the right and above it
  const magicCard = createRef<Rect>();
  const cardTitle = createRef<Txt>();
  const blokeImg = createRef<Img>();
  const cardText = createRef<Txt>();
  view.scale(2);
  
  view.add(<Img src={bloke} x={35} y={-115-1000} scale={0.425} ref={blokeImg} opacity={0} shadowColor={'#000'} shadowBlur={8} shadowOffsetX={8} shadowOffsetY={8}/>);  
  view.add(
    <Path
      ref={magicCard}
      data="m -109.2802,-158.32921 c -5.93877,0 -10.7198,4.38502 -10.7198,9.83206 v 296.9943 c 0,5.44703 4.78103,9.83206 10.7198,9.83206 h 218.5604 c 5.93877,0 10.7198,-4.38503 10.7198,-9.83206 v -296.9943 c 0,-5.44704 -4.78103,-9.83206 -10.7198,-9.83206 z m -4.91604,27.8282 H 111.16175 V 34.527386 h -225.35799 z"
      fill={'#4a90e2'}
      x={80}
      y={-80 -1000}
      opacity={0}
      lineWidth={0}
      shadowColor={'#000'}
      shadowBlur={12}
      shadowOffsetX={12}
      shadowOffsetY={12}
    >
      <Txt
        ref={cardTitle}
        text="{placeholder}"
        fontSize={24}
        fontWeight={700}
        fill={'black'}
        x={-45}
        y={-145}
        textAlign={'left'}
      />
    </Path>
  );

  // Make the magic card slide on top of the blank card
  yield* waitFor(1);
  yield view.scale(1.75, (1/8*2 + 1))
  yield* all (
    blokeImg().y(-115, 1),
    magicCard().y(-80, 1),
    blokeImg().opacity(1, 1),
    magicCard().opacity(1, 1)
  );
  
  // Add text elemnt to the right of the cards that says "SVG's" with an arrow pointing to the cards
  const svgText = createRef<Txt>();
  const arrow = createRef<Line>();
  view.add(<Txt ref={svgText} text="SVG's" x={350} y={0} fill={'#ececec'} fontSize={32} fontWeight={700} opacity={0} />);
  view.add(<Line ref={arrow} points={[ [300, 0], [210, 0] ]} stroke={'#ececec'} lineWidth={5} radius={10} endArrow opacity={0} />);
  yield* all(
    arrow().opacity(1, 0.5),
    svgText().opacity(1, 0.5)
  );
  yield* waitFor(1); 
  yield* all(
    arrow().opacity(0, 1/2),
    svgText().opacity(0, 1/2),
    view.scale(2.5, 1, easeInOutCubic),
    blokeImg().position([0, -50], 1),
    blokeImg().shadowOffset([0, 0], 1),
    blokeImg().shadowBlur(0, 1),
    magicCard().position([0, 0], 1),
    magicCard().shadowOffset([0, 0], 1),
    magicCard().shadowBlur(0, 1),
  );

  yield* waitFor(0.5);

  // Change the color of the magic card from blue to orange
  yield* all(
    view.rotation(1, 1, easeInOutCubic),
    magicCard().fill('#00ffd0', 1),
  );

  yield* waitFor(0.5);

  // Replace the text on the magic card from {name} to Orc Warrior
  yield* all(
    view.rotation(-1, 1, easeInOutCubic),
    cardTitle().text("Bloke", 1),
    cardTitle().x(-85, 1)
  );

  yield* waitFor(1);

  // The card is now orange with "Orc Warrior" text and positioned on top of the blank card
});
