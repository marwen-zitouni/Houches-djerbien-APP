import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Container } from './ui';
import { MessageCircle, Camera, Bird, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: t('footer.services.rentals'), href: '/rentals' },
      { name: t('footer.services.construction'), href: '/construction' },
      { name: t('footer.services.cleaning'), href: '/cleaning' },
    ],
    company: [
      { name: t('footer.company.about'), href: '/about' },
      { name: t('footer.company.contact'), href: '/contact' },
      { name: t('footer.company.careers'), href: '/careers' },
    ],
    support: [
      { name: t('footer.support.help'), href: '/help' },
      { name: t('footer.support.privacy'), href: '/privacy' },
      { name: t('footer.support.terms'), href: '/terms' },
    ],
  };

  return (
    <footer className="bg-navy-900 text-white">
      <Container className="py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-bordeaux-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-2xl font-bold">Djerba.Houches</span>
            </div>
            <p className="text-navy-300 leading-relaxed">
              {t('footer.description')}
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-navy-300">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Djerba, Tunisia</span>
              </div>
              <div className="flex items-center space-x-2 text-navy-300">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+216 XX XXX XXX</span>
              </div>
              <div className="flex items-center space-x-2 text-navy-300">
                <Mail className="w-4 h-4" />
                <span className="text-sm">contact@djerba-houches.com</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.sections.services')}</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-navy-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.sections.company')}</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-navy-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.sections.support')}</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-navy-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-navy-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-navy-400 text-sm">
              © {currentYear} Djerba.Houches. {t('footer.copyright')}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="w-8 h-8 bg-navy-800 rounded-full flex items-center justify-center hover:bg-bordeaux-500 transition-colors duration-200"
                aria-label="Facebook"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-navy-800 rounded-full flex items-center justify-center hover:bg-bordeaux-500 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Camera className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-navy-800 rounded-full flex items-center justify-center hover:bg-bordeaux-500 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Bird className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
