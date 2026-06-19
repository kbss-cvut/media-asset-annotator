import { useCallback, useEffect, useRef, useState } from 'react';
import VideoControls from './videoControls/VideoControls';

import type { MediaAsset, MediaLayout, MediaResolution } from '../../../../types/intern/media';
import type { Annotation, TimeRange } from '../../../../types/intern/annotation';

import { clamp } from '../../../../utils/videoTime.utils';
import { usePlayback } from '../../../../context/playback/usePlayback';
import { usePlaybackShortcuts } from '../../../../features/toolbox/shortcuts/usePlaybackShortcuts.ts';
import DynamicMediaFrame from '../MediaFrameWithDynamicSize.tsx';

interface VideoAssetProps {
  asset: MediaAsset;
  setAsset: (asset: MediaAsset) => void;
  setTime: (time: number) => void;
  layout: MediaLayout | null;
  onAssetSrcReady: (mediaResolution: MediaResolution) => void;
  selectedAnnotation?: Annotation;
  onCommitAnnotation?: (before: Annotation, after: Annotation) => void;
  isEditing?: boolean;
  setActive?: (active: boolean) => void;
  children: React.ReactNode;
}

export default function VideoAsset({
  asset,
  setAsset,
  setTime,
  layout,
  onAssetSrcReady,
  selectedAnnotation,
  onCommitAnnotation,
  setActive,
  isEditing,
  children,
}: VideoAssetProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { duration, setDuration, cursor } = usePlayback();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => {
      setDuration(video.duration);
      if (!asset.duration || asset.duration === 0) {
        setAsset({ ...asset, duration: video.duration });
      }
    };

    const handleTimeUpdate = () => {
      setTime(video.currentTime);
    };

    const notify = () => {
      const { videoWidth, videoHeight, clientWidth, clientHeight } = video;

      if (videoWidth === 0 || videoHeight === 0 || clientWidth === 0 || clientHeight === 0) {
        return;
      }

      onAssetSrcReady({
        naturalWidth: videoWidth,
        naturalHeight: videoHeight,
        clientWidth,
        clientHeight,
      });
    };

    const handlePlay = () => {
      setActive?.(true);
      setIsPlaying(true);
    };
    const handlePause = () => {
      setActive?.(false);
      setIsPlaying(false);
    };

    video.addEventListener('loadedmetadata', handleLoaded);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    const ro = new ResizeObserver(notify);
    ro.observe(video);
    return () => {
      video.removeEventListener('loadedmetadata', handleLoaded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [setDuration, setTime]);

  const play = useCallback(() => {
    videoRef.current?.play();
  }, []);

  const pause = useCallback(() => {
    videoRef.current?.pause();
  }, []);

  const seek = useCallback(
    (time: number) => {
      if (!videoRef.current) return;
      videoRef.current.currentTime = clamp(time, 0, duration);
    },
    [duration],
  );

  usePlaybackShortcuts({
    isPlaying,
    currentTime: cursor.t,
    onPlay: play,
    onPause: pause,
    onSeek: seek,
  });

  const updateAnnotationInterval = useCallback(
    (interval: TimeRange) => {
      if (!selectedAnnotation || !onCommitAnnotation) return;
      onCommitAnnotation(selectedAnnotation, {
        ...selectedAnnotation,
        time: interval,
      });
    },
    [selectedAnnotation, onCommitAnnotation],
  );

  return (
    <div className="flex flex-col w-full h-full">
      <DynamicMediaFrame layout={layout}>
        <video
          ref={videoRef}
          src={asset.src}
          className="max-w-full max-h-full object-contain"
          controls={false}
        />
        {/* CANVAS OVERLAY — only when size is known */}
        {layout && children}
      </DynamicMediaFrame>

      {/* CONTROLS */}
      {duration > 0 && (
        <VideoControls
          isEditing={isEditing}
          duration={duration}
          currentTime={cursor.t}
          isPlaying={isPlaying}
          selectedAnnotation={selectedAnnotation ?? null}
          onPlay={play}
          onPause={pause}
          onSeek={seek}
          onCommitAnnotationTime={updateAnnotationInterval}
        />
      )}
    </div>
  );
}
