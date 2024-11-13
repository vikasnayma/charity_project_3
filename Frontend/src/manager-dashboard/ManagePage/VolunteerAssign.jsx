import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VolunteerAssignment = () => {
    const [selectedVolunteer, setSelectedVolunteer] = useState("");
    const [selectedProject, setSelectedProject] = useState("");
    const [availableVolunteers, setAvailableVolunteers] = useState([]);
    const [projectsNeedingVolunteers, setProjectsNeedingVolunteers] = useState([]);
    const [assignments, setAssignments] = useState({});
    const [showVolunteerList, setShowVolunteerList] = useState(null);

    useEffect(() => {
        // Fetch available volunteers (those not assigned to any project)
        axios.get('http://localhost:9000/api/manager/volunteers')
            .then((response) => {
                setAvailableVolunteers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching volunteers:', error);
            });

        // Fetch projects needing volunteers (projects with less than 10 volunteers)
        axios.get('http://localhost:9000/api/manager/projects')
            .then((response) => {
                setProjectsNeedingVolunteers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching projects:', error);
            });
    }, []);

    const handleAssign = () => {
        if (selectedVolunteer && selectedProject) {
            // Make a POST request to assign volunteer to project
            const managerEmail = "manager@example.com"; // Hardcoding for now
            const requestData = {
                managerEmail,
                projectId: selectedProject,
                volunteerEmail: selectedVolunteer,
            };

            axios.post('http://localhost:9000/api/manager/assign', requestData)
                .then((response) => {
                    const assignedVolunteer = response.data;
                    setAssignments((prevAssignments) => {
                        const updatedAssignments = { ...prevAssignments };

                        if (!updatedAssignments[selectedProject]) {
                            updatedAssignments[selectedProject] = [];
                        }

                        updatedAssignments[selectedProject].push(assignedVolunteer);
                        return updatedAssignments;
                    });
                })
                .catch((error) => {
                    console.error('Error assigning volunteer:', error);
                });

            setSelectedVolunteer("");
            setSelectedProject("");
        }
    };

    const handleProjectClick = (projectId) => {
        setSelectedProject(projectId);
        setShowVolunteerList((prev) => (prev === projectId ? null : projectId));
    };

    // Only show the volunteers for the selected project, limit to 10 volunteers
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
                {availableVolunteers.map((volunteer) => (
                    <option key={volunteer.email} value={volunteer.email}>
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
                {projectsNeedingVolunteers.map((project) => (
                    <option key={project.project_ID} value={project.project_ID}>
                        {project.project_name}
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

            {/* View Assigned Volunteers */}
            <div className="mt-6">
                <h3 className="text-xl font-semibold">Assigned Volunteers</h3>
                {projectsNeedingVolunteers.map((project) => (
                    <div key={project.project_ID} className="mt-4">
                        <button
                            onClick={() => handleProjectClick(project.project_ID)}
                            className="px-4 py-2 bg-[#5f1515] text-white rounded hover:bg-[#910b0b]"
                        >
                            {project.project_name}
                        </button>

                        {showVolunteerList === project.project_ID && (
                            <div className="mt-4 p-4 border border-gray-300 rounded">
                                <ul className="list-disc pl-4 text-gray-600">
                                    {assignedVolunteers.map((volunteer, index) => (
                                        <li key={index}>
                                            {volunteer.name} - {volunteer.city}
                                        </li>
                                    ))}
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