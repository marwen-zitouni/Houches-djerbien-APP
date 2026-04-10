import { listings } from '../data/mockData';
import ListingGrid from '../components/ListingGrid';

export default function Rentals() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-navy mb-4">Houch Jerbi Rentals</h1>
      <p className="text-gray-600 mb-6">Select from curated traditional houses across Djerba, each with full details and booking information.</p>
      <ListingGrid listings={listings} />
    </div>
  );
}
