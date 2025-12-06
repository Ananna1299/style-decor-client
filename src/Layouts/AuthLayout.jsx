import React from 'react';
import { Outlet } from 'react-router';
import img from "../assets/decor.jpg"



const AuthLayout = () => {
    return (
        <div className='min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative' style={{
        backgroundImage: `url(${img})`,
      }}>

        <div className="relative z-10 w-full flex justify-center items-center">
        <Outlet />
      </div>
            
            

            
        </div>
       
    );
};

export default AuthLayout;