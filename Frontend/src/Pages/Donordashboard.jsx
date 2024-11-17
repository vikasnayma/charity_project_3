import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { motion } from "framer-motion";
import {jwtDecode} from 'jwt-decode'





const Donordashboard = () => {
  const [donor, setDonor] = useState({
    name: '',
    city: '',
    phone: '',
    email: ''
  });
  const [donations, setDonations] = useState([ 
    {
      project_id: '',
      transaction_id: '',
      amount: '',
      payment_type: '',
      date: '',
      time: ''
    }
  ]);
  const [projectSummaries, setProjectSummaries] = useState([]);
  const [projectNames, setProjectNames] = useState({});

  
  const token = localStorage.getItem("token");  // Assume token is stored in localStorage
  const decoded = jwtDecode(token);
  const id = decoded.id; // here id === email id
 console.log("User ID:", decoded.id); 




  useEffect(() => {
    const fetchDonorInfo = async () => {
      try {
        // Fetching donor info 
        const donorResponse = await axios.get(`http://localhost:9000/api/donor/${id}`
        );
        
        const donorData = donorResponse.data;
        console.log(donorData)
        setDonor({
          name: donorData.name,
          city: donorData.city,
          phone: donorData.phone,
          email: donorData.email
        });
  
        const donorEmail = donorData.email;
  
        // Fetch donations based on the donor's email
        const donationsResponse = await axios.get(`http://localhost:9000/api/donordonation/${donorEmail}`);
        const donationsData = donationsResponse.data;
        console.log(donationsData);
    
        // Update state once with all donations
        setDonations(donationsData);
        console.log(donations)
      
  
        // Extract unique projectIds from donationData
    const projectIds = Array.from(new Set(donationsData.map(donation => donation.project_id)));
    console.log(projectIds)

    
     // Step 2: Fetch project names for each project_id
     const fetchProjectNames = async () => {
      const projectNamesResponse = await Promise.all(
        projectIds.map(async (projectId) => {
          try {
            const response = await axios.get(`http://localhost:9000/api/project/${projectId}`);
            return { id: projectId, name: response.data.project_name }; // Ensure this matches the actual key from your API
          } catch (error) {
            console.error("Error fetching project name:", error);
            return { id: projectId, name: "Unknown Project" }; // Fallback in case of error
          }
        })
      );

      // Step 3: Convert the array into an object for easy lookup
      const projectNamesObj = projectNamesResponse.reduce((acc, project) => {
        acc[project.id] = project.name;
        return acc;
      }, {});

      console.log(projectNamesObj);
      
      setProjectNames(projectNamesObj); // Set project names in state

    }

      fetchProjectNames();
        
      } catch (error) {
        console.error("Error fetching donor or donation information:", error);
      }
    };
  
    fetchDonorInfo();
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
        initial={{ opacity: 0, translateX: "-40%" }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 1 }}
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

      

      <Footer />
    </div>
  );
};

export default Donordashboard;