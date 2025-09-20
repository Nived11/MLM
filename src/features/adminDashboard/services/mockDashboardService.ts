// services/mockDashboardService.ts
import type { DashboardStats } from './dashboardService';

export const mockDashboardService = {
  getDashboardStats: (): Promise<DashboardStats> => Promise.resolve({
    total_members: 1250,
    total_income: 45000,
    active_levels: 8
  }),

  getLevels: () => Promise.resolve([
    { id: 1, name: 'Bronze', price: 100 },
    { id: 2, name: 'Silver', price: 250 },
    { id: 3, name: 'Gold', price: 500 },
    { id: 4, name: 'Platinum', price: 1000 }
  ]),

  getUserLevels: () => Promise.resolve([
    { id: 1, user: { name: 'John Doe' }, level: { name: 'Gold' }, is_paid: true, created_at: '2024-01-15' },
    { id: 2, user: { name: 'Jane Smith' }, level: { name: 'Silver' }, is_paid: false, created_at: '2024-01-18' },
    { id: 3, user: { name: 'Bob Wilson' }, level: { name: 'Platinum' }, is_paid: true, created_at: '2024-01-20' }
  ]),

  getPayments: () => Promise.resolve([
    { id: 1, amount: 500, user: { name: 'John Doe' }, level: { name: 'Gold' }, approved_at: '2024-01-15T10:30:00Z' },
    { id: 2, amount: 1000, user: { name: 'Bob Wilson' }, level: { name: 'Platinum' }, approved_at: '2024-01-20T14:15:00Z' }
  ]),

  getNotifications: () => Promise.resolve([
    { id: 1, title: 'New Payment', message: 'John Doe paid $500', created_at: '2024-01-15T10:30:00Z' },
    { id: 2, title: 'Level Upgrade', message: 'Jane Smith upgraded to Silver', created_at: '2024-01-18T09:45:00Z' }
  ]),

  // Add other methods as needed
  getUserLevelsWithInfo: () => Promise.resolve([]),
  getCustomUserReport: () => Promise.resolve([]),
  getFilteredPayments: () => Promise.resolve([]),
  getFinancialData: () => Promise.resolve({}),
  exportCSV: () => Promise.resolve(new Blob()),
  exportPDF: () => Promise.resolve(new Blob()),
  
  // Add methods that might be missing
  testConnection: () => Promise.resolve({ success: true, message: 'Mock connection successful' }),
  getCurrentUser: () => Promise.resolve({ id: 1, name: 'Mock User', email: 'mock@example.com' })
};

export default mockDashboardService;