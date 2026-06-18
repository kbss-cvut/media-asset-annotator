import * as Popover from '@radix-ui/react-popover';
import { Keyboard } from 'lucide-react';
import { COMMAND_ITEMS } from '../commands/commands.items.tsx';
import { TOOL_ITEMS } from '../tools/tools.items.tsx';
import { PLAYBACK_SHORTCUT_ITEMS, TAB_SHORTCUT_ITEMS, type Shortcut } from './shortcuts.ts';

const ICON_SIZE = 20;

interface Row {
  label: string;
  shortcut: Shortcut;
}

const SECTIONS: ReadonlyArray<{ title: string; rows: ReadonlyArray<Row> }> = [
  { title: 'Panel', rows: TAB_SHORTCUT_ITEMS.map(({ label, shortcut }) => ({ label, shortcut })) },
  { title: 'Actions', rows: COMMAND_ITEMS.map(({ label, shortcut }) => ({ label, shortcut })) },
  { title: 'Tools', rows: TOOL_ITEMS.map(({ label, shortcut }) => ({ label, shortcut })) },
  { title: 'Playback', rows: PLAYBACK_SHORTCUT_ITEMS },
];

export const ShortcutsHelp = () => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          aria-label="Keyboard shortcuts"
          title="Keyboard shortcuts"
          className="p-2 rounded-md hover:bg-neutral-700"
        >
          <Keyboard size={ICON_SIZE} />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="end"
          collisionPadding={8}
          className="p-4 bg-neutral-900 rounded shadow-xl z-50 w-72 text-white flex flex-col max-h-[var(--radix-popover-content-available-height)]"
        >
          <h3 className="text-sm font-semibold mb-2 shrink-0">Keyboard shortcuts</h3>
          <div className="flex flex-col gap-3 overflow-y-auto pr-2">
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <div className="text-xs uppercase tracking-wide text-neutral-500 mb-1">
                  {section.title}
                </div>
                <ul className="flex flex-col gap-1">
                  {section.rows.map((row) => (
                    <li key={row.label} className="flex items-center justify-between text-sm">
                      <span className="text-neutral-300">{row.label}</span>
                      <kbd className="px-1.5 py-0.5 rounded bg-neutral-700 text-xs font-mono">
                        {row.shortcut.display}
                      </kbd>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
