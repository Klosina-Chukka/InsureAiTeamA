import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Edit, Trash2, CheckCircle, XCircle, ClockIcon } from 'lucide-react';
import API from '../api';
import toast from 'react-hot-toast';

const AppointmentList = ({ onUpdate, userType }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, upcoming, past, scheduled, completed, cancelled

  useEffect(() => {
    fetchAppointments();
  }, [filter]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      let endpoint;
      
      if (userType === 'customer') {
        endpoint = filter === 'upcoming' ? '/appointments/customer/upcoming' : '/appointments/customer';
      } else {
        endpoint = filter === 'upcoming' ? '/appointments/agent/upcoming' : '/appointments/agent';
      }
      
      const response = await API.get(endpoint);
      let filteredAppointments = response.data;

      // Apply additional filtering if needed
      if (filter === 'past') {
        filteredAppointments = filteredAppointments.filter(apt => 
          new Date(apt.appointmentDate) < new Date()
        );
      } else if (filter === 'scheduled') {
        filteredAppointments = filteredAppointments.filter(apt => 
          apt.status === 'SCHEDULED'
        );
      } else if (filter === 'completed') {
        filteredAppointments = filteredAppointments.filter(apt => 
          apt.status === 'COMPLETED'
        );
      } else if (filter === 'cancelled') {
        filteredAppointments = filteredAppointments.filter(apt => 
          apt.status === 'CANCELLED'
        );
      }

      setAppointments(filteredAppointments);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
      toast.error('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      await API.put(`/appointments/${appointmentId}/status?status=${newStatus}`);
      onUpdate();
      fetchAppointments();
      toast.success(`Appointment ${newStatus.toLowerCase()} successfully!`);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update appointment';
      toast.error(message);
    }
  };

  const handleDelete = async (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await API.delete(`/appointments/${appointmentId}`);
        onUpdate();
        fetchAppointments();
        toast.success('Appointment deleted successfully!');
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to delete appointment';
        toast.error(message);
      }
    }
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'SCHEDULED':
        return <ClockIcon className="h-4 w-4 text-blue-500" />;
      case 'COMPLETED':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'CANCELLED':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Filter Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8">
          {['all', 'upcoming', 'scheduled', 'completed', 'cancelled'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                filter === filterType
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {filterType}
            </button>
          ))}
        </nav>
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
          <p className="text-gray-500">
            {filter === 'all' 
              ? "You don't have any appointments yet."
              : `You don't have any ${filter} appointments.`}
          </p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden rounded-md">
          <ul className="divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <li key={appointment.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        {getStatusIcon(appointment.status)}
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {formatDate(appointment.appointmentDate)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {userType === 'customer' 
                            ? `${appointment.agent.firstName} ${appointment.agent.lastName}`
                            : `${appointment.customer.firstName} ${appointment.customer.lastName}`
                          }
                        </span>
                      </div>
                    </div>

                    {appointment.notes && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600">
                          <strong>Notes:</strong> {appointment.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    {appointment.status === 'SCHEDULED' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(appointment.id, 'COMPLETED')}
                          className="p-2 text-green-600 hover:text-green-900 hover:bg-green-50 rounded-md"
                          title="Mark as Completed"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(appointment.id, 'CANCELLED')}
                          className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md"
                          title="Cancel Appointment"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(appointment.id)}
                      className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
