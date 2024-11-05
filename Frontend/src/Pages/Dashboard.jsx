import React from 'react'
import Navbar from '../components/Navbar'
import { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import projects from './Projects'
import Footer from '../components/Footer'
import {motion} from 'framer-motion'

function Dashboard() {
  const [donor, setDonor] = useState({
    name: "",
    city: "",
    phone: "",
    email: "",
    dates: "",
    times: "",
    amounts: "",
    paymentTypes: "",
    projectNames: "",
  });

  const [filteredProjects, setFilteredProjects] = useState([]);


  const hasUpdated = useRef(false);

  // const location = useLocation();
  // const d_id = location.pathname.split("/")[2];
  // console.log(d_id);


  const AllProjects = [
    { 
      title: "Shelter Supplies", 
      price: "Rs 50", 
      description: "Provide essential supplies like bedding, toys, and cleaning products for shelter animals.",
      image: "https://media.4-paws.org/6/8/9/3/689354d6694789b45569cd647a6009e240b4afe7/VIER%20PFOTEN_2016-09-18_081-1927x1333-1920x1328.jpg" 
    },
    { 
      title: "Animal Medical Care", 
      price: "Rs 100", 
      description: "Cover medical costs, including vaccinations and surgeries for shelter animals.",
      image: "https://tse4.mm.bing.net/th?id=OIP.hJPnUIe0l0vpDJ4CR1FMkAHaFj&pid=Api&P=0&h=180" 
    },
    { 
      title: "Sponsor a Pet", 
      price: "Rs 150", 
      description: "Sponsor the stay of a pet in the shelter until they find a permanent home.",
      image: "https://tse2.mm.bing.net/th?id=OIP.xNxK8zOycmEY-h1RWxbq8QHaE7&pid=Api&P=0&h=180" 
    },
    { 
      title: "1-Time Meal", 
      price: "Rs 20", 
      description: "Provide a one-time nutritious meal to a person in need.",
      image: "https://d1vdjc70h9nzd9.cloudfront.net/media/campaign/115000/115153/image/5d35baafa2676.jpeg" 
    },
    { 
      title: "Birthday Celebration", 
      price: "Rs 250", 
      description: "Help someone celebrate their birthday with a special meal.",
      image: "https://images.unsplash.com/photo-1607482369189-a53b6e71fa48?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    },
    { 
      title: "Whole Day Meal", 
      price: "Rs 50", 
      description: "Sponsor a whole day's worth of meals for a person in need.",
      image: "https://cdn.givind.org/static/images/program/w450/feed-nutritious-meals-to-a-poor-rural-child.jpg" 
    },
     { 
       title: "Holiday Special Meal", 
       price: "Rs 35", 
       description: "Give the gift of a special meal to a person during the holiday season.",
       image: "https://media.istockphoto.com/id/1386232634/photo/indian-food-plate.jpg?s=612x612&w=0&k=20&c=uoqq8ba0EZeKH2TYqQma-iAB9VhP9Pjgg7LAmk3xGks=" 
     },
     { 
       title: "Emergency Relief Meal", 
       price: "Rs 15", 
       description: "Provide an emergency meal to someone facing a sudden crisis or disaster.",
       image: "https://www.rescue.org/sites/default/files/styles/widescreen_16x9_528px_wide/public/2022-11/20220919%20Somalia%20MTadesse%20Drought%207857.jpg?itok=BGaijnQD" 
     },
     { 
       title: "Healthy Meal for a Child", 
       price: "Rs 10", 
       description: "Sponsor a balanced meal for a child to ensure their proper growth and nutrition.",
       image: "https://cdn.pixabay.com/photo/2016/04/07/16/46/kid-1319487_1280.jpg" 
     },
     { 
      title: "1-Year Books and Notes", 
      price: "Rs 500", 
      description: "Sponsor all necessary books and notes for a student for one year.",
      image: "https://tse2.mm.bing.net/th?id=OIP.el1CO8IeRT0nSKKSJcDX1wHaE8&pid=Api&P=0&h=180" 
    },
    { 
      title: "School Uniform", 
      price: "Rs 530", 
      description: "Provide a student with a school uniform for the year.",
      image: "https://tse3.mm.bing.net/th?id=OIP.RViyjH6fbJXnLQEVe0ly-wHaEx&pid=Api&P=0&h=180" 
    },
    { 
      title: "Institute Fees", 
      price: "Rs 1000", 
      description: "Cover the cost of school fees for a student in need.",
      image: "https://tse4.mm.bing.net/th?id=OIP.Ty9ULaYXT9CcYt-VJFVgZwHaE7&pid=Api&P=0&h=180" 
    },
    { 
      title: "Basic Health Checkup", 
      price: "Rs 75", 
      description: "Provide a basic health checkup for one individual.",
      image: "https://tse4.mm.bing.net/th?id=OIP.GnUJGPr8JzL-xrJlawAWAwHaGU&pid=Api&P=0&h=180" 
    },
    { 
      title: "Surgery Support", 
      price: "Rs 1000", 
      description: "Help cover the costs for critical surgeries and medical procedures.",
      image: "https://tse2.mm.bing.net/th?id=OIP.xuFqc0EHFRizyVcki9ikDAHaEZ&pid=Api&P=0&h=180" 
    },
    { 
      title: "Post-Surgery Care", 
      price: "Rs 200", 
      description: "Support individuals with their recovery by providing post-surgery care.",
      image: "https://tse3.mm.bing.net/th?id=OIP.QOxitbWsUIFmvLQP_YvadAHaE7&pid=Api&P=0&h=180" 
    },
    { 
      title: "Winter Clothing Set", 
      price: "Rs 75", 
      description: "Provide a full set of winter clothes including a coat, gloves, and hat for those in need.",
      image: "https://tse2.mm.bing.net/th?id=OIP.czO-3GFKIvanSBZCE8A2XgHaE6&pid=Api&P=0&h=180" 
    },
    { 
      title: "School Uniform", 
      price: "Rs 30", 
      description: "Provide a school uniform for a child in need.",
      image: "https://tse3.mm.bing.net/th?id=OIP.RViyjH6fbJXnLQEVe0ly-wHaEx&pid=Api&P=0&h=180" 
    },
    { 
      title: "Everyday Essentials", 
      price: "Rs 50", 
      description: "Provide essential everyday clothing items like shirts, pants, and socks.",
      image: "https://tse4.mm.bing.net/th?id=OIP.7ypBmeIIbs3PTRchWnmyjQHaE8&pid=Api&P=0&h=180" 
    },
    { 
      title: "Personal Hygiene Kit", 
      price: "Rs 150", 
      description: "Provide hygiene essentials like soap, toothbrush, and toothpaste.",
      image: "https://tse1.mm.bing.net/th?id=OIP.ji2PhtvaLKuKY8lJG8efywHaHa&pid=Api&P=0&h=180" 
    },
    { 
      title: "Community Cleaning Supplies", 
      price: "Rs 50", 
      description: "Provide cleaning supplies for maintaining public spaces and community areas.",
      image: "https://tse1.mm.bing.net/th?id=OIP.OIaTi3_JyvqQoEroMYcqXAHaE7&pid=Api&P=0&h=180" 
    },
    { 
      title: "Water Purification Tablets", 
      price: "Rs 200", 
      description: "Help provide clean drinking water by donating water purification tablets.",
      image: "https://n1.sdlcdn.com/imgs/g/q/5/EF-Chlor-Water-Purification-Tablets-SDL762646751-3-860c8.jpg" 
    }
  ];
  



  useEffect(() => {
    // No event parameter here
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/donor/101`);
        console.log(res.data);
        // setDonor(res.data);
        const donorData = res.data; // Assuming res.data is the donor object
        console.log(donorData);

        setDonor({
          name: donorData[0].D_name,
          city: donorData[0].D_city,
          phone: donorData[0].D_phone,
          email: donorData[0].D_email,
          dates: donorData[0].Dates,
          times: donorData[0].Times,
          amounts: donorData[0].Amounts,
          paymentTypes: donorData[0].Payment_Types,
          projectNames: donorData[0].Project_Names,

        });
        hasUpdated.current = true;

        console.log("filtered fdata");
        const project_Names = donorData[0].Project_Names.split(",").map(name => name.trim().toLowerCase());
        const project_Amounts = donorData[0].Amounts.split(",").map(amount => amount.trim());
        const project_PaymentTypes = donorData[0].Payment_Types.split(",").map(type => type.trim());
        const project_Dates = donorData[0].Dates.split(",").map(date => date.trim());
        const project_Times = donorData[0].Times.split(",").map(time => time.trim());

        // Filter AllProjects and add payment details for each project
        const filtered = AllProjects.filter(project =>
          project_Names.includes(project.title.toLowerCase())
        ).map((project, index) => ({
          ...project,
          amount: project_Amounts[index],
          paymentType: project_PaymentTypes[index],
          date: project_Dates[index],
          time: project_Times[index],
        }));
      // Set filtered projects
      setFilteredProjects(filtered);
  
        console.log(filteredProjects);
  
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    if (hasUpdated.current) {
      console.log("Updated Donor Data:", donor);
      hasUpdated.current = false;  // Reset after logging
    }
  });


  const [wishlistItems, setWishlistItems] = useState([
    { 
      title: "Sponsor a Pet", 
      price: "Rs 150", 
      description: "Sponsor the stay of a pet in the shelter until they find a permanent home.",
      image: "https://tse2.mm.bing.net/th?id=OIP.xNxK8zOycmEY-h1RWxbq8QHaE7&pid=Api&P=0&h=180" 
    },
    { 
      title: "1-Time Meal", 
      price: "Rs 20", 
      description: "Provide a one-time nutritious meal to a person in need.",
      image: "https://d1vdjc70h9nzd9.cloudfront.net/media/campaign/115000/115153/image/5d35baafa2676.jpeg" 
    },
    { 
      title: "Birthday Celebration", 
      price: "Rs 250", 
      description: "Help someone celebrate their birthday with a special meal.",
      image: "https://images.unsplash.com/photo-1607482369189-a53b6e71fa48?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    },
    { 
      title: "Whole Day Meal", 
      price: "Rs 50", 
      description: "Sponsor a whole day's worth of meals for a person in need.",
      image: "https://cdn.givind.org/static/images/program/w450/feed-nutritious-meals-to-a-poor-rural-child.jpg" 
    },
     { 
       title: "Holiday Special Meal", 
       price: "Rs 35", 
       description: "Give the gift of a special meal to a person during the holiday season.",
       image: "https://media.istockphoto.com/id/1386232634/photo/indian-food-plate.jpg?s=612x612&w=0&k=20&c=uoqq8ba0EZeKH2TYqQma-iAB9VhP9Pjgg7LAmk3xGks=" 
     },
     { 
       title: "Emergency Relief Meal", 
       price: "Rs 15", 
       description: "Provide an emergency meal to someone facing a sudden crisis or disaster.",
       image: "https://www.rescue.org/sites/default/files/styles/widescreen_16x9_528px_wide/public/2022-11/20220919%20Somalia%20MTadesse%20Drought%207857.jpg?itok=BGaijnQD" 
     },
  ]);

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };


  return (
    <div className="m-0 p-0 flex flex-col gap-[20px] bg-slate-50  text-slate-900">
        <Navbar/>
        <h1 className='text-center font-serif text-lg font-bold bg-[#902121] text-white mt-[-20px]'>Donor Dashboard</h1>
        
      <motion.div 
       initial={{opacity:0, scale:0}}
       whileInView={{opacity:1, scale:1}}
       transition={{duration:1}}
      className="p-6 max-w-md ">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Donor Information</h2>
        <p className="font-medium text-gray-700 mb-2">
          Name: <span className="text-gray-900 font-normal">{donor.name}John Doe</span>
        </p>
        <p className="font-medium text-gray-700 mb-2">
          City: <span className="text-gray-900 font-normal">{donor.city}Mumbai</span>
        </p>
        <p className="font-medium text-gray-700 mb-2">
           Phone No: <span className="text-gray-900 font-normal">{donor.phone}+91 23456679</span>
        </p>
        <p className="font-medium text-gray-700">
          Email: <span className="text-gray-900 font-normal">{donor.email}john@gmail.com</span>
        </p>
      </motion.div>

        <h2 className="text-center font-serif text-lg font-bold bg-[#902121] text-white p-2">Donoation History</h2>
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
              <p className="text-gray-500">Amount: {project.amount}</p>
              <p className="text-gray-500">Payment Type: {project.paymentType}</p>
              <p className="text-gray-500">Date: {project.date}</p>
              <p className="text-gray-500">Time: {project.time}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No projects found.</p>
        )}
      </motion.div>
         

        
        <h1 className="text-center font-serif text-lg font-bold bg-[#902121] text-white p-2">Donation Wishlist</h1>
        <motion.div 
       initial={{opacity:0, translateX:"100%"}}
       whileInView={{opacity:1, translateX:0}}
       transition={{duration:2}}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           
          {wishlistItems.map((item,index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 relative hover:shadow-xl transition duration-300">
            <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold text-blue-950 mb-2">{item.title}</h3>
            <p className="text-gray-500 mb-2 font-semibold">{item.price}</p>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <button
              onClick={() => removeFromWishlist(index)}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Remove from Wishlist
            </button>
          </div>
        ))}
           

          <button className="border border-collapse">
            <Link to='/Projects'>Explore more projects...</Link>
          </button>
        </motion.div>


        <Footer/>


    </div>
  )
}

export default Dashboard