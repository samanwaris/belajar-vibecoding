import { cn } from '@/lib/utils';
import { STATUS_MAP, FLEET_STATUS_MAP, DRIVER_STATUS_MAP, type OrderStatus, type FleetStatus, type DriverStatus } from '@/constants/status';

interface StatusBadgeProps {
  status: OrderStatus | FleetStatus | DriverStatus;
  type?: 'order' | 'fleet' | 'driver';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'order', className }) => {
  let config;
  if (type === 'order') config = STATUS_MAP[status as OrderStatus];
  else if (type === 'fleet') config = FLEET_STATUS_MAP[status as FleetStatus];
  else if (type === 'driver') config = DRIVER_STATUS_MAP[status as DriverStatus];
  
  const colorClasses = {
    warning: 'bg-status-warning/10 text-status-warning border-status-warning/20',
    info: 'bg-status-info/10 text-status-info border-status-info/20',
    success: 'bg-status-success/10 text-status-success border-status-success/20',
    danger: 'bg-status-danger/10 text-status-danger border-status-danger/20',
  };

  if (!config) return null;

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        colorClasses[config.color as keyof typeof colorClasses],
        className
      )}
    >
      {config.label}
    </span>
  );
};

