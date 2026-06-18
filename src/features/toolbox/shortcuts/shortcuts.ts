export type Shortcut = {
  /** Human-readable combo shown in the help panel, e.g. "Ctrl+Z". */
  display: string;
  /** Lowercased KeyboardEvent.key values that trigger the action. */
  keys: string[];
  ctrl?: boolean;
  shift?: boolean;
};

/** True when a keyboard event matches the shortcut, modifiers included. */
export const matchesShortcut = (e: KeyboardEvent, shortcut: Shortcut): boolean => {
  const ctrl = e.ctrlKey || e.metaKey;
  return (
    shortcut.keys.includes(e.key.toLowerCase()) &&
    ctrl === Boolean(shortcut.ctrl) &&
    e.shiftKey === Boolean(shortcut.shift)
  );
};

/** True when focus is in a field where typing should not trigger shortcuts. */
export const isTypingTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
};

/** Video playback shortcuts, handled by the video player (not the toolbox). */
export const PLAYBACK_SHORTCUTS = {
  playPause: { display: 'Space', keys: [' ', 'spacebar'] },
  seekBackward: { display: '←', keys: ['arrowleft'] },
  seekForward: { display: '→', keys: ['arrowright'] },
} satisfies Record<string, Shortcut>;

export const PLAYBACK_SHORTCUT_ITEMS: ReadonlyArray<{ label: string; shortcut: Shortcut }> = [
  { label: 'Play / pause', shortcut: PLAYBACK_SHORTCUTS.playPause },
  { label: 'Seek backward', shortcut: PLAYBACK_SHORTCUTS.seekBackward },
  { label: 'Seek forward', shortcut: PLAYBACK_SHORTCUTS.seekForward },
];

export type TabKey = 'asset' | 'annotations';

/** Toolbox tab shortcuts. Always active, independent of edit mode. */
export const TAB_SHORTCUT_ITEMS: ReadonlyArray<{
  tab: TabKey;
  label: string;
  shortcut: Shortcut;
}> = [
  { tab: 'asset', label: 'Asset tab', shortcut: { display: '1', keys: ['1'] } },
  { tab: 'annotations', label: 'Annotations tab', shortcut: { display: '2', keys: ['2'] } },
];
