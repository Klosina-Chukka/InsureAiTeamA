import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, Calendar, FileText, Clock, Bell, Settings, BarChart3, 
  UserPlus, Edit, Trash2, ToggleLeft, ToggleRight, Search, Filter
} from 'lucide-react';
import UserManagement from '../components/admin/UserManagement';
import AppointmentManagement from '../components/admin/AppointmentManagement';
import PlanManagement from '../components/admin/PlanManagement';
import DashboardOverview from '../components/admin/DashboardOverview';
import AvailabilityManagement from '../components/admin/AvailabilityManagement';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDataUpdate = () => {
    setRefreshKey(prev => prev + 1);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview key={refreshKey} />;
      case 'users':
        return <UserManagement onUpdate={handleDataUpdate} />;
      case 'appointments':
        return <AppointmentManagement onUpdate={handleDataUpdate} />;
      case 'plans':
        return <PlanManagement onUpdate={handleDataUpdate} />;
      case 'availability':
        return <AvailabilityManagement onUpdate={handleDataUpdate} />;
      default:
        return <DashboardOverview key={refreshKey} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">System Management & Analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {user?.email} | Administrator
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sidebar */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md min-h-screen">
          <nav className="mt-5 px-2">
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <BarChart3 className="mr-3 h-5 w-5" />
                Dashboard Overview
              </button>

              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'users'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Users className="mr-3 h-5 w-5" />
                User Management
              </button>

              <button
                onClick={() => setActiveTab('appointments')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'appointments'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Calendar className="mr-3 h-5 w-5" />
                Appointment Management
              </button>

              <button
                onClick={() => setActiveTab('plans')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'plans'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <FileText className="mr-3 h-5 w-5" />
                Insurance Plans
              </button>

              <button
                onClick={() => setActiveTab('availability')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'availability'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Clock className="mr-3 h-5 w-5" />
                Agent Availability
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
