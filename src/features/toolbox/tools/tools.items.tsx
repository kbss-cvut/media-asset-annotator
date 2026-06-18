import { MousePointer, LineSquiggle, Square, Circle, Type, VectorSquare } from 'lucide-react';
import type { JSX } from 'react';
import { Constants } from '../../../utils/Constants';

const ICON_SIZE = 20;

export type Tool =
  | typeof Constants.SELECT_TOOL_LABEL
  | typeof Constants.DRAW_TOOL_LABEL
  | typeof Constants.TEXT_TOOL_LABEL
  | typeof Constants.RECT_TOOL_LABEL
  | typeof Constants.ELLIPSE_TOOL_LABEL
  | typeof Constants.POLYGON_TOOL_LABEL;

export const TOOL_ITEMS: ReadonlyArray<{
  tool: Tool;
  icon: JSX.Element;
}> = [
  {
    tool: Constants.SELECT_TOOL_LABEL as Tool,
    icon: <MousePointer size={ICON_SIZE} />,
  },
  {
    tool: Constants.DRAW_TOOL_LABEL as Tool,
    icon: <LineSquiggle size={ICON_SIZE} />,
  },
  {
    tool: Constants.POLYGON_TOOL_LABEL as Tool,
    icon: <VectorSquare size={ICON_SIZE} />,
  },
  {
    tool: Constants.RECT_TOOL_LABEL as Tool,
    icon: <Square size={ICON_SIZE} />,
  },
  {
    tool: Constants.ELLIPSE_TOOL_LABEL as Tool,
    icon: <Circle size={ICON_SIZE} />,
  },
  {
    tool: Constants.TEXT_TOOL_LABEL as Tool,
    icon: <Type size={ICON_SIZE} />,
  },
];
