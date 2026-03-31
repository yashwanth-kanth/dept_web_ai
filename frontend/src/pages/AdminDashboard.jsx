import React, { useState } from 'react';
import { useSession } from '../auth-client';
import { Navigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { data: session, isPending } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (isPending) {
    return <div className="mt-32 text-center font-bold text-gray-500">Loading Dashboard...</div>;
  }

  if (!session) {
    return <Navigate to="/admin" />;
  }

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    try {
      // Manual fetch to bypass built-in cookie overrides if using standard signUp 
      const res = await fetch(`${import.meta.env.VITE_CONVEX_SITE_URL}/api/auth/sign-up/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name })
      });

      const data = await res.json();
      
      if (!res.ok || data.error) {
        throw new Error(data.message || data.error?.message || "Failed to create user");
      }

      setSuccessMsg(`Successfully created credentials for ${name}`);
      setEmail('');
      setPassword('');
      setName('');
    } catch (err) {
      alert("Error creating user: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 mb-20 p-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-500 font-medium">Welcome back, {session.user.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Create User Credentials</h2>
          {successMsg && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl font-medium">
              {successMsg}
            </div>
          )}
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-redAccent outline-none" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-redAccent outline-none" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Initial Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-redAccent outline-none" 
                required 
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gray-900 text-white font-bold p-3 rounded-xl hover:bg-black transition-colors disabled:opacity-70 mt-4"
            >
              {loading ? 'Creating...' : 'Create Credentials'}
            </button>
          </form>
        </div>

        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-2">User Management System</h3>
          <p className="text-gray-500 text-sm">
            Use this portal to securely create access credentials for faculty, staff, and students.
            Generated credentials are saved directly into the secure database.
          </p>
        </div>
      </div>
    </div>
  );
}
