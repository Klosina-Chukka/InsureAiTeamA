import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, User, FileText, Bell } from 'lucide-react';
import AppointmentScheduler from '../components/AppointmentScheduler';
import AppointmentList from '../components/AppointmentList';
import InsurancePlanList from '../components/InsurancePlanList';
import toast from 'react-hot-toast';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAppointmentBooked = () => {
    setRefreshKey(prev => prev + 1);
    toast.success('Appointment booked successfully!');
  };

  const handleAppointmentUpdated = () => {
    setRefreshKey(prev => prev + 1);
    toast.success('Appointment updated successfully!');
  };

  const handlePlanSelect = (plan) => {
    toast.success(`Selected plan: ${plan.planName}`);
    // Here you would typically navigate to a plan details page or open a modal
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
                <h1 className="text-2xl font-bold text-gray-900">Customer Dashboard</h1>
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
              onClick={() => setActiveTab('book-appointment')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'book-appointment'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Book Appointment
            </button>
            <button
              onClick={() => setActiveTab('my-appointments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'my-appointments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Appointments
            </button>
            <button
              onClick={() => setActiveTab('insurance-plans')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'insurance-plans'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Insurance Plans
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
                    <FileText className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Active Insurance Plans
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {/* Will be populated with actual data */}
                        0 plans
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
                    <Bell className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Unread Notifications
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {/* Will be populated with actual data */}
                        0 notifications
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'book-appointment' && (
          <AppointmentScheduler onSuccess={handleAppointmentBooked} />
        )}

        {activeTab === 'my-appointments' && (
          <AppointmentList
            key={refreshKey}
            onUpdate={handleAppointmentUpdated}
            userType="customer"
          />
        )}

        {activeTab === 'insurance-plans' && (
          <InsurancePlanList onSelectPlan={handlePlanSelect} userType="customer" />
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
