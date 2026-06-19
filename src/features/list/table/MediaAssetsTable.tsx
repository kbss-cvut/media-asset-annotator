import { MediaAssetsSearch } from './MediaAssetsSearch';
import { MediaAssetsTableHead } from './MediaAssetsTableHead';
import { MediaAssetsTableRow } from './MediaAssetsTableRow';
import { MediaAssetsPagination } from './MediaAssetsPagination';
import type { MediaAsset } from '../../../types/intern/media';
import { buildMediaAssetAnnotatorUrl } from '../../../utils/mediaAsset.utils';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';
import { columns } from './columns';
import { useState } from 'react';
import { MediaAssetsColumnVisibility } from './MediaAssetsColumnVisibility';

const globalFilterFn = (row: any, columnId: string, filterValue: string) => {
  // support `field=value`
  if (filterValue.includes('=')) {
    const [field, value] = filterValue.split('=');

    const cellValue = row.original[field?.trim()];

    return String(cellValue) === value?.trim();
  }

  // fallback: default contains search
  const cell = row.getValue(columnId);
  return String(cell).toLowerCase().includes(filterValue.toLowerCase());
};

export const MediaAssetsTable = ({ data }: { data: MediaAsset[] }) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({ src: false });

  const table = useReactTable({
    data,
    columns,
    globalFilterFn,
    state: { globalFilter, sorting, columnVisibility },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex justify-center px-6 py-10">
      <div className="w-full max-w-8xl">
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between gap-4 border-b border-gray-200 p-6">
            <MediaAssetsSearch value={globalFilter} onChange={setGlobalFilter} />
            <MediaAssetsColumnVisibility table={table} />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <MediaAssetsTableHead headerGroups={table.getHeaderGroups()} />

              <tbody>
                {table.getRowModel().rows.length === 0 && (
                  <tr>
                    <td
                      colSpan={table.getVisibleLeafColumns().length}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No media assets found
                    </td>
                  </tr>
                )}

                {table.getRowModel().rows.map((row) => (
                  <MediaAssetsTableRow
                    key={row.id}
                    row={row}
                    onOpen={(asset) =>
                      window.open(
                        buildMediaAssetAnnotatorUrl(asset),
                        '_blank',
                        'noopener,noreferrer',
                      )
                    }
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-200 p-6">
            <MediaAssetsPagination table={table} />
          </div>
        </div>
      </div>
    </div>
  );
};
