import { Fragment } from 'react';
import { Bell } from 'lucide-react';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useLocation, Link } from 'react-router-dom';

export const TopNav = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <header className="h-16 border-b border-surface-border bg-surface-bg/80 backdrop-blur-md flex items-center justify-between px-4 sticky top-0 z-40">
      <div className="flex items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard">Beranda</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join('/')}`;
              
              // Mapping path to Indonesian label
              const labels: Record<string, string> = {
                dashboard: 'Dashboard',
                orders: 'Pengiriman',
                fleet: 'Armada',
                drivers: 'Pengemudi',
                assignments: 'Penugasan',
                pod: 'Bukti Kirim',
                finance: 'Keuangan',
                reports: 'Laporan',
                settings: 'Pengaturan',
              };
              
              const label = labels[value] || value.charAt(0).toUpperCase() + value.slice(1);

              return (
                <Fragment key={to}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {last ? (
                      <BreadcrumbPage>{label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={to}>{label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <Button variant="ghost" size="icon" className="text-surface-muted hover:text-white relative">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-status-danger rounded-full border border-surface-bg"></span>
        </Button>
        
        <div className="h-8 w-px bg-surface-border mx-1"></div>
        
        <div className="flex items-center space-x-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-white leading-none">Admin LogiTrack</p>
            <p className="text-[10px] text-surface-muted mt-1 uppercase tracking-wider">Super Admin</p>
          </div>
          <Avatar className="h-9 w-9 border border-surface-border">
            <AvatarImage src="" />
            <AvatarFallback className="bg-brand-primary/20 text-brand-primary font-bold">AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};
