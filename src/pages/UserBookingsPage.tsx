import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, MapPin, Clock, Ticket } from 'lucide-react';

interface Booking {
  id: string;
  eventId: string;
  eventName: string;
  date: string;
  time: string;
  location: string;
  ticketCount: number;
  totalPrice: number;
  status: 'confirmed' | 'cancelled';
}

const UserBookingsPage: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch bookings from API
    const fetchBookings = async () => {
      try {
        // Mock data - replace with actual API call
        const mockBookings: Booking[] = [
          {
            id: '1',
            eventId: '1',
            eventName: 'Summer Concert',
            date: '2024-07-15',
            time: '19:00',
            location: 'Cairo Opera House',
            ticketCount: 2,
            totalPrice: 100,
            status: 'confirmed',
          },
          // Add more mock bookings as needed
        ];
        setBookings(mockBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId: string) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      // In a real app, make API call to cancel booking
      setBookings(bookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
      ));
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {booking.eventName}
                  </h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(booking.date).toLocaleDateString()}</span>
                      <Clock className="h-4 w-4 ml-4 mr-2" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{booking.location}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Ticket className="h-4 w-4 mr-2" />
                      <span>{booking.ticketCount} tickets</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full
                    ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {booking.status}
                  </span>
                  <div className="mt-2 text-sm text-gray-500">
                    Total: EGP {booking.totalPrice}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
                <Link
                  to={`/events/${booking.eventId}`}
                  className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                >
                  View Event Details
                </Link>
                {booking.status === 'confirmed' && (
                  <button
                    onClick={() => handleCancelBooking(booking.id)}
                    className="text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {bookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">You haven't made any bookings yet.</p>
            <Link to="/" className="btn-primary mt-4">
              Browse Events
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBookingsPage; 