import type { ColumnDef } from '@tanstack/react-table';
import type { MediaAsset } from '../../../types/intern/media.ts';
import { MediaAssetPreview } from '../preview/MediaAssetPreview.tsx';
import { formatTime } from '../../../utils/videoTime.utils.ts';

const formatDate = (value: unknown) => (value ? new Date(String(value)).toLocaleDateString() : '');

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
    accessorKey: 'annotationCount',
    header: 'annotations',
  },
  {
    accessorKey: 'duration',
    header: 'duration',
    cell: ({ getValue }) => {
      const seconds = getValue<number | undefined>();
      return seconds != null ? formatTime(seconds) : '';
    },
  },
  {
    accessorKey: 'mediaCreatedBy',
    header: 'owner',
  },
  {
    accessorKey: 'mediaCreatedAt',
    header: 'added',
    cell: ({ getValue }) => formatDate(getValue()),
  },
  {
    accessorKey: 'annotationsModifiedAt',
    header: 'annotated',
    cell: ({ getValue }) => formatDate(getValue()),
  },
];
