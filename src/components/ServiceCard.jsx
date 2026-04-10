import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Button } from './ui';
import { ArrowRight, Home, Wrench, Sparkles } from 'lucide-react';

const iconMap = {
  rentals: Home,
  construction: Wrench,
  cleaning: Sparkles,
};

export default function ServiceCard({ service, index }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const Icon = iconMap[service.id] || Home;

  const handleNavigate = () => {
    navigate(`/${service.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className="h-full group cursor-pointer" onClick={handleNavigate}>
        <CardContent className="p-8 text-center space-y-6">
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="mx-auto w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300"
          >
            <Icon className="w-10 h-10 text-white" />
          </motion.div>

          {/* Content */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
              {t(`services.${service.id}.title`)}
            </h3>

            <p className="text-gray-600 leading-relaxed">
              {t(`services.${service.id}.description`)}
            </p>

            {/* Features */}
            <div className="space-y-2">
              {service.features?.slice(0, 3).map((feature, idx) => (
                <div key={idx} className="flex items-center justify-center text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3" />
                  {t(`services.${service.id}.features.${idx}`)}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleNavigate}
            variant="outline"
            className="group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-all duration-300"
          >
            Learn More
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

