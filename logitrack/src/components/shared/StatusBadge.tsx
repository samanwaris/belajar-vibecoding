import { cn } from '@/lib/utils';
import { STATUS_MAP, FLEET_STATUS_MAP, type OrderStatus, type FleetStatus } from '@/constants/status';

interface StatusBadgeProps {
  status: OrderStatus | FleetStatus;
  type?: 'order' | 'fleet';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'order', className }) => {
  const config = type === 'order' 
    ? STATUS_MAP[status as OrderStatus] 
    : FLEET_STATUS_MAP[status as FleetStatus];
  
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

