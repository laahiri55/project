import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Star, Users, MapPin, Wifi, Coffee, Car, Utensils } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import BookingForm from '../components/Room/BookingForm';

const RoomDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { rooms } = useBooking();
  
  const room = rooms.find(r => r.id === id);

  if (!room) {
    return <Navigate to="/" />;
  }

  const amenityIcons: { [key: string]: React.ReactNode } = {
    'WiFi': <Wifi className="h-5 w-5" />,
    'Mini Bar': <Coffee className="h-5 w-5" />,
    'Room Service': <Utensils className="h-5 w-5" />,
    'Parking': <Car className="h-5 w-5" />
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Room Details */}
          <div className="lg:col-span-2">
            {/* Image */}
            <div className="relative mb-6">
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-semibold shadow">
                  Premium Room
                </span>
              </div>
            </div>

            {/* Room Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{room.name}</h1>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(4.8)</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <Users className="h-5 w-5" />
                  <span>Up to {room.maxGuests} guests</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-5 w-5" />
                  <span>Ocean View</span>
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">
                {room.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {room.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    {amenityIcons[amenity] || <Star className="h-5 w-5" />}
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <BookingForm room={room} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;