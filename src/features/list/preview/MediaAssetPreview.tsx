import type { MediaAsset } from '../../../types/intern/media.ts';

export const MediaAssetPreview = ({ asset }: { asset: MediaAsset }) => {
  if (!asset.thumbnailUrl) {
    return <div className="h-12 w-12 rounded-md border bg-gray-100" aria-label="no preview" />;
  }

  return (
    <img
      src={asset.thumbnailUrl}
      alt="preview"
      className="h-12 w-12 rounded-md border object-cover bg-gray-100"
      loading="lazy"
      decoding="async"
    />
  );
};
