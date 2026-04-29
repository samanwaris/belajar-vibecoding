import { type LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isUp: boolean;
  };
  color?: 'blue' | 'emerald' | 'violet' | 'amber' | 'rose' | 'cyan';
  className?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color = 'blue',
  className,
}) => {
  const colorMap = {
    blue: 'text-blue-500 bg-blue-500/10',
    emerald: 'text-emerald-500 bg-emerald-500/10',
    violet: 'text-violet-500 bg-violet-500/10',
    amber: 'text-amber-500 bg-amber-500/10',
    rose: 'text-rose-500 bg-rose-500/10',
    cyan: 'text-cyan-500 bg-cyan-500/10',
  };

  return (
    <div className={cn('p-6 rounded-xl bg-surface-card border border-surface-border', className)}>
      <div className="flex items-center justify-between mb-4">
        <div className={cn('p-2 rounded-lg', colorMap[color])}>
          <Icon size={20} />
        </div>
        {trend && (
          <div className={cn('flex items-center text-xs font-medium', trend.isUp ? 'text-status-success' : 'text-status-danger')}>
            {trend.isUp ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
            {trend.value}%
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-surface-muted mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
      </div>
    </div>
  );
};
