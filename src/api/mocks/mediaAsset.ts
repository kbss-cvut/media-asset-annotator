import type { MediaAsset } from '../../types/intern/media.ts';

export const mockVideoMediaAsset: MediaAsset = {
  id: '1',
  type: 'video',
  src: 'https://videos.pexels.com/video-files/855029/855029-hd_1920_1080_30fps.mp4',
  name: 'Sea waves at sunset',
  description:
    'Drone footage of sea waves rolling onto the shore at sunset. Used as a demo asset for video annotation with time-based visibility.',
  status: 'pending',
  modifiedAt: '2024-06-01T12:00:00Z',
};
