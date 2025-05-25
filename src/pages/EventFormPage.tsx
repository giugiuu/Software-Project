import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EventForm from '../components/EventForm';

interface EventData {
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  ticketsTotal: number;
  price: number;
}

const EventFormPage: React.FC = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState<EventData | undefined>();
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    const fetchEvent = async () => {
      if (id) {
        try {
          // In a real app, fetch event data from API
          // Mock data for now
          const mockEvent: EventData = {
            name: 'Summer Concert',
            date: '2024-07-15',
            time: '19:00',
            location: 'Cairo Opera House',
            description: 'A wonderful summer evening concert.',
            ticketsTotal: 100,
            price: 50,
          };
          setInitialData(mockEvent);
        } catch (error) {
          console.error('Error fetching event:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = async (data: EventData) => {
    try {
      if (id) {
        // In a real app, make API call to update event
        console.log('Updating event:', { id, ...data });
      } else {
        // In a real app, make API call to create event
        console.log('Creating event:', data);
      }
    } catch (error) {
      throw new Error('Failed to save event');
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {id ? 'Edit Event' : 'Create New Event'}
      </h1>
      <div className="max-w-2xl mx-auto">
        <EventForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isEditing={!!id}
        />
      </div>
    </div>
  );
};

export default EventFormPage; 