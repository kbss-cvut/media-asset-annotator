import { Constants } from '../../../utils/Constants.ts';
import type { ToolContextInterface, ToolStrategy } from './ToolContextInterface.ts';
import type { Point } from '../../../types/geometry.ts';
import { AnnotationFactory } from './AnnotationFactory.ts';
import { AbstractDrawTool } from './AbstractDrawTool.ts';
import { buildArrowPoints } from '../../../utils/geometry.utils.ts';

export class PointerDrawTool extends AbstractDrawTool implements ToolStrategy {
  private annotationId: string | null = null;
  private start: Point | null = null;

  onPointerDown(point: Point, ctx: ToolContextInterface) {
    if (this.annotationId) return;

    const base = AnnotationFactory.createBase(ctx, this.nextLabel('Pointer'));

    ctx.createAnnotation({
      ...base,
      kind: 'polyline',
      points: buildArrowPoints(point, point),
      style: {
        color: Constants.POLYLINE_DEFAULT_COLOR,
        opacity: Constants.POLYLINE_DEFAULT_OPACITY,
        fill: 'none',
        strokeWidth: Constants.DEFAULT_STROKE_WIDTH_FOR_RECT,
      },
    });

    this.annotationId = base.id;
    this.start = point;
  }

  onPointerMove(point: Point, ctx: ToolContextInterface) {
    if (!this.annotationId || !this.start) return;

    ctx.updateAnnotation(this.annotationId, {
      points: buildArrowPoints(this.start, point),
    });
  }

  onPointerUp(point: Point, ctx: ToolContextInterface) {
    if (!this.annotationId || !this.start) return;

    let end = point;
    if (
      Math.abs(point.x - this.start.x) < Constants.MIN_SHAPE_DRAG_SIZE &&
      Math.abs(point.y - this.start.y) < Constants.MIN_SHAPE_DRAG_SIZE
    ) {
      end = { x: this.start.x + Constants.DEFAULT_POINTER_LENGTH, y: this.start.y };
    }

    ctx.updateAnnotation(this.annotationId, {
      points: buildArrowPoints(this.start, end),
    });

    ctx.selectAnnotation(this.annotationId);
    ctx.setSelectTool();
    this.reset();
  }

  cancel(ctx: ToolContextInterface) {
    if (!this.annotationId) return;

    ctx.removeAnnotation(this.annotationId);
    this.reset();
  }

  private reset() {
    this.annotationId = null;
    this.start = null;
  }
}
