import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { KpiCard } from '@/components/shared/KpiCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { KPI_DATA, CHART_DATA, RECENT_ORDERS } from '@/mock/dashboard';

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-8">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_DATA.map((kpi, index) => (
          <KpiCard key={index} {...kpi} />
        ))}
      </div>

      {/* Chart Section */}
      <Card className="bg-surface-card border-surface-border">
        <CardHeader>
          <CardTitle className="text-white text-lg font-semibold">Statistik Pengiriman 7 Hari Terakhir</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  stroke="#94A3B8" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#94A3B8" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    borderColor: '#334155',
                    borderRadius: '8px',
                    border: '1px solid #334155'
                  }} 
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#94A3B8', marginBottom: '4px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#3B82F6" 
                  fillOpacity={1} 
                  fill="url(#colorTotal)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders Section */}
      <Card className="bg-surface-card border-surface-border">
        <CardHeader>
          <CardTitle className="text-white text-lg font-semibold">Pengiriman Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-surface-border">
                <TableHead className="text-surface-muted">ID Pesanan</TableHead>
                <TableHead className="text-surface-muted">Pelanggan</TableHead>
                <TableHead className="text-surface-muted">Rute</TableHead>
                <TableHead className="text-surface-muted">Status</TableHead>
                <TableHead className="text-surface-muted text-right">Tanggal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RECENT_ORDERS.map((order) => (
                <TableRow key={order.id} className="border-surface-border hover:bg-surface-bg/50">
                  <TableCell className="font-medium text-white">{order.id}</TableCell>
                  <TableCell className="text-surface-muted">{order.customer}</TableCell>
                  <TableCell className="text-surface-muted">
                    {order.origin} → {order.destination}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="text-right text-surface-muted">{order.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
