import React, { useState, useEffect } from 'react';
import { Users, Calendar, FileText, Clock, TrendingUp, Activity } from 'lucide-react';
import API from '../../api';

const DashboardOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await API.get('/admin/dashboard');
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Failed to load dashboard statistics</p>
      </div>
    );
  }

  const StatCard = ({ title, value, icon: Icon, color = 'blue' }) => {
    const colorClasses = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      purple: 'bg-purple-500',
      red: 'bg-red-500',
      indigo: 'bg-indigo-500'
    };

    return (
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className={`flex-shrink-0 ${colorClasses[color]} rounded-md p-3`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
                <dd className="text-lg font-medium text-gray-900">{value}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="mt-1 text-sm text-gray-500">
          System statistics and key metrics at a glance
        </p>
      </div>

      {/* Main Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={stats.users?.total || 0}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Total Appointments"
          value={stats.appointments?.total || 0}
          icon={Calendar}
          color="green"
        />
        <StatCard
          title="Active Plans"
          value={stats.plans?.active || 0}
          icon={FileText}
          color="purple"
        />
        <StatCard
          title="Today's Appointments"
          value={stats.appointments?.today || 0}
          icon={Clock}
          color="yellow"
        />
      </div>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Statistics */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">User Statistics</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.users?.customers || 0}</div>
                <div className="text-sm text-gray-500">Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.users?.agents || 0}</div>
                <div className="text-sm text-gray-500">Agents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.users?.admins || 0}</div>
                <div className="text-sm text-gray-500">Admins</div>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Statistics */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Appointment Status</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.appointments?.scheduled || 0}</div>
                <div className="text-sm text-gray-500">Scheduled</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.appointments?.completed || 0}</div>
                <div className="text-sm text-gray-500">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{stats.appointments?.cancelled || 0}</div>
                <div className="text-sm text-gray-500">Cancelled</div>
              </div>
            </div>
          </div>
        </div>

        {/* Plan Statistics */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Insurance Plans</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.plans?.total || 0}</div>
                <div className="text-sm text-gray-500">Total Plans</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.plans?.active || 0}</div>
                <div className="text-sm text-gray-500">Active Plans</div>
              </div>
            </div>
          </div>
        </div>

        {/* Availability Statistics */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Agent Availability</h3>
          </div>
          <div className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.availabilities?.total || 0}</div>
              <div className="text-sm text-gray-500">Total Time Slots</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Users className="h-4 w-4 mr-2" />
              Add User
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <FileText className="h-4 w-4 mr-2" />
              Create Plan
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Calendar className="h-4 w-4 mr-2" />
              View Reports
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Activity className="h-4 w-4 mr-2" />
              System Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
