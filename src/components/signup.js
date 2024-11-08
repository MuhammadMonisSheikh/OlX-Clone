import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import './css/signup.css';
import olximg from '../components/images/olximg.png';
import fbicon from './images/facebookicon.svg';
import googleicon from './images/googleicon.svg';
import userpng from './images/pnguser.png';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.css';

function Signup() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    profileImage: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || {};
    users[input.email] = input;
    localStorage.setItem("users", JSON.stringify(users));
    toast.success("Account created successfully!");
    navigate('/signin');
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const img = new Image();
      const reader = new FileReader();

      reader.onloadend = () => {
        img.src = reader.result;

        img.onload = () => {
          const { width, height } = img;

          // Set your size limits here
          const maxWidth = 780; // Maximum width in pixels
          const maxHeight = 780; // Maximum height in pixels
          const maxSize = 2 * 1024 * 1024; // Maximum file size in bytes (2MB)

          if (width > maxWidth || height > maxHeight) {
            toast.error(`Image dimensions should not exceed ${maxWidth}x${maxHeight} pixels.`);
            setInput({ ...input, profileImage: null });
          } else if (file.size > maxSize) {
            toast.error(`Image size should not exceed ${maxSize / (1024 * 1024)} MB.`);
            setInput({ ...input, profileImage: null });
          } else {
            setInput({ ...input, profileImage: reader.result });
          }
        };
      };

      reader.readAsDataURL(file);
    }
  };

  const [searchTerm, setsearchTerm] = useState("");
  const [modal, setModal] = useState(false);
// const [menuOpen, setmenuOpen] = useState(false);

const [isOpen, setIsOpen] = useState(false);
const [open, setOpen] = useState(false);

const toggleSidebar = () => {
  setIsOpen(!isOpen);
};


  const userName = JSON.parse(localStorage.getItem("users"));
  const userData = JSON.parse(localStorage.getItem("users")); 
  const toggleModal = () => {
    setModal(!modal);
  };

  const loginCon = () => {
    setModal(false);
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
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
      setOpen(false);
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

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
        // <div className="user__details" id='wrapper'>
        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} id='user__details'>
          {/* <a href='#close'><i class="fa-solid fa-xmark user__mark"></i></a> */}
          <div className="user__name">Hello, {userName.name}</div>
          <div className="profile-card-ctr">
            <button className="logout__btn" onClick={Logout}>Log out</button>
          </div>
        </ div>
      }

      <div className="signup__cont">
        <div className="signup-content">
          <div className='popup__image'>
            <img src={olximg} alt={olximg} className='signup__logo' />
          </div>
          <p className='log__para'>
            Create a new OLX account
          </p>

          <form className='login__form' onSubmit={handleSubmit}>
            {/* Profile Image Upload */}
            <div className='login__group'>
              <label className='login__label'>Upload Profile Image</label>
              <input type='file' accept="image/*" onChange={handleImageUpload} className='login__email' />
              {input.profileImage && (
                <img src={input.profileImage} alt="Profile Preview" className='profile-preview' />
              )}
            </div>
            <div className='login__group'>
              <label className='login__label'>Enter your name</label>
              <input type='text' className='login__email' name='name' value={input.name} onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value, })} required />
            </div>

            <div className='login__group'>
              <label className='login__label'>Enter your email address</label>
              <input type='email' className='login__email' name='email' value={input.email} onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value, })} required />
            </div>

            <div className='login__group'>
              <label className='login__label'>Password</label>
              <input type='password' className='login__email' name='password' value={input.password} onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value, })} required />
            </div>

            <div className='login__button'>
              <button className='login__btn' type='submit'>Sign up</button>
              <ToastContainer />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;