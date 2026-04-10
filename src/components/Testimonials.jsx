import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Container, Section } from './ui';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'London, UK',
    rating: 5,
    text: 'Amazing experience in Djerba! The house was beautiful and the service was exceptional. Will definitely come back.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 2,
    name: 'Ahmed Ben Ali',
    location: 'Tunis, Tunisia',
    rating: 5,
    text: 'Perfect place for a family vacation. Clean, comfortable, and the staff was very helpful throughout our stay.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 3,
    name: 'Marie Dubois',
    location: 'Paris, France',
    rating: 5,
    text: 'The construction work was done professionally and on time. Highly recommend their services for any renovation needs.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  },
];

export function Testimonials() {
  const { t } = useTranslation();

  return (
    <Section className="bg-sand-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-navy-900 mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-navy-600 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <Card className="h-full">
                <CardContent className="p-6 space-y-4">
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-bordeaux-500 opacity-50" />

                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-navy-700 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-3 pt-4 border-t border-sand-200">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-navy-900">{testimonial.name}</div>
                      <div className="text-sm text-navy-600">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="text-2xl font-bold text-navy-900">500+</div>
            <div className="text-2xl font-bold text-navy-900">10k+</div>
            <div className="text-2xl font-bold text-navy-900">4.9★</div>
            <div className="text-2xl font-bold text-navy-900">98%</div>
            <div className="text-sm text-navy-600">{t('testimonials.stats.properties')}</div>
            <div className="text-sm text-navy-600">{t('testimonials.stats.guests')}</div>
            <div className="text-sm text-navy-600">{t('testimonials.stats.rating')}</div>
            <div className="text-sm text-navy-600">{t('testimonials.stats.satisfaction')}</div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}