import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';
import LoginPage from '@/app/login';
import NotFoundPage from '@/app/not-found';
import DashboardPage from '@/app/dashboard';
import OrdersPage from '@/app/orders';
import OrderDetailsPage from '@/app/orders/OrderDetailsPage';
import FleetPage from '@/app/fleet';
import DriversPage from '@/app/drivers';
import AssignmentsPage from '@/app/assignments';
import PodPage from '@/app/pod';
import FinancePage from '@/app/finance';
import ReportsPage from '@/app/reports';
import SettingsPage from '@/app/settings';

import { Toaster } from 'sonner';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" expand={false} richColors theme="dark" />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppShell />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:id" element={<OrderDetailsPage />} />
            <Route path="/fleet" element={<FleetPage />} />
            <Route path="/drivers" element={<DriversPage />} />
            <Route path="/assignments" element={<AssignmentsPage />} />
            <Route path="/pod" element={<PodPage />} />
            <Route path="/finance" element={<FinancePage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
