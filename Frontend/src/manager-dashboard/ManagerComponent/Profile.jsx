import React from 'react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-[#5f1515] to-[#910b0b] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-lg"></div>
        <div className="relative px-4 py-6 bg-white shadow-lg sm:rounded-lg sm:p-10">
          <div className="flex items-center justify-center mb-6">
            <img
              className="w-24 h-24 rounded-full border-4 border-[#910b0b] shadow-lg"
              src="https://via.placeholder.com/150"
              alt="Admin Profile"
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-800">Admin Name</h1>
            <p className="text-gray-600">admin@charity.org</p>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-[#910b0b] mb-4">Admin Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-gray-600">
                <p className="font-semibold">ID:</p>
                <p>Admin123</p>
              </div>
              <div className="text-gray-600">
                <p className="font-semibold">Role:</p>
                <p>Charity Manager</p>
              </div>
              <div className="text-gray-600">
                <p className="font-semibold">Joined:</p>
                <p>January 1, 2023</p>
              </div>
              <div className="text-gray-600">
                <p className="font-semibold">Projects Managed:</p>
                <p>15 Projects</p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-[#910b0b] mb-4">Recent Activity</h2>
            <ul className="text-gray-600 list-disc pl-4">
              <li>Added a new project: Education for All</li>
              <li>Reviewed and approved 10 donations</li>
              <li>Assigned volunteers to projects</li>
              <li>Updated project statuses</li>
            </ul>
          </div>
          <div className="mt-8 flex justify-end">
            <button className="bg-[#5f1515] text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#910b0b] transition duration-200">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;