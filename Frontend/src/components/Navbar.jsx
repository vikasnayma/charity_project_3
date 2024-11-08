import React, { useState } from 'react';
import { IoIosCall } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { CiYoutube } from "react-icons/ci";
import { IoLogoTwitter } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'

const Navbar = () => {

  const [isActive, setIsActive] = useState(false);
  const Navigation = useNavigate();
  

  return (
    <nav className="m-0 p-0 text-white">
        <motion.div 
        initial={{opacity:0, scale:0}}
        whileInView={{opacity:1, scale:1}}
        transition={{duration:2}}
        className='bg-white text-black text-sm flex justify-evenly items-center'>
            <div className='flex item-center'>
                <IoIosCall className='mt-1'/>
                <span>+123 986 8764</span>
                <CiMail className='mt-1 ml-3'/>
                <pre> yuna@domain.com</pre>
            </div>
            <div className='hidden md:flex gap-4'> 
                <a><CiFacebook /></a>
                <a><CiInstagram /></a>
                <a><CiYoutube /></a>
                <a><IoLogoTwitter /></a>
            </div>
            <div className='flex item-center'>
              <button className=' text-blue-950 font-bold p-1 rounded'>
                <NavLink to='/login'>Login</NavLink>
              </button>
            </div>

        </motion.div>    
      <div className="bg-[#910b0b] flex justify-evenly items-center p-4">
        <NavLink to='/'><div className="text-2xl font-bold">Yuna</div></NavLink>
        <div className="hidden md:flex space-x-6">
            <NavLink to='/'><button className="hover:text-gray-400">Home</button></NavLink>
            <NavLink to='/About'> <button className="hover:text-gray-400">About</button> </NavLink>
            <NavLink to='/Projects'> <button className="hover:text-gray-400">Projects</button></NavLink>
            <NavLink to='/contact'><button className='hover:text-gray-400'>Contact Us</button></NavLink>  
        </div>
        <Link to='/Projects'>
        <button className="bg-white text-red-600 px-4 py-2 rounded shadow-md">Donate</button>
        </Link>
        
        <span className={`${isActive ? "hidden" : "block"} md:hidden`}
        onClick={()=> setIsActive(true)}>|||</span>
        <span className={`${isActive ? "block" : "hidden"} md:hidden`}
        onClick={()=> setIsActive(false)}>X</span>
      </div>
      {
        isActive && (
          <motion.div
          initial={{opacity:0, translateX:"-100%"}}
          whileInView={{opacity:1, translateX:0}}
          transition={{duration:1}}
           className='md:hidden flex flex-col bg-[#910b0b]'>
              <div className="hover:bg-[#521515] py-2 px-4"><Link to='/'>Home</Link></div>
              <div className="hover:bg-[#521515] py-2 px-4"><Link to='/About'>About</Link></div>
              <div className="hover:bg-[#521515] py-2 px-4"><Link to='/Projects'>Projects</Link></div>
              <div className="hover:bg-[#521515] py-2 px-4"><Link to='/Contact'>Contact Us</Link></div>
          </motion.div> 
        )
      }
    </nav>
  );
};

export default Navbar;
