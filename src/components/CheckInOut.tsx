import React, { useState } from 'react';
import { Calendar, User, Key, Clock, CheckCircle, X } from 'lucide-react';
import { useHotelData } from '../hooks/useHotelData';

export default function CheckInOut() {
  const { reservations, guests, rooms, getGuestById, getRoomById, updateReservationStatus } = useHotelData();
  const [activeTab, setActiveTab] = useState<'checkin' | 'checkout'>('checkin');

  const today = new Date().toISOString().split('T')[0];

  const pendingCheckIns = reservations.filter(r => 
    r.status === 'confirmed' && r.checkIn <= today
  );

  const activeCheckOuts = reservations.filter(r => 
    r.status === 'checked-in' && r.checkOut <= today
  );

  const handleCheckIn = (reservationId: string) => {
    updateReservationStatus(reservationId, 'checked-in');
  };

  const handleCheckOut = (reservationId: string) => {
    updateReservationStatus(reservationId, 'checked-out');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Check-In / Check-Out</h1>
        <p className="text-gray-600">Manage guest arrivals and departures</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-white rounded-lg p-1 mb-8 shadow-lg max-w-md">
        <button
          onClick={() => setActiveTab('checkin')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'checkin'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Check-In ({pendingCheckIns.length})
        </button>
        <button
          onClick={() => setActiveTab('checkout')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'checkout'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Check-Out ({activeCheckOuts.length})
        </button>
      </div>

      {/* Check-In Tab */}
      {activeTab === 'checkin' && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Pending Check-Ins</h2>
            <p className="text-gray-600">Guests scheduled to arrive today</p>
          </div>

          {pendingCheckIns.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">All Caught Up!</h3>
              <p className="text-gray-600">No pending check-ins for today</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingCheckIns.map((reservation) => {
                const guest = getGuestById(reservation.guestId);
                const room = getRoomById(reservation.roomId);
                const isToday = reservation.checkIn === today;

                return (
                  <div key={reservation.id} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {guest?.firstName} {guest?.lastName}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Key className="w-4 h-4" />
                              Room {room?.number}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(reservation.checkIn).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {reservation.guests} guests
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {isToday && (
                          <span className="bg-amber-100 text-amber-800 px-2 py-1 text-xs font-semibold rounded-full">
                            Today
                          </span>
                        )}
                        <button
                          onClick={() => handleCheckIn(reservation.id)}
                          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                          Check In
                        </button>
                      </div>
                    </div>
                    
                    {reservation.specialRequests && (
                      <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Special Requests:</span> {reservation.specialRequests}
                        </p>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between text-sm">
                      <div>
                        <span className="text-gray-600">Total Amount: </span>
                        <span className="font-semibold">${reservation.totalAmount}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Payment Status: </span>
                        <span className={`font-semibold ${
                          reservation.paymentStatus === 'paid' ? 'text-green-600' :
                          reservation.paymentStatus === 'partial' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {reservation.paymentStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Check-Out Tab */}
      {activeTab === 'checkout' && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Pending Check-Outs</h2>
            <p className="text-gray-600">Guests scheduled to depart today</p>
          </div>

          {activeCheckOuts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">All Caught Up!</h3>
              <p className="text-gray-600">No pending check-outs for today</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeCheckOuts.map((reservation) => {
                const guest = getGuestById(reservation.guestId);
                const room = getRoomById(reservation.roomId);
                const isToday = reservation.checkOut === today;

                return (
                  <div key={reservation.id} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {guest?.firstName} {guest?.lastName}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Key className="w-4 h-4" />
                              Room {room?.number}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(reservation.checkOut).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {reservation.guests} guests
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {isToday && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 text-xs font-semibold rounded-full">
                            Due Today
                          </span>
                        )}
                        <button
                          onClick={() => handleCheckOut(reservation.id)}
                          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                        >
                          Check Out
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Check-in: </span>
                        <span className="font-medium">{new Date(reservation.checkIn).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Duration: </span>
                        <span className="font-medium">
                          {Math.ceil((new Date(reservation.checkOut).getTime() - new Date(reservation.checkIn).getTime()) / (1000 * 60 * 60 * 24))} days
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Total: </span>
                        <span className="font-medium">${reservation.totalAmount}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}