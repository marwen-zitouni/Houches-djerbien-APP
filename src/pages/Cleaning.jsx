import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PricingCards from '../components/PricingCards';

export default function Cleaning() {
  const { t } = useTranslation();

  const cleaningImages = [
    {
      src: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=600&fit=crop",
      alt: "Professional cleaning of traditional Djerba house interior with stone walls",
      titleKey: "interiorDeepCleaning"
    },
    {
      src: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
      alt: "Housekeeper cleaning traditional stone courtyard and patio",
      titleKey: "courtyardMaintenance"
    },
    {
      src: "https://images.unsplash.com/photo-1527515545081-5db817172677?w=800&h=600&fit=crop",
      alt: "Professional kitchen deep cleaning in traditional Tunisian home",
      titleKey: "kitchenCleaning"
    },
    {
      src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop",
      alt: "Bathroom and traditional tile cleaning service",
      titleKey: "bathroomCleaning"
    },
    {
      src: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=800&h=600&fit=crop",
      alt: "Outdoor terrace and garden cleaning for vacation homes",
      titleKey: "outdoorCleaning"
    },
    {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      alt: "Post-construction cleaning of newly renovated traditional house",
      titleKey: "postConstructionCleaning"
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
          {t('cleaningTitle')}
        </motion.h1>
        <motion.p
          className="mt-4 text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {t('cleaningDesc')}
        </motion.p>
        <motion.ul
          className="mt-4 list-disc list-inside text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <li>{t('cleaningFeature1')}</li>
          <li>{t('cleaningFeature2')}</li>
          <li>{t('cleaningFeature3')}</li>
          <li>{t('cleaningFeature4')}</li>
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
          {t('ourCleaningServices')}
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {cleaningImages.map((image, index) => (
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
        className="bg-white rounded-2xl shadow-soft p-8 mb-8"
        variants={itemVariants}
      >
        <motion.h2
          className="text-2xl font-semibold text-gray-900 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t('pricingPlans')}
        </motion.h2>
        <PricingCards />
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
          {t('bookCleaning')}
        </motion.h2>
        <motion.form
          className="grid gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={(e) => {
            e.preventDefault();
            alert('Cleaning request submitted successfully! We will contact you soon.');
          }}
        >
          <input
            type="text"
            placeholder={t('name')}
            className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
          <input
            type="email"
            placeholder={t('email')}
            className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
          <input
            type="tel"
            placeholder={t('phone')}
            className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
          <textarea
            placeholder={t('propertyDetails')}
            rows="3"
            className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
          <motion.button
            className="bg-primary-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-primary-700 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('requestCleaning')}
          </motion.button>
        </motion.form>
      </motion.section>
    </motion.div>
  );
}

