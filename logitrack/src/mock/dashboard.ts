import { Package, Truck, Clock, DollarSign } from 'lucide-react';

export const KPI_DATA = [
  {
    title: 'Total Pengiriman',
    value: '1,284',
    icon: Package,
    trend: { value: 12, isUp: true },
    color: 'blue' as const,
  },
  {
    title: 'Armada Aktif',
    value: '42',
    icon: Truck,
    trend: { value: 5, isUp: true },
    color: 'emerald' as const,
  },
  {
    title: 'Pengiriman Terlambat',
    value: '18',
    icon: Clock,
    trend: { value: 2, isUp: false },
    color: 'rose' as const,
  },
  {
    title: 'Pendapatan',
    value: 'Rp 428.5M',
    icon: DollarSign,
    trend: { value: 8, isUp: true },
    color: 'violet' as const,
  },
];

export const CHART_DATA = [
  { day: 'Sen', total: 120, delivered: 110 },
  { day: 'Sel', total: 150, delivered: 140 },
  { day: 'Rab', total: 180, delivered: 175 },
  { day: 'Kam', total: 140, delivered: 130 },
  { day: 'Jum', total: 190, delivered: 180 },
  { day: 'Sab', total: 110, delivered: 105 },
  { day: 'Min', total: 90, delivered: 85 },
];

export const RECENT_ORDERS = [
  {
    id: 'ORD-2024-001',
    customer: 'PT Maju Jaya',
    origin: 'Jakarta',
    destination: 'Surabaya',
    status: 'in_transit' as const,
    date: '29 Apr 2024',
  },
  {
    id: 'ORD-2024-002',
    customer: 'Sinar Abadi',
    origin: 'Bandung',
    destination: 'Semarang',
    status: 'delivered' as const,
    date: '28 Apr 2024',
  },
  {
    id: 'ORD-2024-003',
    customer: 'Global Logistics',
    origin: 'Medan',
    destination: 'Palembang',
    status: 'pending' as const,
    date: '29 Apr 2024',
  },
  {
    id: 'ORD-2024-004',
    customer: 'Indo Food',
    origin: 'Makassar',
    destination: 'Manado',
    status: 'late' as const,
    date: '27 Apr 2024',
  },
  {
    id: 'ORD-2024-005',
    customer: 'Tech Corp',
    origin: 'Jakarta',
    destination: 'Tangerang',
    status: 'assigned' as const,
    date: '29 Apr 2024',
  },
];
