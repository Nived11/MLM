import api from "../../../lib/api";

export interface DashboardStats {
    total_members: number;
    total_income: number;
    active_levels: number;
    // Add other fields based on your actual API response
}

export interface PaymentData {
    id: number;
    amount: number;
    user: any;
    level: any;
    approved_at: string;
    // Add other payment fields
}

export interface UserLevel {
    id: number;
    user: any;
    level: any;
    is_paid: boolean;
    created_at: string;
    // Add other user level fields
}

class DashboardService {
    // Helper method to check authentication status
    private isAuthenticated(): boolean {
        const token = localStorage.getItem("access_token") || localStorage.getItem("accessToken");
        return !!token;
    }

    // Helper method to get current token
    private getCurrentToken(): string | null {
        return localStorage.getItem("access_token") || localStorage.getItem("accessToken");
    }

    // Get dashboard statistics with enhanced error handling
    async getDashboardStats(): Promise<DashboardStats> {
        try {
            // Check if user is authenticated before making request
            if (!this.isAuthenticated()) {
                throw new Error('No authentication token found. Please log in again.');
            }

            console.log('Making request to /dashboard/ with token:', this.getCurrentToken()?.substring(0, 20) + '...');
            
            const response = await api.get('/dashboard/');
            console.log('Dashboard response:', response.data);
            return response.data;
        } catch (error: any) {
            console.error('Error fetching dashboard stats:', error);
            
            // Enhanced error handling with specific messages
            if (error.response) {
                const { status, data } = error.response;
                switch (status) {
                    case 401:
                        throw new Error('Authentication failed. Please log in again.');
                    case 403:
                        throw new Error('Access denied. You may not have permission to view dashboard data.');
                    case 404:
                        throw new Error('Dashboard endpoint not found.');
                    case 500:
                        throw new Error('Server error. Please try again later.');
                    default:
                        throw new Error(data?.message || `Request failed with status ${status}`);
                }
            } else if (error.request) {
                throw new Error('Network error. Please check your connection.');
            } else {
                throw error;
            }
        }
    }

    // Test method to verify API connection and server status
    async testConnection(): Promise<{ success: boolean; message: string; details?: any }> {
        const results = {
            apiBase: false,
            serverStatus: '',
            corsEnabled: false,
            errorDetails: null as any
        };

        try {
            // Test different endpoints to see what's working
            const testEndpoints = [
                '/',
                '/health/',
                '/status/',
                '/api/',
                '/auth/status/'
            ];

            for (const endpoint of testEndpoints) {
                try {
                    await api.get(endpoint, { timeout: 5000 });
                    results.apiBase = true;
                    results.serverStatus = `${endpoint}: SUCCESS`;
                    break;
                } catch (err: any) {
                    if (err.response) {
                        results.serverStatus += `${endpoint}: ${err.response.status}, `;
                    }
                }
            }

            return { 
                success: results.apiBase, 
                message: results.apiBase ? 'API connection successful' : 'All endpoints failed',
                details: results
            };
        } catch (error: any) {
            results.errorDetails = {
                message: error.message,
                code: error.code,
                response: error.response ? {
                    status: error.response.status,
                    data: error.response.data
                } : null
            };

            return { 
                success: false, 
                message: `Connection test failed: ${error.message}`,
                details: results
            };
        }
    }

    // Get current user info (try multiple possible endpoints)
    async getCurrentUser() {
        const possibleEndpoints = [
            '/auth/user/',
            '/user/profile/',
            '/profile/',
            '/me/',
            '/auth/me/',
            '/api/user/',
            '/users/me/'
        ];

        let lastError: any = null;

        for (const endpoint of possibleEndpoints) {
            try {
                console.log(`Trying user endpoint: ${endpoint}`);
                const response = await api.get(endpoint);
                console.log(`Success with endpoint: ${endpoint}`, response.data);
                return response.data;
            } catch (error: any) {
                lastError = error;
                console.log(`Failed endpoint ${endpoint}:`, error.response?.status);
                continue;
            }
        }

        console.error('All user endpoints failed. Last error:', lastError);
        throw lastError || new Error('No user endpoints available');
    }

    // Get all levels
    async getLevels() {
        try {
            const response = await api.get('/levels/');
            return response.data;
        } catch (error) {
            console.error('Error fetching levels:', error);
            throw error;
        }
    }

    // Get user levels
    async getUserLevels() {
        try {
            const response = await api.get('/user-levels/');
            return response.data;
        } catch (error) {
            console.error('Error fetching user levels:', error);
            throw error;
        }
    }

    // Get user levels with user info for dashboard
    async getUserLevelsWithInfo() {
        try {
            const response = await api.get('/user-levels/user_info/');
            return response.data;
        } catch (error) {
            console.error('Error fetching user levels with info:', error);
            throw error;
        }
    }

    // Get payments/reports
    async getPayments() {
        try {
            const response = await api.get('/payments/');
            return response.data;
        } catch (error) {
            console.error('Error fetching payments:', error);
            throw error;
        }
    }

    // Get custom user report
    async getCustomUserReport() {
        try {
            const response = await api.get('/payments/custom-user-report/');
            return response.data;
        } catch (error) {
            console.error('Error fetching custom user report:', error);
            throw error;
        }
    }

    // Get filtered payments
    async getFilteredPayments(dateFrom?: string) {
        try {
            let url = '/payments/';
            if (dateFrom) {
                url += `?approved_at__gte=${dateFrom}`;
            }
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching filtered payments:', error);
            throw error;
        }
    }

    // Get financial data for user levels
    async getFinancialData() {
        try {
            const response = await api.get('/user-levels/financial/');
            return response.data;
        } catch (error) {
            console.error('Error fetching financial data:', error);
            throw error;
        }
    }

    // Get notifications
    async getNotifications() {
        try {
            const response = await api.get('/notifications/');
            return response.data;
        } catch (error) {
            console.error('Error fetching notifications:', error);
            throw error;
        }
    }

    // Export data as CSV
    async exportCSV() {
        try {
            const response = await api.get('/payments/export-csv/', {
                responseType: 'blob'
            });
            return response.data;
        } catch (error) {
            console.error('Error exporting CSV:', error);
            throw error;
        }
    }

    // Export data as PDF
    async exportPDF() {
        try {
            const response = await api.get('/payments/export-pdf/', {
                responseType: 'blob'
            });
            return response.data;
        } catch (error) {
            console.error('Error exporting PDF:', error);
            throw error;
        }
    }
}

export default new DashboardService();