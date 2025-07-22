import { Path, View2D } from "@motion-canvas/2d";
import { createRef, Reference } from "@motion-canvas/core";

const AppIcon = (params: any) => {
    return <Path 
        lineWidth={0}
        shadowColor={'#000'}
        shadowBlur={12}
        shadowOffsetX={12}
        shadowOffsetY={12}
        {...params}
    />;
}
export default AppIcon;