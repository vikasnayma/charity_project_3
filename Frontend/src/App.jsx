import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import {Router, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import Projects from './Pages/Projects'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login'
import Volunteer from './Pages/Volunteer';
import Signup from './Pages/Signup';
import PaymentForm from './Pages/PaymentForm';

function App() {
  return (
    <div>
      {/* <Navbar />
      <Hero /> */}
  
        
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Donor" element={<Dashboard />} />
        <Route path="/Volunteer" element={<Volunteer/>} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/PaymentForm" element={<PaymentForm />} />
        </Routes>


       

    </div>
  );
}

export default App;
