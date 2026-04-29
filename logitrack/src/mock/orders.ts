import { type OrderStatus } from '@/constants/status';

export interface OrderHistory {
  status: OrderStatus;
  date: string;
  description: string;
}

export interface Order {
  id: string;
  customer: string;
  origin: string;
  destination: string;
  status: OrderStatus;
  date: string;
  weight: number;
  itemType: string;
  estimatedDate: string;
  history: OrderHistory[];
}

const origins = ['Jakarta', 'Bandung', 'Surabaya', 'Semarang', 'Medan', 'Makassar'];
const destinations = ['Surabaya', 'Malang', 'Yogyakarta', 'Bali', 'Palembang', 'Manado'];
const customers = ['PT Maju Jaya', 'Sinar Abadi', 'Global Logistics', 'Indo Food', 'Tech Corp', 'Mandiri Utama'];
const itemTypes = ['General Cargo', 'Electronic', 'Fragile', 'Perishable', 'Liquid'];
const statuses: OrderStatus[] = ['pending', 'assigned', 'in_transit', 'delivered', 'cancelled', 'late'];

export const MOCK_ORDERS: Order[] = Array.from({ length: 25 }, (_, i) => {
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const date = `${Math.floor(Math.random() * 10) + 1} Apr 2024`;
  const estimatedDate = `${Math.floor(Math.random() * 10) + 11} Apr 2024`;
  
  const history: OrderHistory[] = [
    { status: 'pending', date: `${Math.floor(Math.random() * 5) + 1} Apr 2024`, description: 'Pesanan telah dibuat' }
  ];

  if (status !== 'pending') {
    history.push({ status: 'assigned', date: `${Math.floor(Math.random() * 5) + 6} Apr 2024`, description: 'Driver telah ditugaskan' });
  }
  if (['in_transit', 'delivered', 'late'].includes(status)) {
    history.push({ status: 'in_transit', date: `${Math.floor(Math.random() * 5) + 11} Apr 2024`, description: 'Barang sedang dalam perjalanan' });
  }
  if (status === 'delivered') {
    history.push({ status: 'delivered', date: `${Math.floor(Math.random() * 5) + 16} Apr 2024`, description: 'Barang telah sampai di tujuan' });
  }

  return {
    id: `ORD-2024-${(i + 1).toString().padStart(3, '0')}`,
    customer: customers[Math.floor(Math.random() * customers.length)],
    origin: origins[Math.floor(Math.random() * origins.length)],
    destination: destinations[Math.floor(Math.random() * destinations.length)],
    status: status,
    date: date,
    weight: Math.floor(Math.random() * 500) + 10,
    itemType: itemTypes[Math.floor(Math.random() * itemTypes.length)],
    estimatedDate: estimatedDate,
    history: history,
  };
});

