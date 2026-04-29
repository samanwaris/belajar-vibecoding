import { useState } from 'react';
import { 
  Truck, 
  Package, 
  Clock, 
  ArrowRight, 
  MapPin, 
  AlertCircle,
  LayoutGrid
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MOCK_ORDERS } from '@/mock/orders';
import { MOCK_FLEET } from '@/mock/fleet';
import { MOCK_DRIVERS } from '@/mock/drivers';
import { AssignmentForm } from './AssignmentForm';

export default function AssignmentsPage() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pendingOrders = MOCK_ORDERS.filter(o => o.status === 'pending');
  const availableFleetCount = MOCK_FLEET.filter(f => f.status === 'available').length;
  const availableDriverCount = MOCK_DRIVERS.filter(d => d.status === 'available').length;

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <LayoutGrid className="h-6 w-6 text-brand-primary" />
            Dispatching Board
          </h1>
          <p className="text-surface-muted">Kelola penugasan pesanan ke armada dan pengemudi yang tersedia.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-surface-muted font-medium uppercase">Resource Tersedia</p>
            <div className="flex items-center gap-3 mt-1">
              <Badge variant="outline" className="border-status-success/30 text-status-success bg-status-success/5">
                {availableFleetCount} Armada
              </Badge>
              <Badge variant="outline" className="border-status-info/30 text-status-info bg-status-info/5">
                {availableDriverCount} Driver
              </Badge>
            </div>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-brand-primary hover:bg-brand-primary/90 text-white"
                onClick={() => setSelectedOrderId(null)}
              >
                + Buat Penugasan
              </Button>
            </DialogTrigger>
            <AssignmentForm 
              defaultOrderId={selectedOrderId || undefined} 
              onSuccess={() => {
                setIsModalOpen(false);
                setSelectedOrderId(null);
              }} 
            />
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Orders Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-status-warning" />
              Menunggu Penugasan
              <Badge variant="secondary" className="bg-surface-border text-white">
                {pendingOrders.length}
              </Badge>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingOrders.length > 0 ? (
              pendingOrders.map((order) => (
                <Card key={order.id} className="bg-surface-card border-surface-border hover:border-brand-primary/50 transition-all cursor-default group">
                  <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-brand-primary font-mono text-sm">
                      {order.id}
                    </CardTitle>
                    <Badge variant="outline" className="bg-surface-bg text-surface-muted border-surface-border">
                      {order.itemType}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-white font-bold text-lg">{order.customer}</p>
                      <div className="flex items-center gap-2 text-surface-muted text-sm">
                        <MapPin className="h-4 w-4 text-brand-primary" />
                        <span>{order.origin}</span>
                        <ArrowRight className="h-3 w-3" />
                        <span>{order.destination}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-surface-muted border-t border-surface-border pt-3">
                      <div className="flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        <span>{order.weight} kg</span>
                      </div>
                      <span>Estimasi: {order.estimatedDate}</span>
                    </div>

                    <Button 
                      className="w-full mt-2 bg-surface-bg border border-surface-border hover:bg-brand-primary hover:border-brand-primary text-white transition-all"
                      onClick={() => {
                        setSelectedOrderId(order.id);
                        setIsModalOpen(true);
                      }}
                    >
                      Tugaskan Sekarang
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full h-64 border-2 border-dashed border-surface-border rounded-xl flex flex-col items-center justify-center space-y-3">
                <AlertCircle className="h-10 w-10 text-surface-muted opacity-20" />
                <p className="text-surface-muted font-medium">Semua pesanan telah ditugaskan</p>
              </div>
            )}
          </div>
        </div>

        {/* Status / Overview Column */}
        <div className="space-y-6">
          <Card className="bg-surface-card border-surface-border">
            <CardHeader>
              <CardTitle className="text-white text-lg">Ringkasan Resource</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-status-success" />
                    <span className="text-white font-medium">Armada Tersedia</span>
                  </div>
                  <span className="text-2xl font-bold text-white">{availableFleetCount}</span>
                </div>
                <div className="w-full bg-surface-bg rounded-full h-2">
                  <div 
                    className="bg-status-success h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${(availableFleetCount / MOCK_FLEET.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-status-info" />
                    <span className="text-white font-medium">Driver Tersedia</span>
                  </div>
                  <span className="text-2xl font-bold text-white">{availableDriverCount}</span>
                </div>
                <div className="w-full bg-surface-bg rounded-full h-2">
                  <div 
                    className="bg-status-info h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${(availableDriverCount / MOCK_DRIVERS.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-brand-primary/5 border border-brand-primary/20 space-y-2">
                <p className="text-sm font-bold text-white flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-brand-primary" />
                  Tips Penugasan
                </p>
                <p className="text-xs text-surface-muted leading-relaxed">
                  Pilih pengemudi dengan rating tertinggi untuk rute luar kota guna menjaga kualitas layanan.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface-card border-surface-border overflow-hidden">
            <CardHeader>
              <CardTitle className="text-white text-lg">Resource Terdekat (BETA)</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-48 bg-surface-bg/50 flex flex-col items-center justify-center text-center p-6 space-y-2">
                <MapPin className="h-8 w-8 text-surface-muted opacity-20" />
                <p className="text-surface-muted text-sm">Visualisasi peta ketersediaan armada akan segera hadir.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Reuse existing components or simple versions if needed
function Users(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
