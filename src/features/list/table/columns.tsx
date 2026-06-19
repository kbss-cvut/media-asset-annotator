import type { ColumnDef } from '@tanstack/react-table';
import type { MediaAsset } from '../../../types/intern/media.ts';
import { MediaAssetPreview } from '../preview/MediaAssetPreview.tsx';

export const columns: ColumnDef<MediaAsset>[] = [
  {
    id: 'preview',
    header: 'preview',
    enableSorting: false,
    enableColumnFilter: false,
    cell: ({ row }) => <MediaAssetPreview asset={row.original} />,
  },
  {
    accessorKey: 'id',
    header: 'id',
  },
  {
    accessorKey: 'src',
    header: 'src',
  },
  {
    accessorKey: 'description',
    header: 'description',
  },
  {
    accessorKey: 'type',
    header: 'type',
  },
  {
    accessorKey: 'status',
    header: 'status',
    filterFn: 'equalsString',
  },
  {
    accessorKey: 'modifiedAt',
    header: 'modified',
  },
];
