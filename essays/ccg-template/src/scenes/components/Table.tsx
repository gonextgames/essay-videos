import { Rect, Txt } from "@motion-canvas/2d";

type TableCell = {
  text: string;
  width?: number;
  align?: "left" | "center" | "right";
};

type TableRow = TableCell[];

interface TableProps {
  rows: TableRow[];
  cellWidth?: number;
  cellHeight?: number;
  fontSize?: number;
  borderColor?: string;
  borderWidth?: number;
  fill?: string;
  textColor?: string;
  radius?: number;
  gap?: number;
  padding?: number;
}

export function Table({
  rows,
  cellWidth = 100,
  cellHeight = 40,
  fontSize = 24,
  borderColor = "#222",
  borderWidth = 2,
  fill = "#fff",
  textColor = "#222",
  radius = 8,
  gap = 0,
  padding = 8,
}: TableProps) {
  const numCols = Math.max(...rows.map((row) => row.length));
  
  return (
    <Rect
      layout
      direction="column"
      gap={gap}
      fill={fill}
      radius={radius}
      stroke={borderColor}
      lineWidth={borderWidth}
      padding={borderWidth}
    >
      {rows.map((row, rowIdx) => (
        <Rect
          layout
          direction="row"
          gap={gap}
          height={cellHeight}
        >
          {Array.from({ length: numCols }).map((_, colIdx) => {
            const cell = row[colIdx] || { text: "" };
            return (
              <Rect
                layout
                width={cell.width ?? cellWidth}
                height={cellHeight}
                fill={fill}
                stroke={borderColor}
                lineWidth={borderWidth}
                alignItems="center"
                justifyContent={
                  cell.align === "right"
                    ? "end"
                    : cell.align === "center"
                    ? "center"
                    : "start"
                }
                padding={padding}
              >
                <Txt
                  text={cell.text}
                  fontSize={fontSize}
                  fill={textColor}
                  width={cell.width ?? cellWidth - padding * 2}
                  height={cellHeight - padding * 2}
                  lineHeight={cellHeight - padding * 2}
                />
              </Rect>
            );
          })}
        </Rect>
      ))}
    </Rect>
  );
}

