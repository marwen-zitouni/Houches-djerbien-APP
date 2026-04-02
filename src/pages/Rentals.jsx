import { useEffect, useState } from 'react';
import ListingGrid from '../components/ListingGrid';
import { loadListings, saveListings } from '../data/storage';

export default function Rentals() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    setListings(loadListings());
  }, []);

  const handleImageChange = (id, newUrl) => {
    const updated = listings.map((listing) =>
      listing.id === id
        ? { ...listing, images: [newUrl, ...(listing.images?.slice(1) || [])] }
        : listing
    );
    setListings(updated);
    saveListings(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-navy mb-4">Houch Jerbi Rentals</h1>
      <p className="text-gray-600 mb-6">Select from curated traditional houses across Djerba, each with full details and booking information.</p>
      <ListingGrid listings={listings} onImageChange={handleImageChange} />
    </div>
  );
}
