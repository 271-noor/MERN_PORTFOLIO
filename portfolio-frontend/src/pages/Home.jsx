import React from 'react'
import Hero from './sub-components/Hero'
import Timeline from './sub-components/Timeline'
import About from './sub-components/About'
import Skill from './sub-components/Skill'
import Portfolio from './sub-components/Portfolio'
import MyApps from './sub-components/MyApps'
import Contact from './sub-components/Contact'


const Home = () => {
  return (
    <article className='px-5 mt-10 sm:mt-14 md:mt-16 lg:mt-24 xl:m-32 sm:mx-auto w-full max-w-[1050px] flex flex-col gap-14' >
      <Hero/>
      <Timeline/>
      <About/>
      <Skill/>
      <Portfolio/>
      <MyApps/>
      <Contact/>
    </article>
  )
}

export default Home
