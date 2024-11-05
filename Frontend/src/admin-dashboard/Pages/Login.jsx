import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    // Add login logic here
    console.log('Login submitted', { email, password });
    // Clear the form
    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-[#5f1515] mb-6">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-[#5f1515] focus:ring focus:ring-[#5f1515] focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-[#5f1515] focus:ring focus:ring-[#5f1515] focus:ring-opacity-50"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#5f1515] text-white py-2 rounded-md hover:bg-[#910b0b] transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Don’t have an account?{' '}
          <a href="/signup" className="text-[#5f1515] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
