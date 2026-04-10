import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function BookingForm({ listing }) {
  const { user } = useAuth();
  const [step, setStep] = useState('form');
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0,
    infants: 0,
    specialRequests: ''
  });

  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Simulate booking creation
      setBookingId('mock-booking-id');
      setStep('success');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (step === 'success') {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-soft text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h3>
        <p className="text-gray-700 mb-6">Your reservation has been confirmed.</p>
        <Link 
          to="/reservations" 
          className="bg-bordeaux text-white px-6 py-3 rounded-lg font-semibold block w-full text-center hover:bg-bordeaux-600 transition-colors"
        >
          View My Reservations
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-soft p-6">
      <h3 className="text-xl font-semibold text-navy mb-6">
        {step === 'form' ? '1. Booking Details' : '2. Payment'}
      </h3>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {step === 'form' && (
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
            <input 
              type="date" 
              value={form.checkIn}
              onChange={(e) => setForm({...form, checkIn: e.target.value})}
              className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-bordeaux-500 focus:border-transparent" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
            <input 
              type="date" 
              value={form.checkOut}
              onChange={(e) => setForm({...form, checkOut: e.target.value})}
              className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-bordeaux-500 focus:border-transparent" 
              required 
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
              <input 
                type="number" 
                value={form.adults}
                onChange={(e) => setForm({...form, adults: parseInt(e.target.value) || 1})}
                className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-bordeaux-500 focus:border-transparent" 
                min="1"
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Children</label>
              <input 
                type="number" 
                value={form.children}
                onChange={(e) => setForm({...form, children: parseInt(e.target.value) || 0})}
                className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-bordeaux-500 focus:border-transparent" 
                min="0"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Infants</label>
              <input 
                type="number" 
                value={form.infants}
                onChange={(e) => setForm({...form, infants: parseInt(e.target.value) || 0})}
                className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-bordeaux-500 focus:border-transparent" 
                min="0"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests (Optional)</label>
            <textarea 
              value={form.specialRequests}
              onChange={(e) => setForm({...form, specialRequests: e.target.value})}
              className="w-full rounded-lg border px-3 py-2 h-20 focus:ring-2 focus:ring-bordeaux-500 focus:border-transparent" 
              maxLength="500"
              placeholder="Any special requests or requirements..."
            />
          </div>
          <div className="text-sm text-gray-600 mb-4">
            Total estimate: <span className="font-bold">${listing.price} x nights + fees</span>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-bordeaux-500 text-white rounded-lg px-4 py-3 font-semibold hover:bg-bordeaux-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating Booking...' : 'Book Now'}
          </button>
        </form>
      )}

      {step === 'success' && (
        <div className="text-center">
          <div className="mb-6 p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold mb-2 text-green-800">Booking Confirmed!</h4>
            <p className="text-sm text-gray-600">Your reservation has been successfully created. You will receive a confirmation email shortly.</p>
          </div>
          <Link 
            to="/reservations"
            className="inline-block bg-bordeaux text-white rounded-lg px-6 py-3 font-semibold hover:bg-bordeaux-600 transition-colors"
          >
            View My Reservations
          </Link>
        </div>
      )}
    </div>
  );
}
