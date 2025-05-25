import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../data/events';
import { CalendarDays, MapPin, Clock } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={event.imageUrl} 
          alt={`${event.artist} concert`} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{event.title}</h3>
        <h4 className="text-lg font-semibold text-purple-600 mb-3">{event.artist}</h4>
        
        <div className="mb-3 space-y-2">
          <div className="flex items-center text-gray-600">
            <CalendarDays size={18} className="mr-2" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock size={18} className="mr-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin size={18} className="mr-2" />
            <span>{event.venue}, {event.city}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="text-gray-700">
            <span className="font-semibold">From ${event.tickets.regular.price}</span>
          </div>
          <Link 
            to={`/events/${event.id}`}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition-colors duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;