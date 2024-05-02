import React from 'react'
import homeimg from '../assets/home.svg'
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import '../css/Homecontent.css'

function Homecontent(props) {
  return (
    <>
        {/* <div className='homecontent text-gray-500 dark:text-gray-400'> 
        <h1 className = "text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">Tell me what's wrong</h1>
        <br />
        <br />
        
        <Button name={props.title} to={props.link} />
        </div>
        <div className='homeimg'>   
                <img
                    width="650px"
                    src={homeimg}
                    alt="Your Company"
                  />

        </div> */}
         <section className="w-full py-6 md:py-12 lg:py-24 xl:py-32">
          <div className="container flex flex-col items-center justify-center px-4 md:px-6">
            <div className="space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-indigo-600 sm:text-5xl md:text-6xl/none">
                  Your mental well-being matters
                </h1>
                <p className="max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  AI-assisted therapy designed to provide personalized support, whenever you need it.
                </p>
              </div>
              <div className="space-y-4">
                <Link
                  className="bg-indigo-600 inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-950"
                  to="/user/chat"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <img
              alt="Hero"
              className="mx-5 mt-10 overflow-hidden rounded-xl object-cover"
              height="340"
              src={homeimg}
              width="730"
            />
          </div>
          <br />
          <br />
        </section>
        
    </>
  )
}

export default Homecontent