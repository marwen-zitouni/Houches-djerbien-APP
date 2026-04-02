import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Hero } from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import ListingGrid from '../components/ListingGrid';
import { Testimonials } from '../components/Testimonials';
import Footer from '../components/Footer';
import { Container, Section, Grid } from '../components/ui';
import { loadHomepageConfig, loadListings, loadServices, loadPageContent } from '../data/storage';

export default function Home() {
  const { t } = useTranslation();
  const [homepageConfig] = useState(() => loadHomepageConfig());
  const [listings] = useState(() => loadListings());
  const [services] = useState(() => loadServices());
  const [pageContent, setPageContent] = useState(() => loadPageContent().homepage);

  useEffect(() => {
    const handleUpdate = () => {
      const content = loadPageContent();
      setPageContent(content.homepage);
    };

    window.addEventListener('content-updated', handleUpdate);
    return () => window.removeEventListener('content-updated', handleUpdate);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {pageContent.hero?.visible !== false && (
        <Hero images={homepageConfig.images} layout={homepageConfig.layout} />
      )}

      {/* Services Section */}
      {pageContent.services?.visible !== false && (
        <Section>
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {pageContent.services?.title || t('services.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {pageContent.services?.subtitle || t('services.subtitle')}
              </p>
            </motion.div>

            <Grid cols={3} gap="lg">
              {services.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </Grid>
          </Container>
        </Section>
      )}

      {/* Featured Rentals Section */}
      {pageContent.rentals?.visible !== false && (
        <Section className="bg-gray-50">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {pageContent.rentals?.title || t('featuredRentals')}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {pageContent.rentals?.subtitle || t('featuredRentalsDesc')}
              </p>
            </motion.div>

            <ListingGrid listings={listings.slice(0, 6)} />
          </Container>
        </Section>
      )}

      {/* About/Architecture Section */}
      {pageContent.architecture?.visible !== false && (
        <Section>
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h2 className="text-4xl font-bold text-gray-900">
                  {pageContent.architecture?.title || t('aboutHouch')}
                </h2>
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                  <p>{pageContent.architecture?.description1 || t('aboutDesc')}</p>
                  <p>{pageContent.architecture?.description2 || t('aboutDesc2')}</p>
                  <p>{pageContent.architecture?.description3 || t('aboutDesc3')}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <img
                  src={pageContent.architecture?.image || 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&h=400&fit=crop'}
                  alt="Traditional Djerba house interior with courtyard"
                  className="w-full h-80 object-cover rounded-2xl shadow-soft"
                />
              </motion.div>
            </div>
          </Container>
        </Section>
      )}

      {/* Testimonials Section */}
      {pageContent.testimonials?.visible !== false && (
        <Testimonials />
      )}

      {/* CTA Section */}
      {pageContent.cta?.visible !== false && (
        <Section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">
                  {pageContent.cta?.title || t('experienceAuthentic')}
                </h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  {pageContent.cta?.description || t('bookTraditional')}
                </p>
              </div>

              <motion.a
                href={pageContent.cta?.buttonLink || '/rentals'}
                className="inline-block bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {pageContent.cta?.buttonText || t('startBooking')}
              </motion.a>
            </motion.div>
          </Container>
        </Section>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

