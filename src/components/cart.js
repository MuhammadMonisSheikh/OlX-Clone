import React, { useEffect, useState } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import './css/navbar.css';
import './css/cart.css';

import olximg from '../components/images/olximg.png'
import fbicon from './images/facebookicon.svg';
import googleicon from './images/googleicon.svg';
import userpng from './images/pnguser.png'

function Cart() {


  const [searchTerm, setsearchTerm] = useState("")

  const navigate = useNavigate()

  const [modal, setModal] = useState(false);
  // const [menuOpen, setmenuOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  // localStorage.getItem("loggedIn", true)

  const userName = JSON.parse(localStorage.getItem("users"))
  const userData = JSON.parse(localStorage.getItem("users")); 

  const toggleModal = () => {
    setModal(!modal);
  };

  const loginCon = () => {
    setModal(false);
  };

  // localStorage.setItem("loggedIn", true)



  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("loggedIn"));
  const Logout = () => { 
    
    localStorage.removeItem("loggedIn"); // Only remove the logged-in status
    setIsLoggedIn(null); // Update state to re-render and hide the logout button   
    // localStorage.removeItem("name");
    
    // localStorage.removeItem("signUp");
    // localStorage.removeItem("users");
    // // localStorage.removeItem("name");
    // localStorage.clear();
    navigate('/');

} 
  useEffect(() => {

    const handler = () => {
      setOpen(false)
    };

    document.addEventListener("mousedown", handler);
  })

  const carts = JSON.parse(localStorage.getItem('cart')) || []


  let cartNumbers = carts.reduce((acc, item) => acc + item.quantity, 0);

  const handleDecre = (id) => {
    const updatedCart = carts.map(item => {
      if (item.id === id && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    navigate('/cart')
  }

  const handleIncre = (id) => {
    const updatedCart = carts.map(item => {
      if (item.id === id && item.quantity < 10) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    navigate('/cart')
  }

  const handleRemove = (id) => {
    const updatedCart = carts.filter(item => item.id !== id)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    navigate('/cart')
  }

  const [opens, setOpens] = useState(false)
  const [totals, setTotals] = useState(0)

  useEffect(() => {
    const total = carts.reduce((acc, item) => {
      return acc + (item.price * item.quantity)
    }, 0)
    setTotals(total)

  }, [carts])
  
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setInputValue(option);
    setShowDropdown(false);
  };

  const options = ['Faisalabad', 'Lahore', 'Karachi'];



  return (
    <>

<div>
        {/* Menu icon outside sidebar - only shows when sidebar is closed */}
        {!isOpen && (
          <i className="fa-solid fa-bars menu__icon" onClick={toggleSidebar}></i>
        )}



        {/* Sidebar */}
        {isOpen && (
          <>
<div className='navbar' id="navbar_mb">


<div className='navbar__logo'>
  {/* <i class="fa-solid fa-bars menu__icon" onClick={() => {setmenuOpen(!menuOpen)}}></i> */}
  <Link to={'/home'} className='olx__img'><img src={olximg} alt='olx' className='olx__img olx__image'/></Link>
  <Link to={'/bike'} style={{ textDecoration: "none", color: "#002F34" }} className='car__icons'><i className="fa-solid fa-car navbar__car navbar__icons"></i><span className='mot__text'>Motors</span></Link>
  <p style={{ color: "#002F34" }} className='car__icons car__icon'><i className="fa-solid fa-city navbar__car navbar__icons"></i><span className='mot__text'>Property</span></p>
 
</div>


</div>
            <div className="sidebar">
              {/* Menu icon within sidebar to act as a close button */}
              <i className="fa-solid fa-bars menu__icon" onClick={toggleSidebar}></i>

              {/* Login Section */}
              <div id="navbar__log ">
                {!localStorage.getItem("loggedIn") ? (
                  <p className="log__text nav__login sidebar__button" onClick={() => { toggleModal(); toggleSidebar(); }}>Login</p>
                ) : (
                  <p className="user__card">
                    <img src={userpng} alt="profile card" className="user__img"  />
                    <div className="user__name">Hello, {userName.name}</div>
                  </p>
                )}
              </div>

              {/* Additional Sidebar Buttons */}
             <Link to={'/'}> <button className="sidebar__button" onClick={toggleSidebar}>Home</button></Link>
              <button className="sidebar__button" onClick={toggleSidebar}>Profile</button>
              <button className="sidebar__button" onClick={toggleSidebar}>Settings</button>
              {isLoggedIn && (
              <div className="profile-card-ctr">
                <button className="logout__btn" onClick={Logout}>Log out</button>
              </div>
            )}
          
            </div>
          </>
        )}
      </div>


<div className='navbar__search'>

  {/* <div className='navbar__select navbar__search-cont'>
      <p className='loc__details'><i class="fa-solid fa-location-dot loc__icon"></i> <span>Jinnah Town, Faisalabad</span></p>
      <i class="fa-solid fa-chevron-down down__icom"></i>
    </div> */}

<div className="input-container">
<span className="location-icon"><i class="fa-solid fa-location-dot"></i></span>
<input
  type="text"
  value={inputValue}
  onChange={handleInputChange}
  placeholder="Enter location"
  onClick={handleDropdownClick}
  className="drop__input"
/>
<span className="dropdown-icon" onClick={handleDropdownClick}>▼</span>
{showDropdown && (
  <ul className="dropdown-options">
    {options.map((option) => (
      <li key={option} onClick={() => handleOptionSelect(option)} className="drop__li">
        <i class="fa-solid fa-location-dot"></i> {option}
      </li>
    ))}
  </ul>
)}
</div>

  <div className='navbar__sear navbar__search-cont'>
    <input type='text' placeholder='Find Cars, Mobile Phones and more...' className='navbar__input' id='navbar__input' onChange={(event) => { setsearchTerm(event.target.value) }} />
    <i class="fa-solid fa-magnifying-glass mag__icon"></i>
  </div>
  <div id='navbar__log' className="navbar__login_desktop">
            {!localStorage.getItem("loggedIn") ? (
                <p className='log__text nav__login'onClick={toggleModal}>Login</p>
            ) : (
                <p>
                    {userData && userData.profileImage ? (
                        <img src={userData.profileImage} alt="Profile" className='user__img'   onClick={()=> {setOpen(!open)}}/>
                    ) : (
                        <img src={userpng} alt="Default Profile" className='user__img' onClick={() => { setOpen(!open) }} />
                    )}
                </p>
            )}
        </div>
  <button className='navbar__btn nav__login' id='navbar__btn' onClick={() => {
    if (!localStorage.getItem("loggedIn") === true) {
      toggleModal();
    } else {
      navigate('/addpost');
    }
  }}><i class="fa-solid fa-plus add__icon"></i> Sell</button>


</div>

{modal && (
  <div className="modal">
    <div onClick={toggleModal} className="overlay"></div>
    <div className="modal-content">

      <div className='popup__image'>
        <img src={olximg} alt={olximg} className='popup__logo' />
      </div>
      <p className='log__para'>
        Login into your OLX account
      </p>

      <div className='google__cont'>
        <img src={googleicon} alt={googleicon} className='google__img' />
        <span>Login with Google</span>
      </div>


      <div className='google__cont'>
        <img src={fbicon} alt={fbicon} className='google__img' />
        <span>Login with Facebook</span>
      </div>
      <div className='or__head'>
        <p className='or__text'>OR</p>
      </div>
      <div className='google__cont'>
        <i class="fa-regular fa-envelope popup__env"></i>
        <Link to={'/signin'}>

<span>Login with Email</span>
</Link>
      </div>
      <div className='google__cont'>
        <i class="fa-solid fa-phone popup__env"></i>
        <span>Login with Phone</span>
      </div>
      <div className='or__head'>
        <Link to={'/signup'} onClick={loginCon} className='new__text'>New to OLX? Creat an account</Link>
      </div>
      <i className="fa-solid fa-xmark close-modal" onClick={toggleModal}></i>
    </div>
  </div>
)}

{localStorage.getItem("loggedIn") &&
  <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} id='user__details'>
    {/* // <div className='user__details' id='wrapper'> */}
    {/* <a href='#close'><i class="fa-solid fa-xmark user__mark"></i></a> */}
    <div className="user__name">Hello, {userName.name}</div>
    <div className="profile-card-ctr">
      <button className="logout__btn" onClick={Logout}>Log out</button>
    </div>
  </div>
}



      


<div className="cart relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">

      {/* <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div> */}

      <div className="overflow-hidden">
        <div className="inset-0 overflow-hidden">
          <div className="pointer-events-none inset-y-0 flex pl-10">

            <div className="cart__secs pointer-events-auto w-screen max-w-xl w-900">
              <div className="flex h-full flex-col overflow-y-hidden bg-white shadow-xl">
                <div className="flex-1 overflow-y-hidden px-5 py-6 sm:px-6" id="cart__cart">
                  <div className="cart__heads flex items-start justify-between">
                    <h2 className="shop__text text-lg font-medium" id="slide-over-title">Product</h2>
                    <div className="ml-3 flex h-7 items-center">
                      {/* <button type="button" class="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                          <span class="absolute -inset-0.5"></span>
                          <span class="sr-only">Close panel</span>
                          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button> */}
                      <p className="item__text text-lg font-bold">Price</p>
                    </div>
                  </div>

                  {
                    carts?.map(cart => {
                      return (
                        <div className="cart__cont mt-8">
                          <div className="flow-root">
                            <ul className="-my-6 divide-y divide-gray-200">
                              <li className="flex py-6 justify-center items-left">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img src={cart?.image} alt={cart?.title} className="h-full w-full object-contain object-center" />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3 className='cart-name'>
                                      {cart?.name}
                                      </h3>
                                      <p className="ml-4 cart-price">$ {cart?.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500 cart-cat">{cart?.category}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="quan__boxs">
                                      <span className="decre__btns"><i className="fa fa-minus" onClick={() => handleDecre(cart?.id)}></i></span>
                                      <p className="text-gray-500 quantity__text">{cart?.quantity}</p>
                                      <span className="incre__btns"><i className="fa fa-plus" onClick={() => handleIncre(cart?.id)}></i></span>
                                    </div>



                                    <div className="flex">
                                      <button type="button" className="cart-remove font-medium text-indigo-600 hover:text-indigo-500" onClick={() => handleRemove(cart?.id)}>Remove</button>
                                    </div>

                                  </div>
                                </div>
                              </li>


                            </ul>
                          </div>

                        </div>
                      )
                    })
                  }


                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                    <p className='sub__text'>total</p>
                    <p className='total__text'>${totals}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-7 cont__btn">
                    <a href="to" className="cont__button rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</a>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or
                      <Link to={'/products'} className="font-medium text-indigo-600 hover:text-indigo-500">
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </Link>
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </>
  );
}

export default Cart;
