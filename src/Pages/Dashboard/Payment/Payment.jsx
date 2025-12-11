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
        <div className="my-8 ">
             <h2 className="text-3xl font-bold text-secondary text-center mb-4">
          Complete Your Payment
        </h2>

        <p className="text-gray-600 text-center">
          You are about to pay for:
        </p>

        <div className="mt-6 bg-base-100 p-4 rounded-xl border">
          <p><strong className='text-secondary'>Service:</strong> {booking.serviceName}</p>
          <p><strong className='text-secondary'>Category:</strong> {booking.category}</p>
          <p><strong className='text-secondary'>Cost Per Unit:</strong> {booking.costPerUnit}</p>
          <p><strong className='text-secondary'>Quantity:</strong> {booking.quantity}</p>
          <p className="text-xl font-bold text-secondary mt-2">
            Total: <span className='text-pink-800'>{booking.totalCost}</span> 
          </p>
        </div>
        <div>

            <button
            onClick={handlePayment}
          className="btn btn-primary text-secondary text-lg mt-6"
        >
          Pay Now
        </button>
        </div>

        

        </div>
    );
};

export default Payment;