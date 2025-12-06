import React from 'react';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='bg-[#e7e7e7] py-4'>
            <div className='w-11/12 mx-auto '>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>


            
        </div>

        </div>
    );
};

export default RootLayout;