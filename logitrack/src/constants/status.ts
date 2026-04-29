export const STATUS_MAP = {
  pending: { label: 'Menunggu', color: 'warning' },
  assigned: { label: 'Ditugaskan', color: 'info' },
  in_transit: { label: 'Dalam Perjalanan', color: 'info' },
  delivered: { label: 'Terkirim', color: 'success' },
  cancelled: { label: 'Dibatalkan', color: 'danger' },
  late: { label: 'Terlambat', color: 'danger' },
} as const;

export type OrderStatus = keyof typeof STATUS_MAP;
