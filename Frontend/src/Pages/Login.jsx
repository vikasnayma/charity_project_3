import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Login() {

  const [values, setValues] = useState({
    role: '',
    email: '',
    password: ''
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
   
      axios.post(`http://localhost:8000/login`, values)
      .then(res => {
        if(res.data.Status === "Success") {
           if(res.data.role == "Donor") {
               navigate("/Donor/res.data.id")
           }
           else if( res.data.role == "Volunteer") {
               navigate("/Volunteer/res.data.id")
           }
          //  navigate('/Home')
        }
        else {
           alert(res.data.Message)
        }
      })
      .catch(err =>console.log(err))
   
  }


  return (
    <div>
     
      {/* <Navbar /> */}
      <div className='m-0 p-0 w-screen h-screen flex justify-center items-center bg-[#910b0b]'>
      <form action="" onSubmit={handleSubmit} className="bg-white p-3 rounded w-1/4">
        <h2 className='mb-3 text-gray-700 font-bold text-center'>Login</h2>
        <div name="role" className='space-x-2' required>
         <input type="radio" id="donor" name="role" value="Donor" onChange={handleInput} required />
         <label htmlFor="donor">Donor</label>
  
         <input type="radio" id="volunteer" name="role" value="Volunteer" onChange={handleInput} required />
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
        <button className="mt-2 text-gray-700 w-full text-center border py-1 rounded"><Link to="/Signup">Create Account</Link></button> 
      </form>
      </div>


    </div>
  )
}
