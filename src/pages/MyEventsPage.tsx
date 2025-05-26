import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Plus, PieChart } from 'lucide-react';
import EventCard from '../components/EventCard';

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  status: 'approved' | 'pending' | 'declined';
  ticketsTotal: number;
  ticketsBooked: number;
  price: number;
}

const MyEventsPage: React.FC = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch events from API
    const fetchEvents = async () => {
      try {
        // Mock data - replace with actual API call
        const mockEvents: Event[] = [
          {
            id: '1',
            name: 'Summer Concert',
            date: '2024-07-15',
            location: 'Cairo Opera House',
            status: 'approved',
            ticketsTotal: 100,
            ticketsBooked: 75,
            price: 50,
          },
          // Add more mock events as needed
        ];
        setEvents(mockEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Events</h1>
        <Link to="/my-events/new" className="btn-primary">
          <Plus className="h-5 w-5 mr-2" />
          Create Event
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="flex flex-col bg-white rounded-lg shadow-sm overflow-hidden">
            <EventCard event={event} />
            <div className="p-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-500">Status:</span>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${event.status === 'approved' ? 'bg-green-100 text-green-800' : 
                    event.status === 'declined' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'}`}>
                  {event.status}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-500">Tickets Sold:</span>
                <span className="text-sm text-gray-900">{event.ticketsBooked}/{event.ticketsTotal}</span>
              </div>
              <div className="flex justify-between items-center">
                <Link
                  to={`/my-events/${event.id}/edit`}
                  className="btn-secondary text-sm"
                >
                  Edit Event
                </Link>
                <Link
                  to={`/my-events/analytics/${event.id}`}
                  className="text-purple-600 hover:text-purple-700"
                >
                  <PieChart className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">You haven't created any events yet.</p>
          <Link to="/my-events/new" className="btn-primary mt-4">
            Create Your First Event
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyEventsPage; 