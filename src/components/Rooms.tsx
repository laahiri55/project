import React, { useState } from 'react';
import { Bed, Wifi, Tv, Car, Coffee, Users, Wrench, Clock, CheckCircle, Eye } from 'lucide-react';
import { useHotelData } from '../hooks/useHotelData';
import { Room } from '../types';

const statusIcons = {
  available: CheckCircle,
  occupied: Users,
  maintenance: Wrench,
  cleaning: Clock
};

const statusColors = {
  available: 'bg-green-100 text-green-800 border-green-200',
  occupied: 'bg-blue-100 text-blue-800 border-blue-200',
  maintenance: 'bg-red-100 text-red-800 border-red-200',
  cleaning: 'bg-yellow-100 text-yellow-800 border-yellow-200'
};

const typeColors = {
  standard: 'bg-gray-100 text-gray-800',
  deluxe: 'bg-blue-100 text-blue-800',
  suite: 'bg-purple-100 text-purple-800',
  presidential: 'bg-amber-100 text-amber-800'
};

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'WiFi': Wifi,
  'TV': Tv,
  'AC': Car,
  'Mini Bar': Coffee,
  'Balcony': Eye,
  'Room Service': Coffee,
  'Kitchen': Coffee,
  'Jacuzzi': Coffee
};

export default function Rooms() {
  const { rooms, updateRoomStatus } = useHotelData();
  const [filter, setFilter] = useState<Room['status'] | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<Room['type'] | 'all'>('all');

  const filteredRooms = rooms.filter(room => {
    if (filter !== 'all' && room.status !== filter) return false;
    if (typeFilter !== 'all' && room.type !== typeFilter) return false;
    return true;
  });

  const handleStatusChange = (roomId: string, newStatus: Room['status']) => {
    updateRoomStatus(roomId, newStatus);
  };

  const roomStats = {
    total: rooms.length,
    available: rooms.filter(r => r.status === 'available').length,
    occupied: rooms.filter(r => r.status === 'occupied').length,
    maintenance: rooms.filter(r => r.status === 'maintenance').length,
    cleaning: rooms.filter(r => r.status === 'cleaning').length
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Room Management</h1>
        <p className="text-gray-600">Monitor and manage all hotel rooms</p>
      </div>

      {/* Room Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 text-center shadow-lg">
          <div className="text-2xl font-bold text-gray-900">{roomStats.total}</div>
          <div className="text-sm text-gray-600">Total Rooms</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-lg border-l-4 border-green-500">
          <div className="text-2xl font-bold text-green-600">{roomStats.available}</div>
          <div className="text-sm text-gray-600">Available</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-lg border-l-4 border-blue-500">
          <div className="text-2xl font-bold text-blue-600">{roomStats.occupied}</div>
          <div className="text-sm text-gray-600">Occupied</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-lg border-l-4 border-yellow-500">
          <div className="text-2xl font-bold text-yellow-600">{roomStats.cleaning}</div>
          <div className="text-sm text-gray-600">Cleaning</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-lg border-l-4 border-red-500">
          <div className="text-2xl font-bold text-red-600">{roomStats.maintenance}</div>
          <div className="text-sm text-gray-600">Maintenance</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex gap-2">
          <span className="text-sm font-medium text-gray-700 py-2">Status:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as Room['status'] | 'all')}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="maintenance">Maintenance</option>
            <option value="cleaning">Cleaning</option>
          </select>
        </div>
        <div className="flex gap-2">
          <span className="text-sm font-medium text-gray-700 py-2">Type:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as Room['type'] | 'all')}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="all">All Types</option>
            <option value="standard">Standard</option>
            <option value="deluxe">Deluxe</option>
            <option value="suite">Suite</option>
            <option value="presidential">Presidential</option>
          </select>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRooms.map((room) => {
          const StatusIcon = statusIcons[room.status];
          
          return (
            <div key={room.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              {/* Room Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Bed className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Room {room.number}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${typeColors[room.type]}`}>
                      {room.type}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">${room.price}</div>
                  <div className="text-sm text-gray-500">per night</div>
                </div>
              </div>

              {/* Room Status */}
              <div className={`flex items-center gap-2 p-3 rounded-lg border mb-4 ${statusColors[room.status]}`}>
                <StatusIcon className="w-5 h-5" />
                <span className="font-medium capitalize">{room.status}</span>
              </div>

              {/* Room Details */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Floor</span>
                  <span className="font-medium">{room.floor}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Max Occupancy</span>
                  <span className="font-medium">{room.maxOccupancy} guests</span>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.slice(0, 4).map((amenity, index) => {
                    const Icon = amenityIcons[amenity] || Coffee;
                    return (
                      <div key={index} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-xs">
                        <Icon className="w-3 h-3" />
                        <span>{amenity}</span>
                      </div>
                    );
                  })}
                  {room.amenities.length > 4 && (
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                      +{room.amenities.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Status Change Buttons */}
              <div className="pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-2">
                  {room.status !== 'available' && (
                    <button
                      onClick={() => handleStatusChange(room.id, 'available')}
                      className="px-3 py-2 text-xs font-medium bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      Mark Available
                    </button>
                  )}
                  {room.status === 'occupied' && (
                    <button
                      onClick={() => handleStatusChange(room.id, 'cleaning')}
                      className="px-3 py-2 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors"
                    >
                      Mark Cleaning
                    </button>
                  )}
                  {room.status !== 'maintenance' && (
                    <button
                      onClick={() => handleStatusChange(room.id, 'maintenance')}
                      className="px-3 py-2 text-xs font-medium bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      Maintenance
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}