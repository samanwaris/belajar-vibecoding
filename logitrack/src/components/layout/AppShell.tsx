import { Outlet } from 'react-router-dom';
import { Sidebar, BottomNav } from './Sidebar';
import { TopNav } from './TopNav';

export const AppShell = () => {
  return (
    <div className="flex h-screen bg-surface-bg text-white overflow-hidden">
      {/* Sidebar - Desktop Only */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Navigation */}
        <TopNav />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 pb-20 md:pb-4">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
        
        {/* Bottom Navigation - Mobile Only */}
        <BottomNav />
      </div>
    </div>
  );
};
