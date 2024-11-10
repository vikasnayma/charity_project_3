
import { motion } from 'framer-motion'
import React from 'react';
import { CiFacebook } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { CiYoutube } from "react-icons/ci";
import { IoLogoTwitter } from "react-icons/io";
import charityLogo from '../assets1/charity-logo.jpg'


const Footer = () => {
  return (
    <footer 
    className="bg-[#5f1515] text-white py-10 px-4">
      <div className="px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         
         {/* Contact Info Section */}
         <div>
            <h5 className="text-lg font-bold mb-4 flex gap-2">
            <img src={charityLogo} className='mt-1 w-8 h-6'/>
              Charity
            </h5>
            <ul>
              <li className='mt-2'>📍 Yuna Street, 12 London</li>
              <li className='mt-2'>📞 +123 986 8764</li>
              <li className='mt-2'>✉ yuna@domain.com</li>
            </ul>
          </div>
         
         
         
          {/* About Us Section */}
          <div>
            <p className="text-lg font-bold mb-4">Quick Links</p>
            <ul>
              <li className='mt-1'><a href="/" className="hover:underline">Home</a></li>
              <li className='mt-1'><a href="/About" className="hover:underline">About Us</a></li>
              <li className='mt-1'><a href="/Projects" className="hover:underline">Projects</a></li>
              <li className='mt-1'><a href="/Contact" className="hover:underline">Contact</a></li>

            </ul>
          </div>

          {/* Other Pages Section */}
          <div>
  <p className="text-lg font-bold mb-4">Follow Us</p>
  <ul>
    <li className="flex items-center mb-4">
      <CiFacebook className="mr-2" />
      <a href="https://www.facebook.com" className="hover:underline">Facebook</a>
    </li>
    <li className="flex items-center mb-4">
      <CiInstagram className="mr-2" />
      <a href="https://www.instagram.com" className="hover:underline">Instagram</a>
    </li>
    <li className="flex items-center mb-4">
      <CiYoutube className="mr-2" />
      <a href="https://www.youtube.com" className="hover:underline">YouTube</a>
    </li>
    <li className="flex items-center mb-4">
      <IoLogoTwitter className="mr-2" />
      <a href="https://www.twitter.com" className="hover:underline">Twitter</a>
    </li>
  </ul>
</div>






          

          {/* Volunteer Section */}
          <div>
            <h5 className="text-lg font-bold mb-4">We need your help</h5>
            <p className="mb-4">
              By volunteering your time and efforts, you can make a difference in your community.
            </p>
            <a href="/About" className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded">
              Explore More...
            </a>
          </div>
        </div>

        {/* Divider and Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-sm">
            &copy; 2024 Your Company LLC. <a href="/" className="hover:underline">Yuna Theme</a> by <a href="/" className="hover:underline">SSVR Design</a>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
