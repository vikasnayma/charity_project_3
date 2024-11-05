import React from 'react';
import {easeIn, motion} from 'framer-motion'

const Stats = () => {
  return (
   
  <motion.div
   initial={{opacity:0, translateX: "-100%"}}
   whileInView={{opacity:1, translateX: 0}}
   transition={{duration:4}}
   className="flex justify-center items-center slide-in">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white border border-red-400 rounded-lg shadow-md">
      
      {/* Meals per Year */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-red-600">100k+</h2>
        <p className="text-gray-600 mt-2">Meals per Year</p>
      </div>
      
      {/* Amazing Volunteers */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-red-600">1.6k+</h2>
        <p className="text-gray-600 mt-2">Amazing Volunteers</p>
      </div>
      
      {/* Monthly Donors */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-red-600">10K+</h2>
        <p className="text-gray-600 mt-2">Monthly Donors</p>
      </div>
      
      {/* People Served */}
      <div className="text-center ">
        <h2 className="text-3xl font-bold text-red-600">10,372 +</h2>
        <p className="text-gray-600 mt-2">People Served</p>
      </div>
      
    </div>
  </motion.div>

  );
};

export default Stats;
