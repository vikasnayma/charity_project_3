import React, { useState } from 'react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [userType, setUserType] = useState(''); // For admin, volunteer, or donor
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!name || !email || !password || !confirmPassword || !userType) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // Add signup logic here
    console.log('Signup submitted', { name, email, password, userType, city, phone });
    // Clear the form
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setUserType('');
    setCity('');
    setPhone('');
    setError('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-[#5f1515] mb-6">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">User Type</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-[#5f1515] focus:ring focus:ring-[#5f1515] focus:ring-opacity-50"
              required
            >
              <option value="">Select User Type</option>
              <option value="admin">Admin</option>
              <option value="volunteer">Volunteer</option>
              <option value="donor">Donor</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-[#5f1515] focus:ring focus:ring-[#5f1515] focus:ring-opacity-50"
              required
            />
          </div>
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-[#5f1515] focus:ring focus:ring-[#5f1515] focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-[#5f1515] focus:ring focus:ring-[#5f1515] focus:ring-opacity-50"
              required
            />
          </div>
          {/* Additional fields based on user type */}
          {userType && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-[#5f1515] focus:ring focus:ring-[#5f1515] focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-[#5f1515] focus:ring focus:ring-[#5f1515] focus:ring-opacity-50"
                  required
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full bg-[#5f1515] text-white py-2 rounded-md hover:bg-[#910b0b] transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-[#5f1515] hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
