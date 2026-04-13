import React, { useState, useEffect } from 'react';
import { signIn, signUp, useSession } from '../auth-client';
import { useNavigate, Navigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { data: session, isPending } = useSession();

  // If already logged in, redirect to dashboard
  if (!isPending && session) {
    return <Navigate to="/admin/dashboard" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn.email({ 
        email, 
        password,
        // callbackURL: '/admin/dashboard' // removed for manual navigation
      });
      
      if (res.error) {
        throw new Error(res.error.message || "Failed to sign in");
      }
      
      // If we are here, it means success.
      // Force navigation immediately.
      navigate('/admin/dashboard');
    } catch (err) {
      alert("Authentication error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-redAccent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-32 mb-20 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-gray-900 mb-2">
          Admin Portal
        </h2>
        <p className="text-gray-500 font-medium">
          Secure login for administrators
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Admin Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-redAccent focus:border-transparent outline-none transition" 
            required 
            placeholder="admin@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-redAccent focus:border-transparent outline-none transition" 
            required 
            placeholder="••••••••"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-redAccent text-white font-bold text-lg p-3 rounded-xl hover:bg-rose-700 transition-colors shadow-lg disabled:opacity-70 mt-2"
        >
          {loading ? 'Authenticating...' : 'Secure Login'}
        </button>
      </form>
    </div>
  );
}
