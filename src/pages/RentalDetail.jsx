import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ImageGallery from '../components/ImageGallery';
import BookingForm from '../components/BookingForm';
import { loadListings } from '../data/storage';

export default function RentalDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const foundListing = loadListings().find((l) => l.id === id);
        if (!foundListing) throw new Error('Listing not found');
        setListing(foundListing);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (error || !listing) {
    return <div className="p-8 text-center">Listing not found. <Link className="text-bordeaux" to="/rentals">Back to rentals</Link></div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-navy">{listing.title}</h1>
          <p className="text-gray-600 mt-1">{listing.location}</p>
          <small className="text-sm text-gray-500">⭐ {listing.rating}</small>
          <ImageGallery images={listing.images} />
          <div className="bg-white rounded-2xl shadow-soft p-5 mb-4">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{listing.description}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-soft p-5 mb-4">
            <h2 className="text-xl font-semibold mb-2">Amenities</h2>
            <ul className="list-disc list-inside text-gray-700">{listing.amenities.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="bg-white rounded-2xl shadow-soft p-5 mb-4">
            <h2 className="text-xl font-semibold mb-2">Host</h2>
            <div className="flex items-center gap-3">
              <img className="w-12 h-12 rounded-full" src={listing.host.avatar} alt="host" />
              <div>{listing.host.name}</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-soft p-5 mb-4">
            <h2 className="text-xl font-semibold mb-2">Map</h2>
            <div className="h-64 bg-sand rounded-lg flex items-center justify-center text-gray-500">Map placeholder</div>
          </div>
        </div>
        <aside className="lg:col-span-1">
          <BookingForm listing={listing} />
        </aside>
      </div>
    </div>
  );
}
