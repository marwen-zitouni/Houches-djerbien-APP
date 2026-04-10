import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent, Badge } from './ui';
import { MapPin, Star, Heart, Users, Wifi, Car } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useAuth } from '../contexts/AuthContext';
import ImageEditor from './ImageEditor';

export default function ListingCard({ listing, index, onImageChange }) {
  const { t } = useTranslation();
  const { formatCurrency } = useSettings();
  const { user } = useAuth();
  const [currentImage, setCurrentImage] = useState(listing.images[0]);
  
  const isAdminMode = user?.role === 'admin';

  const handleImageChange = (newUrl) => {
    setCurrentImage(newUrl);
    if (onImageChange) {
      onImageChange(listing.id, newUrl);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Link to={`/rentals/${listing.id}`} className="block h-full">
        <Card className="h-full group overflow-hidden">
          {/* Image with Editor */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
            <ImageEditor 
              imageUrl={currentImage}
              onImageChange={handleImageChange}
              isAdminMode={isAdminMode}
              size="large"
            />

            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                // Handle favorite toggle
              }}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              <Heart className="w-4 h-4 text-navy-900" />
            </button>

            {/* Status Badge */}
            {listing.status === 'available' && (
              <Badge className="absolute top-4 left-4 bg-green-500 text-white">
                {t('listings.available')}
              </Badge>
            )}
          </div>

          <CardContent className="p-6 space-y-4">
            {/* Location */}
            <div className="flex items-center text-sm text-navy-600">
              <MapPin className="w-4 h-4 mr-1" />
              {listing.location}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-navy-900 line-clamp-2 group-hover:text-bordeaux-500 transition-colors">
              {listing.title}
            </h3>

            {/* Rating */}
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-medium text-navy-900">{listing.rating}</span>
              <span className="text-navy-600">({listing.reviews} {t('listings.reviews')})</span>
            </div>

            {/* Amenities Preview */}
            <div className="flex items-center space-x-3 text-sm text-navy-600">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {listing.guests} {t('listings.guests')}
              </div>
              {listing.amenities.includes('wifi') && (
                <div className="flex items-center">
                  <Wifi className="w-4 h-4 mr-1" />
                  WiFi
                </div>
              )}
              {listing.amenities.includes('parking') && (
                <div className="flex items-center">
                  <Car className="w-4 h-4 mr-1" />
                  {t('listings.parking')}
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-2xl font-bold text-navy-900">
                  {formatCurrency(listing.price)}
                </span>
                <span className="text-navy-600"> / {t('listings.night')}</span>
              </div>

              <div className="text-sm text-navy-600">
                {t('listings.total')} {formatCurrency(listing.price * 7)}
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
