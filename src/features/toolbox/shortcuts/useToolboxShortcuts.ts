import { useEffect, useRef } from 'react';
import { COMMAND_ITEMS, type CommandKey } from '../commands/commands.items.tsx';
import { TOOL_ITEMS, type Tool } from '../tools/tools.items.tsx';
import { isTypingTarget, matchesShortcut, TAB_SHORTCUT_ITEMS, type TabKey } from './shortcuts.ts';

interface Params {
  isEditing: boolean;
  onCommand: (cmd: CommandKey) => void;
  onToolChange: (tool: Tool) => void;
  onSelectTab: (tab: TabKey) => void;
}

/**
 * Global keyboard shortcuts for toolbox tabs, commands, and drawing tools. Tabs
 * are always active; commands other than "edit" and all tools require edit
 * mode, mirroring the button enable/disable rules. Ignored while typing.
 */
export const useToolboxShortcuts = ({
  isEditing,
  onCommand,
  onToolChange,
  onSelectTab,
}: Params) => {
  const latest = useRef({ isEditing, onCommand, onToolChange, onSelectTab });
  useEffect(() => {
    latest.current = { isEditing, onCommand, onToolChange, onSelectTab };
  });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;
      const { isEditing, onCommand, onToolChange, onSelectTab } = latest.current;

      const tab = TAB_SHORTCUT_ITEMS.find((item) => matchesShortcut(e, item.shortcut));
      if (tab) {
        e.preventDefault();
        onSelectTab(tab.tab);
        return;
      }

      const command = COMMAND_ITEMS.find((item) => matchesShortcut(e, item.shortcut));
      if (command) {
        if (command.key === 'edit' || isEditing) {
          e.preventDefault();
          onCommand(command.key);
        }
        return;
      }

      if (!isEditing) return;
      const tool = TOOL_ITEMS.find((item) => matchesShortcut(e, item.shortcut));
      if (tool) {
        e.preventDefault();
        onToolChange(tool.tool);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
};
