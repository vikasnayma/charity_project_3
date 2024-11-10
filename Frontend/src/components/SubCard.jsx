

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as filledHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as unfilledHeart } from "@fortawesome/free-regular-svg-icons";
import { motion } from 'framer-motion'
import {Link} from 'react-router-dom'

const SubCard = ({ title, donationOptions, addToWishlist }) => {
  


  return (
    <motion.div 
    initial={{opacity:0, translateX:"-10%"}}
    whileInView={{opacity:1, translateX:0}}
    transition={{duration:2}}
    className="max-w-screen-lg mx-auto  text-center py-8">
      <h2 className="text-3xl font-bold mb-8 text-[#5f1515]">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {donationOptions.map((option, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 relative hover:shadow-xl transition duration-300">
            <img src={option.image} alt={option.title} className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold text-blue-950 mb-2">{option.title}</h3>
            <p className="text-gray-500 mb-2 font-semibold">${option.price}</p>
            <p className="text-gray-600 mb-4">{option.description}</p>
            <div className="flex justify-between items-center mt-4">
              <button className="mx-auto bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
                <Link to='/PaymentForm'>Donate</Link>
              </button>
              
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SubCard;


