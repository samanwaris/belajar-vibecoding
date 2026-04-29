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
import { Search, MoreHorizontal, ArrowUpDown, Users, Star, Phone, UserRound, AlertTriangle } from 'lucide-react';
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
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { MOCK_DRIVERS, type Driver } from '@/mock/drivers';
import { DRIVER_STATUS_MAP, type DriverStatus } from '@/constants/status';
import { DriverDetails } from './DriverDetails';

export default function DriversPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [statusFilter, setStatusFilter] = useState<DriverStatus | 'all'>('all');
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const columns: ColumnDef<Driver>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 text-surface-muted"
        >
          ID Pengemudi
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-medium text-white">{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'name',
      header: 'Nama Lengkap',
      cell: ({ row }) => <div className="text-white font-medium">{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'phone',
      header: 'Nomor Telepon',
      cell: ({ row }) => <div className="text-surface-muted">{row.getValue('phone')}</div>,
    },
    {
      accessorKey: 'rating',
      header: 'Rating',
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-yellow-500">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-sm font-semibold">{row.getValue('rating')}</span>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.getValue('status')} type="driver" />,
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <Sheet>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 text-surface-muted hover:text-white">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-surface-card border-surface-border text-white">
                <DropdownMenuLabel>Aksi Pengemudi</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.phone)}>
                  Salin No. Telepon
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-surface-border" />
                <SheetTrigger asChild>
                  <DropdownMenuItem onClick={() => setSelectedDriver(row.original)}>
                    Lihat Profil
                  </DropdownMenuItem>
                </SheetTrigger>
                <DropdownMenuItem>Hubungi</DropdownMenuItem>
                <DropdownMenuItem className="text-status-danger">Nonaktifkan</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {selectedDriver && <DriverDetails driver={selectedDriver} />}
          </Sheet>
        )
      },
    },
  ];

  const filteredData = useMemo(() => {
    if (statusFilter === 'all') return MOCK_DRIVERS;
    return MOCK_DRIVERS.filter(driver => driver.status === statusFilter);
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
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="h-6 w-6 text-brand-primary" />
            Manajemen Pengemudi
          </h1>
          <p className="text-surface-muted">Pantau ketersediaan, performa, dan profil pengemudi.</p>
        </div>
        <Button className="bg-brand-primary hover:bg-brand-primary/90 text-white">
          + Pengemudi Baru
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface-card border border-surface-border p-4 rounded-xl flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-status-success/10 flex items-center justify-center">
            <UserRound className="h-6 w-6 text-status-success" />
          </div>
          <div>
            <p className="text-sm text-surface-muted font-medium">Tersedia</p>
            <p className="text-2xl font-bold text-white">{MOCK_DRIVERS.filter(d => d.status === 'available').length}</p>
          </div>
        </div>
        <div className="bg-surface-card border border-surface-border p-4 rounded-xl flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-status-info/10 flex items-center justify-center">
            <UserRound className="h-6 w-6 text-status-info" />
          </div>
          <div>
            <p className="text-sm text-surface-muted font-medium">Bertugas</p>
            <p className="text-2xl font-bold text-white">{MOCK_DRIVERS.filter(d => d.status === 'in_transit').length}</p>
          </div>
        </div>
        <div className="bg-surface-card border border-surface-border p-4 rounded-xl flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-status-danger/10 flex items-center justify-center">
            <UserRound className="h-6 w-6 text-status-danger" />
          </div>
          <div>
            <p className="text-sm text-surface-muted font-medium">Off / Cuti</p>
            <p className="text-2xl font-bold text-white">{MOCK_DRIVERS.filter(d => d.status === 'off').length}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-muted" />
          <Input 
            placeholder="Cari nama pengemudi..." 
            className="pl-10 bg-surface-card border-surface-border text-white focus:ring-brand-primary"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
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
          {(Object.keys(DRIVER_STATUS_MAP) as DriverStatus[]).map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className={statusFilter === status ? 'bg-brand-primary text-white hover:bg-brand-primary/90' : 'text-surface-muted hover:text-white'}
            >
              {DRIVER_STATUS_MAP[status].label}
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
                    <AlertTriangle className="h-8 w-8 text-surface-muted opacity-20" />
                    <p className="text-surface-muted font-medium">Tidak ada pengemudi ditemukan</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-surface-muted">
          Menampilkan {table.getRowModel().rows.length} dari {filteredData.length} data pengemudi
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
