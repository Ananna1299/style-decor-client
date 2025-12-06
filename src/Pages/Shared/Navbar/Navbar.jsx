import React from 'react';
import Logo from '../../../Components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../Hooks/useAuth';

const Navbar = () => {
  const { logout,user}=useAuth()

  const handleSignout=()=>{
    logout()
    .then((result)=>{
      console.log(result)

    })
    .catch(error=>{
      console.log(error)
    })
  }

    const links=<>
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink>Services</NavLink></li>
      <li><NavLink to="/coverage">Service Coverage</NavLink></li>
      <li><NavLink to="/about">About Us</NavLink></li>
      <li><NavLink>Contact</NavLink></li>
        
        {/* {
          user && <><li><NavLink to="send-parcel">Send Parcel</NavLink></li>
          <li><NavLink to="/dashboard">Dashboard</NavLink></li></>
        } */}

      </>
    return (
        <div className="navbar bg-base-100 shadow-sm rounded-xl px-4 mb-4 ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
   
    <Logo></Logo>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-gray-400">
        {links}
      
    </ul>
  </div>
  <div className="navbar-end">
    <div className="dropdown">
      <div tabIndex={0} role="button">
        <p className="btn my-btn-purple text-white rounded-xl font-semibold mr-2">Login Info</p>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100  rounded-box z-1 mt-3 w-25 md:w-30 lg:40 p-2 shadow">
         <li className='hover:bg-primary'>
          {
            user?<button onClick={handleSignout} className='font-semibold text-secondary'>Sign Out</button>:
            <Link to="/login" className='font-semibold text-secondary'>Sign In</Link>

           
          }

           </li>
          
          
          
          
        <li className='hover:bg-primary'><Link to="/register" className='font-semibold text-secondary'>Sign Up</Link></li>
      </ul>
    </div>

    
  </div>
</div>
    );
};

export default Navbar;