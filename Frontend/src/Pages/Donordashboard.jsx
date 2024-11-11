
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { motion } from "framer-motion";
import * as jwt_decode from 'jwt-decode';



const Donordashboard = () => {
  const [donor, setDonor] = useState({});
  const [donations, setDonations] = useState([]);
  const [projectSummaries, setProjectSummaries] = useState([]);
  const [projectNames, setProjectNames] = useState({});

  

  const token = localStorage.getItem("token");  // Assume token is stored in localStorage
  const decodedToken = token ? jwt_decode(token) : null;
  const donorId = decodedToken ? decodedToken.id : null;

  useEffect(() => {
    const fetchDonorInfo = async () => {
      const donorResponse = await axios.get(`http://localhost:9000/donor/${donorId}`);
      setDonor(donorResponse.data);
    };

    const fetchDonations = async () => {
      const donationsResponse = await axios.get(`http://localhost:9000/donordonation/${donorId}`);
      const donationsData = donationsResponse.data;
      setDonations(donationsData);

      // Calculate project-wise summary with project name, count, and total amount
      const projectSummary = {};
      const projectIds = [];

      donationsData.forEach(donation => {
        const projectId = donation.project_id;
        projectIds.push(projectId);
        if (!projectSummary[projectId]) {
          projectSummary[projectId] = {
            projectName: "", // Project name will be populated later
            count: 0,
            totalAmount: 0,
          };
        }
        projectSummary[projectId].count += 1;
        projectSummary[projectId].totalAmount += donation.amount;
      });

      // Fetch project names for all projectIds
      const projectNamesResponse = await Promise.all(
        projectIds.map(async (projectId) => {
          const response = await axios.get(`http://localhost:9000/project/${projectId}`);
          return { id: projectId, name: response.data.name };
        })
      );

      const projectNamesMap = projectNamesResponse.reduce((acc, { id, name }) => {
        acc[id] = name;
        return acc;
      }, {});

      // Set project summaries with names
      Object.keys(projectSummary).forEach((projectId) => {
        projectSummary[projectId].projectName = projectNamesMap[projectId];
      });

      setProjectSummaries(Object.values(projectSummary));
    };

    fetchDonorInfo();
    fetchDonations();
  }, []);

  return (
    <div className="m-0 p-0 flex flex-col gap-[20px] bg-slate-50 text-slate-900">
      <Navbar />
      <h1 className="text-center font-serif text-lg font-bold bg-[#902121] text-white mt-[-20px]">Donor Dashboard</h1>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Donor Information</h2>
        <p className="font-medium text-gray-700 mb-2">
          Name: <span className="text-gray-900 font-normal">{donor.name}</span>
        </p>
        <p className="font-medium text-gray-700 mb-2">
          City: <span className="text-gray-900 font-normal">{donor.city}</span>
        </p>
        <p className="font-medium text-gray-700 mb-2">
          Phone No: <span className="text-gray-900 font-normal">{donor.phone}</span>
        </p>
        <p className="font-medium text-gray-700">
          Email: <span className="text-gray-900 font-normal">{donor.email}</span>
        </p>
      </div>

      <h2 className="text-center font-serif text-lg font-bold bg-[#902121] text-white p-2">Donation History</h2>
      <motion.div
        initial={{ opacity: 0, translateX: "-100%" }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {donations.length > 0 ? (
          donations.map((donation, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 relative hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold text-blue-950 mb-2">{projectNames[donation.project_id] || "Loading..."}</h3>
              <p className="text-gray-500">Transaction ID: {donation.transaction_id}</p>
              <p className="text-gray-500">Amount: {donation.amount}</p>
              <p className="text-gray-500">Payment Type: {donation.payment_type}</p>
              <p className="text-gray-500">Date: {donation.date}</p>
              <p className="text-gray-500">Time: {donation.time}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No donations found.</p>
        )}
      </motion.div>

      <h2 className="text-center font-serif text-lg font-bold bg-[#902121] text-white p-2">Project-Wise Donation Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectSummaries.map((project, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-blue-950 mb-2">{project.projectName}</h3>
            <p className="text-gray-500">Donations Count: {project.count}</p>
            <p className="text-gray-500">Total Amount Donated: ₹{project.totalAmount}</p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Donordashboard;
