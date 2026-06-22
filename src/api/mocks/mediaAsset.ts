import type { MediaAsset } from '../../types/intern/media.ts';

export const mockVideoMediaAsset: MediaAsset = {
  id: '1',
  type: 'video',
  src: 'https://videos.pexels.com/video-files/855029/855029-hd_1920_1080_30fps.mp4',
  thumbnailUrl:
    'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=96&h=96&fit=crop',
  name: 'Sea waves at sunset',
  description:
    'Drone footage of sea waves rolling onto the shore at sunset. Used as a demo asset for video annotation with time-based visibility.',
  status: 'pending',
  tags: ['sea', 'sunset', 'drone'],
  duration: 32,
  annotationCount: 0,
  mediaCreatedBy: 'demo-user',
  mediaCreatedAt: '2024-06-01T12:00:00Z',
  mediaModifiedAt: '2024-06-01T12:00:00Z',
};
