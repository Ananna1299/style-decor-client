import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentSuccessful = () => {

    const [searchParams] = useSearchParams();
    const sessionId=searchParams.get("session_id")
    const [paymentInfo,setPaymentInfo]=useState({})
    const axiosSecure=useAxiosSecure();


     useEffect(()=>{
        if (sessionId){
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res=>{
                console.log(res.data)
                setPaymentInfo({
                    transactionId:res.data.transactionId,
                  


                })
                
            })
        }
    },[sessionId,axiosSecure])

  return (
  <div className="my-8 ">
             <h2 className="text-3xl font-bold text-secondary text-center mb-4">
          Payment Successful

        </h2>
         <p><span className='font-bold'>Transaction Id: </span>{paymentInfo.transactionId}</p>



  </div>
  );
};

export default PaymentSuccessful;
