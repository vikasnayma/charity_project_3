import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Home = () => {
  // Data for Pie Chart (Example: Donation Sources)
  const pieData = {
    labels: ['Food', 'Education', 'Animal', 'Clothes', 'Cleanliness', 'Health'],
    datasets: [
      {
        label: 'Donation',
        data: [30, 10, 20, 5, 20, 15],
        backgroundColor: ['#910b0b', '#5f1515', '#ff8c42', '#ff6363', '#ffd54f', '#4caf50'],
        hoverOffset: 6,
      },
    ],
  };

  // Updated Data for Bar Chart (Example: Category Donations)
  const barData = {
    labels: ['Food', 'Education', 'Animal', 'Clothes', 'Cleanliness', 'Health'],
    datasets: [
      {
        label: 'Amount Raised (Rs.)',
        data: [3000, 1500, 4000, 800, 2000, 2500],
        backgroundColor: '#5f1515',
      },
    ],
  };

  // Mock Data for Top Donors & Volunteers
  const topDonors = [
    { name: 'John Doe', amount: 'Rs. 5,000' },
    { name: 'Jane Smith', amount: 'Rs. 4,500' },
    { name: 'Emily Johnson', amount: 'Rs. 3,800' },
  ];
  
  const topVolunteers = [
    { name: 'Michael Brown', hours: '150 hours' },
    { name: 'Sarah Lee', hours: '120 hours' },
    { name: 'Alex Kim', hours: '100 hours' },
  ];

  // Mock Data for Recent Activities
  const recentActivities = [
    { date: '2024-10-30', activity: 'Donation Received', amount: 'Rs. 2,000' },
    { date: '2024-10-29', activity: 'Volunteer Signup', name: 'Chris Martin' },
    { date: '2024-10-28', activity: 'Project Started', projectName: 'Clean Water Initiative' },
  ];

  return (
    <div className="p-6 bg-neutral-100 min-h-screen">
      <h1 className="text-3xl font-bold text-[#5f1515] mb-8">Admin Dashboard</h1>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Fund Raised</h3>
          <p className="text-2xl font-bold text-[#5f1515]">Rs. 20,000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Donation Revenue</h3>
          <p className="text-2xl font-bold text-[#5f1515]">Rs. 35,000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Volunteers</h3>
          <p className="text-2xl font-bold text-[#5f1515]">120</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Donation Sources</h2>
          <Pie data={pieData} />
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Amount Raised per Category</h2>
          <Bar data={barData} />
        </div>
      </div>

      {/* Top Donors & Volunteers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Top Donors */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Top Donors</h2>
          <ul>
            {topDonors.map((donor, index) => (
              <li key={index} className="flex justify-between border-b py-2">
                <span>{donor.name}</span>
                <span className="font-semibold text-[#5f1515]">{donor.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Top Volunteers */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Top Volunteers</h2>
          <ul>
            {topVolunteers.map((volunteer, index) => (
              <li key={index} className="flex justify-between border-b py-2">
                <span>{volunteer.name}</span>
                <span className="font-semibold text-[#5f1515]">{volunteer.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activities</h2>
        <ul>
          {recentActivities.map((activity, index) => (
            <li key={index} className="border-b py-2">
              <span className="font-semibold text-gray-700">{activity.date}:</span> {activity.activity}{' '}
              {activity.amount && <span className="font-semibold text-[#5f1515]">- {activity.amount}</span>}
              {activity.name && <span className="text-gray-600"> - {activity.name}</span>}
              {activity.projectName && <span className="text-gray-600"> - {activity.projectName}</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
