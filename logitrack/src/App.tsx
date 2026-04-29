import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import DashboardPage from '@/app/dashboard';
import OrdersPage from '@/app/orders';
import FleetPage from '@/app/fleet';
import DriversPage from '@/app/drivers';
import AssignmentsPage from '@/app/assignments';
import PodPage from '@/app/pod';
import FinancePage from '@/app/finance';
import ReportsPage from '@/app/reports';
import SettingsPage from '@/app/settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/drivers" element={<DriversPage />} />
          <Route path="/assignments" element={<AssignmentsPage />} />
          <Route path="/pod" element={<PodPage />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
