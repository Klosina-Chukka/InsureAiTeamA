import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, Plus, Edit, Trash2, User } from 'lucide-react';
import AvailabilityForm from '../components/AvailabilityForm';
import AvailabilityList from '../components/AvailabilityList';
import toast from 'react-hot-toast';

const AgentDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAvailabilityForm, setShowAvailabilityForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAvailabilityCreated = () => {
    setShowAvailabilityForm(false);
    setRefreshKey(prev => prev + 1);
    toast.success('Availability added successfully!');
  };

  const handleAvailabilityUpdated = () => {
    setRefreshKey(prev => prev + 1);
    toast.success('Availability updated successfully!');
  };

  const handleAvailabilityDeleted = () => {
    setRefreshKey(prev => prev + 1);
    toast.success('Availability deleted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, {user?.firstName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {user?.email} | {user?.role}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('availability')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'availability'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Availability
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'appointments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Appointments
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Calendar className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Today's Availability
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {/* Will be populated with actual data */}
                        0 slots
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Clock className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Upcoming Appointments
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {/* Will be populated with actual data */}
                        0 appointments
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <User className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Customers
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {/* Will be populated with actual data */}
                        0 customers
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'availability' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Manage Your Availability</h2>
              <button
                onClick={() => setShowAvailabilityForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Availability
              </button>
            </div>

            {showAvailabilityForm && (
              <div className="mb-8">
                <AvailabilityForm
                  onClose={() => setShowAvailabilityForm(false)}
                  onSuccess={handleAvailabilityCreated}
                />
              </div>
            )}

            <AvailabilityList
              key={refreshKey}
              onEdit={() => {}}
              onDelete={handleAvailabilityDeleted}
              onUpdate={handleAvailabilityUpdated}
            />
          </div>
        )}

        {activeTab === 'appointments' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Appointments</h2>
            <div className="bg-white shadow rounded-lg p-6">
              <p className="text-gray-500">Appointment management will be implemented here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDashboard;
