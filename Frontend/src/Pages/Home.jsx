import React from 'react'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Stats from '../components/Stats'
import Card from '../components/Card'
import { useNavigate } from 'react-router-dom'


export default function Home() {
  const Navigation = useNavigate();
  return (
    <div className='m-0 p-0 overflow-hidden'>
        <Navbar/>
        <Hero/>
        <Stats />
        <Card />
        <Footer />
    </div>
  )
}
