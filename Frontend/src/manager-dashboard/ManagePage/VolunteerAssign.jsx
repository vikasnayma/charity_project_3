import React, { useState } from 'react';

// Sample JSON data for volunteers and projects
const data = {
  availableVolunteers: [
    { id: "V001", name: "John Doe", city: "New York", email: "john.doe@example.com" },
    { id: "V002", name: "Jane Smith", city: "Los Angeles", email: "jane.smith@example.com" },
    { id: "V003", name: "Mike Brown", city: "Chicago", email: "mike.brown@example.com" },
    // Add more volunteers as needed
  ],
  projectsNeedingVolunteers: [
    { id: "P001", name: "Education for All", description: "Provide educational resources" },
    { id: "P002", name: "Clean Water Initiative", description: "Provide clean drinking water" },
    { id: "P003", name: "Health and Wellness Camp", description: "Offer health check-ups" },
    // Add more projects as needed
  ]
};

const VolunteerAssignment = () => {
  const [selectedVolunteer, setSelectedVolunteer] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [assignments, setAssignments] = useState({});
  const [showVolunteerList, setShowVolunteerList] = useState(null);

  const handleAssign = () => {
    if (selectedVolunteer && selectedProject) {
      // Update assignments with the new volunteer assignment
      setAssignments((prevAssignments) => {
        const updatedAssignments = { ...prevAssignments };

        if (!updatedAssignments[selectedProject]) {
          updatedAssignments[selectedProject] = [];
        }

        if (updatedAssignments[selectedProject].length < 10) {
          updatedAssignments[selectedProject].push(selectedVolunteer);
        }

        return updatedAssignments;
      });

      setSelectedVolunteer("");
      setSelectedProject("");
    }
  };

  const handleProjectClick = (projectId) => {
    setSelectedProject(projectId);
    setShowVolunteerList((prev) => (prev === projectId ? null : projectId));
  };

  const assignedVolunteers = (assignments[selectedProject] || []).slice(0, 10);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Volunteer Assignment</h2>

      {/* Volunteer Dropdown */}
      <label className="block text-gray-700">Select a Volunteer:</label>
      <select
        value={selectedVolunteer}
        onChange={(e) => setSelectedVolunteer(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      >
        <option value="">Select Volunteer</option>
        {data.availableVolunteers.map((volunteer) => (
          <option key={volunteer.id} value={volunteer.id}>
            {volunteer.name} - {volunteer.city}
          </option>
        ))}
      </select>

      {/* Project Dropdown */}
      <label className="block text-gray-700">Select a Project:</label>
      <select
        value={selectedProject}
        onChange={(e) => setSelectedProject(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      >
        <option value="">Select Project</option>
        {data.projectsNeedingVolunteers.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>

      {/* Assign Button */}
      <button
        onClick={handleAssign}
        className="px-4 py-2 bg-[#5f1515] text-white rounded hover:bg-[#910b0b]"
      >
        Assign Volunteer
      </button>

      {/* Project Buttons to View Volunteer List */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">View Assigned Volunteers</h3>
        {data.projectsNeedingVolunteers.map((project) => (
          <div key={project.id} className="mt-4">
            <button
              onClick={() => handleProjectClick(project.id)}
              className="px-4 py-2 bg-[#5f1515] text-white rounded hover:bg-[#910b0b]"
            >
              {project.name}
            </button>

            {showVolunteerList === project.id && (
              <div className="mt-4 p-4 border border-gray-300 rounded">
                <ul className="list-disc pl-4 text-gray-600">
                  {assignedVolunteers.map((volunteerId, index) => {
                    const volunteer = data.availableVolunteers.find((v) => v.id === volunteerId);
                    return (
                      <li key={index}>
                        {volunteer ? `${volunteer.name} - ${volunteer.city}` : "Unknown Volunteer"}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolunteerAssignment;

