import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [values, setValues] = useState({
        role: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const [errors, setErrors] = useState(null);

    const handleInput = (e) => {
        setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))
    }

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
         console.log(values)
       
          axios.post(`http://localhost:9000/login`, values)
          .then(res => {
            res.cookie('token', token);
            if(res.data.Status === "Success") {
               if(res.data.role == "donor") {
                   navigate("/Donordashboard")
               }
               else if( res.data.role == "volunteer") {
                   navigate("/Volunteerdashboard")
               }
               else if(res.data.role == "manager"){
                navigate("/Managerdashboard")
               }
            }
            else {
               alert(res.data.Message)
            }
          })
          .catch(err =>console.log(err))
       
     }
    

  return (
    <div className='m-0 p-0 w-screen h-screen flex justify-center items-center bg-blue-700'>
      <form action="" onSubmit={handleSubmit} className="bg-white p-3 rounded w-1/4">
        <h2 className='mb-3 text-gray-700 font-bold text-center'>Login</h2>
        <div name="role" className='space-x-2' required>
         <input type="radio" id="donor" name="role" value="donor" onChange={handleInput} required />
         <label htmlFor="donor">Donor</label>

         <input type="radio" id="donor" name="role" value="manager" onChange={handleInput} required />
         <label htmlFor="donor">Manager</label>

         <input type="radio" id="volunteer" name="role" value="volunteer" onChange={handleInput} required />
         <label htmlFor="volunteer">Volunteer</label>
      </div>
        <div className="mb-3 text-gray-700">
          <label htmlFor='email'>Email</label>
          <input type="email" id="email" name="email" placeholder='Enter Email' 
          onChange={handleInput} className='w-full rounded p-2' required />
        </div>
        <div className="mb-3 text-gray-700">
          <label htmlFor='password'>Password</label>
          <input type="password" id="password" name='password' placeholder='Enter Password'
          onChange={handleInput} className='w-full rounded p-2' required />
        </div> 
        <input type='checkbox' required />
        <span className='text-gray-700 text-sm p-2  '>You agree to our terms and policies </span>
        <button type="submit" className="w-full bg-green-700 py-1 text-white">Login</button>      
        { errors && <span>{errors}</span> }       
        <button className="mt-2 text-gray-700 w-full text-center border py-1 rounded"><Link to="/signup">Create Account</Link></button> 
      </form>
    </div>
  )
}

export default Login;

// import React, { useState } from "react";
// import { FaEnvelope, FaLock } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";
// import Cookies from "js-cookie";
// import login from "../assets1/auth.svg";
// import { Link } from "react-router-dom";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "", userType: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:9000/api/auth/login", formData, {
//         withCredentials: true,
//       });

//       const { token, userType } = response.data;
//       Cookies.set("token", token, { expires: 1 }); // Store token in cookie for 1 day

//       if (userType === "donor") {
//         navigate("/Donordashboard");
//       } else if (userType === "volunteer") {
//         navigate("/Volunteerdashboard");
//       } else if (userType === "manager") {
//         navigate("/Managerdashboard");
//       }
//     } catch (error) {
//       setError("Invalid email or password");
//       console.error(error); // Log full error for debugging
//     }
//   };

//   return (
//     <div className="bg-gradient-to-b from-[#dbb8b8] to-[#8c7a7a] min-h-screen">
//       <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
//         <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">
//           <div className="flex flex-col md:flex-row">
//             <div className="w-full md:w-1/2 p-10">
//               <h2 className="text-4xl font-bold text-[#5f1515] mb-8">Welcome Back</h2>
//               {error && <p className="text-red-500">{error}</p>}
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="relative">
//                   <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     onChange={handleChange}
//                     value={formData.email}
//                     className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a78059] transition duration-300"
//                     required
//                   />
//                 </div>
//                 <div className="relative">
//                   <FaLock className="absolute top-3 left-3 text-gray-400" />
//                   <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     onChange={handleChange}
//                     value={formData.password}
//                     className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a78059] transition duration-300"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <p className="text-gray-700 font-medium">Select User Type:</p>
//                   <div className="flex items-center space-x-4">
//                     <label className="flex items-center text-gray-700">
//                       <input
//                         type="radio"
//                         name="userType"
//                         value="donor"
//                         onChange={handleChange}
//                         className="text-[rgb(197,122,122)] focus:ring-[#d89090] focus:ring-2 transition duration-300"
//                         required
//                       />
//                       <span className="ml-2">Donor</span>
//                     </label>
//                     <label className="flex items-center text-gray-700">
//                       <input
//                         type="radio"
//                         name="userType"
//                         value="volunteer"
//                         onChange={handleChange}
//                         className="text-[#5f1515] focus:ring-[#5f1515] focus:ring-2 transition duration-300"
//                         required
//                       />
//                       <span className="ml-2">Volunteer</span>
//                     </label>
//                     <label className="flex items-center text-gray-700">
//                       <input
//                         type="radio"
//                         name="userType"
//                         value="manager"
//                         onChange={handleChange}
//                         className="text-[#5f1515] focus:ring-[#5f1515] focus:ring-2 transition duration-300"
//                         required
//                       />
//                       <span className="ml-2">Manager</span>
//                     </label>
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-[#5f1515] text-white rounded-lg py-3 font-semibold hover:bg-[#543310] transition duration-300 transform hover:scale-105"
//                 >
//                   Log In
//                 </button>
//               </form>
//               <div className="mt-8 text-center">
//                 <p className="text-sm text-gray-600">
//                   Don't have an account?
//                   <Link to="/signup" className="ml-2 text-[#2a2c1a] hover:underline focus:outline-none font-semibold">
//                     Sign Up
//                   </Link>
//                 </p>
//               </div>
//             </div>
//             <div className="hidden md:block w-1/2">
//               <img src={login} alt="login" className="object-cover w-full h-full" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
