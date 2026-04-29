import { useState, useMemo } from 'react';
import { 
  type ColumnDef, 
  flexRender, 
  getCoreRowModel, 
  useReactTable, 
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  getFilteredRowModel,
  type ColumnFiltersState,
} from '@tanstack/react-table';
import { Search, MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MOCK_ORDERS, type Order } from '@/mock/orders';
import { STATUS_MAP, type OrderStatus } from '@/constants/status';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { OrderForm } from './OrderForm';
import { useNavigate } from 'react-router-dom';

export default function OrdersPage() {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-transparent p-0 text-surface-muted"
          >
            ID Pesanan
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium text-white">{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'customer',
      header: 'Pelanggan',
      cell: ({ row }) => <div className="text-surface-muted">{row.getValue('customer')}</div>,
    },
    {
      id: 'route',
      header: 'Rute',
      cell: ({ row }) => (
        <div className="text-surface-muted">
          {row.original.origin} → {row.original.destination}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.getValue('status')} />,
    },
    {
      accessorKey: 'date',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-transparent p-0 text-surface-muted"
          >
            Tanggal
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="text-surface-muted">{row.getValue('date')}</div>,
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 text-surface-muted hover:text-white">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-surface-card border-surface-border text-white">
              <DropdownMenuLabel>Aksi</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.id)}>
                Salin ID Pesanan
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-surface-border" />
              <DropdownMenuItem onClick={() => navigate(`/orders/${row.original.id}`)}>
                Lihat Detail
              </DropdownMenuItem>
              <DropdownMenuItem>Lacak Lokasi</DropdownMenuItem>
              <DropdownMenuItem className="text-status-danger">Batalkan</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ];

  const filteredData = useMemo(() => {
    if (statusFilter === 'all') return MOCK_ORDERS;
    return MOCK_ORDERS.filter(order => order.status === statusFilter);
  }, [statusFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Manajemen Pengiriman</h1>
          <p className="text-surface-muted">Kelola dan pantau semua rute pengiriman logistik.</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-brand-primary hover:bg-brand-primary/90 text-white">
              + Pesanan Baru
            </Button>
          </DialogTrigger>
          <OrderForm onSuccess={() => setIsCreateModalOpen(false)} />
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-muted" />
          <Input 
            placeholder="Cari ID atau pelanggan..." 
            className="pl-10 bg-surface-card border-surface-border text-white focus:ring-brand-primary"
            value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("id")?.setFilterValue(event.target.value)
            }
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          <Button 
            variant={statusFilter === 'all' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setStatusFilter('all')}
            className={statusFilter === 'all' ? 'bg-brand-primary text-white hover:bg-brand-primary/90' : 'text-surface-muted hover:text-white'}
          >
            Semua
          </Button>
          {(Object.keys(STATUS_MAP) as OrderStatus[]).map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className={statusFilter === status ? 'bg-brand-primary text-white hover:bg-brand-primary/90' : 'text-surface-muted hover:text-white'}
            >
              {STATUS_MAP[status].label}
            </Button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-surface-border bg-surface-card overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-surface-border hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-surface-muted font-semibold">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-surface-border hover:bg-surface-bg/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Search className="h-8 w-8 text-surface-muted opacity-20" />
                    <p className="text-surface-muted font-medium">Tidak ada data ditemukan</p>
                    <p className="text-xs text-surface-muted/60">Coba ubah filter atau kata kunci pencarian Anda.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-surface-muted">
          Menampilkan {table.getRowModel().rows.length} dari {filteredData.length} data
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="text-surface-muted disabled:opacity-30 hover:text-white"
          >
            Sebelumnya
          </Button>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-white">{table.getState().pagination.pageIndex + 1}</span>
            <span className="text-sm text-surface-muted">/ {table.getPageCount()}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="text-surface-muted disabled:opacity-30 hover:text-white"
          >
            Selanjutnya
          </Button>
        </div>
      </div>
    </div>
  );
}
