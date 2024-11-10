import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaPhone } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import img from "../assets1/login.svg";
import { Link } from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
    city: "",
    id: "",
    userType: ""
  });

  const [error, setError] = useState("");
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9000/api/register", formData);
      const { token } = response.data;
      localStorage.setItem("token", token);
      // Redirect to a protected route or dashboard
      if(formData.userType == "Donor") {
        navigate(`/Donor/${formData.id}`)
    }
    else if(formData.userType == "Volunteer") {
        navigate(`/Volunteer/${formData.id}`)
    }
    else if(formData.userType == "Manager") {
        navigate(`/Manager/${formData.id}`)
    }
    } catch (error) {
      setError("Failed to sign up");
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#F8F4E1] to-[#E8DFC7] min-h-screen">
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-10">
              <h2 className="text-4xl font-bold text-[#543310] mb-8">Create Account</h2>
              {error && <p className="text-red-500">{error}</p>}
              <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                  <FaUser className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="name"
                    onChange={handleChange}
                    value={formData.name}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a78059] transition duration-300"
                  />
                </div>
                <div className="relative">
                  <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formData.email}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a78059] transition duration-300"
                  />
                </div>
                <div className="relative">
                  <FaPhone className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    value={formData.phone}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a78059] transition duration-300"
                  />
                </div>
                <div className="relative">
                  <FaLock className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={formData.password}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a78059] transition duration-300"
                  />
                </div>
                <div className="relative">
                  <FaUser className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="number"
                    name="id"
                    placeholder="id"
                    onChange={handleChange}
                    value={formData.id}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a78059] transition duration-300"
                  />
                </div>
                <div className="relative">
                  <FaUser className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="text"
                    name="city"
                    placeholder="city"
                    onChange={handleChange}
                    value={formData.city}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a78059] transition duration-300"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#74512D] text-white rounded-lg py-3 font-semibold hover:bg-[#543310] transition duration-300 transform hover:scale-105"
                >
                  Sign Up
                </button>
              </form>
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?
                  <Link to="/login" className="ml-2 text-[#a78059] hover:underline focus:outline-none font-semibold">
                    Log In
                  </Link>
                </p>
              </div>
            </div>
            <div className="hidden md:block w-1/2">
              <img src={img} alt="signup" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;