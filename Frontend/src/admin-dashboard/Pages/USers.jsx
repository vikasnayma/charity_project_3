import React, { useState, useEffect } from 'react';

const Users = () => {
  const [donors, setDonors] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [searchDonor, setSearchDonor] = useState('');
  const [searchVolunteer, setSearchVolunteer] = useState('');
  const [searchAdmin, setSearchAdmin] = useState('');

  useEffect(() => {
    // Sample data (replace this with API call if needed)
    const sampleDonors = [
      { id: 1, name: 'Sneha Kumath', email: 'sneha@example.com', city: 'New York' },
      { id: 2, name: 'John Doe', email: 'john@example.com', city: 'Chicago' },
      { id: 3, name: 'Alice', email: 'alice@example.com', city: 'Los Angeles' },
      // ...more entries to make up to 10
    ];
    
    const sampleVolunteers = [
      { id: 1, name: 'Kritika', email: 'kritika@example.com', city: 'Delhi' },
      { id: 2, name: 'Rajesh Kumar', email: 'rajesh@example.com', city: 'Mumbai' },
      { id: 3, name: 'Emily Smith', email: 'emily@example.com', city: 'Boston' },
      // ...more entries to make up to 10
    ];

    const sampleAdmins = [
      { id: 1, name: 'Admin1', email: 'admin1@example.com', city: 'Office A' },
      { id: 2, name: 'Admin2', email: 'admin2@example.com', city: 'Office B' },
      { id: 3, name: 'Admin3', email: 'admin3@example.com', city: 'Office C' },
      { id: 4, name: 'Admin4', email: 'admin4@example.com', city: 'Office D' },
    ];

    setDonors(sampleDonors);
    setVolunteers(sampleVolunteers);
    setAdmins(sampleAdmins);
  }, []);

  const filterEntries = (data, searchTerm) => 
    data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleViewUser = (id) => {
    console.log(`View details for user ID: ${id}`);
    // Logic to view user details, e.g., open a modal or navigate to a profile page
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-[#5f1515] mb-6">Users</h2>

      {/* Donor Table */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Donors</h3>
        <input
          type="text"
          placeholder="Search Donors..."
          value={searchDonor}
          onChange={(e) => setSearchDonor(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <Table data={filterEntries(donors, searchDonor)} onView={handleViewUser} />
      </div>

      {/* Volunteer Table */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Volunteers</h3>
        <input
          type="text"
          placeholder="Search Volunteers..."
          value={searchVolunteer}
          onChange={(e) => setSearchVolunteer(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <Table data={filterEntries(volunteers, searchVolunteer)} onView={handleViewUser} />
      </div>

      {/* Admin Table */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Admins</h3>
        <input
          type="text"
          placeholder="Search Admins..."
          value={searchAdmin}
          onChange={(e) => setSearchAdmin(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <Table data={filterEntries(admins, searchAdmin)} onView={handleViewUser} />
      </div>
    </div>
  );
};

// Reusable Table component with View button
const Table = ({ data, onView }) => (
  <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md mb-4">
    <thead>
      <tr className="bg-[#5f1515] text-white">
        <th className="py-2 px-4">ID</th>
        <th className="py-2 px-4">Name</th>
        <th className="py-2 px-4">Email</th>
        <th className="py-2 px-4">City</th>
        <th className="py-2 px-4">Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.length > 0 ? (
        data.map((user) => (
          <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-2 px-4">{user.id}</td>
            <td className="py-2 px-4">{user.name}</td>
            <td className="py-2 px-4">{user.email}</td>
            <td className="py-2 px-4">{user.city}</td>
            <td className="py-2 px-4">
              <button
                onClick={() => onView(user.id)}
                className="bg-[#5f1515] text-white py-1 px-3 rounded hover:bg-[#910b0b] transition"
              >
                View
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5" className="text-center py-4 text-gray-500">No results found</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default Users;


