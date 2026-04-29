import { type DriverStatus } from '@/constants/status';

export interface Driver {
  id: string;
  name: string;
  phone: string;
  status: DriverStatus;
  rating: number;
  licenseNumber: string;
  licenseType: 'SIM A' | 'SIM B1' | 'SIM B2';
  joinedDate: string;
  totalTrips: number;
  recentAssignments: {
    id: string;
    route: string;
    date: string;
  }[];
}

const names = [
  'Budi Santoso', 'Andi Wijaya', 'Slamet Riyadi', 'Eko Prasetyo', 'Agus Setiawan',
  'Hendra Kurniawan', 'Rudi Hermawan', 'Dedi Kusnadi', 'Ahmad Fauzi', 'Iwan Fals',
  'Bambang Pamungkas', 'Joko Widodo', 'Prabowo Subianto', 'Ganjar Pranowo', 'Anies Baswedan'
];

const statuses: DriverStatus[] = ['available', 'in_transit', 'off'];

export const MOCK_DRIVERS: Driver[] = names.map((name, i) => {
  return {
    id: `DRV-${(i + 1).toString().padStart(3, '0')}`,
    name: name,
    phone: `0812-${Math.floor(Math.random() * 8999) + 1000}-${Math.floor(Math.random() * 8999) + 1000}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    rating: Number((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
    licenseNumber: `${Math.floor(Math.random() * 899999) + 100000}-${Math.floor(Math.random() * 899) + 100}`,
    licenseType: ['SIM A', 'SIM B1', 'SIM B2'][Math.floor(Math.random() * 3)] as any,
    joinedDate: '12 Jan 2023',
    totalTrips: Math.floor(Math.random() * 150) + 20,
    recentAssignments: [
      { id: 'ORD-2024-056', route: 'Jakarta → Bandung', date: '28 Apr 2024' },
      { id: 'ORD-2024-042', route: 'Bandung → Surabaya', date: '25 Apr 2024' },
    ],
  };
});
