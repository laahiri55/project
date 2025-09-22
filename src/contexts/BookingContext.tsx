import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  amenities: string[];
  maxGuests: number;
  available: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'CONFIRMED' | 'CANCELLED';
  createdAt: string;
}

interface BookingContextType {
  rooms: Room[];
  bookings: Booking[];
  addRoom: (room: Omit<Room, 'id'>) => void;
  updateRoom: (id: string, room: Partial<Room>) => void;
  deleteRoom: (id: string) => void;
  bookRoom: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => void;
  cancelBooking: (id: string) => void;
  getUserBookings: (userId: string) => Booking[];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: '1',
      name: 'Deluxe Ocean View',
      description: 'Spacious room with stunning ocean views and premium amenities.',
      price: 299,
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      amenities: ['Ocean View', 'King Bed', 'Mini Bar', 'WiFi', 'Room Service'],
      maxGuests: 2,
      available: true
    },
    {
      id: '2',
      name: 'Executive Suite',
      description: 'Luxurious suite perfect for business travelers and special occasions.',
      price: 499,
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      amenities: ['Separate Living Area', 'King Bed', 'Business Desk', 'WiFi', 'Concierge'],
      maxGuests: 4,
      available: true
    },
    {
      id: '3',
      name: 'Standard Room',
      description: 'Comfortable and affordable room with all essential amenities.',
      price: 149,
      image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
      amenities: ['Queen Bed', 'WiFi', 'Air Conditioning', 'TV'],
      maxGuests: 2,
      available: true
    }
  ]);

  const [bookings, setBookings] = useState<Booking[]>([]);

  const addRoom = (roomData: Omit<Room, 'id'>) => {
    const newRoom: Room = {
      ...roomData,
      id: Date.now().toString()
    };
    setRooms(prev => [...prev, newRoom]);
  };

  const updateRoom = (id: string, roomData: Partial<Room>) => {
    setRooms(prev => prev.map(room => 
      room.id === id ? { ...room, ...roomData } : room
    ));
  };

  const deleteRoom = (id: string) => {
    setRooms(prev => prev.filter(room => room.id !== id));
  };

  const bookRoom = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'CONFIRMED'
    };
    setBookings(prev => [...prev, newBooking]);
  };

  const cancelBooking = (id: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === id ? { ...booking, status: 'CANCELLED' as const } : booking
    ));
  };

  const getUserBookings = (userId: string): Booking[] => {
    return bookings.filter(booking => booking.userId === userId);
  };

  return (
    <BookingContext.Provider value={{
      rooms,
      bookings,
      addRoom,
      updateRoom,
      deleteRoom,
      bookRoom,
      cancelBooking,
      getUserBookings
    }}>
      {children}
    </BookingContext.Provider>
  );
};