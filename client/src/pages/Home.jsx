import React from 'react'
import Footer from '../components/global/footer'
import Testimonials from '../components/Home/testimonial'
import MeetExperts from '../components/Home/ConsultantCard'
import HowItWorks from '../components/Home/howItWorks'
import PopularCategories from '../components/Home/popular'
import Hero from '../components/Home/hero'
import Navbar from '../components/global/navbar'
import CallToAction from '../components/Home/callToAction'

const Home = () => {
  return (
    <div className="min-h-screen bg-amber-50">
      <Navbar />
      <Hero />
      <PopularCategories />
      <HowItWorks />
      <MeetExperts />
      <Testimonials />
      <CallToAction/>
      <Footer />
    </div>
  )
}

export default Home