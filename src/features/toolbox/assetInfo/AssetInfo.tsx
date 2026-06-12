import type { MediaAsset } from '../../../types/intern/media.ts';
import { formatTime } from '../../../utils/videoTime.utils.ts';

const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex justify-between gap-4 px-4 py-2 border-b border-neutral-800">
    <span className="shrink-0 text-neutral-400">{label}</span>
    <span className="text-right text-white break-all">{value}</span>
  </div>
);

export const AssetInfo = ({ asset, duration }: { asset: MediaAsset; duration?: number }) => {
  const effectiveDuration = asset.duration ?? duration;

  return (
    <div className="text-sm">
      <InfoRow label="Name" value={asset.name ?? asset.id} />
      <InfoRow label="Type" value={asset.type} />
      {asset.status && <InfoRow label="Status" value={asset.status} />}
      {asset.modifiedAt && (
        <InfoRow label="Modified" value={new Date(asset.modifiedAt).toLocaleString()} />
      )}
      {asset.type === 'video' && !!effectiveDuration && (
        <InfoRow label="Duration" value={formatTime(effectiveDuration)} />
      )}
      <InfoRow
        label="Source"
        value={
          <a
            href={asset.src}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-neutral-300 hover:text-white"
          >
            {asset.src}
          </a>
        }
      />

      <div className="px-4 py-3">
        <div className="text-neutral-400 mb-1">Description</div>
        {asset.description ? (
          <p className="text-white whitespace-pre-wrap">{asset.description}</p>
        ) : (
          <p className="text-neutral-500 italic">No description</p>
        )}
      </div>
    </div>
  );
};
