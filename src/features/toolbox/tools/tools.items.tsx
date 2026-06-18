import {
  MousePointer,
  LineSquiggle,
  Square,
  Circle,
  MoveUpRight,
  Type,
  VectorSquare,
} from 'lucide-react';
import type { JSX } from 'react';
import { Constants } from '../../../utils/Constants';
import type { Shortcut } from '../shortcuts/shortcuts.ts';

const ICON_SIZE = 20;

export type Tool =
  | typeof Constants.SELECT_TOOL_LABEL
  | typeof Constants.DRAW_TOOL_LABEL
  | typeof Constants.TEXT_TOOL_LABEL
  | typeof Constants.RECT_TOOL_LABEL
  | typeof Constants.ELLIPSE_TOOL_LABEL
  | typeof Constants.POINTER_TOOL_LABEL
  | typeof Constants.POLYGON_TOOL_LABEL;

export const TOOL_ITEMS: ReadonlyArray<{
  tool: Tool;
  label: string;
  icon: JSX.Element;
  shortcut: Shortcut;
}> = [
  {
    tool: Constants.SELECT_TOOL_LABEL as Tool,
    label: 'Select',
    icon: <MousePointer size={ICON_SIZE} />,
    shortcut: { display: 'V', keys: ['v'] },
  },
  {
    tool: Constants.DRAW_TOOL_LABEL as Tool,
    label: 'Freehand',
    icon: <LineSquiggle size={ICON_SIZE} />,
    shortcut: { display: 'P', keys: ['p'] },
  },
  {
    tool: Constants.POINTER_TOOL_LABEL as Tool,
    label: 'Pointer / arrow',
    icon: <MoveUpRight size={ICON_SIZE} />,
    shortcut: { display: 'A', keys: ['a'] },
  },
  {
    tool: Constants.POLYGON_TOOL_LABEL as Tool,
    label: 'Polygon',
    icon: <VectorSquare size={ICON_SIZE} />,
    shortcut: { display: 'G', keys: ['g'] },
  },
  {
    tool: Constants.RECT_TOOL_LABEL as Tool,
    label: 'Rectangle',
    icon: <Square size={ICON_SIZE} />,
    shortcut: { display: 'R', keys: ['r'] },
  },
  {
    tool: Constants.ELLIPSE_TOOL_LABEL as Tool,
    label: 'Ellipse',
    icon: <Circle size={ICON_SIZE} />,
    shortcut: { display: 'O', keys: ['o'] },
  },
  {
    tool: Constants.TEXT_TOOL_LABEL as Tool,
    label: 'Text',
    icon: <Type size={ICON_SIZE} />,
    shortcut: { display: 'T', keys: ['t'] },
  },
];
