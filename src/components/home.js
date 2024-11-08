import React, { useEffect, useState } from "react";
import '../App.css';
import './css/navbar.css'
import { Productss } from "./carslist";
import { bikes } from "./bikelist";
import { Link, useNavigate } from "react-router-dom";
import { items } from "./productList";

import olximg from '../components/images/olximg.png'
import fbicon from './images/facebookicon.svg';
import googleicon from './images/googleicon.svg';
import userpng from './images/pnguser.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { default as Slider } from "react-slick";
function Home() {

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Set the speed of autoplay (in milliseconds)
  };


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

  const handleCart = (mobile) => {
    console.log(mobile)
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const isProductExist = cart.find(item => item.id === mobile.id)
    if (isProductExist) {
      const updatedCart = cart.map(item => {
        if (item.id === mobile.id) {
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }
        return item
      })
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    } else {
      localStorage.setItem('cart', JSON.stringify([...cart, { ...mobile, quantity: 1 }]))
    }
    navigate('/')
  }

  const handleCarts = (car) => {
    console.log(car)
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const isProductExist = cart.find(item => item.id === car.id)
    if (isProductExist) {
      const updatedCart = cart.map(item => {
        if (item.id === car.id) {
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }
        return item
      })
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    } else {
      localStorage.setItem('cart', JSON.stringify([...cart, { ...car, quantity: 1 }]))
    }
    navigate('/')
  }

  const handleCartss = (bike) => {
    console.log(bike)
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const isProductExist = cart.find(item => item.id === bike.id)
    if (isProductExist) {
      const updatedCart = cart.map(item => {
        if (item.id === bike.id) {
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }
        return item
      })
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    } else {
      localStorage.setItem('cart', JSON.stringify([...cart, { ...bike, quantity: 1 }]))
    }
    navigate('/')
  }

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

  const [opens, setOpens] = useState(false)

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
    navigate('/')
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
    navigate('/')
  }

  const handleRemove = (id) => {
    const updatedCart = carts.filter(item => item.id !== id)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    navigate('/')
  }

  const [totals, setTotals] = useState(0)

  useEffect(() => {
    const total = carts.reduce((acc, item) => {
      return acc + (item.price * item.quantity)
    }, 0)
    setTotals(total)

  }, [carts])



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
  <Link to={'/'} className='olx__img'><img src={olximg} alt='olx' className='olx__img olx__image'/></Link>
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



      <div className='cart__png'>
        <i class="fa-solid fa-cart-shopping cart__icon" onClick={() => setOpens(!opens)}><sup className="cart__sup">{cartNumbers}</sup></i>
      </div>






      <div className={`cart-side ${opens ? 'active' : 'inactive'}`} id='cart__side' aria-labelledby="slide-over-title" role="dialog" aria-modal="true">

        {/* <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div> */}

        <div className="overflow-hidden">
          <div className="inset-0 overflow-hidden">
            <div className="pointer-events-none inset-y-0 flex pl-10">

              <div className="cart__sec pointer-events-auto w-screen max-w-xl w-full">
                <div className="flex h-full flex-col overflow-y-hidden bg-white">
                  <div className="flex-1 overflow-y-hidden px-5 py-6 sm:px-5 cart__carts">
                    <div className="cart__head flex items-start justify-between">
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
                    </ div>

                    {
                      carts.map(cart => {
                        return (
                          <div className="cart__cont mt-8">
                            <div className="flow-root">
                              <ul className="-my-6 divide-y divide-gray-200">
                                <li className="flex py-6 justify-center items-left">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img src={cart.image} alt={cart.name} className="cart__img h-full w-full object-contain object-center" />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3 className='cart__name'>
                                          {cart.name}
                                        </h3>
                                        <p className="ml-4 cart__price">Rs {cart.price}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500 cart__cat">{cart.category}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="quan__box">
                                        <span className="decre__btn"><i className="fa fa-minus" onClick={() => handleDecre(cart.id)}></i></span>
                                        <p className="text-gray-500 cart__quan">{cart.quantity}</p>
                                        <span className="incre__btn"><i className="fa fa-plus" onClick={() => handleIncre(cart.id)}></i></span>
                                      </div>



                                      <div className="flex">
                                        <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500 cart-remove" onClick={() => handleRemove(cart?.id)}>Remove</button>
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
                      <p className='total__text'>Rs {totals}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-7 cont__btn">
                      <Link to={'/cart'} className="cont__button rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">View cart</Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or
                        <Link to={'/'} className="font-medium text-indigo-600 hover:text-indigo-500">
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





      <div className='navbar__search'>

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




      <div className="home__section">

        <div className="cat__texts">
          <p className="all__text">ALL CATEGORIES <i class="fa-solid fa-angle-down don__icom"></i></p>
          <Link to={'/mobile'} style={{ textDecoration: "none" }} className="all__text">Mobile Phones</Link>
          <Link to={'/car'} style={{ textDecoration: "none" }} className="all__text">Cars</Link>
          <Link to={'/bike'} style={{ textDecoration: "none" }} className="all__text">Motorcycles</Link>
          <p className="all__text">Houses</p>
          <p className="all__text">Video-Audios</p>
          <p className="all__text">Tablets</p>
          <p className="all__text">Land & Plots</p>
        </div>


        <div className="ban__image">
          <Slider
            {...settings}
            className="slider"
            appendDots={(dots) => <div className="slick-dots">{dots}</div>}
          >
            <div>
              <img src="./assets/homebanner1.webp" alt="homebanner" className="ban__img" />
            </div>
            <div>
              <img src="./assets/homebanner2.webp" alt="homebanner" className="ban__img" />
            </div>
          </Slider>
        </div>
        <div className="ban__image baner__image">
          <img src="./assets/pastimg.png" alt="homebanner" className="post__img" />
        </div>

        <div className="cat__head">
          <h1 className="cat__text">All categories</h1>
        </div>

        <div className="cat__section">

          <div className="cat__images">
            <Link to={'/mobile'} style={{ textDecoration: "none", color: "#002F34" }} className="cat__textss"><img src="./assets/mobileicon.png" alt="mobileimage" className="cat__img" /><span className="mobile__text">Mobile</span></Link>
            <Link to={'/car'} style={{ textDecoration: "none", color: "#002F34" }}><img src="./assets/caricon.png" alt="mobileimage" className="cat__img" /><span className="mobile__text">Vehicles</span></Link>
            <p><img src="./assets/houseicon.png" alt="mobileimage" className="cat__img" /><span className="pro__text">Property For Sale</span></p>
            <p><img src="./assets/propertyicon.png" alt="mobileimage" className="cat__img" /><span className="pro__text">Property For Rent</span></p>
            <p><img src="./assets/cameraicon.png" alt="mobileimage" className="cat__img" /><span className="electro__text">Electronics & Home Appliance</span></p>
            <Link to={'/bike'} style={{ textDecoration: "none", color: "#002F34" }}><img src="./assets/bikeicon.png" alt="mobileimage" className="cat__img" /><span className="bike__text bikes__text">Bikes</span></Link>
            <p><img src="./assets/jeepicon.png" alt="mobileimage" className="cat__img" /><span className="jeep__text">Buisness Industrial & Agriculture</span></p>
            <p><img src="./assets/painticon.png" alt="mobileimage" className="cat__img" /><span className="mobile__text">Services</span></p>
            <p><img src="./assets/bagicon.png" alt="mobileimage" className="cat__img" /><span className="bike__text job__text">Jobs</span></p>
            <p><img src="./assets/henicon.png" alt="mobileimage" className="cat__img" /><span className="mobile__text">Animals</span></p>
            <p><img src="./assets/chairicon.png" alt="mobileimage" className="cat__img" /><span className="furni__text">Furniture & Home Decor</span></p>
            <p><img src="./assets/sooticon.png" alt="mobileimage" className="cat__img" /><span className="pro__text">Fashion & Beauty</span></p>
            <p><img src="./assets/bookicon.png" alt="mobileimage" className="cat__img" /><span className="books__text">Books, Sports & Hobbies</span></p>
            <p><img src="./assets/kidsicon.png" alt="mobileimage" className="cat__img" /><span className="bike__text job__text">Kids</span></p>
          </div>
        </div>


        {/* ==================== MOBILE SECTION ================  */}

        <div className="mobile__container">

          <div className="recent__head">
            <h1 className="recent__text mobph__text">Mobile Phones</h1>
          </div>

          <div className="recent__cont">


            <div className="recent__prod">

              {
                items.filter((mobile) => {
                  if (searchTerm == "") {
                    return mobile;
                  } else if (mobile.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return mobile
                  }
                })
                  .map((mobile) => {
                    return (
                      <>

                        <div className="mobile__cont">
                          <div className="mobile__image">
                            <Link to={`/product/${mobile.id}`} style={{ textDecoration: "none" }} key={mobile.id}><img src={mobile.image} alt={mobile.name} className="mobile__img" /></Link>
                          </div>
                          <div className="mobile__box">
                            <div className="mobile__dil">
                              <p className="mobile__price">Rs {mobile.price}</p>
                              <i class="fa-regular fa-heart"></i>
                            </div>
                            <p className="mobile__name">{mobile.name}</p>
                            <p className="mobile__loc">{mobile.location}</p>
                            <p className="mobile__day">{mobile.days}</p>
                          </div>
                          <div className="cart__button">
                            <button className="cart__btn" onClick={() => handleCart(mobile)}>Add to Cart</button>
                          </div>
                        </div>

                      </>
                    )
                  })
              }


            </div>
          </div>

        </div>



        {/* ==================== CARS SECTION ================  */}

        <div className="recent__head">
          <h1 className="recent__text cars__text">Cars</h1>
        </div>

        <div className="recent__cont car__cont">



          <div className="recent__prod">

            {
              Productss.filter((car) => {
                if (searchTerm == "") {
                  return car;
                } else if (car.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return car
                }
              })
                .map((car) => {
                  return (
                    <>
                      <div className="mobile__cont">
                        <div className="mobile__image">
                          <Link to={`/productssss/${car.id}`} style={{ textDecoration: "none" }} key={car.id}><img src={car.image} alt={car.name} className="mobile__img" /></Link>
                        </div>
                        <div className="mobile__box">
                          <div className="mobile__dil">
                            <p className="mobile__price">Rs {car.price}</p>
                            <i class="fa-regular fa-heart"></i>
                          </div>
                          <p className="mobile__name">{car.name}</p>
                          <p className="mobile__loc">{car.location}</p>
                          <p className="mobile__day">{car.days}</p>
                        </div>
                        <div className="cart__button">
                          <button className="cart__btn" onClick={() => handleCarts(car)}>Add to Cart</button>
                        </div>
                      </div>
                    </>
                  )
                })
            }

          </div>
        </div>

        {/* ==================== BIKES SECTION ================  */}

        <div className="recent__head">
          <h1 className="recent__text cars__text">Bikes & Motorcycles</h1>
        </div>

        <div className="recent__cont car__cont">


          <div className="recent__prod">

            {
              bikes.filter((car) => {
                if (searchTerm == "") {
                  return car;
                } else if (car.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return car
                }
              })
                .map((bike) => {
                  return (
                    <>
                      <div className="mobile__cont">
                        <div className="mobile__image">
                          <Link to={`/productsssss/${bike.id}`} style={{ textDecoration: "none" }} key={bike.id}><img src={bike.image} alt={bike.name} className="mobile__img" /></Link>
                        </div>
                        <div className="mobile__box">
                          <div className="mobile__dil">
                            <p className="mobile__price">Rs {bike.price}</p>
                            <i class="fa-regular fa-heart"></i>
                          </div>
                          <p className="mobile__name">{bike.name}</p>
                          <p className="mobile__loc">{bike.location}</p>
                          <p className="mobile__day">{bike.days}</p>
                        </div>
                        <div className="cart__button">
                          <button className="cart__btn" onClick={() => handleCartss(bike)}>Add to Cart</button>
                        </div>
                      </div>
                    </>
                  )
                })
            }

          </div>
        </div>

      </div>

      {/* Add the OLX App section here */}
      <div className="download-app-cta">
        <div className="container">
          <div className="app-image">
            <img src="./assets/TT_OLX.webp" alt="OLX mobile app" />
            <div className="app-text">
              <h2>Try the OLX app</h2>
              <p>Buy, sell and find just about anything using the app on your mobile.</p>

            </div>
          </div>
          <div className="border"></div>
          <div className="app-content">
            <h2>Get your app today</h2>
            <div className="download-app-btns">
              <a href="https://apps.apple.com/pk/app/olx-pakistan/id1551315538" target="_blank" rel="noopener noreferrer">
                <img src="./assets/app_store.png" alt="App Store" />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.olx.pk" target="_blank" rel="noopener noreferrer">
                <img src="./assets/play_store.png" alt="Google Play" />
              </a>
              <a href="https://appgallery.huawei.com/#/app/C104375435" target="_blank" rel="noopener noreferrer">
                <img src="./assets/appbtn.png" alt="App Gallery" />
              </a>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Home;