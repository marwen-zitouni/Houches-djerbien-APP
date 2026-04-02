// Default content schema for all pages
export const defaultPageContent = {
  homepage: {
    hero: {
      visible: true,
      title: 'Discover Authentic Djerba',
      subtitle: 'Traditional Houses',
      description: 'Experience the charm of traditional Djerbian architecture and hospitality',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=900&fit=crop',
        'https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=1200&h=900&fit=crop',
      ],
      layout: 'hero',
    },
    services: {
      visible: true,
      title: 'Our Services',
      subtitle: 'Explore what we offer',
    },
    architecture: {
      visible: true,
      title: 'Gerbian House Architecture',
      description1: 'Traditional Djerbian architecture represents centuries of cultural heritage.',
      description2: 'Each houch features authentic design elements passed down through generations.',
      description3: 'The distinctive courtyard design provides natural cooling and privacy.',
      image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&h=400&fit=crop',
    },
    rentals: {
      visible: true,
      title: 'Featured Rentals',
      subtitle: 'Explore our collection',
    },
    testimonials: {
      visible: true,
      title: 'Guest Reviews',
    },
    cta: {
      visible: true,
      title: 'Experience Authentic Djerba',
      description: 'Book your traditional Djerbian house today',
      buttonText: 'Start Booking',
      buttonLink: '/rentals',
    },
  },
  construction: {
    hero: {
      visible: true,
      title: 'Construction Services',
      description: 'Professional construction and renovation services',
    },
  },
  cleaning: {
    hero: {
      visible: true,
      title: 'Cleaning Services',
      description: 'Keep your property pristine',
    },
  },
  rentals: {
    hero: {
      visible: true,
      title: 'Available Rentals',
      description: 'Browse our collection of traditional houses',
    },
  },
};
