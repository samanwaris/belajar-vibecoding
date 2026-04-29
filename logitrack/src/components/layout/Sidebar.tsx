import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  Users, 
  ClipboardList, 
  FileCheck, 
  DollarSign, 
  BarChart2, 
  Settings,
  ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard',   path: '/dashboard' },
  { icon: Package,         label: 'Pengiriman',  path: '/orders' },
  { icon: Truck,           label: 'Armada',      path: '/fleet' },
  { icon: Users,           label: 'Pengemudi',   path: '/drivers' },
  { icon: ClipboardList,   label: 'Penugasan',   path: '/assignments' },
  { icon: FileCheck,       label: 'Bukti Kirim', path: '/pod' },
  { icon: DollarSign,      label: 'Keuangan',    path: '/finance' },
  { icon: BarChart2,       label: 'Laporan',     path: '/reports' },
  { icon: Settings,        label: 'Pengaturan',  path: '/settings' },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col h-screen bg-surface-bg border-r border-surface-border transition-all duration-300',
        collapsed ? 'w-[64px]' : 'w-[240px]'
      )}
    >
      <div className="flex items-center justify-between p-4 h-16 border-b border-surface-border">
        {!collapsed && <span className="font-bold text-lg text-brand-primary">LogiTrack</span>}
        {collapsed && <div className="w-full flex justify-center"><LayoutDashboard size={24} className="text-brand-primary" /></div>}
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center px-3 py-2 rounded-lg transition-colors group',
                  isActive 
                    ? 'bg-brand-primary/10 text-brand-primary border-l-2 border-brand-primary rounded-l-none' 
                    : 'text-surface-muted hover:bg-surface-card hover:text-white'
                )
              }
            >
              <item.icon size={20} className={cn(collapsed ? 'mx-auto' : 'mr-3')} />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </ScrollArea>

      <div className="p-3 border-t border-surface-border">
        <Button
          variant="ghost"
          size="icon"
          className="w-full justify-center text-surface-muted hover:text-white"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft className={cn('transition-transform', collapsed && 'rotate-180')} />
        </Button>
      </div>
    </aside>
  );
};

export const BottomNav = () => {
  const mobileMenuItems = menuItems.slice(0, 5); // Dashboard, Pengiriman, Armada, Pengemudi, Penugasan
  
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-card border-t border-surface-border flex items-center justify-around px-2 z-50">
      {mobileMenuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            cn(
              'flex flex-col items-center justify-center space-y-1 px-2',
              isActive ? 'text-brand-primary' : 'text-surface-muted'
            )
          }
        >
          <item.icon size={20} />
          <span className="text-[10px] font-medium">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};
