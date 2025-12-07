import React from 'react';
import { Link } from 'react-router';
import logo from "../../assets/bird_2.jpg"

const Logo = () => {
    return (
        <Link to="/">
         <div className='flex items-center bg-white pr-3 '>
            <img className='h-20 w-full' src={logo} alt="" />
            
            <p className='-ms-4 font-extrabold text-2xl italic text-secondary'>StyleDecor</p>
            
        </div></Link>
    );
};

export default Logo;