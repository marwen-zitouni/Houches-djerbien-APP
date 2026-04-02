import { listings as defaultListings, services as defaultServices } from './mockData';
import { defaultPageContent } from './contentSchema';

export { defaultPageContent };

const LISTINGS_KEY = 'djerba-listings';
const SERVICES_KEY = 'djerba-services';
const HOMEPAGE_KEY = 'djerba-homepage';
const REQUESTS_KEY = 'djerba-requests';
const CONTENT_KEY = 'djerba-page-content';

const safeParse = (value, fallback) => {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const safeParseArray = (value, fallback) => {
  try {
    const result = JSON.parse(value);
    return Array.isArray(result) ? result : fallback;
  } catch {
    return fallback;
  }
};

const safeParseObject = (value, fallback) => {
  try {
    const result = JSON.parse(value);
    return result && typeof result === 'object' && !Array.isArray(result) ? result : fallback;
  } catch {
    return fallback;
  }
};

const defaultHomepageConfig = {
  layout: 'hero',
  images: [
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=1200&h=900&fit=crop',
  ],
};

export const loadListings = () => {
  if (typeof window === 'undefined') return defaultListings;

  const stored = localStorage.getItem(LISTINGS_KEY);
  if (stored) {
    const parsed = safeParseArray(stored, null);
    if (parsed) return parsed;
  }

  localStorage.setItem(LISTINGS_KEY, JSON.stringify(defaultListings));
  return defaultListings;
};

export const saveListings = (listings) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
};

export const loadServices = () => {
  if (typeof window === 'undefined') return defaultServices;

  const stored = localStorage.getItem(SERVICES_KEY);
  if (stored) {
    const parsed = safeParseArray(stored, null);
    if (parsed) return parsed;
  }

  localStorage.setItem(SERVICES_KEY, JSON.stringify(defaultServices));
  return defaultServices;
};

export const saveServices = (services) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
};

export const loadHomepageConfig = () => {
  if (typeof window === 'undefined') return defaultHomepageConfig;

  const stored = localStorage.getItem(HOMEPAGE_KEY);
  if (stored) {
    const parsed = safeParseObject(stored, null);
    if (parsed) return parsed;
  }

  localStorage.setItem(HOMEPAGE_KEY, JSON.stringify(defaultHomepageConfig));
  return defaultHomepageConfig;
};

export const saveHomepageConfig = (config) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(HOMEPAGE_KEY, JSON.stringify(config));
};

export const loadConsultationRequests = () => {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem(REQUESTS_KEY);
  if (stored) {
    const parsed = safeParseArray(stored, null);
    if (parsed) return parsed;
  }

  localStorage.setItem(REQUESTS_KEY, JSON.stringify([]));
  return [];
};

export const saveConsultationRequests = (requests) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
};

// CMS Page Content Functions
export const loadPageContent = () => {
  if (typeof window === 'undefined') return defaultPageContent;

  const stored = localStorage.getItem(CONTENT_KEY);
  if (stored) {
    const parsed = safeParseObject(stored, null);
    if (parsed) return parsed;
  }

  localStorage.setItem(CONTENT_KEY, JSON.stringify(defaultPageContent));
  return defaultPageContent;
};

export const savePageContent = (content) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
};

export const loadSectionContent = (page, section) => {
  const content = loadPageContent();
  return content[page]?.[section] || null;
};

export const updateSectionContent = (page, section, updates) => {
  const content = loadPageContent();
  if (!content[page]) content[page] = {};
  content[page][section] = { ...content[page][section], ...updates };
  savePageContent(content);
  return content[page][section];
};
