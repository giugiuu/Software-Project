import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById } from '../data/events';
import { useAuth } from '../contexts/AuthContext';
import { CalendarDays, Clock, MapPin, Music, Info, Ticket } from 'lucide-react';

type TicketType = 'regular' | 'fanPit' | 'vip';

const EventDetailsPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const event = getEventById(eventId || '');
  
  const [selectedTicket, setSelectedTicket] = useState<TicketType>('regular');
  const [quantity, setQuantity] = useState(1);

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h2>
        <p className="text-gray-600 mb-8">The event you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const handleProceedToCheckout = () => {
    if (isAuthenticated) {
      navigate(`/checkout/${eventId}?type=${selectedTicket}&quantity=${quantity}`);
    } else {
      navigate(`/login?redirect=/events/${eventId}`);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  return (
    <div className="bg-white">
      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img
          src={event.imageUrl}
          alt={`${event.title} featuring ${event.artist}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{event.title}</h1>
            <h2 className="text-xl md:text-2xl text-purple-300 font-semibold">{event.artist}</h2>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Info className="h-5 w-5 mr-2 text-purple-600" />
                Event Details
              </h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-700">
                  <CalendarDays className="h-5 w-5 mr-3 text-purple-600" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="h-5 w-5 mr-3 text-purple-600" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin className="h-5 w-5 mr-3 text-purple-600" />
                  <span>{event.venue}, {event.city}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Music className="h-5 w-5 mr-3 text-purple-600" />
                  <span>{event.artist}</span>
                </div>
              </div>
              <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
            </div>
          </div>

          {/* Ticket Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Ticket className="h-5 w-5 mr-2 text-purple-600" />
                Get Tickets
              </h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Ticket Type</label>
                <div className="space-y-3">
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedTicket === 'regular' 
                        ? 'border-purple-600 bg-purple-50' 
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => setSelectedTicket('regular')}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-gray-900">Regular Admission</h4>
                        <p className="text-sm text-gray-600">Standard seating</p>
                      </div>
                      <div className="text-purple-600 font-bold">${event.tickets.regular.price}</div>
                    </div>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedTicket === 'fanPit' 
                        ? 'border-purple-600 bg-purple-50' 
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => setSelectedTicket('fanPit')}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-gray-900">Fan Pit</h4>
                        <p className="text-sm text-gray-600">Standing area near stage</p>
                      </div>
                      <div className="text-purple-600 font-bold">${event.tickets.fanPit.price}</div>
                    </div>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedTicket === 'vip' 
                        ? 'border-purple-600 bg-purple-50' 
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => setSelectedTicket('vip')}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-gray-900">VIP Experience</h4>
                        <p className="text-sm text-gray-600">Premium seating & perks</p>
                      </div>
                      <div className="text-purple-600 font-bold">${event.tickets.vip.price}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <select
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 py-2 px-3"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Price per ticket:</span>
                  <span className="text-gray-900">${event.tickets[selectedTicket].price}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="text-gray-900">{quantity}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-purple-600">${event.tickets[selectedTicket].price * quantity}</span>
                </div>
              </div>
              
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-md font-medium transition-colors duration-300"
              >
                {isAuthenticated ? 'Proceed to Checkout' : 'Login to Purchase'}
              </button>
              
              {!isAuthenticated && (
                <p className="text-sm text-gray-600 mt-3 text-center">
                  You need to be logged in to purchase tickets.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;