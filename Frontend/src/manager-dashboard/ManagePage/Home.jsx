import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Home = () => {
  const [totalDonations, setTotalDonations] = useState(0);
  const [donationRevenue, setDonationRevenue] = useState(0);
  const [topDonors, setTopDonors] = useState([]);
  const [topVolunteers, setTopVolunteers] = useState([]);
  const [donationSources, setDonationSources] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalDonationsResponse = await axios.get('http://localhost:9000/api/manager/total-donations');
        setTotalDonations(totalDonationsResponse.data.total);

        const donationRevenueResponse = await axios.get('http://localhost:9000/api/manager/donation-revenue');
        setDonationRevenue(donationRevenueResponse.data.revenue);

        const topDonorsResponse = await axios.get('http://localhost:9000/api/manager/top-donors');
        setTopDonors(topDonorsResponse.data);

        const topVolunteersResponse = await axios.get('http://localhost:9000/api/manager/top-volunteers');
        setTopVolunteers(topVolunteersResponse.data);

        const donationSourcesResponse = await axios.get('http://localhost:9000/api/manager/donation-sources');
        setDonationSources(donationSourcesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Data for Pie Chart (Donation Sources)
  const pieData = {
    labels: donationSources.map(source => source.name),
    datasets: [
      {
        label: 'Donation',
        data: donationSources.map(source => source.total_donated),
        backgroundColor: ['#910b0b', '#5f1515', '#ff8c42', '#ff6363', '#ffd54f', '#4caf50'],
        hoverOffset: 6,
      },
    ],
  };

  // Data for Bar Chart (Amount Raised)
  const barData = {
    labels: donationSources.map(source => source.name),
    datasets: [
      {
        label: 'Amount Raised (Rs.)',
        data: donationSources.map(source => source.total_donated),
        backgroundColor: '#5f1515',
      },
    ],
  };

  return (
    <div className="p-6 bg-neutral-100 min-h-screen">
      <h1 className="text-3xl font-bold text-[#5f1515] mb-8">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Fund Raised</h3>
          <p className="text-2xl font-bold text-[#5f1515]">Rs. {totalDonations}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Donation Revenue</h3>
          <p className="text-2xl font-bold text-[#5f1515]">Rs. {donationRevenue}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Volunteers</h3>
          <p className="text-2xl font-bold text-[#5f1515]">{topVolunteers.length}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Donation Sources</h3>
          <Pie data={pieData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Amount Raised per Source</h3>
          <Bar data={barData} />
        </div>
      </div>

      {/* Top Donors and Volunteers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Top Donors</h3>
          <ul>
            {topDonors.map(donor => (
              <li key={donor.email} className="mb-2">{donor.name}: Rs. {donor.total_donated}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Top Volunteers</h3>
          <ul>
          {topVolunteers.map((volunteer) => (
            <li key={volunteer.email} className="mb-2">
              {volunteer.name}: {volunteer.total_days_worked} days worked
            </li>
          ))}
        </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;