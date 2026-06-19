export type MediaType = 'image' | 'video';

export type MediaAsset = {
  id: string;
  type: MediaType;
  name?: string;
  description?: string;
  status?: 'annotated' | 'pending';
  thumbnailUrl?: string; // list + detail; used for table previews
  duration?: number;
  annotationCount?: number;
  mediaCreatedBy?: string;
  mediaCreatedAt?: string;
  annotationsModifiedAt?: string;
  // detail-only (GET /asset/{id}); absent from the list response
  src?: string;
  tags?: string[];
  mediaModifiedAt?: string;
};

export type MediaLayout = {
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
};

export type MediaResolution = {
  naturalWidth: number;
  naturalHeight: number;
  clientWidth: number;
  clientHeight: number;
};

export type MediaAssetSource = { type: 'internal'; id: string } | { type: 'external'; url: string };
