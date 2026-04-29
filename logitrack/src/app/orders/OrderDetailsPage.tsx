import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Printer, RefreshCw, MapPin, Package, Calendar, User, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { MOCK_ORDERS } from "@/mock/orders";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const order = MOCK_ORDERS.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <p className="text-surface-muted text-xl">Pesanan tidak ditemukan</p>
        <Button onClick={() => navigate("/orders")}>Kembali ke Daftar Pesanan</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/orders")}
            className="text-surface-muted hover:text-white hover:bg-surface-card"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              {order.id}
              <StatusBadge status={order.status} />
            </h1>
            <p className="text-surface-muted">Detail informasi dan riwayat pengiriman pesanan.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-surface-border text-surface-muted hover:text-white hover:bg-surface-card">
            <Printer className="h-4 w-4 mr-2" />
            Cetak Resi
          </Button>
          <Button className="bg-brand-primary hover:bg-brand-primary/90 text-white">
            <RefreshCw className="h-4 w-4 mr-2" />
            Ubah Status
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-surface-card border-surface-border overflow-hidden">
            <CardHeader className="border-b border-surface-border bg-surface-card/50">
              <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                <Package className="h-5 w-5 text-brand-primary" />
                Informasi Pengiriman
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                      <User className="h-5 w-5 text-brand-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-surface-muted uppercase tracking-wider font-semibold">Pelanggan</p>
                      <p className="text-white font-medium text-lg">{order.customer}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-status-info/10 flex items-center justify-center shrink-0">
                      <Scale className="h-5 w-5 text-status-info" />
                    </div>
                    <div>
                      <p className="text-xs text-surface-muted uppercase tracking-wider font-semibold">Berat & Jenis</p>
                      <p className="text-white font-medium text-lg">{order.weight} kg • {order.itemType}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-status-success/10 flex items-center justify-center shrink-0">
                      <Calendar className="h-5 w-5 text-status-success" />
                    </div>
                    <div>
                      <p className="text-xs text-surface-muted uppercase tracking-wider font-semibold">Tanggal Pesanan</p>
                      <p className="text-white font-medium text-lg">{order.date}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-status-warning/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-status-warning" />
                    </div>
                    <div>
                      <p className="text-xs text-surface-muted uppercase tracking-wider font-semibold">Estimasi Sampai</p>
                      <p className="text-white font-medium text-lg">{order.estimatedDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-8 bg-surface-border" />

              <div className="relative">
                <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-surface-border/50" />
                <div className="space-y-8 relative">
                  <div className="flex gap-4">
                    <div className="relative z-10 h-10 w-10 rounded-full bg-surface-card border-2 border-brand-primary flex items-center justify-center shrink-0">
                      <div className="h-3 w-3 rounded-full bg-brand-primary" />
                    </div>
                    <div className="pt-1">
                      <p className="text-white font-semibold">Asal Pengiriman</p>
                      <p className="text-surface-muted text-lg">{order.origin}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="relative z-10 h-10 w-10 rounded-full bg-surface-card border-2 border-brand-primary flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-brand-primary" />
                    </div>
                    <div className="pt-1">
                      <p className="text-white font-semibold">Tujuan Pengiriman</p>
                      <p className="text-surface-muted text-lg">{order.destination}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          <Card className="bg-surface-card border-surface-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-brand-primary" />
                Riwayat Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative space-y-6">
                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-surface-border" />
                {order.history.map((item, index) => (
                  <div key={index} className="relative pl-8 flex flex-col gap-1">
                    <div className={cn(
                      "absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 bg-surface-card",
                      index === 0 ? "border-brand-primary" : "border-surface-muted"
                    )} />
                    <div className="flex items-center justify-between">
                      <StatusBadge status={item.status} className="text-[10px] py-0 h-5" />
                      <span className="text-[10px] text-surface-muted">{item.date}</span>
                    </div>
                    <p className="text-sm text-white font-medium">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface-card border-brand-primary/20 border bg-brand-primary/5">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-brand-primary/20 flex items-center justify-center shrink-0">
                <Printer className="h-5 w-5 text-brand-primary" />
              </div>
              <div>
                <p className="text-white font-semibold">Butuh Salinan?</p>
                <p className="text-sm text-surface-muted mb-3">Unduh atau cetak resi pengiriman untuk bukti administrasi.</p>
                <Button variant="link" className="p-0 h-auto text-brand-primary hover:text-brand-primary/80">Cetak Resi Sekarang →</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
