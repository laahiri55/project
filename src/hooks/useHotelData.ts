import { useState, useEffect } from 'react';
import { Guest, Room, Reservation, Payment, Staff } from '../types';

// Mock data for demonstration
const mockGuests: Guest[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '+1-555-0123',
    address: '123 Main St, New York, NY',
    idNumber: 'ID123456789',
    nationality: 'USA',
    dateOfBirth: '1985-06-15',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    firstName: 'Emma',
    lastName: 'Johnson',
    email: 'emma.johnson@email.com',
    phone: '+1-555-0124',
    address: '456 Oak Ave, Los Angeles, CA',
    idNumber: 'ID987654321',
    nationality: 'USA',
    dateOfBirth: '1990-03-22',
    createdAt: '2024-01-16T14:30:00Z'
  }
];

const mockRooms: Room[] = [
  {
    id: '101',
    number: '101',
    type: 'standard',
    status: 'available',
    price: 120,
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar'],
    maxOccupancy: 2,
    floor: 1
  },
  {
    id: '102',
    number: '102',
    type: 'deluxe',
    status: 'occupied',
    price: 180,
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Room Service'],
    maxOccupancy: 3,
    floor: 1
  },
  {
    id: '201',
    number: '201',
    type: 'suite',
    status: 'maintenance',
    price: 300,
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Room Service', 'Kitchen'],
    maxOccupancy: 4,
    floor: 2
  },
  {
    id: '301',
    number: '301',
    type: 'presidential',
    status: 'available',
    price: 500,
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Room Service', 'Kitchen', 'Jacuzzi'],
    maxOccupancy: 6,
    floor: 3
  }
];

const mockReservations: Reservation[] = [
  {
    id: 'R001',
    guestId: '1',
    roomId: '102',
    checkIn: '2024-01-20',
    checkOut: '2024-01-25',
    status: 'checked-in',
    totalAmount: 900,
    paidAmount: 900,
    paymentStatus: 'paid',
    guests: 2,
    specialRequests: 'Late checkout requested',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'R002',
    guestId: '2',
    roomId: '101',
    checkIn: '2024-01-22',
    checkOut: '2024-01-24',
    status: 'confirmed',
    totalAmount: 240,
    paidAmount: 120,
    paymentStatus: 'partial',
    guests: 1,
    createdAt: '2024-01-16T14:30:00Z'
  }
];

export function useHotelData() {
  const [guests, setGuests] = useState<Guest[]>(mockGuests);
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [loading, setLoading] = useState(false);

  const addGuest = (guest: Omit<Guest, 'id' | 'createdAt'>) => {
    const newGuest: Guest = {
      ...guest,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    setGuests(prev => [...prev, newGuest]);
    return newGuest;
  };

  const addReservation = (reservation: Omit<Reservation, 'id' | 'createdAt'>) => {
    const newReservation: Reservation = {
      ...reservation,
      id: `R${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      createdAt: new Date().toISOString()
    };
    setReservations(prev => [...prev, newReservation]);
    
    // Update room status
    setRooms(prev => prev.map(room => 
      room.id === reservation.roomId 
        ? { ...room, status: 'occupied' as const }
        : room
    ));
    
    return newReservation;
  };

  const updateReservationStatus = (id: string, status: Reservation['status']) => {
    setReservations(prev => prev.map(res => 
      res.id === id ? { ...res, status } : res
    ));
    
    if (status === 'checked-out') {
      const reservation = reservations.find(r => r.id === id);
      if (reservation) {
        setRooms(prev => prev.map(room => 
          room.id === reservation.roomId 
            ? { ...room, status: 'cleaning' as const }
            : room
        ));
      }
    }
  };

  const updateRoomStatus = (id: string, status: Room['status']) => {
    setRooms(prev => prev.map(room => 
      room.id === id ? { ...room, status } : room
    ));
  };

  const getGuestById = (id: string) => guests.find(guest => guest.id === id);
  const getRoomById = (id: string) => rooms.find(room => room.id === id);

  const getStats = () => {
    const totalRooms = rooms.length;
    const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
    const availableRooms = rooms.filter(r => r.status === 'available').length;
    const maintenanceRooms = rooms.filter(r => r.status === 'maintenance').length;
    
    const todayReservations = reservations.filter(r => {
      const today = new Date().toISOString().split('T')[0];
      return r.checkIn === today;
    }).length;
    
    const totalRevenue = reservations
      .filter(r => r.status !== 'cancelled')
      .reduce((sum, r) => sum + r.paidAmount, 0);
    
    const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100);
    
    return {
      totalRooms,
      occupiedRooms,
      availableRooms,
      maintenanceRooms,
      todayReservations,
      totalRevenue,
      occupancyRate
    };
  };

  return {
    guests,
    rooms,
    reservations,
    loading,
    addGuest,
    addReservation,
    updateReservationStatus,
    updateRoomStatus,
    getGuestById,
    getRoomById,
    getStats
  };
}