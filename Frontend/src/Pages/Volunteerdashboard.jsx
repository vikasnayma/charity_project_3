

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

function Volunteerdashboard() {
  const [volunteer, setVolunteer] = useState({});
  const [projects, setProjects] = useState([]);
  const [currentProjects, setCurrentProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);

  const volunteerId = "your_volunteer_id"; // Replace this with actual volunteer ID

  useEffect(() => {
    const fetchVolunteerData = async () => {
      try {
        // Fetch volunteer details
        const volunteerRes = await axios.get(`http://localhost:9000/volunteer/${volunteerId}`);
        setVolunteer(volunteerRes.data);

        // Fetch volunteer projects
        const projectRes = await axios.get(`http://localhost:9000/projectbyvolunteer/${volunteerId}`);
        setProjects(projectRes.data);

        // Filter current and completed projects
        const ongoing = projectRes.data.filter(project => !project.Date_of_completion);
        const completed = projectRes.data.filter(project => project.Date_of_completion);

        setCurrentProjects(ongoing);
        setCompletedProjects(completed);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchVolunteerData();
  }, [volunteerId]);

  // Group projects by Project_ID to get unique project names
  const groupedProjects = projects.reduce((acc, project) => {
    const existingProject = acc.find(p => p.Project_ID === project.Project_ID);
    if (existingProject) {
      existingProject.count += 1;
      existingProject.dates.push({
        Date_of_assign: project.Date_of_assign,
        Date_of_completion: project.Date_of_completion,
      });
    } else {
      acc.push({
        ...project,
        count: 1,
        dates: [{
          Date_of_assign: project.Date_of_assign,
          Date_of_completion: project.Date_of_completion,
        }],
      });
    }
    return acc;
  }, []);

  return (
    <div className="m-0 p-0 flex flex-col gap-[20px] bg-slate-50 text-slate-900">
      <Navbar />
      <h1 className="text-center font-serif text-lg font-bold bg-[#902121] text-white mt-[-20px]">Volunteer Dashboard</h1>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Volunteer Information</h2>
        <p className="font-medium text-gray-700 mb-2">
          Name: <span className="text-gray-900 font-normal">{volunteer.name}</span>
        </p>
        <p className="font-medium text-gray-700 mb-2">
          City: <span className="text-gray-900 font-normal">{volunteer.city}</span>
        </p>
        <p className="font-medium text-gray-700 mb-2">
          Phone No: <span className="text-gray-900 font-normal">{volunteer.phone}</span>
        </p>
        <p className="font-medium text-gray-700">
          Email: <span className="text-gray-900 font-normal">{volunteer.email}</span>
        </p>
      </div>

      <h2 className="text-center font-serif text-lg font-bold bg-[#902121] text-white p-2">Active Projects</h2>
      <motion.div
        initial={{ opacity: 0, translateX: "-100%" }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {currentProjects.length > 0 ? (
          currentProjects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 relative hover:shadow-xl transition duration-300">
              <h3>{project.Project_name}</h3>
              <p className="text-gray-500">Date of Assignment: {project.Date_of_assign}</p>
              <p className="text-gray-500">Status: Active</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No active projects found.</p>
        )}
      </motion.div>

      <h2 className="text-center font-serif text-lg font-bold bg-[#902121] text-white p-2">Completed Projects</h2>
      <motion.div
        initial={{ opacity: 0, translateX: "-100%" }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {completedProjects.length > 0 ? (
          completedProjects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 relative hover:shadow-xl transition duration-300">
              <h3>{project.Project_name}</h3>
              <p className="text-gray-500">Date of Assignment: {project.Date_of_assign}</p>
              <p className="text-gray-500">Date of Completion: {project.Date_of_completion}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No completed projects found.</p>
        )}
      </motion.div>

      <h2 className="text-center font-serif text-lg font-bold bg-[#902121] text-white p-2">Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {groupedProjects.length > 0 ? (
          groupedProjects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold text-blue-950 mb-2">{project.Project_name}</h3>
              <p className="text-gray-500"> Count: {project.count}</p>
              <p className="text-gray-500">Dates Assigned and Completed: {project.dates.map((date, idx) => (
                <span key={idx}>
                  {date.Date_of_assign} - {date.Date_of_completion}
                  {idx < project.dates.length - 1 && ", "}
                </span>
              ))}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No donation summary found.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Volunteerdashboard;





