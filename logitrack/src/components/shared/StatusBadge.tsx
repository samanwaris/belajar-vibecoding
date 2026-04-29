import { cn } from '@/lib/utils';
import { STATUS_MAP, type OrderStatus } from '@/constants/status';

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const config = STATUS_MAP[status];
  
  const colorClasses = {
    warning: 'bg-status-warning/10 text-status-warning border-status-warning/20',
    info: 'bg-status-info/10 text-status-info border-status-info/20',
    success: 'bg-status-success/10 text-status-success border-status-success/20',
    danger: 'bg-status-danger/10 text-status-danger border-status-danger/20',
  };

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
