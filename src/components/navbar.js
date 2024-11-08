import React, { useEffect, useState } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import olximg from '../components/images/olximg.png';
import './css/navbar.css';

function Navbar() {





  return (
    <>
      <div className='navbar'>


        <div className='navbar__logo'>
          {/* <i class="fa-solid fa-bars menu__icon" onClick={() => {setmenuOpen(!menuOpen)}}></i> */}
          <Link to={'/'} className='olx__img'><img src={olximg} alt='olx' className='olx__img olx__image' /></Link>
          <Link to={'/bike'} style={{ textDecoration: "none", color: "#002F34" }} className='car__icons'><i className="fa-solid fa-car navbar__car navbar__icons"></i><span className='mot__text'>Motors</span></Link>
          <p style={{ color: "#002F34" }} className='car__icons car__icon'><i className="fa-solid fa-city navbar__car navbar__icons"></i><span className='mot__text'>Property</span></p>
         
        </div>


</div>

    </>
  );
}

export default Navbar;
