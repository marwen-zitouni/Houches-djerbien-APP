import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BottomNavigation from './components/BottomNavigation';
import Home from './pages/Home';
import Rentals from './pages/Rentals';
import RentalDetail from './pages/RentalDetail';
import Reservations from './pages/Reservations';
import Cleaning from './pages/Cleaning';
import Construction from './pages/Construction';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AdminLayout from './layouts/AdminLayout';
import DashboardOverview from './admin/DashboardOverview';
import AdminRentals from './admin/AdminRentals';
import AdminBookings from './admin/AdminBookings';
import AdminCleaning from './admin/AdminCleaning';
import AdminConstruction from './admin/AdminConstruction';
import AdminUsers from './admin/AdminUsers';
import AdminSettings from './admin/AdminSettings';
import { useAuth } from './contexts/AuthContext';

export default function App() {
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  // Don't show footer on home page (it's included in Home component)
  const showFooter = location.pathname !== '/';

  return (
    <div className="min-h-screen bg-sand-50 text-navy-900">
      <Navbar />
      <main className="pt-16 pb-20 md:pb-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/rentals/:id" element={<RentalDetail />} />
          <Route path="/construction" element={<Construction />} />
          <Route path="/cleaning" element={<Cleaning />} />
          <Route path="/reservations" element={<Reservations />} />

          <Route path="/admin" element={isAdmin ? <AdminLayout /> : <Navigate to="/login" replace />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardOverview />} />
            <Route path="rentals" element={<AdminRentals />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="cleaning" element={<AdminCleaning />} />
            <Route path="construction" element={<AdminConstruction />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>

          <Route path="*" element={<div className="p-10 text-center">Page not found. <a href="/" className="text-bordeaux-500 hover:text-bordeaux-600">Go home</a></div>} />
        </Routes>
      </main>
      {showFooter && <Footer />}
      <BottomNavigation />
    </div>
  );
}

