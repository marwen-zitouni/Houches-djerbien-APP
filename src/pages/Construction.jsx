import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AppointmentForm from '../components/AppointmentForm';

export default function Construction() {
  const { t } = useTranslation();

  const constructionImages = [
    {
      src: "https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=800&h=600&fit=crop",
      alt: "Traditional Djerba stone masonry construction with white walls",
      titleKey: "stoneMasonry"
    },
    {
      src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
      alt: "Workers building traditional Tunisian house with blue doors",
      titleKey: "houseRenovation"
    },
    {
      src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
      alt: "Construction of authentic Djerbian courtyard house",
      titleKey: "traditionalArchitecture"
    },
    {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      alt: "Mediterranean house renovation with traditional materials",
      titleKey: "courtyardDevelopment"
    },
    {
      src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
      alt: "Roof construction using traditional Tunisian techniques",
      titleKey: "roofConstruction"
    },
    {
      src: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&h=600&fit=crop",
      alt: "Facade restoration of historic Djerba house",
      titleKey: "facadeRestoration"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto px-4 py-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.section
        className="bg-white rounded-2xl shadow-soft p-8 mb-8"
        variants={itemVariants}
      >
        <motion.h1
          className="text-3xl font-bold text-gray-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {t('constructionTitle')}
        </motion.h1>
        <motion.p
          className="mt-4 text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {t('constructionDesc')}
        </motion.p>
        <motion.ul
          className="mt-4 list-disc list-inside text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <li>{t('constructionFeature1')}</li>
          <li>{t('constructionFeature2')}</li>
          <li>{t('constructionFeature3')}</li>
          <li>{t('constructionFeature4')}</li>
        </motion.ul>
      </motion.section>

      <motion.section
        className="mb-8"
        variants={itemVariants}
      >
        <motion.h2
          className="text-2xl font-semibold text-gray-900 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t('constructionProjects')}
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {constructionImages.map((image, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-glow transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <h3 className="text-white font-semibold p-4">{t(image.titleKey)}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        className="bg-white rounded-2xl shadow-soft p-8"
        variants={itemVariants}
      >
        <motion.h2
          className="text-2xl font-semibold text-gray-900 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t('requestConsultation')}
        </motion.h2>
        <AppointmentForm />
      </motion.section>
    </motion.div>
  );
}

