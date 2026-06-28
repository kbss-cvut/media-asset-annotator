import type { MediaAsset } from '../../types/intern/media.ts';

// NOTE: the real list endpoint omits `src` because it is detail-only.
// It is kept here so the mock "open" flow can navigate via `?url=`
// without a per-asset fetch.
const DEMO_USER = 'demo-user';

export const mockMediaAssetList: MediaAsset[] = [
  {
    id: '1',
    type: 'video',
    src: 'https://videos.pexels.com/video-files/32909772/14025961_2560_1440_30fps.mp4',
    thumbnailUrl:
      'https://images.pexels.com/videos/32909772/pexels-photo-32909772.jpeg?auto=compress&h=150&dpr=1',
    name: 'City traffic timelapse',
    description:
      'Timelapse video of city traffic with vehicles, road lanes, traffic lights, and street movement.',
    status: 'pending',
    duration: 32,
    annotationCount: 0,
    mediaCreatedBy: DEMO_USER,
    mediaCreatedAt: '2024-06-01T12:00:00Z',
  },
  {
    id: '2',
    type: 'video',
    src: 'https://videos.pexels.com/video-files/7088947/7088947-uhd_1440_2560_25fps.mp4',
    thumbnailUrl:
      'https://images.pexels.com/videos/7088947/pexels-photo-7088947.jpeg?auto=compress&h=150&dpr=1',
    name: 'Medical ultrasound examination',
    description: 'Medical ultrasound video.',
    status: 'annotated',
    duration: 18,
    annotationCount: 4,
    mediaCreatedBy: DEMO_USER,
    mediaCreatedAt: '2024-06-02T15:30:00Z',
    annotationsModifiedAt: '2024-06-05T10:00:00Z',
  },
  {
    id: '3',
    type: 'video',
    src: 'https://videos.pexels.com/video-files/28588421/12428221_1920_1080_25fps.mp4',
    thumbnailUrl:
      'https://images.pexels.com/videos/28588421/football-match-at-the-city-stadium_2-28588421.jpeg?auto=compress&h=150&dpr=1',
    name: 'Football match',
    description: 'Football match video from a city stadium.',
    status: 'annotated',
    duration: 26,
    annotationCount: 2,
    mediaCreatedBy: DEMO_USER,
    mediaCreatedAt: '2024-06-02T15:30:00Z',
    annotationsModifiedAt: '2024-06-04T08:15:00Z',
  },
  {
    id: '4',
    type: 'image',
    src: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg',
    thumbnailUrl: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg',
    name: 'Mountain lake with pier',
    description: 'Image of a wooden pier leading into a mountain lake.',
    status: 'pending',
    annotationCount: 0,
    mediaCreatedBy: DEMO_USER,
    mediaCreatedAt: '2024-06-03T09:45:00Z',
  },
  {
    id: '5',
    type: 'image',
    src: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg',
    thumbnailUrl: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg',
    name: 'Mountain landscape',
    description: 'Image of a mountain landscape.',
    status: 'annotated',
    annotationCount: 1,
    mediaCreatedBy: DEMO_USER,
    mediaCreatedAt: '2024-06-04T18:20:00Z',
    annotationsModifiedAt: '2024-06-04T19:00:00Z',
  },
];
