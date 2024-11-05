
import React, { useState } from "react";
import CardComponent from "../components/CardCompo";
import SubComponent from "../components/SubCard";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as filledHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as unfilledHeart } from "@fortawesome/free-regular-svg-icons";
import { motion } from 'framer-motion'

function Projects() {
  const [currentPage, setCurrentPage] = useState("home");

  

  const animalOptions = [
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
      }
    ];
    
    // Food Donation Options
    const foodOptions = [
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
       }
    ];
    
    // Education Donation Options
    const educationOptions = [
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
      }
    ];
    
    // Medical Treatment Donation Options
    const treatmentOptions = [
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
      }
    ];
    
    // Clothes Donation Options
    const clothesOptions = [
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
      }
    ];
    
    // Cleanliness Donation Options
    const cleanlinessOptions = [
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

  const renderPage = () => {
    switch (currentPage) {
      case "education-donation":
        return (
          <SubComponent
            title="Education Donation"
            donationOptions={educationOptions}
          />
        );
      case "food-donation":
        return (
          <SubComponent
            title="Food Donation"
            donationOptions={foodOptions}
           
          />
        );
      case "animal-donation":
        return (
          <SubComponent
            title="Animal Shelter"
            donationOptions={animalOptions}
            
          />
        );
      case "treatment-donation":
        return (
          <SubComponent
            title="Surgery & Treatment"
            donationOptions={treatmentOptions}
           
          />
        );
      case "cleanliness-donation":
        return (
          <SubComponent
            title="Cleanliness"
            donationOptions={cleanlinessOptions}
           
          />
        );
      case "clothes-donation":
        return (
          <SubComponent
            title="Clothes"
            donationOptions={clothesOptions}
           
          />
        );
     
      default:
        return <CardComponent setCurrentPage={setCurrentPage} />;
    }
  };

  return <div>
    <Navbar/>
    <motion.div 
    initial={{opacity:0, rotateX:"90deg"}}
    whileInView={{opacity:1, rotateX:0}}
    transition={{duration:2}}
    className="container mx-auto px-4 py-8 mt-6">
       <div className="text-center mb-4">
         <h2 className="text-3xl font-bold text-gray-800">
           Empowering Change with Your Donations
         </h2>
         <p className="text-lg text-gray-600 mt-4">
          At Charity, we believe that meaningful change begins with trust and
           transparency. Our mission is to ensure that every donation, no matter
           how big or small, has a direct and tangible impact on the lives of
           those we support.We ensure that the funds you contribute are used efficiently, providing maximum benefit to those in need.
         </p>
       </div>
    </motion.div>
    <motion.div
     initial={{opacity:0, translateX:"-100%"}}
     whileInView={{opacity:1, translateX:0}}
     transition={{duration:2}}
     className="my-1">
    {renderPage()}
    </motion.div>
    <Footer/>
  </div>;
}

export default Projects;


