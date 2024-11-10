import React from 'react';
import img1 from '../assets1/img1.jpg'
import img4 from '../assets1/img4.jpeg'
import img5 from '../assets1/img5.png'
import {motion} from 'framer-motion'

const Hero = () => {
  return (

<div className="bg-beige text-black max-w-7xl mx-auto min-h-[90vh] flex flex-col md:flex-row justify-center items-center py-4 md:py-6">
  {/* left section */}
  <motion.div
    initial={{ opacity: 0, translateX: "-50%" }}
    whileInView={{ opacity: 1, translateX: 0 }}
    transition={{ duration: 1 }}
    className="max-w-3xl text-center md:text-left space-y-3"
  >
    <h1 className="text-5xl font-bold leading-tight">
      Be the <span className="text-red-600">Change</span>
    </h1>
    <p className="text-md">
      You can make a difference in your community and help those in need.
      If you are dedicated to your cause, you can make a difference in the world.
    </p>
    <button className="bg-[#910b0b] hover:shadow-xl text-white px-5 py-2 rounded shadow-lg transition-transform transform hover:scale-105">
      Our Projects
    </button>
  </motion.div>
  
  {/* right section */}
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    className="relative mt-4 md:mt-0"
  >
    <motion.img
      src={img1}
      alt="Pig"
      className="w-86 h-auto rounded-lg shadow-lg"
      whileHover={{ scale: 1.01}}
      transition={{ duration: 0.3 }}
    />

    <div className="absolute h-28 w-28 rounded-full top-0 left-0 hover:scale-95 transition-transform -translate-x-10 -translate-y-10 overflow-hidden">
      <motion.img
        src={img4}
        className="h-full w-full object-cover"
        whileHover={{ scale: 1.05, rotate: -10 }}
        transition={{ duration: 0.3 }}
      />
    </div>
    
    <div className="absolute bottom-0 right-0 hover:scale-95 transition-transform translate-x-10 translate-y-10 h-28 w-28 rounded-full overflow-hidden">
      <motion.img
        src={img5}
        className="h-full w-full object-cover"
        whileHover={{ scale: 1.05, rotate: 10 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  </motion.div>
</div>


  );
};

export default Hero;