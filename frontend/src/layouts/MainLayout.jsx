import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { Outlet } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";


export default function MainLayout() {
  return (
    <div >
    <Header/>
    <Outlet/>
     <ToastContainer />
    <Footer/>
    </div>
  )
}
