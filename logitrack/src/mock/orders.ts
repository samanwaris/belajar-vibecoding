import { type OrderStatus } from '@/constants/status';

export interface Order {
  id: string;
  customer: string;
  origin: string;
  destination: string;
  status: OrderStatus;
  date: string;
}

const origins = ['Jakarta', 'Bandung', 'Surabaya', 'Semarang', 'Medan', 'Makassar'];
const destinations = ['Surabaya', 'Malang', 'Yogyakarta', 'Bali', 'Palembang', 'Manado'];
const customers = ['PT Maju Jaya', 'Sinar Abadi', 'Global Logistics', 'Indo Food', 'Tech Corp', 'Mandiri Utama'];
const statuses: OrderStatus[] = ['pending', 'assigned', 'in_transit', 'delivered', 'cancelled', 'late'];

export const MOCK_ORDERS: Order[] = Array.from({ length: 25 }, (_, i) => ({
  id: `ORD-2024-${(i + 1).toString().padStart(3, '0')}`,
  customer: customers[Math.floor(Math.random() * customers.length)],
  origin: origins[Math.floor(Math.random() * origins.length)],
  destination: destinations[Math.floor(Math.random() * destinations.length)],
  status: statuses[Math.floor(Math.random() * statuses.length)],
  date: `${Math.floor(Math.random() * 28) + 1} Apr 2024`,
}));
