import React from 'react';
import { Link } from 'react-router';
import logo from "../../assets/bird_2.png"

const Logo = () => {
    return (
        <Link to="/" className=''>
         <div className='flex items-center  '>
            <img className='h-20 w-full' src={logo} alt="" />
            
            <p className='-ms-4 font-extrabold text-2xl italic text-secondary dark:text-[#6C3BAA]'>StyleDecor</p>
            
        </div></Link>
    );
};

export default Logo;