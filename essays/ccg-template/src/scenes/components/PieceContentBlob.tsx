import {Rect, Txt, Line} from "@motion-canvas/2d";
import {NodeProps} from "@motion-canvas/2d/lib/components/Node";
import {createRef} from "@motion-canvas/core";
import AppIcon from "./AppIcon";

type ContentBlobProps = {
  name: string;
  quantity: string;
  data: Record<string, string>;
  visibleRows?: number; // Controls how many data rows are visible
} & NodeProps;

export default function PieceContentBlob({
  name,
  quantity,
  data,
  visibleRows = Object.keys(data).length, // Default to showing all rows
  ...rest
}: ContentBlobProps) {
  const tableColor = "#1e252e"
  const headerColor = "#71718e"
  const valueColor = "#c1c1cd"
  const cellColor = "#181e25"
  const borderColor = tableColor//"#2e3947"
  const lineWidth = 3
  const fontSize = 28

  // Create refs for each data row
  const dataRowRefs = Object.keys(data).map(() => createRef<Rect>());
  const containerRef = createRef<Rect>();
  
  return (
    <Rect 
      ref={containerRef}
      layout 
      direction="column" 
      {...rest} 
      fill={tableColor} 
      radius={10} 
      padding={6}
    >
      {/* <AppIcon
        data="m 101.96158,26.964779 c -1.25905,-0.50458 -2.66412,-0.50458 -3.92316,0 l -62.93926,25.17359 64.90083,25.95401 64.90085,-25.95401 z M 94.72693,170.90877 V 87.341329 L 26.17714,59.931959 V 143.48885 Z M 94.1258,17.167439 c 3.77094,-1.50811 7.97745,-1.50811 11.74839,0 l 75.18331,30.07753 c 1.99985,0.80147 3.31098,2.73894 3.31148,4.8934 v 91.350481 c -0.003,4.31154 -2.62967,8.18722 -6.63351,9.7868 l -75.77389,30.30956 c -1.25905,0.50458 -2.66412,0.50458 -3.92316,0 L 22.27508,153.27565 c -4.00799,-1.59623 -6.63961,-5.47265 -6.64406,-9.7868 V 52.138369 c 5e-4,-2.15446 1.31163,-4.09193 3.31148,-4.8934 z"
        // scale={0.5}
        fill={'#69d1d2'}
      /> */}
      <Rect layout direction="row" fill={cellColor} stroke={borderColor} lineWidth={lineWidth}>
        <Rect layout direction="row">
          <Rect layout paddingRight={10} stroke={borderColor} lineWidth={lineWidth} padding={10}>
            <Txt text="name" fill={headerColor} fontSize={fontSize} />
          </Rect>
          <Rect layout paddingRight={10} stroke={borderColor} lineWidth={lineWidth} padding={10}>
            <Txt text={name} fill={valueColor} fontSize={fontSize} />
          </Rect>
        </Rect>
        <Rect layout direction="row">
          <Rect layout paddingRight={10} stroke={borderColor} lineWidth={lineWidth} padding={10}>
            <Txt text="quantity" fill={headerColor} fontSize={fontSize}/>
          </Rect>
          <Rect layout paddingRight={10} stroke={borderColor} lineWidth={lineWidth} padding={10}>
            <Txt text={quantity} fill={valueColor} fontSize={fontSize}/>
          </Rect>
        </Rect>
      </Rect>
      <Rect fill="gray" width={800} height={3}/>
      {Object.keys(data).map((key, index) => (
        <Rect 
          key={key}
          ref={dataRowRefs[index]}
          layout 
          direction="row" 
          fill={cellColor}
          opacity={index < visibleRows ? 1 : 0}
          scale={index < visibleRows ? 1 : 0.8}
        >
          <Rect layout paddingRight={10} width={300} stroke={borderColor} lineWidth={lineWidth} padding={10}>
            <Txt text={key} fill={valueColor} fontSize={fontSize} />
          </Rect>
          <Rect layout stroke={borderColor} lineWidth={lineWidth} width={500} padding={10}>
            <Txt text={data[key]} fill={valueColor} fontSize={fontSize} />
          </Rect>
        </Rect>
      ))}
    </Rect>
  );
}