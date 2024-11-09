import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'


function Signup() {

  const [values, setValues] = useState({
    role:'',
    name:'',
    city:'',
    phone:'',
    email:'',
    password:''
  })

  const navigate = useNavigate()

  const [errors, setErrors] = useState(null);
  const handleInput = (e) => {
    setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values)
       await axios.post(`http://localhost:8000/signup`, values)
       .then(res => {
        console.log(res) 
        navigate('/')
        })
       .catch(err =>console.log(err))
  }

  return (
    <>
       {/* <Navbar /> */}
       <div className='m-0 p-0 w-screen h-screen flex justify-center items-center bg-[#910b0b]'>
      <form action="" onSubmit={handleSubmit} className="bg-white p-3 rounded w-1/4">
      <h2 className='mb-3 text-gray-700 font-bold text-center'>Registration</h2>

      <div name="role" className='space-x-2' required>
         <input type="radio" id="donor" name="role" value="Donor" onChange={handleInput} required />
         <label htmlFor="donor">Donor</label>
  
         <input type="radio" id="volunteer" name="role" value="Volunteer" onChange={handleInput} required />
         <label htmlFor="volunteer">Volunteer</label>
      </div>

       <div className="mb-3 text-gray-700">
          <label htmlFor='name'>Name</label>
          <input type="text" name="name" placeholder='Enter your name'
          onChange={handleInput} className='w-full rounded p-2' required />
        </div>
        <div className="mb-3 text-gray-700">
          <label htmlFor='city'>City</label>
          <input type="text" name="city" placeholder='Enter city'
          onChange={handleInput} className='w-full rounded p-2' required />
        </div>
        <div className="mb-3 text-gray-700">
          <label htmlFor='phone'>PhoneNo</label>
          <input type="tel" name="phone" pattern="^\d{10}$" placeholder='Enter phone no'
          onChange={handleInput} className='w-full rounded p-2' required />
        </div>
        <div className="mb-3 text-gray-700">
          <label htmlFor='email'>Email</label>
          <input type="email" name="email" placeholder='Enter Email'
          onChange={handleInput} className='w-full rounded p-2' required />
        </div>
        <div className="mb-3 text-gray-700">
          <label htmlFor='password'>Password</label>
          <input type="password" id="password" name='password' placeholder='Enter Password'
          onChange={handleInput} className='w-full rounded p-2' required />
        </div> 
        <input type='checkbox' required />
        <span className='text-gray-700 text-sm p-2  '>You agree to our terms and policies </span>   
        <button type="submit" className="w-full bg-green-700 mt-3 py-1 text-white">Sign up</button>
        { errors && <span>{errors}</span> }
    
      </form>
    </div>
    </>
    
  )
}

export default Signup