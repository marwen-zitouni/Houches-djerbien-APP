import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Home,
  Building,
  CalendarDays,
  Wrench,
  Sparkles,
  MessageCircle,
  Layers,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export default function AdminSidebar({ onClose, collapsed, onToggleCollapse }) {
  const [isHovered, setIsHovered] = useState(false);

  const links = [
    { to: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/admin/content', label: 'Content Manager', icon: FileText },
    { to: '/admin/homepage', label: 'Homepage', icon: Home },
    { to: '/admin/rentals', label: 'Rentals', icon: Building },
    { to: '/admin/bookings', label: 'Bookings', icon: CalendarDays },
    { to: '/admin/cleaning', label: 'Cleaning', icon: Sparkles },
    { to: '/admin/construction', label: 'Construction', icon: Wrench },
    { to: '/admin/requests', label: 'Consultation Requests', icon: MessageCircle },
    { to: '/admin/services', label: 'Services', icon: Layers },
    { to: '/admin/users', label: 'Users', icon: Users },
    { to: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <aside
      className={`h-screen bg-white/95 border-r border-sand-200 shadow-soft p-4 transition-all duration-300 backdrop-blur-xl ${
        collapsed ? 'w-20' : 'w-72'
      } ${isHovered ? 'shadow-xl' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex items-center justify-between ${collapsed ? 'flex-col gap-3' : ''}`}>
        <NavLink
          to="/admin/dashboard"
          className={`flex items-center gap-3 text-sm font-semibold ${collapsed ? 'justify-center' : ''}`}
          onClick={handleNavClick}
        >
          <div className="grid h-12 w-12 place-items-center rounded-3xl bg-primary-600 text-white shadow-lg">
            <Home className="w-5 h-5" />
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-semibold text-primary-700 uppercase tracking-[0.2em]">GRBA Admin</p>
              <p className="text-xs text-slate-500">Control center</p>
            </div>
          )}
        </NavLink>

        <button
          type="button"
          onClick={onToggleCollapse}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition hover:bg-slate-50"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <nav className={`mt-8 space-y-2 ${collapsed ? 'text-center' : ''}`}>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={handleNavClick}
              title={link.label}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-lg ring-1 ring-primary-200'
                    : 'text-slate-700 hover:bg-primary-50 hover:text-primary-700'
                } ${collapsed ? 'justify-center px-3' : ''}`
              }
            >
              <Icon className="w-5 h-5" />
              {!collapsed && <span>{link.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="mt-auto rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 shadow-sm">
          <p className="font-semibold text-slate-900">Navigation</p>
          <p className="mt-2">Tap the arrow to collapse the sidebar.</p>
        </div>
      )}
    </aside>
  );
}
