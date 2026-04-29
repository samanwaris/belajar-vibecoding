import { Fragment } from 'react';
import { Bell, LogOut } from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

export const TopNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
        
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-white leading-none">{user?.name || 'User'}</p>
                <p className="text-[10px] text-surface-muted mt-1 uppercase tracking-wider">{user?.role || 'Guest'}</p>
              </div>
              <Avatar className="h-9 w-9 border border-surface-border">
                <AvatarImage src="" />
                <AvatarFallback className="bg-brand-primary/20 text-brand-primary font-bold">
                  {user?.name ? user.name.substring(0, 2).toUpperCase() : 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-surface-card border-surface-border text-white">
            <DropdownMenuItem onClick={handleLogout} className="text-status-danger focus:text-status-danger focus:bg-status-danger/10 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Keluar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
