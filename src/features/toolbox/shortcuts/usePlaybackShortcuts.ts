import { useEffect, useRef } from 'react';
import { isTypingTarget, matchesShortcut, PLAYBACK_SHORTCUTS } from './shortcuts.ts';
import { Constants } from '../../../utils/Constants.ts';

interface Params {
  isPlaying: boolean;
  currentTime: number;
  onPlay: () => void;
  onPause: () => void;
  onSeek: (time: number) => void;
}

/**
 * Global keyboard shortcuts for video playback: Space toggles play/pause and
 * the arrow keys seek by {@link Constants.VIDEO_SEEK_STEP_SECONDS}. Ignored
 * while typing in a field.
 */
export const usePlaybackShortcuts = ({
  isPlaying,
  currentTime,
  onPlay,
  onPause,
  onSeek,
}: Params) => {
  const latest = useRef({ isPlaying, currentTime, onPlay, onPause, onSeek });
  useEffect(() => {
    latest.current = { isPlaying, currentTime, onPlay, onPause, onSeek };
  });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;
      const { isPlaying, currentTime, onPlay, onPause, onSeek } = latest.current;
      const step = Constants.VIDEO_SEEK_STEP_SECONDS;

      if (matchesShortcut(e, PLAYBACK_SHORTCUTS.playPause)) {
        e.preventDefault();
        if (isPlaying) onPause();
        else onPlay();
      } else if (matchesShortcut(e, PLAYBACK_SHORTCUTS.seekBackward)) {
        e.preventDefault();
        onSeek(currentTime - step);
      } else if (matchesShortcut(e, PLAYBACK_SHORTCUTS.seekForward)) {
        e.preventDefault();
        onSeek(currentTime + step);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
};
