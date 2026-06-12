export type MediaType = 'image' | 'video';

export type MediaAsset = {
  id: string;
  type: MediaType;
  src: string;
  name?: string;
  description?: string;
  duration?: number;
  status?: 'annotated' | 'pending';
  modifiedAt?: string;
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
