import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Users, Calendar, DollarSign } from 'lucide-react';
import { useBooking, Room } from '../contexts/BookingContext';
import RoomModal from '../components/Admin/RoomModal';
import BookingsList from '../components/Admin/BookingsList';

const AdminDashboard: React.FC = () => {
  const { rooms, bookings, deleteRoom } = useBooking();
  const [activeTab, setActiveTab] = useState<'rooms' | 'bookings'>('rooms');
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  const handleDeleteRoom = (roomId: string) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      deleteRoom(roomId);
    }
  };

  const totalRevenue = bookings.reduce((total, booking) => 
    booking.status === 'CONFIRMED' ? total + booking.totalPrice : total, 0
  );

  const confirmedBookings = bookings.filter(b => b.status === 'CONFIRMED').length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your hotel rooms and bookings</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{rooms.length}</h3>
                <p className="text-gray-600">Total Rooms</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-emerald-100 rounded-full p-3 mr-4">
                <Calendar className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{confirmedBookings}</h3>
                <p className="text-gray-600">Active Bookings</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-amber-100 rounded-full p-3 mr-4">
                <DollarSign className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">${totalRevenue}</h3>
                <p className="text-gray-600">Total Revenue</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-3 mr-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{bookings.length}</h3>
                <p className="text-gray-600">Total Bookings</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('rooms')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'rooms'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Rooms Management
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'bookings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Bookings Management
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'rooms' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Rooms</h2>
                  <button
                    onClick={() => setShowRoomModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add Room</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rooms.map((room) => (
                    <div key={room.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{room.name}</h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{room.description}</p>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-bold text-blue-600">${room.price}/night</span>
                          <span className="text-sm text-gray-500">Max {room.maxGuests} guests</span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingRoom(room);
                              setShowRoomModal(true);
                            }}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-md text-sm flex items-center justify-center space-x-1"
                          >
                            <Edit className="h-4 w-4" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteRoom(room.id)}
                            className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 py-2 px-3 rounded-md text-sm flex items-center justify-center space-x-1"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'bookings' && <BookingsList />}
          </div>
        </div>
      </div>

      {showRoomModal && (
        <RoomModal
          room={editingRoom}
          onClose={() => {
            setShowRoomModal(false);
            setEditingRoom(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;