
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Stats from '../components/Stats';
import img1 from '../assets1/about.avif';
import img2 from '../assets1/aboutImg.avif';
import visionImage from '../assets1/vision.avif'; // Path to your vision image
import missionImage from '../assets1/mission.avif'; // Path to your mission image
import {motion} from 'framer-motion'

export default function About() {
  return (
    <div>
      <Navbar />

      {/* who we are section */}
      <motion.div 
      initial={{opacity:0, translateX:"-100%"}}
      whileInView={{opacity:1, translateX: 0}}
      transition={{duration:1.5}}
      className="flex flex-col md:flex-row items-center m-12 p-6 border border-gray-300 rounded-lg">
  <div className="flex-1 flex flex-col gap-4 p-6">
  <p className="text-2xl text-black font-bold">- WHO WE ARE -</p>

    <p className="text-lg font-semibold">Bringing smiles to those in need</p>
    <p className="text-base text-gray-700">
    We are an online charity organization that helps people in need. Our goal is to connect donors with those who require support, making it easy for everyone to contribute and make a difference in their communities.
    </p>
    <span className="p-3 bg-red-600 text-white rounded-full max-w-fit">Our Mission</span>
  </div>
  <div className="flex-1">
    <img src={img2} alt="About us" className="h-[300px] w-full rounded-lg object-cover" />
  </div>
</motion.div>

{/*  about us */}

<h2 className="text-xl text-black font-semibold mt-8 mx-6 md:mx-12">About Us</h2>

{/* single div for motion */}
<motion.div
initial={{opacity:0, translateX:"100%"}}
whileInView={{opacity:1, translateX: 0}}
transition={{duration:1.5}}
>
<div 
      initial={{opacity:0, translateX:"100%"}}
      whileInView={{opacity:1, translateX: 0}}
      transition={{duration:1.5}}
className="flex flex-col md:flex-row items-start justify-between mx-6 md:mx-12 mt-4">
  {/* First paragraph with image */}
  <div className="flex items-start md:w-1/2">
    <img src={img1} alt="Image description for paragraph 1" className="w-24 h-24 rounded-full object-cover mr-4" />
    <p className="text-base text-gray-700">
      Our organization is built on the belief that everyone deserves a chance to improve their lives. By facilitating charitable giving, we connect generous individuals with those who need help. 
      We believe in transparency, accountability, and making sure that every donation goes directly to the people and communities that need it most. 
      Whether it's providing essential resources like food and shelter, or supporting education and healthcare, we work tirelessly to make a real difference in the lives of the less fortunate.
    </p>
  </div>

  {/* Second paragraph with image */}
  <div className="flex items-start md:w-1/2 md:ml-4 mt-4 md:mt-0">
    <img src={img2} alt="Image description for paragraph 2" className="w-24 h-24 rounded-full object-cover mr-4" />
    <p className="text-base text-gray-700">
      We also organize volunteer opportunities that empower both donors and recipients to be part of meaningful change. Our goal is to create a lasting impact by fostering connections between communities and those willing to contribute their time and skills. 
      Through our platform, we not only offer help but also encourage self-sufficiency, providing tools and resources that help people regain control of their lives and futures.
      Together, we aim to create a ripple effect of kindness and hope across the world.
    </p>
  </div>
</div>
<div className="mx-6 md:mx-12 mt-8">
      

      <div className="flex flex-col md:flex-row items-start justify-between mt-4">
        <div className="md:w-1/2 ">
          
          <div className="mt-4">
            <img src={visionImage} alt="Vision" className="w-full h-auto rounded-lg" />
          </div>
        </div>
        
        <div className="md:w-1/2 md:ml-4 mt-4 md:mt-0">
          
          <div className="mt-4">
            <img src={missionImage} alt="Mission" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      </div>
 </div>
</motion.div>



   




      {/* Statistics Section */}
      <div className="mt-24 m-12">
        <Stats />
      </div>
      
      <motion.div
         initial={{opacity:0, translateY:"100%"}}
         whileInView={{opacity:1, translateY:0}}
         transition={{duration:1}}
      >
           <Footer />
      </motion.div>
    </div>
  );
}

