import React, { useState } from 'react'
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import './promocode.scss'
import Coupon from '../../components/PromoCode/Coupon';




const PromoCode = () => {
  return (
    <div className='PromoCode'>
        <Sidebar/>
    <div className="PromoContainer">
        <Navbar/>
        <Coupon/>
        
        
    </div>
    </div>
  )
}

export default PromoCode