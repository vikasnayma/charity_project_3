
import { motion } from 'framer-motion'
import React from 'react';

const Footer = () => {
  return (
    <footer 
    className="bg-[#5f1515] text-white py-10 px-4">
      <motion.div

      className="px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us Section */}
          <div>
            <p className="text-lg font-bold mb-4">About Us</p>
            <ul>
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/About" className="hover:underline">About Us</a></li>
              <li><a href="/Blog" className="hover:underline">Blog</a></li>
              <li><a href="/Projects" className="hover:underline">Projects</a></li>
              <li><a href="/Contact" className="hover:underline">Contact</a></li>

            </ul>
          </div>

          {/* Other Pages Section */}
          <div>
            <h5 className="text-lg font-bold mb-4">Other Pages</h5>
            <ul>
              <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:underline">Terms of Use</a></li>
              <li><a href="/disclaimer" className="hover:underline">Disclaimer</a></li>
              <li><a href="/faq" className="hover:underline">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h5 className="text-lg font-bold mb-4">Contact Info</h5>
            <ul>
              <li>📍 Yuna Street, 12 London</li>
              <li>📞 +123 986 8764</li>
              <li>✉ yuna@domain.com</li>
            </ul>
          </div>

          {/* Volunteer Section */}
          <div>
            <h5 className="text-lg font-bold mb-4">We need your help</h5>
            <p className="mb-4">
              By volunteering your time and efforts, you can make a difference in your community.
            </p>
            <a href="#" className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded">
              Volunteer Now
            </a>
          </div>
        </div>

        {/* Divider and Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-sm">
            &copy; 2024 Your Company LLC. <a href="/" className="hover:underline">Yuna Theme</a> by <a href="/" className="hover:underline">SSVR Design</a>.
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;