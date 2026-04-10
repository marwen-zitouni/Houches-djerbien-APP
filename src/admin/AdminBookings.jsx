import { useState } from 'react';
import { bookings } from '../data/mockData';
import DataTable from '../components/DataTable';
import { useSettings } from '../contexts/SettingsContext';

export default function AdminBookings() {
  const { formatCurrency } = useSettings();
  const [bookingsData, setBookingsData] = useState(bookings);

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Listing', key: 'listingId' },
    { label: 'Guest', key: 'guest', editable: true },
    { label: 'Nights', key: 'nights', editable: true, type: 'number' },
    { label: 'Total', key: 'total', render: (row) => formatCurrency(row.total), editable: true, type: 'number' },
    { label: 'Status', key: 'status' },
  ];

  const handleEdit = (updatedBooking) => {
    setBookingsData(prev => prev.map(booking =>
      booking.id === updatedBooking.id ? updatedBooking : booking
    ));
  };

  const handleDelete = (bookingId) => {
    setBookingsData(prev => prev.filter(booking => booking.id !== bookingId));
  };

  const handleStatusChange = (bookingId, newStatus) => {
    setBookingsData(prev => prev.map(booking =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3 text-navy">Manage Bookings</h2>
      <DataTable
        columns={columns}
        rows={bookingsData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
