import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { bookings as mockBookings } from '../data/mockData';

export default function Reservations() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    // Simulate fetching bookings for the user
    const userBookings = mockBookings.filter(b => b.guest === user.name && b.status === 'confirmed');
    setBookings(userBookings);
    setLoading(false);
  }, [user]);

  if (loading) {
    return <div className="p-8 text-center">Loading reservations...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-navy">My Confirmed Reservations</h1>
        <p className="text-gray-600 mt-2">All paid and confirmed bookings</p>
      </header>
      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 mb-4">No confirmed reservations yet</p>
          <Link to="/rentals" className="bg-bordeaux text-white px-6 py-3 rounded-lg font-semibold">
            Find Your Perfect Stay
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-2xl shadow-soft p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{booking.listing.title}</h3>
              <p className="text-gray-600 mb-2">{booking.checkIn.toDateString()} - {booking.checkOut.toDateString()} ({booking.nights} nights)</p>
              <p className="text-green-600 font-semibold mb-2">Paid & Confirmed</p>
              <p className="text-lg font-bold text-navy">${booking.payment.amount}</p>
              <div className="mt-4 text-sm text-gray-500">
                Guests: {booking.guests.adults + booking.guests.children} | {booking.listing.location}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
