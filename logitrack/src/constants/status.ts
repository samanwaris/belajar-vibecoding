export const STATUS_MAP = {
  pending: { label: 'Menunggu', color: 'warning' },
  assigned: { label: 'Ditugaskan', color: 'info' },
  in_transit: { label: 'Dalam Perjalanan', color: 'info' },
  delivered: { label: 'Terkirim', color: 'success' },
  cancelled: { label: 'Dibatalkan', color: 'danger' },
  late: { label: 'Terlambat', color: 'danger' },
} as const;

export type OrderStatus = keyof typeof STATUS_MAP;

export const FLEET_STATUS_MAP = {
  available: { label: 'Tersedia', color: 'success' },
  in_transit: { label: 'Dalam Perjalanan', color: 'info' },
  maintenance: { label: 'Maintenance', color: 'warning' },
} as const;

export type FleetStatus = keyof typeof FLEET_STATUS_MAP;

export const DRIVER_STATUS_MAP = {
  available: { label: 'Tersedia', color: 'success' },
  in_transit: { label: 'Dalam Perjalanan', color: 'info' },
  off: { label: 'Off', color: 'danger' },
} as const;

export type DriverStatus = keyof typeof DRIVER_STATUS_MAP;
