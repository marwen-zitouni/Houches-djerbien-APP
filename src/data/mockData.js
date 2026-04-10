export const listings = [
  {
    id: '1',
    title: 'Houch Jerbi Bleu',
    location: 'Houmt Souk, Djerba',
    price: 120,
    rating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200&h=800&fit=crop'
    ],
    amenities: ['WiFi', 'Air Conditioning', 'Pool', 'Kitchen', 'Sea View'],
    description: 'Authentic Djerbian stone house with vaulted ceilings and courtyard.',
    host: { name: 'Amina', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
    coordinates: { lat: 33.876, lng: 10.858 },
  },
  {
    id: '2',
    title: 'Maison Blanc Houch',
    location: 'Midoun, Djerba',
    price: 95,
    rating: 4.6,
    images: [
      'https://images.unsplash.com/photo-1502211945540-48f33fa8d9f7?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1502213572-0f8d0c9f6e7f?w=1200&h=800&fit=crop'
    ],
    amenities: ['Breakfast', 'Parking', 'Garden', 'Pet friendly'],
    description: 'Cozy traditional structure close to beaches and craft markets.',
    host: { name: 'Fathi', avatar: 'https://randomuser.me/api/portraits/men/75.jpg' },
    coordinates: { lat: 33.835, lng: 10.902 },
  },
  {
    id: '3',
    title: 'Villa Sidi Beshr',
    location: 'Menzel Temime, Djerba',
    price: 170,
    rating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200&h=800&fit=crop'
    ],
    amenities: ['Private Pool', 'Cleaner', 'Garden', 'Barbecue'],
    description: 'Luxury traditional villa with private pool and rooftop terrace.',
    host: { name: 'Youssef', avatar: 'https://randomuser.me/api/portraits/men/12.jpg' },
    coordinates: { lat: 33.821, lng: 10.939 },
  },
];

export const services = [
  {
    id: 'rentals',
    title: 'Traditional House Rentals',
    description: 'Authentic Djerbian Houch houses for your perfect vacation',
    features: ['Authentic architecture', 'Local hospitality', 'Cultural experience'],
  },
  {
    id: 'construction',
    title: 'Construction & Renovation',
    description: 'Expert building and restoration of traditional Djerbian houses',
    features: ['Traditional techniques', 'Local materials', 'Expert craftsmen'],
  },
  {
    id: 'cleaning',
    title: 'Professional Cleaning',
    description: 'Thorough cleaning services for homes and hospitality properties',
    features: ['Deep cleaning', 'Eco-friendly products', 'Local expertise'],
  },
];

export const bookings = [
  { id: 'b1', listingId: '1', guest: 'Meryem', nights: 4, status: 'confirmed', total: 480 },
  { id: 'b2', listingId: '2', guest: 'Omar', nights: 3, status: 'pending', total: 285 },
  { id: 'b3', listingId: '3', guest: 'Sara', nights: 6, status: 'cancelled', total: 1020 },
];

export const constructionRequests = [
  { id: 'c1', name: 'Hassen', phone: '+216 98 765 432', email: 'hassen@mail.com', type: 'renovation', date: '2026-04-10', description: 'Restore ancient houch roof and tile.' },
  { id: 'c2', name: 'Leila', phone: '+216 95 123 456', email: 'leila@mail.com', type: 'construction', date: '2026-05-04', description: 'New courtyard design for family stays.' },
];

export const cleaningRequests = [
  { id: 'cl1', client: 'Tunisian Rental Co.', type: 'B2B', frequency: 'weekly', status: 'assigned', team: 'North Djerba' },
  { id: 'cl2', client: 'Walid', type: 'B2C', frequency: 'one-time', status: 'pending', team: 'unassigned' },
];

export const users = [
  { id: 'u1', name: 'Mayssa', email: 'mayssa@mail.com', password: 'pass123', role: 'host' },
  { id: 'u2', name: 'Ahmed', email: 'ahmed@mail.com', password: 'pass123', role: 'guest' },
  { id: 'admin', name: 'Admin', email: 'admin@djerba.com', password: 'admin123', role: 'admin' },
];
