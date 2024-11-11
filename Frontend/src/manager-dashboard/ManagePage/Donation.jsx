import React, { useState, useEffect } from 'react';

const Donations = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    // Fetch donations from an API or static data
    const fetchDonations = async () => {
      // Sample donation data (replace this with an API call)
      const sampleDonations = [
        { id: 1, donor: 'John Doe', amount: 100, project: 'Project A', date: '2024-10-15' },
        { id: 2, donor: 'Jane Smith', amount: 200, project: 'Project B', date: '2024-10-16' },
        { id: 3, donor: 'Alice Johnson', amount: 150, project: 'Project A', date: '2024-10-17' },
      ];
      setDonations(sampleDonations);
    };

    fetchDonations();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-[#5f1515] mb-6">Donations</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-[#5f1515] text-white">
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Donor</th>
            <th className="py-2 px-4">Amount</th>
            <th className="py-2 px-4">Project</th>
            <th className="py-2 px-4">Date</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-2 px-4">{donation.id}</td>
              <td className="py-2 px-4">{donation.donor}</td>
              <td className="py-2 px-4">Rs.{donation.amount}</td>
              <td className="py-2 px-4">{donation.project}</td>
              <td className="py-2 px-4">{donation.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Donations;
