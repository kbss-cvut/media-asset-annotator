import { useCallback, useEffect, useRef } from 'react';
import { Transformer } from 'react-konva';
import Konva from 'konva';
import type { Box } from 'konva/lib/shapes/Transformer';

interface SelectableAnnotationProps {
  isSelected: boolean;
  isTransformable: boolean;
  onTransformCommit?: (node: Konva.Node) => void;
  nodeRef: React.RefObject<Konva.Node | null>;
  children: React.ReactNode;
}

const SelectableAnnotation = ({
  isSelected,
  isTransformable,
  onTransformCommit,
  nodeRef,
  children,
}: SelectableAnnotationProps) => {
  const transformerRef = useRef<Konva.Transformer>(null);

  /* ---------- attach transformer ---------- */
  useEffect(() => {
    const tr = transformerRef.current;
    const node = nodeRef.current;

    if (isSelected && tr && node) {
      tr.nodes([node]);
      tr.getLayer()?.batchDraw();
    }
  }, [isSelected, nodeRef]);

  const boundBoxFunc = useCallback((oldBox: Box, newBox: Box) => {
    const stage = transformerRef.current?.getStage();
    if (!stage) return oldBox;

    const outOfBounds =
      newBox.x < 0 ||
      newBox.y < 0 ||
      newBox.x + newBox.width > stage.width() ||
      newBox.y + newBox.height > stage.height();

    return outOfBounds ? oldBox : newBox;
  }, []);

  const handleTransformerDrag = useCallback(
    (e: Konva.KonvaEventObject<DragEvent>) => {
      const tr = transformerRef.current;
      const node = nodeRef.current;
      if (!tr || !node) return;

      const stage = tr.getStage();
      if (!stage) return;

      stage.container().style.cursor = 'move';

      const parent = e.target.getParent();
      if (!parent) return;

      const { width, height } = parent.size();

      const { x: trX, y: trY } = tr.position();
      const trW = tr.width();
      const trH = tr.height();

      const abs = node.getAbsolutePosition();
      let nextX = abs.x;
      let nextY = abs.y;

      if (trX < 0) nextX -= trX;
      if (trX + trW > width) nextX += width - (trX + trW);
      if (trY < 0) nextY -= trY;
      if (trY + trH > height) nextY += height - (trY + trH);

      if (nextX !== abs.x || nextY !== abs.y) {
        node.setAbsolutePosition({ x: nextX, y: nextY });
      }
    },
    [nodeRef],
  );

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const stage = node.getStage();
    if (!stage) return;
    const container = stage.container();
    const handleMouseEnter = () => {
      container.style.cursor = 'pointer';
    };
    const handleMouseLeave = () => {
      container.style.cursor = 'default';
    };
    const resetCursor = () => {
      container.style.cursor = 'default';
    };
    node.on('mouseenter', handleMouseEnter);
    node.on('dragend', resetCursor);
    node.on('mouseleave', handleMouseLeave);
    return () => {
      node.off('mouseenter', handleMouseEnter);
      node.off('mouseleave', handleMouseLeave);
      node.off('dragend', resetCursor);
      container.style.cursor = 'default';
    };
  }, [isSelected, isTransformable, nodeRef]);

  const handleTransformEnd = useCallback(() => {
    const node = nodeRef.current;
    if (node)
      if (onTransformCommit) {
        onTransformCommit(node);
      }
  }, [onTransformCommit, nodeRef]);

  return (
    <>
      {children}

      {isSelected && (
        <Transformer
          ref={transformerRef}
          rotateEnabled={false}
          resizeEnabled={isTransformable}
          keepRatio
          flipEnabled={false}
          shouldOverdrawWholeArea
          onDragMove={handleTransformerDrag}
          onTransformEnd={isTransformable ? handleTransformEnd : undefined}
          boundBoxFunc={isTransformable ? boundBoxFunc : undefined}
          enabledAnchors={[
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right',
            'middle-left',
            'middle-right',
            'top-center',
            'bottom-center',
          ]}
        />
      )}
    </>
  );
};

export default SelectableAnnotation;
