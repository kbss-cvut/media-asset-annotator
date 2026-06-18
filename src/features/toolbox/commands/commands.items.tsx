import { Edit, Undo, Redo, Trash2, Save } from 'lucide-react';
import type { JSX } from 'react';
import type { Shortcut } from '../shortcuts/shortcuts.ts';

const ICON_SIZE = 20;

export type CommandKey = 'edit' | 'undo' | 'redo' | 'delete' | 'save';

export const COMMAND_ITEMS: ReadonlyArray<{
  key: CommandKey;
  label: string;
  icon: JSX.Element;
  shortcut: Shortcut;
}> = [
  {
    key: 'edit',
    label: 'Toggle edit mode',
    icon: <Edit size={ICON_SIZE} />,
    shortcut: { display: 'E', keys: ['e'] },
  },
  {
    key: 'undo',
    label: 'Undo',
    icon: <Undo size={ICON_SIZE} />,
    shortcut: { display: 'Ctrl+Z', keys: ['z'], ctrl: true },
  },
  {
    key: 'redo',
    label: 'Redo',
    icon: <Redo size={ICON_SIZE} />,
    shortcut: { display: 'Ctrl+Shift+Z', keys: ['z'], ctrl: true, shift: true },
  },
  {
    key: 'delete',
    label: 'Delete selected',
    icon: <Trash2 size={ICON_SIZE} />,
    shortcut: { display: 'Del', keys: ['delete', 'backspace'] },
  },
  {
    key: 'save',
    label: 'Save annotations',
    icon: <Save size={ICON_SIZE} />,
    shortcut: { display: 'Ctrl+S', keys: ['s'], ctrl: true },
  },
];
