import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProjectContext = createContext();

export const ProjectProvider = ({children}) => {
    const [projects , setProjects] = useState([]);
    const [error, setError] = useState(null);

     // Fetch all projects from the backend
     const fetchProjects = async () => {
        try {
          const response = await axios.get('http://localhost:9000/api/project');
          setProjects(response.data);
        } catch (err) {
          setError(err.message);
        }
      };

    // Add a new project
     const addProject = async (project) => {
    try {
      const response = await axios.post('http://localhost:9000/api/project', project);
      setProjects([...projects, response.data]);
    } catch (err) {
      setError(err.message);
    }
  };

   // Fetch project by ID
   const fetchProjectById = async (project_id) => {
    try {
      const response = await axios.get(`http://localhost:9000/api/project/${project_id}}`);
      return response.data; // Return the specific donation data
    } catch (err) {
      setError(err.message);
      return null; // Return null in case of an error
    }
  };

   // Update a project
   const updateProject = async (project_id, updatedProject) => {
    try {
      const response = await axios.put(`http://localhost:9000/api/project/${project_id}`, updateProject);
      setProjects(projects.map(p => (p.id === project_id ? response.data : p)));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ProjectContext.Provider value={{ projects, error, fetchProjects , addProject, fetchProjectById, updateProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectContext;