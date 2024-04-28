import { useState } from 'react'
import React from 'react'
import Navbar from'./Components/Navbar'
import UserNavbar from './Components/UserNavbar'
import Footer from'./Components/Footer'
import './index.css'
import AuthenticationProvider from './Components/AuthenticationProvider'
import NavbarLogic from './Components/NavbarLogic'

const App = () => {
  return (
    <>
    <AuthenticationProvider>
      <NavbarLogic/>
    </AuthenticationProvider>
      
      <Footer/>
    </>
  )
}

export default App