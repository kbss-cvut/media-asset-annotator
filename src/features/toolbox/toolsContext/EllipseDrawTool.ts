import { Constants } from '../../../utils/Constants.ts';
import type { ToolContextInterface, ToolStrategy } from './ToolContextInterface.ts';
import type { Point } from '../../../types/geometry.ts';
import { AnnotationFactory } from './AnnotationFactory.ts';
import { AbstractDrawTool } from './AbstractDrawTool.ts';

export class EllipseDrawTool extends AbstractDrawTool implements ToolStrategy {
  private annotationId: string | null = null;
  private start: Point | null = null;

  onPointerDown(point: Point, ctx: ToolContextInterface) {
    if (this.annotationId) return;

    const base = AnnotationFactory.createBase(ctx, this.nextLabel('Ellipse'));

    ctx.createAnnotation({
      ...base,
      kind: 'polyline',
      points: this.ellipsePoints(point, point),
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
      points: this.ellipsePoints(this.start, point),
    });
  }

  onPointerUp(point: Point, ctx: ToolContextInterface) {
    if (!this.annotationId || !this.start) return;

    let end = point;
    if (
      Math.abs(point.x - this.start.x) < Constants.MIN_SHAPE_DRAG_SIZE &&
      Math.abs(point.y - this.start.y) < Constants.MIN_SHAPE_DRAG_SIZE
    ) {
      const diameter = Constants.DEFAULT_ELLIPSE_RADIUS * 2;
      end = { x: this.start.x + diameter, y: this.start.y + diameter };
    }

    ctx.updateAnnotation(this.annotationId, {
      points: this.ellipsePoints(this.start, end),
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

  /**
   * Samples a closed polyline approximating the ellipse inscribed in the
   * bounding box spanned by the two corners. A square box yields a circle.
   */
  private ellipsePoints(a: Point, b: Point): number[] {
    const cx = (a.x + b.x) / 2;
    const cy = (a.y + b.y) / 2;
    const rx = (b.x - a.x) / 2;
    const ry = (b.y - a.y) / 2;

    const segments = Constants.ELLIPSE_SEGMENTS;
    const points: number[] = [];

    for (let i = 0; i <= segments; i += 1) {
      const theta = (2 * Math.PI * i) / segments;
      points.push(cx + rx * Math.cos(theta), cy + ry * Math.sin(theta));
    }

    return points;
  }

  private reset() {
    this.annotationId = null;
    this.start = null;
  }
}
