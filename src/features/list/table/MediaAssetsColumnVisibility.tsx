import * as Popover from '@radix-ui/react-popover';
import { Columns3 } from 'lucide-react';
import type { Table } from '@tanstack/react-table';
import type { MediaAsset } from '../../../types/intern/media';

export const MediaAssetsColumnVisibility = ({ table }: { table: Table<MediaAsset> }) => {
  const columns = table.getAllLeafColumns().filter((column) => column.getCanHide());

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="
            inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-gray-300
            bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50
            focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
          "
        >
          <Columns3 size={16} />
          Columns
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="end"
          sideOffset={4}
          className="z-50 min-w-44 rounded-md border border-gray-200 bg-white p-2 shadow-lg"
        >
          <div className="flex flex-col">
            {columns.map((column) => (
              <label
                key={column.id}
                className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  checked={column.getIsVisible()}
                  onChange={column.getToggleVisibilityHandler()}
                  className="accent-blue-600"
                />
                <span className="capitalize">{String(column.columnDef.header ?? column.id)}</span>
              </label>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
