import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div className="my-8 ">
             <h2 className="text-3xl font-bold text-secondary text-center mb-4">
          Your payment has been Cancelled

        </h2>
        <div className='flex items-center justify-center'>

            <Link to="/dashboard/my-bookings" className="btn btn-primary text-secondary text-lg p-4">    
            Try again
        </Link>

        </div>
        

            
        </div>
    );
};

export default PaymentCancel;
