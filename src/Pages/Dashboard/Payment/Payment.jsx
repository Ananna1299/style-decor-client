import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../../Components/Loder/Loading';
import { useQuery } from '@tanstack/react-query';

const Payment = () => {
      const {bookingId}=useParams()
      const axiosSecure=useAxiosSecure()

      const { data: booking, isLoading } = useQuery({
                queryKey: ["booking", bookingId],
                queryFn: async () => {
                const res = await axiosSecure.get(`/bookings/${bookingId}`);
                return res.data;
                },
            });


    const handlePayment=async()=>{
        const paymentInfo={
          totalCost:booking.totalCost,
          serviceName:booking.serviceName,
          bookingId:booking._id,
          clientEmail:booking.clientEmail,
          bookingDate:booking.bookingDate,
          location:booking.location
        }
        const res=await axiosSecure.post("/create-checkout-session",paymentInfo)
        console.log(res.data)
        window.location.href=res.data.url
    }

  if (isLoading) return <Loading></Loading>;
    
  
  
  
  return (
        <div className="my-10 px-4 ">
             <h2 className="text-secondary text-5xl font-bold mb-5 text-center font-display dark:text-[#6C3BAA]">
          Complete Your Payment
        </h2>

        <p className="text-gray-600 text-center">
          You are about to pay for:
        </p>

        <div className="mt-6 bg-base-100 p-4 rounded-xl border">
          <p><strong className='text-secondary dark:text-[#6C3BAA]'>Service:</strong> {booking.serviceName}</p>
          <p><strong className='text-secondary dark:text-[#6C3BAA]'>Category:</strong> {booking.category}</p>
          <p><strong className='text-secondary dark:text-[#6C3BAA]'>Cost Per Unit:</strong> {booking.costPerUnit}</p>
          <p><strong className='text-secondary dark:text-[#6C3BAA]'>Quantity:</strong> {booking.quantity}</p>
          <p className="text-xl font-bold text-secondary mt-2 dark:text-[#6C3BAA]">
            Total: <span className='text-pink-800'>{booking.totalCost}</span> 
          </p>
        </div>
        <div>

            <button
            onClick={handlePayment}
          className="btn btn-primary text-secondary dark:bg-[#6C3BAA] dark:text-white text-lg mt-6"
        >
          Pay Now
        </button>
        </div>

        

        </div>
    );
};

export default Payment;