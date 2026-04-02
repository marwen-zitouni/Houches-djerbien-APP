import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [method, setMethod] = useState('email');
  const [form, setForm] = useState({ email: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleEmailLogin = (e) => {
    e.preventDefault();
    if (login(form.email, form.password)) {
      navigate('/');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleFacebookLogin = () => {
    // Mock Facebook login
    const fbUser = { id: 'fb123', name: 'Facebook User', email: 'fb@example.com', role: 'guest' };
    localStorage.setItem('user', JSON.stringify(fbUser));
    window.location.reload();
  };

  const handlePhoneLogin = (e) => {
    e.preventDefault();
    // Mock phone login
    alert('OTP sent to ' + form.phone + '. Assuming verified.');
    const phoneUser = { id: 'phone123', name: 'Phone User', phone: form.phone, role: 'guest' };
    localStorage.setItem('user', JSON.stringify(phoneUser));
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sand">
      <div className="bg-white p-8 rounded-2xl shadow-soft w-full max-w-md">
        <h2 className="text-2xl font-bold text-navy mb-6 text-center">Login to Djerba.Houches</h2>
        <div className="flex mb-4">
          <button onClick={() => setMethod('email')} className={`flex-1 p-2 ${method === 'email' ? 'bg-bordeaux text-white' : 'bg-gray-200'}`}>Email</button>
          <button onClick={() => setMethod('facebook')} className={`flex-1 p-2 ${method === 'facebook' ? 'bg-bordeaux text-white' : 'bg-gray-200'}`}>Facebook</button>
          <button onClick={() => setMethod('phone')} className={`flex-1 p-2 ${method === 'phone' ? 'bg-bordeaux text-white' : 'bg-gray-200'}`}>Phone</button>
        </div>

        {method === 'email' && (
          <form onSubmit={handleEmailLogin}>
            {error && <p className="text-primary-500 mb-4">{error}</p>}
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              className="w-full mb-4 p-3 border rounded-lg"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
              className="w-full mb-6 p-3 border rounded-lg"
              required
            />
            <button type="submit" className="w-full bg-bordeaux text-white p-3 rounded-lg font-semibold">Login</button>
          </form>
        )}

        {method === 'facebook' && (
          <div>
            <button onClick={handleFacebookLogin} className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold mb-4">Continue with Facebook</button>
            <p className="text-sm text-gray-600">Mock: Logs in as Facebook User</p>
          </div>
        )}

        {method === 'phone' && (
          <form onSubmit={handlePhoneLogin}>
            <input
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({...form, phone: e.target.value})}
              className="w-full mb-6 p-3 border rounded-lg"
              required
            />
            <button type="submit" className="w-full bg-bordeaux text-white p-3 rounded-lg font-semibold">Send OTP</button>
          </form>
        )}

        <p className="mt-4 text-sm text-center">Demo: admin@djerba.com / admin123 or mayssa@mail.com / pass123</p>
        <p className="mt-2 text-sm text-center">Don't have an account? <a href="/signup" className="text-bordeaux">Sign Up</a></p>
      </div>
    </div>
  );
}