export class Constants {
  /* ============================================================
   * Media & Assets
   * ============================================================ */
  static VIDEO_ASSET_TYPE_LABEL = 'video';
  static IMAGE_ASSET_TYPE_LABEL = 'image';

  /* ============================================================
   * Time
   * ============================================================ */
  static ANNOTATION_DEFAULT_DURATION = 5;
  static ANNOTATION_DEFAULT_TIME_INTERVAL_PRECISION = 2;

  /* ============================================================
   * Annotation Types
   * ============================================================ */
  static POLYLINE_TYPE_LABEL = 'polyline';
  static TEXT_TYPE_LABEL = 'text';

  /* ============================================================
   * Scene / Canvas
   * ============================================================ */
  static DEFAULT_SCENE_WIDTH = 960;
  static DEFAULT_SCENE_HEIGHT = 540;

  /* ============================================================
   * Tools
   * ============================================================ */
  static SELECT_TOOL_LABEL = 'select';
  static RECT_TOOL_LABEL = 'rect';
  static TEXT_TOOL_LABEL = 'text';
  static DRAW_TOOL_LABEL = 'polyline';
  static POLYGON_TOOL_LABEL = 'polygon';
  static ELLIPSE_TOOL_LABEL = 'ellipse';

  /* ============================================================
   * Commands
   * ============================================================ */
  static EDIT_COMMAND_LABEL = 'edit';
  static UNDO_COMMAND_LABEL = 'undo';
  static REDO_COMMAND_LABEL = 'redo';
  static DELETE_COMMAND_LABEL = 'delete';
  static SAVE_COMMAND_LABEL = 'save';

  /* ============================================================
   * Polygon Defaults
   * ============================================================ */
  static POLYGON_CLOSE_DISTANCE = 10;
  static POLYGON_DEFAULT_COLOR = '#00ff00';
  static POLYGON_DEFAULT_OPACITY = 1;
  static POLYGON_DEFAULT_FILL = 'rgba(0,255,0,0.2)';
  static POLYGON_DEFAULT_STROKE_WIDTH = 6;

  /* ============================================================
   * Polyline Defaults
   * ============================================================ */
  static POLYLINE_DEFAULT_COLOR = 'red';
  static POLYLINE_DEFAULT_STROKE_WIDTH = 7;
  static POLYLINE_DEFAULT_OPACITY = 1;
  static POLYLINE_DEFAULT_FILL = 'none';
  static DEFAULT_RECT_WIDTH = 50;
  static DEFAULT_RECT_HEIGHT = 50;
  static DEFAULT_STROKE_WIDTH_FOR_RECT = 2.5;
  static MIN_SHAPE_DRAG_SIZE = 5;
  static DEFAULT_ELLIPSE_RADIUS = 25;
  static ELLIPSE_SEGMENTS = 64;
  static MAX_STROKE_WIDTH = 50;

  /* ============================================================
   * Text Defaults
   * ============================================================ */
  static TEXT_DEFAULT_FONT_SIZE = 25;
  static TEXT_DEFAULT_FONT_WEIGHT = 300;
  static TEXT_DEFAULT_COLOR = 'red';
  static TEXT_DEFAULT_STROKE_WIDTH = 1;
  static TEXT_DEFAULT_OPACITY = 1;
  static TEXT_DEFAULT_FILL = 'none';
  static DEFAULT_FONT_FAMILY = 'sans-serif';
  static MIN_FONT_SIZE = 8;
  static MAX_FONT_SIZE = 72;
}
