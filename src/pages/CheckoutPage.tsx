import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getEventById } from '../data/events';
import { useAuth } from '../contexts/AuthContext';
import { CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

type TicketType = 'regular' | 'fanPit' | 'vip';

const CheckoutPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const event = getEventById(eventId || '');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // Form state
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  
  // Get ticket type and quantity from query parameters
  const queryParams = new URLSearchParams(location.search);
  const ticketType = (queryParams.get('type') as TicketType) || 'regular';
  const quantity = parseInt(queryParams.get('quantity') || '1');
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate(`/login?redirect=/events/${eventId}`);
    }
    
    // Redirect to event details if event not found
    if (!event) {
      navigate('/');
    }
    
    // Set name if user is authenticated
    if (user) {
      setName(user.username);
    }
  }, [isAuthenticated, event, eventId, navigate, user]);
  
  if (!event) {
    return null; // Will redirect in useEffect
  }
  
  const totalAmount = event.tickets[ticketType].price * quantity;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!name || !cardNumber || !expiryDate || !cvv) {
      setError('Please fill in all fields');
      return;
    }
    
    if (cardNumber.length < 16) {
      setError('Please enter a valid card number');
      return;
    }
    
    if (cvv.length < 3) {
      setError('Please enter a valid CVV');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Payment successful
      setSuccess(true);
    } catch (err) {
      setError('Payment failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  if (success) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
          <p className="text-lg text-gray-700 mb-6">
            Thank you for your purchase. Your tickets for {event.title} have been confirmed.
          </p>
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Event:</span>
                <span className="text-gray-900 font-medium">{event.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Artist:</span>
                <span className="text-gray-900 font-medium">{event.artist}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="text-gray-900 font-medium">{event.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="text-gray-900 font-medium">{event.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Venue:</span>
                <span className="text-gray-900 font-medium">{event.venue}, {event.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ticket Type:</span>
                <span className="text-gray-900 font-medium capitalize">{ticketType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quantity:</span>
                <span className="text-gray-900 font-medium">{quantity}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                <span className="text-gray-800 font-semibold">Total Amount:</span>
                <span className="text-purple-600 font-bold">${totalAmount}</span>
              </div>
            </div>
          </div>
          <p className="text-gray-600 mb-6">
            We've sent a confirmation email to your registered email address. You can also view your tickets in your account.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => navigate('/')}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-md font-medium"
            >
              Browse More Events
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-purple-600 p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Checkout</h2>
        </div>
        
        <div className="p-4 sm:p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Event:</span>
                <span className="text-gray-900 font-medium">{event.title}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Artist:</span>
                <span className="text-gray-900 font-medium">{event.artist}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Date & Time:</span>
                <span className="text-gray-900 font-medium">{event.date}, {event.time}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Ticket Type:</span>
                <span className="text-gray-900 font-medium capitalize">{ticketType}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Price per Ticket:</span>
                <span className="text-gray-900 font-medium">${event.tickets[ticketType].price}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Quantity:</span>
                <span className="text-gray-900 font-medium">{quantity}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                <span className="text-gray-800 font-semibold">Total:</span>
                <span className="text-purple-600 font-bold">${totalAmount}</span>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-purple-600" />
              Payment Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  id="card-number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value.replace(/[^\d/]/g, '').slice(0, 5))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-md font-medium transition-colors duration-300 disabled:opacity-70"
              >
                {loading ? 'Processing...' : `Pay $${totalAmount}`}
              </button>
            </div>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              <p>This is a demo checkout. No actual payment will be processed.</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;