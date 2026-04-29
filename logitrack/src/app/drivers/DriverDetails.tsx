import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { type Driver } from "@/mock/drivers";
import { Star, Phone, CreditCard, Calendar, Truck, History } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface DriverDetailsProps {
  driver: Driver;
}

export function DriverDetails({ driver }: DriverDetailsProps) {
  return (
    <SheetContent className="bg-surface-card border-surface-border text-white sm:max-w-md overflow-y-auto">
      <SheetHeader className="text-left pb-6">
        <SheetTitle className="text-2xl font-bold">Profil Pengemudi</SheetTitle>
        <SheetDescription className="text-surface-muted">
          Informasi lengkap dan riwayat performa pengemudi.
        </SheetDescription>
      </SheetHeader>

      <div className="space-y-8">
        {/* Header Profile */}
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-2 border-brand-primary">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${driver.name}`} />
            <AvatarFallback className="bg-surface-bg text-brand-primary font-bold text-xl">
              {driver.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="text-xl font-bold">{driver.name}</h3>
            <div className="flex items-center gap-2">
              <StatusBadge status={driver.status} type="driver" />
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-semibold">{driver.rating}</span>
              </div>
            </div>
            <p className="text-sm text-surface-muted flex items-center gap-1">
              <Phone className="h-3 w-3" /> {driver.phone}
            </p>
          </div>
        </div>

        <Separator className="bg-surface-border" />

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-xs text-surface-muted font-medium flex items-center gap-1">
              <CreditCard className="h-3 w-3" /> Nomor SIM
            </p>
            <p className="font-semibold text-white">{driver.licenseNumber}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-surface-muted font-medium flex items-center gap-1">
              <Truck className="h-3 w-3" /> Tipe Lisensi
            </p>
            <p className="font-semibold text-white">{driver.licenseType}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-surface-muted font-medium flex items-center gap-1">
              <Calendar className="h-3 w-3" /> Tanggal Bergabung
            </p>
            <p className="font-semibold text-white">{driver.joinedDate}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-surface-muted font-medium flex items-center gap-1">
              <History className="h-3 w-3" /> Total Perjalanan
            </p>
            <p className="font-semibold text-white">{driver.totalTrips} Trips</p>
          </div>
        </div>

        {/* Recent Assignments */}
        <div className="space-y-4">
          <h4 className="font-bold flex items-center gap-2">
            <History className="h-4 w-4 text-brand-primary" />
            Penugasan Terakhir
          </h4>
          <div className="space-y-3">
            {driver.recentAssignments.map((assignment) => (
              <div 
                key={assignment.id}
                className="p-3 rounded-lg bg-surface-bg border border-surface-border space-y-1"
              >
                <div className="flex justify-between items-center text-sm">
                  <span className="text-brand-primary font-mono font-medium">{assignment.id}</span>
                  <span className="text-surface-muted text-xs">{assignment.date}</span>
                </div>
                <p className="text-sm font-medium">{assignment.route}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex gap-3">
          <button className="flex-1 bg-brand-primary hover:bg-brand-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            Hubungi
          </button>
          <button className="flex-1 bg-surface-bg hover:bg-surface-border text-white border border-surface-border font-medium py-2 px-4 rounded-lg transition-colors">
            Ubah Profil
          </button>
        </div>
      </div>
    </SheetContent>
  );
}
