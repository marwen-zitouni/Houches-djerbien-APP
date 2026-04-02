import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Button } from './ui';
import { Home, Building, Wrench, Sparkles, User, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { t } = useTranslation();
  const auth = useAuth() || {};
  const user = auth.user ?? null;
  const logout = auth.logout ?? (() => {});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { to: '/rentals', label: t('rentals'), icon: Building },
    { to: '/construction', label: t('construction'), icon: Wrench },
    { to: '/cleaning', label: t('cleaning'), icon: Sparkles },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-lg shadow-soft sticky top-0 z-50 border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl flex items-center justify-center shadow-xl transition-all duration-300 group-hover:shadow-2xl">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors duration-200">GRBA</h1>
              <p className="text-xs text-slate-500 -mt-1">Luxury heritage experiences</p>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-100 text-primary-700 ring-1 ring-primary-200 shadow-sm'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-primary-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            <LanguageSwitcher />

            {/* User Menu */}
            {user ? (
              <div className="hidden sm:flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-2 bg-sand-50 rounded-xl">
                  <User className="w-4 h-4 text-navy-600" />
                  <span className="text-sm font-medium text-navy-900">{user.name}</span>
                </div>
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t('logout')}</span>
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-3">
                <NavLink to="/login">
                  <Button variant="ghost" size="sm">
                    {t('login')}
                  </Button>
                </NavLink>
                <NavLink to="/signup">
                  <Button size="sm">
                    {t('signup')}
                  </Button>
                </NavLink>
              </div>
            )}

            {/* Admin Link */}
            <NavLink
              to="/admin/dashboard"
              className="hidden lg:flex items-center space-x-2 px-3 py-2 text-sm font-medium text-navy-700 hover:text-bordeaux-500 hover:bg-sand-50 rounded-xl transition-colors duration-200"
            >
              <span>{t('admin')}</span>
            </NavLink>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-navy-700 hover:bg-sand-50 transition-colors duration-200"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-sand-200 bg-white/95 backdrop-blur-lg">
            <div className="px-4 py-4 space-y-3">
              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) => `
                        flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                        ${isActive
                          ? 'bg-bordeaux-50 text-bordeaux-600 shadow-sm'
                          : 'text-navy-700 hover:bg-sand-50 hover:text-bordeaux-500'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>

              {/* Mobile User Actions */}
              <div className="border-t border-sand-200 pt-3">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 px-4 py-2 bg-sand-50 rounded-xl">
                      <User className="w-5 h-5 text-navy-600" />
                      <span className="text-sm font-medium text-navy-900">{user.name}</span>
                    </div>
                    <Button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full flex items-center justify-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t('logout')}</span>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <NavLink to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        {t('login')}
                      </Button>
                    </NavLink>
                    <NavLink to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full">
                        {t('signup')}
                      </Button>
                    </NavLink>
                  </div>
                )}

                {/* Mobile Admin Link */}
                <NavLink
                  to="/admin/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block mt-3 px-4 py-2 text-sm font-medium text-navy-700 hover:text-bordeaux-500 hover:bg-sand-50 rounded-xl transition-colors duration-200"
                >
                  {t('admin')}
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
