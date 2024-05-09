// import { useState } from 'react'
// import React from 'react'
// import Navbar from'./Components/Navbar'
// import UserNavbar from './Components/UserNavbar'
import Login from './pages/auth/Login'
import './index.css'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/auth/Register'
import 'react-toastify/dist/ReactToastify.css';

//import SavedRecipes from './Components/SavedRecipes'


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' exact element={<Login/>}/>
        <Route path='/register' exact element={<Register/>}/>

      </Routes>
    </>
  )
}

export default App