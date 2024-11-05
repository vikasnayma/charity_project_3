import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { AllProjects } from './Dashboard'
import {motion} from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


function Volunteer() {
    const [volunteer, setVolunteer] = useState({
         name: "",
         city: "",
         phone: "",
         email: "",
         projectName: "",
         dateOfAssign: ""
      });

      const [filteredProjects, setFilteredProjects] = useState([]);

      useEffect( () => {
         const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/volunteer/203`)
                console.log(res.data);
                const volunteerData = res.data;

                setVolunteer({
                    name: volunteerData[0].V_name,
                    city: volunteerData[0].V_city,
                    phone: volunteerData[0].V_phone,
                    email: volunteerData[0].V_email,
                    projectName: volunteerData[0].Project_name,
                    dateOfAssign: volunteerData[0].Date_of_assign
                });

                const project_Names = volunteerData[0].Project_name.split(",").map(name => name.trim().toLowerCase());
                const date_of_assigns = volunteerData[0].Date_of_assign.split(",").map(date => date.trim());

                const filtered = AllProjects.filter(project =>
                    project_Names.includes(project.title.toLowerCase())
                  ).map((project, index) => ({
                    ...project,
                    
                    projectNames: project_Names[index],
                    dateOfAssigns: date_of_assigns[index]
                  }));

                  console.log(filtered)
                // Set filtered projects
                setFilteredProjects(filtered);
            }
            catch(err) {
                console.log(err)
            }
        }
            fetchData();
      },[])

  return (
    <div className="m-0 p-0 flex flex-col bg-slate-50  text-slate-900">
      <Navbar/>
      <h1 className='text-center font-serif text-lg font-bold bg-[#5f1515] text-white'>Volunteer Dashboard</h1>
        
      <motion.div 
      initial={{opacity:0, scale:0}}
      whileInView={{opacity:1, scale:1}}
      transition={{duration:1}}
      className="p-6 max-w-md "
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Volunteer Information</h2>
        <p className="font-medium ">Name:<span className='p-3'>{volunteer.name}Rahul</span></p>
        <p className="font-medium ">City:<span className='p-3'>{volunteer.city}Mumbai</span></p>
        <p className="font-medium ">Phone No:<span className='p-3'>{volunteer.phone}+91 12345657</span></p>
        <p className="font-medium ">Email:<span className='p-3'>{volunteer.email}rahul@yahoo.com</span></p>
     </motion.div>
     <h2 className="text-center font-serif text-lg font-bold bg-[#5f1515] text-white">Voluntary History</h2>
   <motion.div 
    initial={{opacity:0, translateX:"-100%"}}
    whileInView={{opacity:1, translateX:0}}
    transition={{duration:2}}
   className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
     {filteredProjects.length > 0 ? (
       filteredProjects.map((project, index) => (
         <div key={index} className="bg-white rounded-lg shadow-lg p-6 relative hover:shadow-xl transition duration-300">
           <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-md mb-4" />
           <h3 className="text-xl font-semibold text-blue-950 mb-2">{project.title}</h3>
           <p className="text-gray-500">{project.description}</p>
           <p className="text-gray-500">Date: {project.dateOfAssigns}</p>
         </div>
       ))
     ) : (
       <p className="text-gray-500">No projects found.</p>
     )}
   </motion.div>   

   <Footer/>     
    </div>
  )
}

export default Volunteer