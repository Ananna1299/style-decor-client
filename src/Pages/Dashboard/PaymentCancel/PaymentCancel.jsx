import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div className="my-10 px-4 ">
             <h2 className='text-secondary text-5xl font-bold mb-5 text-center font-display dark:text-[#6C3BAA]'>
          Your payment has been Cancelled

        </h2>
        <div className='flex items-center justify-center'>

            <Link to="/dashboard/my-bookings" className="btn btn-primary text-secondary text-lg p-4
            dark:bg-[#6C3BAA] dark:text-white">    
            Try again
        </Link>

        </div>
        

            
        </div>
    );
};

export default PaymentCancel;
