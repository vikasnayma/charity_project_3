import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';

// Sample data for initial projects
const initialSubProjectsData = {
  "1-Time Meal": {
    title: "1-Time Meal",
    price: "Rs 20",
    description: "Provide a one-time nutritious meal to a person in need.",
    image: "https://d1vdjc70h9nzd9.cloudfront.net/media/campaign/115000/115153/image/5d35baafa2676.jpeg",
    raised: 1500,
    used: 800,
    donors: 25,
  },
  "Shelter Supplies": {
    title: "Shelter Supplies",
    price: "Rs 500",
    description: "Provide essential shelter supplies for families.",
    image: "https://example.com/shelter.jpg",
    raised: 10000,
    used: 2500,
    donors: 40,
  },
};

const Projects = () => {
  const [subProjects, setSubProjects] = useState(initialSubProjectsData);
  const [newProject, setNewProject] = useState({ title: '', price: '', description: '', image: '', raised: '0', used: '0', donors: 0 });

  // Handle adding a new project
  const handleAddProject = () => {
    if (!newProject.title || !newProject.price || !newProject.description || !newProject.image || !newProject.raised || !newProject.used) return;
    setSubProjects((prevProjects) => ({
      ...prevProjects,
      [newProject.title]: {
        ...newProject,
        raised: parseInt(newProject.raised, 10),
        used: parseInt(newProject.used, 10),
        donors: parseInt(newProject.donors, 10),
      },
    }));
    setNewProject({ title: '', price: '', description: '', image: '', raised: '0', used: '0', donors: 0 }); // Reset form fields
  };

  // Handle removing a project
  const handleRemoveProject = (projectName) => {
    const updatedProjects = { ...subProjects };
    delete updatedProjects[projectName];
    setSubProjects(updatedProjects);
  };

  // Prepare data for the pie chart of donors
  const donorData = {
    labels: Object.keys(subProjects),
    datasets: [
      {
        data: Object.values(subProjects).map((project) => project.donors),
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
        hoverBackgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)'],
      },
    ],
  };

  return (
    <div className="flex p-6 bg-gray-100 min-h-screen gap-8">
      {/* Left section for projects */}
      <div className="w-2/3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Object.entries(subProjects).map(([projectName, data]) => {
            const remainingAmount = data.raised - data.used;
            return (
              <div key={projectName} className="bg-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
                <img src={data.image} alt={data.title} className="h-40 w-full object-cover rounded-md mb-4" />
                <h2 className="text-lg font-bold text-gray-800 mb-2">{data.title}</h2>
                <div className="text-gray-700 text-sm">
                  <p>Total: <span className="font-semibold">Rs {data.raised.toLocaleString()}</span></p>
                  <p>Used: <span className="font-semibold">Rs {data.used.toLocaleString()}</span></p>
                  <p>Remaining: <span className="font-semibold">Rs {remainingAmount.toLocaleString()}</span></p>
                  <p>Donors: <span className="font-semibold">{data.donors}</span></p>
                </div>
                <button
                  onClick={() => handleRemoveProject(projectName)}
                  className="mt-4 w-full py-2 bg-[#5f1515] text-white rounded-md hover:bg-red-600"
                >
                  Remove Project
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right section for add project and pie chart */}
      <div className="w-1/3 space-y-6">
        {/* Add Project Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add a New Project</h2>
          <input
            type="text"
            placeholder="Project Title"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Price (e.g., Rs 20)"
            value={newProject.price}
            onChange={(e) => setNewProject({ ...newProject, price: e.target.value })}
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProject.image}
            onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          <input
            type="number"
            placeholder="Donors Count"
            value={newProject.donors}
            onChange={(e) => setNewProject({ ...newProject, donors: e.target.value })}
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          <button
            onClick={handleAddProject}
            className="w-full py-2 bg-[#5f1515] text-white rounded-md hover:bg-[#7a2020]"
          >
            Add Project
          </button>
        </div>

        {/* Donor Pie Chart Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Donors per Project</h2>
          <Pie data={donorData} />
        </div>
      </div>
    </div>
  );
};

export default Projects;
