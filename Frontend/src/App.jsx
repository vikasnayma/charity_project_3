import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import {Router, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import Projects from './Pages/Projects'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Login from './components/Login'
import Volunteerdashboard from './Pages/Volunteerdashboard';
import Managerdashboard from './manager-dashboard/Managerdashboard';
import  Signup from './components/Signup';
import Donordashboard from './Pages/Donordashboard'
import PaymentForm from './Pages/PaymentForm'


function App() {
  return (
    <div>

        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Donordashboard" element={<Donordashboard/>} />
        <Route path="/Volunteerdashboard" element={<Volunteerdashboard/>} />
        <Route path="/Managerdashboard" element={<Managerdashboard/>} />
        <Route path="/Signup" element={<Signup />} />
        <Route path='/PaymentForm' element={<PaymentForm/>} />
        </Routes>


       

    </div>
  );
}

export default App;
