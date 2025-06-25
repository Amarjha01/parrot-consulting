import React from 'react'
import Footer from '../components/global/footer'
import Testimonials from '../components/Home/testimonial'

import HowItWorks from '../components/Home/howItWorks'
import PopularCategories from '../components/Home/popular'
import Hero from '../components/Home/hero'
import Navbar from '../components/global/navbar'
import CallToAction from '../components/Home/callToAction'

import ConsultantManager from '../components/ConsultantProfile/ConsultantManager'
import HowItWorksAndFAQ from '../components/Home/HowItWorksAndFAQ'

const Home = () => {
  return (
    <div className="min-h-screen ">
      <Hero />
      <PopularCategories />
      <HowItWorks />
      <ConsultantManager/>
      <HowItWorksAndFAQ />
      <Testimonials />
      <CallToAction/>
    </div>
  )
}

export default Home