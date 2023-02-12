import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Layout, Text} from '@motion-canvas/2d/lib/components';
import {createRef} from '@motion-canvas/core/lib/utils';
import {all} from '@motion-canvas/core/lib/flow';

export default makeScene2D(function* (view) {
  const myCircle = createRef<Circle>();

  view.add(
    <>
      <Layout width={1920} height={1080} direction={'column'} gap={28} layout padding={20}>
        
      </Layout>
      <Circle
        ref={myCircle}
        x={-300}
        width={240}
        height={240}
        fill="#e13238"
      />,
      <Text text="Hello" x={-300}
        width={240}
        height={240}/>
    </>
    
  );

  yield* all(
    myCircle().position.x(300, 1).to(-300, 1),
    myCircle().fill('#e6a700', 1).to('#e13238', 1),
  );
});