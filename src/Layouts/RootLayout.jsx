import React from 'react';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='bg-base-300  '>
            <div  className='bg-base-100 sticky top-0 z-50 '>
                <Navbar></Navbar>
            </div>
            <div className='w-11/12 mx-auto '>
            
            <Outlet></Outlet>
            


            
        </div>
        <div>
            <Footer></Footer>
        </div>

        </div>
    );
};

export default RootLayout;