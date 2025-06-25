import React from 'react'
import Footer from '../components/global/footer'
import Testimonials from '../components/Home/testimonial'

import HowItWorks from '../components/Home/howItWorks'
import PopularCategories from '../components/Home/popular'
import Hero from '../components/Home/hero'
import Navbar from '../components/global/navbar'
import CallToAction from '../components/Home/callToAction'

import ConsultantManager from '../components/ConsultantProfile/ConsultantManager'
import FAQ from '../components/Home/FAQ'

const Home = () => {
  return (
    <div className="min-h-screen ">
      <Hero />
      <PopularCategories />
      <HowItWorks />
      <ConsultantManager/>
      <FAQ />
      <Testimonials />
      <CallToAction/>
    </div>
  )
}

export default Home