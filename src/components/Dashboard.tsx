import React from 'react';
import { 
  Users, 
  Bed, 
  Calendar, 
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useHotelData } from '../hooks/useHotelData';

export default function Dashboard() {
  const { getStats, reservations, guests, rooms } = useHotelData();
  const stats = getStats();

  const recentReservations = reservations
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const upcomingCheckIns = reservations
    .filter(r => r.status === 'confirmed' && new Date(r.checkIn) >= new Date())
    .sort((a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime())
    .slice(0, 5);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hotel Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening at your hotel today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Occupancy Rate</p>
              <p className="text-3xl font-bold text-gray-900">{stats.occupancyRate}%</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Available Rooms</p>
              <p className="text-3xl font-bold text-gray-900">{stats.availableRooms}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Bed className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Today's Check-ins</p>
              <p className="text-3xl font-bold text-gray-900">{stats.todayReservations}</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity and Upcoming Check-ins */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Reservations */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Reservations</h3>
          <div className="space-y-4">
            {recentReservations.map((reservation) => {
              const guest = guests.find(g => g.id === reservation.guestId);
              const room = rooms.find(r => r.id === reservation.roomId);
              
              return (
                <div key={reservation.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {guest?.firstName} {guest?.lastName}
                      </p>
                      <p className="text-gray-600 text-sm">Room {room?.number} • {reservation.guests} guests</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${reservation.totalAmount}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      reservation.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                      reservation.status === 'checked-in' ? 'bg-green-100 text-green-800' :
                      reservation.status === 'checked-out' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {reservation.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Check-ins */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Upcoming Check-ins</h3>
          <div className="space-y-4">
            {upcomingCheckIns.map((reservation) => {
              const guest = guests.find(g => g.id === reservation.guestId);
              const room = rooms.find(r => r.id === reservation.roomId);
              const checkInDate = new Date(reservation.checkIn);
              const isToday = checkInDate.toDateString() === new Date().toDateString();
              
              return (
                <div key={reservation.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isToday ? 'bg-amber-100' : 'bg-blue-100'
                    }`}>
                      {isToday ? (
                        <Clock className="w-5 h-5 text-amber-600" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {guest?.firstName} {guest?.lastName}
                      </p>
                      <p className="text-gray-600 text-sm">Room {room?.number}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {checkInDate.toLocaleDateString()}
                    </p>
                    {isToday && (
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800">
                        Today
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Room Status Overview */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Room Status Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{stats.availableRooms}</p>
            <p className="text-sm text-gray-600">Available</p>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{stats.occupiedRooms}</p>
            <p className="text-sm text-gray-600">Occupied</p>
          </div>
          
          <div className="text-center p-4 bg-amber-50 rounded-lg">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-amber-600">
              {rooms.filter(r => r.status === 'cleaning').length}
            </p>
            <p className="text-sm text-gray-600">Cleaning</p>
          </div>
          
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-red-600">{stats.maintenanceRooms}</p>
            <p className="text-sm text-gray-600">Maintenance</p>
          </div>
        </div>
      </div>
    </div>
  );
}