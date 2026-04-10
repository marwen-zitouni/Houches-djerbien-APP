import { NavLink } from 'react-router-dom';

export default function AdminSidebar({ onClose }) {
  const links = [
    { to: '/admin/dashboard', label: 'Overview' },
    { to: '/admin/rentals', label: 'Rentals' },
    { to: '/admin/bookings', label: 'Bookings' },
    { to: '/admin/cleaning', label: 'Cleaning' },
    { to: '/admin/construction', label: 'Construction' },
    { to: '/admin/users', label: 'Users' },
    { to: '/admin/settings', label: 'Settings' },
  ];

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <aside className="w-60 bg-white h-screen shadow-soft p-4 sticky top-0 overflow-y-auto md:h-full">
      <h2 className="text-lg font-bold text-bordeaux mb-6 mt-12 md:mt-0">Admin Panel</h2>
      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={handleNavClick}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 font-medium transition-colors ${
                isActive
                  ? 'bg-bordeaux text-white shadow-md'
                  : 'text-navy hover:bg-sand'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
