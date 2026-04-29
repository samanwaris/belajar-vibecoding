export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  DASHBOARD_MAP: '/dashboard/map',
  
  ORDERS: '/orders',
  ORDERS_NEW: '/orders/new',
  ORDERS_DETAIL: (id: string) => `/orders/${id}`,
  ORDERS_TRACK: (id: string) => `/orders/${id}/track`,
  
  FLEET: '/fleet',
  FLEET_NEW: '/fleet/new',
  FLEET_DETAIL: (id: string) => `/fleet/${id}`,
  
  DRIVERS: '/drivers',
  DRIVERS_NEW: '/drivers/new',
  DRIVERS_DETAIL: (id: string) => `/drivers/${id}`,
  
  ASSIGNMENTS: '/assignments',
  ASSIGNMENTS_NEW: '/assignments/new',
  ASSIGNMENTS_DETAIL: (id: string) => `/assignments/${id}`,
  
  POD: '/pod',
  POD_DETAIL: (id: string) => `/pod/${id}`,
  
  FINANCE: '/finance',
  FINANCE_INVOICES: '/finance/invoices',
  FINANCE_INVOICES_NEW: '/finance/invoices/new',
  FINANCE_INVOICES_DETAIL: (id: string) => `/finance/invoices/${id}`,
  FINANCE_COSTS: '/finance/costs',
  
  REPORTS: '/reports',
  REPORTS_PERFORMANCE: '/reports/performance',
  REPORTS_FLEET: '/reports/fleet',
  
  SETTINGS: '/settings',
  SETTINGS_PROFILE: '/settings/profile',
  SETTINGS_USERS: '/settings/users',
  SETTINGS_TARIFFS: '/settings/tariffs',
} as const;
