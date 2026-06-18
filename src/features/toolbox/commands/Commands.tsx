import clsx from 'clsx';
import { COMMAND_ITEMS, type CommandKey } from './commands.items.tsx';

interface CommandsProps {
  isEditing: boolean;
  onCommand: (cmd: CommandKey) => void;
  trailing?: React.ReactNode;
}

export const Commands = ({ isEditing, onCommand, trailing }: CommandsProps) => {
  return (
    <div className="p-2 flex justify-around border-b border-neutral-700">
      {COMMAND_ITEMS.map(({ key, icon }) => {
        const isEdit = key === 'edit';

        return (
          <CommandButton
            key={key}
            active={isEdit && isEditing}
            disabled={!isEdit && !isEditing}
            onClick={() => onCommand(key)}
          >
            {icon}
          </CommandButton>
        );
      })}
      {trailing}
    </div>
  );
};

interface CommandButtonProps {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const CommandButton = ({ active, disabled, onClick, children }: CommandButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={clsx(
      'p-2 rounded-md',
      'hover:bg-neutral-700',
      active && 'bg-neutral-700',
      disabled && 'opacity-40 cursor-not-allowed hover:bg-transparent',
    )}
  >
    {children}
  </button>
);
