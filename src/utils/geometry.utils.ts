import type { Point } from '../types/geometry';
import type { Annotation } from '../types/intern/annotation.ts';
import { Constants } from './Constants.ts';

/**
 * Builds a polyline tracing the shaft from `a` (tail) to `b` (tip) followed by
 * the two arrowhead barbs at `b`: shaft -> left barb -> back to tip -> right
 * barb. The arrowhead has a fixed size/angle, clamped so short arrows don't get
 * an oversized head.
 */
export const buildArrowPoints = (a: Point, b: Point): number[] => {
  const angle = Math.atan2(b.y - a.y, b.x - a.x);
  const shaftLength = Math.hypot(b.x - a.x, b.y - a.y);
  const headLength = Math.min(Constants.POINTER_ARROWHEAD_LENGTH, shaftLength / 3);
  const spread = Constants.POINTER_ARROWHEAD_ANGLE;

  const left: Point = {
    x: b.x - headLength * Math.cos(angle - spread),
    y: b.y - headLength * Math.sin(angle - spread),
  };
  const right: Point = {
    x: b.x - headLength * Math.cos(angle + spread),
    y: b.y - headLength * Math.sin(angle + spread),
  };

  return [a.x, a.y, b.x, b.y, left.x, left.y, b.x, b.y, right.x, right.y];
};

/**
 * Recognizes an arrow built by {@link buildArrowPoints} by its signature: five
 * vertices where the tip vertex is duplicated (vertex 1 and vertex 3 coincide).
 * Holds before and after any scale, so it also matches transformed geometry.
 */
export const isArrowPoints = (points: number[]): boolean => {
  return points.length === 10 && points[2] === points[6] && points[3] === points[7];
};

export const normalizePoint = (point: Point, width: number, height: number): Point => {
  return {
    x: point.x / width,
    y: point.y / height,
  };
};

export const denormalizePoint = (point: Point, width: number, height: number): Point => {
  return {
    x: point.x * width,
    y: point.y * height,
  };
};

export const normalizePoints = (points: number[], width: number, height: number): number[] => {
  const normalized: number[] = [];

  for (let i = 0; i < points.length; i += 2) {
    normalized.push(points[i] / width);
    normalized.push(points[i + 1] / height);
  }

  return normalized;
};

export const denormalizePoints = (points: number[], width: number, height: number): number[] => {
  const denormalized: number[] = [];

  for (let i = 0; i < points.length; i += 2) {
    denormalized.push(points[i] * width);
    denormalized.push(points[i + 1] * height);
  }

  return denormalized;
};

export const getPointsFromStringPoints = (points: string): number[] => {
  return points
    .trim()
    .split(/[,\s]+/)
    .map(Number);
};

export const getStringPointsFromPoints = (points: number[]): string => {
  const result: string[] = [];

  for (let i = 0; i < points.length; i += 2) {
    result.push(`${points[i]},${points[i + 1]}`);
  }

  return result.join(' ');
};

const getFirstPointFromStringPoints = (points: string): Point => {
  let i = 0;

  // Parse X
  let xStr = '';
  while (i < points.length && points[i] !== ',') {
    xStr += points[i++];
  }

  if (points[i] !== ',') {
    throw new Error(`getFirstPointFromStringPoints: invalid format (missing comma)`);
  }

  i++; // skip ','

  // Parse Y
  let yStr = '';
  while (i < points.length && points[i] !== ' ' && points[i] !== '\n' && points[i] !== '\t') {
    yStr += points[i++];
  }

  const x = Number(xStr);
  const y = Number(yStr);

  if (Number.isNaN(x) || Number.isNaN(y)) {
    throw new Error(`getFirstPointFromStringPoints: invalid numeric values ("${xStr},${yStr}")`);
  }

  return { x, y };
};

export const getFirstPoint = (points: string | number[]): { x: number; y: number } => {
  if (typeof points === 'string') {
    return getFirstPointFromStringPoints(points);
  }

  return getFirstPointFromPoints(points);
};

export const getFirstPointFromPoints = (points: number[]): Point => {
  return { x: points[0], y: points[1] };
};

export const isClosedPolyline = (points: number[], epsilon = 0.001): boolean => {
  if (!points || points.length < 4) return false;

  const dx = points[0] - points[points.length - 2];
  const dy = points[1] - points[points.length - 1];

  return Math.abs(dx) < epsilon && Math.abs(dy) < epsilon;
};

export const normalizeAnnotations = (
  annotations: Annotation[],
  width: number,
  height: number,
): Annotation[] => {
  return annotations.map((ann) => {
    if (ann.kind === 'polyline') {
      return {
        ...ann,
        points: normalizePoints(ann.points, width, height),
      };
    }

    const norm = normalizePoints([ann.x, ann.y], width, height);
    return {
      ...ann,
      x: norm[0],
      y: norm[1],
      fontSize: ann.fontSize / height,
    };
  });
};
