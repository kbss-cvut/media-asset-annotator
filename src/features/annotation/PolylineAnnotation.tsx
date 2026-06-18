import type { Annotation, PolylineAnnotation } from '../../types/intern/annotation';
import { Line } from 'react-konva';
import Konva from 'konva';
import SelectableAnnotation from './SelectableAnnotation.tsx';
import { useRef } from 'react';
import { buildArrowPoints, isArrowPoints, isClosedPolyline } from '../../utils/geometry.utils.ts';

interface PolylineAnnotationProps {
  annotation: PolylineAnnotation;
  isEditing: boolean;
  onCommit: (before: Annotation, after: Annotation) => void;
  isSelected: boolean;
  onSelect: () => void;
}

const PolylineAnnotationShape = ({
  annotation,
  isEditing,
  onCommit,
  isSelected,
  onSelect,
}: PolylineAnnotationProps) => {
  const strokeRef = useRef<Konva.Line>(null);
  const fillRef = useRef<Konva.Line>(null);

  /*
   * REAL-TIME DRAG SYNC
   * Stroke is draggable.
   * Fill mirrors stroke position during drag.
   */
  const handleDragMove = (e: Konva.KonvaEventObject<DragEvent>) => {
    const node = e.target as Konva.Line;

    const x = node.x();
    const y = node.y();

    if (fillRef.current) {
      fillRef.current.position({ x, y });
    }
  };

  /*
   * DRAG END → Bake movement into points
   */
  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    const node = e.target as Konva.Line;

    const dx = node.x();
    const dy = node.y();

    // Reset transforms
    node.position({ x: 0, y: 0 });
    fillRef.current?.position({ x: 0, y: 0 });

    const newPoints = annotation.points.map((v, i) => (i % 2 === 0 ? v + dx : v + dy));

    onCommit(annotation, { ...annotation, points: newPoints });
  };

  /*
   * TRANSFORM (resize / scale)
   */
  const handleTransformEnd = (node: Konva.Node) => {
    const line = node as Konva.Line;
    const absTransform = line.getAbsoluteTransform();

    const localPoints = line.points();
    const newPoints: number[] = [];

    for (let i = 0; i < localPoints.length; i += 2) {
      const p = absTransform.point({
        x: localPoints[i],
        y: localPoints[i + 1],
      });

      newPoints.push(p.x, p.y);
    }

    // A non-uniform (side-handle) scale shears the baked arrowhead, so rebuild
    // it from the resized shaft endpoints at its normal fixed size.
    const committedPoints = isArrowPoints(annotation.points)
      ? buildArrowPoints({ x: newPoints[0], y: newPoints[1] }, { x: newPoints[2], y: newPoints[3] })
      : newPoints;

    line.setAttrs({
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
    });

    fillRef.current?.setAttrs({
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
    });

    onCommit(annotation, {
      ...annotation,
      points: committedPoints,
    });
  };

  return (
    <SelectableAnnotation
      isSelected={isSelected}
      isTransformable={isEditing}
      nodeRef={strokeRef}
      onTransformCommit={handleTransformEnd}
    >
      {/* FILL LAYER */}
      {annotation.style.fill !== 'none' && (
        <Line
          ref={fillRef}
          points={annotation.points}
          closed
          fill={annotation.style.fill}
          opacity={annotation.style.opacity ?? 1}
          listening={false}
        />
      )}

      {/* STROKE LAYER */}
      <Line
        ref={strokeRef}
        points={annotation.points}
        stroke={annotation.style.color}
        strokeWidth={annotation.style.strokeWidth}
        onClick={onSelect}
        closed={isClosedPolyline(annotation.points)}
        draggable={isSelected && isEditing}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
      />
    </SelectableAnnotation>
  );
};

export default PolylineAnnotationShape;
