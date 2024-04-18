import { useState } from 'react'
import React from 'react'
import Navbar from'./Components/Navbar'
import './index.css'

const App = () => {
  return (
    <>
    <Navbar/>
    
    <h1 className='text-DarkGreen my-32 lg:text-6xl md:text-5xl text-4xl font-semibold'>Hello World</h1>
    <h2 className='my-32 lg:text-5xl md:text-4xl text-2xl font-semibold'>Hello World</h2>
    <h3 className='my-32 lg:text-4xl md:text-3xl text-2xl font-semibold'>Hello World</h3>
    <h4 className='my-32 lg:text-3xl md:text-2xl text-xl font-semibold'>Hello World</h4>
    <h5 className='my-32 lg:text-2xl md:text-xl text-lg font-semibold'>Hello World</h5>
    <h6 className='my-32 lg:text-2xl md:text-xl text-lg font-semibold'>Hello World</h6>
    <a href="#"><button className="rounded-full bg-DarkGreen py-3 px-8 text-base font-medium  leading-normal text-White transition duration-150 ease-in-out hover:bg-LightGreen hover:text-DarkGreen">
        Button
      </button></a> {/*Primary Button*/}

      <a href="#"><button className="rounded-full border border-DarkGreen py-3 px-8 text-base font-medium leading-normal text-DarkGreen transition duration-150 ease-in-out hover:border-DarkGreen hover:bg-DarkGreen hover:text-White">
        Button
      </button></a> {/*Border Button*/}

      <a href="#"><button className="rounded-full border border-White py-3 px-8 text-base font-medium leading-normal text-White transition duration-150 ease-in-out hover:border-White hover:bg-White hover:text-DarkGreen">
        Button
      </button></a> {/*White Border Button*/}
    </>
  )
}

export default App