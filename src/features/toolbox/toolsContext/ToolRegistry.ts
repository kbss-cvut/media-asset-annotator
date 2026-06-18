import { Constants } from '../../../utils/Constants';
import { FreehandDrawTool } from './FreehandDrawTool';
import type { ToolContextInterface, ToolStrategy } from './ToolContextInterface';
import { TextDrawTool } from './TextDrawTool.ts';
import { PolygonDrawTool } from './PolygonDrawTool.ts';
import { RectDrawTool } from './RectDrawTool.ts';
import { EllipseDrawTool } from './EllipseDrawTool.ts';

export class ToolRegistry {
  private readonly tools = new Map<string, ToolStrategy | null>();
  private readonly ctx: ToolContextInterface;
  constructor(ctx: ToolContextInterface) {
    this.ctx = ctx;
    this.tools.set(Constants.SELECT_TOOL_LABEL, null);
    this.tools.set(Constants.DRAW_TOOL_LABEL, new FreehandDrawTool());
    this.tools.set(Constants.TEXT_TOOL_LABEL, new TextDrawTool());
    this.tools.set(Constants.POLYGON_TOOL_LABEL, new PolygonDrawTool());
    this.tools.set(Constants.RECT_TOOL_LABEL, new RectDrawTool());
    this.tools.set(Constants.ELLIPSE_TOOL_LABEL, new EllipseDrawTool());
  }

  get(toolId: string): ToolStrategy | null {
    return this.tools.get(toolId) ?? null;
  }

  resetAll() {
    for (const tool of this.tools.values()) {
      tool?.cancel?.(this.ctx);
    }
  }
}
