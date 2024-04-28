import { useState } from 'react'
import React from 'react'
import Navbar from'./Components/Navbar'
import UserNavbar from './Components/UserNavbar'
import Footer from'./Components/Footer'
import Login from './Components/Login'
import './index.css'
import AuthenticationProvider from './Components/AuthenticationProvider'
import NavbarLogic from './Components/NavbarLogic'

const App = () => {
  return (
    <>
      <Navbar/>
 
      
      <Footer/>
    </>
  )
}

export default App