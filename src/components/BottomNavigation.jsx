import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Home, Building, Wrench, Sparkles } from 'lucide-react';

export default function BottomNavigation() {
  const { t } = useTranslation();

  const navItems = [
    { to: "/", icon: Home, label: t('nav.home') },
    { to: "/rentals", icon: Building, label: t('nav.rentals') },
    { to: "/cleaning", icon: Sparkles, label: t('nav.cleaning') },
    { to: "/construction", icon: Wrench, label: t('nav.construction') }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-2xl border-t border-gray-200 safe-area-inset-bottom"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.to} variants={itemVariants}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => `
                    relative flex flex-col items-center justify-center px-4 py-2 rounded-2xl transition-all duration-300 min-w-[60px]
                    ${isActive
                      ? 'text-primary-600 bg-primary-50 shadow-lg'
                      : 'text-gray-600 hover:text-primary-500 hover:bg-gray-50'
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <motion.div
                        className="mb-1"
                        animate={isActive ? {
                          scale: [1, 1.1, 1],
                        } : {}}
                        transition={{ duration: 0.4 }}
                      >
                        <Icon
                          className={`w-6 h-6 ${isActive ? 'stroke-2' : 'stroke-1.5'}`}
                        />
                      </motion.div>
                      <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                        {item.label}
                      </span>
                      {isActive && (
                        <motion.div
                          className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary-500 rounded-full"
                          layoutId="activeTab"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
