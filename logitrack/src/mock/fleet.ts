import { type FleetStatus } from '@/constants/status';

export interface Fleet {
  id: string;
  licensePlate: string;
  type: 'CDE' | 'CDD' | 'Wingbox' | 'Trailer';
  capacity: number; // in kg
  status: FleetStatus;
  lastMaintenance: string;
}

const types: Fleet['type'][] = ['CDE', 'CDD', 'Wingbox', 'Trailer'];
const statuses: FleetStatus[] = ['available', 'in_transit', 'maintenance'];

export const MOCK_FLEET: Fleet[] = Array.from({ length: 15 }, (_, i) => {
  const type = types[Math.floor(Math.random() * types.length)];
  const capacities = {
    'CDE': 2000,
    'CDD': 4000,
    'Wingbox': 10000,
    'Trailer': 20000,
  };

  return {
    id: `FLT-${(i + 1).toString().padStart(3, '0')}`,
    licensePlate: `B ${Math.floor(Math.random() * 8999) + 1000} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
    type: type,
    capacity: capacities[type],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    lastMaintenance: `${Math.floor(Math.random() * 28) + 1} Mar 2024`,
  };
});
