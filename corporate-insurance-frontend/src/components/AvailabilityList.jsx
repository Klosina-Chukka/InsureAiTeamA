import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Edit, Trash2, User } from 'lucide-react';
import API from '../api';
import AvailabilityForm from './AvailabilityForm';

const AvailabilityList = ({ onEdit, onDelete, onUpdate }) => {
  const [availabilities, setAvailabilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAvailability, setEditingAvailability] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchAvailabilities();
  }, [selectedDate]);

  const fetchAvailabilities = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/availability/agent/me?date=${selectedDate}`);
      setAvailabilities(response.data);
    } catch (error) {
      console.error('Failed to fetch availabilities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (availabilityId) => {
    if (window.confirm('Are you sure you want to delete this availability?')) {
      try {
        await API.delete(`/availability/${availabilityId}`);
        onDelete();
        fetchAvailabilities();
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to delete availability';
        alert(message);
      }
    }
  };

  const handleEdit = (availability) => {
    setEditingAvailability(availability);
  };

  const handleUpdateSuccess = () => {
    setEditingAvailability(null);
    onUpdate();
    fetchAvailabilities();
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Date Selector */}
      <div className="mb-6">
        <label htmlFor="dateFilter" className="block text-sm font-medium text-gray-700 mb-2">
          <Calendar className="h-4 w-4 inline mr-2" />
          Select Date
        </label>
        <input
          type="date"
          id="dateFilter"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="block w-full md:w-auto border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {editingAvailability && (
        <div className="mb-6">
          <AvailabilityForm
            availability={editingAvailability}
            onClose={() => setEditingAvailability(null)}
            onSuccess={handleUpdateSuccess}
          />
        </div>
      )}

      {availabilities.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No availability found</h3>
          <p className="text-gray-500">
            {selectedDate === new Date().toISOString().split('T')[0]
              ? "You haven't set any availability for today."
              : `You haven't set any availability for ${formatDate(selectedDate)}.`}
          </p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden rounded-md">
          <ul className="divide-y divide-gray-200">
            {availabilities.map((availability) => (
              <li key={availability.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-sm font-medium text-gray-900">
                        {formatDate(availability.availableDate)}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        {formatTime(availability.startTime)} - {formatTime(availability.endTime)}
                      </span>
                      {availability.isBooked && (
                        <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Booked
                        </span>
                      )}
                      {!availability.isBooked && (
                        <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Available
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!availability.isBooked && (
                      <>
                        <button
                          onClick={() => handleEdit(availability)}
                          className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-md"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(availability.id)}
                          className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    {availability.isBooked && (
                      <span className="text-sm text-gray-500">Cannot modify booked slots</span>
                    )}
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

export default AvailabilityList;
