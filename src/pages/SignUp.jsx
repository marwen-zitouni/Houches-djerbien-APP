import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [method, setMethod] = useState('email');
  const [form, setForm] = useState({ email: '', password: '', name: '', phone: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleEmailSignUp = (e) => {
    e.preventDefault();
    // Mock sign up: just login with the new user
    const newUser = { id: Date.now().toString(), name: form.name, email: form.email, password: form.password, role: 'guest' };
    // In real app, save to backend
    login(form.email, form.password); // But since not saved, won't work on refresh
    navigate('/');
  };

  const handleFacebookSignUp = () => {
    // Mock Facebook login
    const fbUser = { id: 'fb123', name: 'Facebook User', email: 'fb@example.com', role: 'guest' };
    // Simulate login
    localStorage.setItem('user', JSON.stringify(fbUser));
    window.location.reload(); // Hack to reload and set user
  };

  const handlePhoneSignUp = (e) => {
    e.preventDefault();
    // Mock phone verification
    alert('OTP sent to ' + form.phone + '. Assuming verified.');
    const phoneUser = { id: Date.now().toString(), name: form.name, phone: form.phone, role: 'guest' };
    localStorage.setItem('user', JSON.stringify(phoneUser));
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sand">
      <div className="bg-white p-8 rounded-2xl shadow-soft w-full max-w-md">
        <h2 className="text-2xl font-bold text-navy mb-6 text-center">Sign Up for Djerba.Houches</h2>
        <div className="flex mb-4">
          <button onClick={() => setMethod('email')} className={`flex-1 p-2 ${method === 'email' ? 'bg-bordeaux text-white' : 'bg-gray-200'}`}>Email</button>
          <button onClick={() => setMethod('facebook')} className={`flex-1 p-2 ${method === 'facebook' ? 'bg-bordeaux text-white' : 'bg-gray-200'}`}>Facebook</button>
          <button onClick={() => setMethod('phone')} className={`flex-1 p-2 ${method === 'phone' ? 'bg-bordeaux text-white' : 'bg-gray-200'}`}>Phone</button>
        </div>

        {method === 'email' && (
          <form onSubmit={handleEmailSignUp}>
            <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full mb-4 p-3 border rounded-lg" required />
            <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full mb-4 p-3 border rounded-lg" required />
            <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} className="w-full mb-6 p-3 border rounded-lg" required />
            <button type="submit" className="w-full bg-bordeaux text-white p-3 rounded-lg font-semibold">Sign Up</button>
          </form>
        )}

        {method === 'facebook' && (
          <div>
            <button onClick={handleFacebookSignUp} className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold mb-4">Continue with Facebook</button>
            <p className="text-sm text-gray-600">Mock: Logs in as Facebook User</p>
          </div>
        )}

        {method === 'phone' && (
          <form onSubmit={handlePhoneSignUp}>
            <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full mb-4 p-3 border rounded-lg" required />
            <input type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="w-full mb-6 p-3 border rounded-lg" required />
            <button type="submit" className="w-full bg-bordeaux text-white p-3 rounded-lg font-semibold">Send OTP</button>
          </form>
        )}

        <p className="mt-4 text-sm text-center">Already have an account? <a href="/login" className="text-bordeaux">Login</a></p>
      </div>
    </div>
  );
}