import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button, Container } from './ui';
import { Search, MapPin, CalendarDays, Star } from 'lucide-react';

export function Hero({ images = [], layout = 'hero' }) {
  const { t } = useTranslation();
  const heroImages = images && images.length > 0
    ? images
    : [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=900&fit=crop',
      ];
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('12:00');
  const [activeSlide, setActiveSlide] = useState(0);

  const heroImage = heroImages[activeSlide] || heroImages[0];

  useEffect(() => {
    if (layout !== 'slider' || heroImages.length <= 1) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length, layout]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-sand-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_26%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_30%)]" />
      <Container size="xl">
        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center py-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 rounded-full bg-white/90 py-2 px-4 shadow-soft border border-white/70 backdrop-blur-xl">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-600 text-white shadow-lg">G</div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary-600">GRBA</p>
                <p className="text-base text-slate-500">Premium heritage stays and services</p>
              </div>
            </div>

            <div className="space-y-6 max-w-2xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.8 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900"
              >
                Authentic spaces. Refined comfort.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-lg text-slate-600 leading-8"
              >
                {t('hero.description')}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-6 shadow-[0_30px_80px_-40px_rgba(59,130,246,0.4)] backdrop-blur-xl"
            >
              <div className="grid gap-4 md:grid-cols-[1.1fr_1fr]">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <MapPin className="w-4 h-4 text-primary-600" /> Choose location
                  </label>
                  <input
                    type="text"
                    value={selectedLocation}
                    onChange={(event) => setSelectedLocation(event.target.value)}
                    placeholder={t('hero.wherePlaceholder')}
                    className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition duration-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-900">Choose date & time</label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(event) => setSelectedDate(event.target.value)}
                      className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition duration-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none"
                    />
                    <input
                      type="time"
                      value={selectedTime}
                      onChange={(event) => setSelectedTime(event.target.value)}
                      className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition duration-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Button className="w-full sm:w-auto rounded-3xl px-8 py-4 text-base tracking-wide shadow-xl hover:shadow-2xl">
                  <Search className="w-4 h-4 mr-2" />
                  {t('hero.search')}
                </Button>
                <span className="text-sm text-slate-500">Find unique stays, services, and trusted local support.</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid gap-4 sm:grid-cols-3"
            >
              <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 text-center shadow-soft">
                <p className="text-3xl font-semibold text-primary-600">500+</p>
                <p className="mt-2 text-sm text-slate-500">Properties</p>
              </div>
              <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 text-center shadow-soft">
                <p className="text-3xl font-semibold text-primary-600">10k+</p>
                <p className="mt-2 text-sm text-slate-500">Happy guests</p>
              </div>
              <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 text-center shadow-soft">
                <p className="text-3xl font-semibold text-primary-600">4.9</p>
                <p className="mt-2 text-sm text-slate-500">Average rating</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-2xl shadow-primary-100/20">
              <div className="absolute -right-10 top-8 h-36 w-36 rounded-full bg-primary-200/60 blur-3xl" />
              <div className="absolute top-8 left-8 h-20 w-20 rounded-3xl bg-primary-100/90 blur-xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-950/5">
                <div className="h-[420px] w-full overflow-hidden rounded-[1.75rem]">
                  <img
                    src={heroImage}
                    alt="Hero visual"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute inset-x-6 bottom-6 rounded-3xl border border-white/75 bg-white/85 p-5 shadow-soft backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.35em] text-primary-600">Featured</p>
                  <h3 className="mt-3 text-xl font-semibold text-slate-900">Authentic Djerba retreats</h3>
                  <p className="mt-2 text-sm text-slate-600">Designed for refined stays and local craftsmanship.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
