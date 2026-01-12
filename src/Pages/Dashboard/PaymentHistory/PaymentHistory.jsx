import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const {user}=useAuth()

    const axiosSecure=useAxiosSecure()
    const { data: payment = [] } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
        const res = await axiosSecure.get(`/payments?email=${user.email}&page=1&limit=10`);
        console.log(res.data);
        return res.data;
    }
});
  return (
  <div className="my-10 px-4">
    <h2 className='text-secondary text-5xl font-bold mb-5 text-center font-display dark:text-[#6C3BAA]'>
          Payment History

        </h2>

        <div className="">

 
  <div className="overflow-x-auto hidden lg:block">
    <table className="table  w-full text-sm">
      <thead className="bg-secondary text-white">
        <tr className="text-base">
          <th>#</th>
          <th>Service Name</th>
          <th>Email</th>
          <th>Transaction ID</th>
          <th>Payment Status</th>
          <th>Paid At</th>
        </tr>
      </thead>

      <tbody>
        {payment.map((history, index) => (
          <tr key={index}>
            <td className='text-secondary dark:text-[#6C3BAA]'>{index + 1}</td>
            <td className='text-secondary dark:text-[#6C3BAA]'>{history.serviceName}</td>
            <td className='text-secondary dark:text-[#6C3BAA]'>{history.customer_email}</td>
            <td className='text-secondary dark:text-[#6C3BAA]'>{history.transactionId}</td>
            <td className='text-secondary dark:text-[#6C3BAA]'>{history.paymentStatus} <span>(Cost: {history.amount})</span></td>
            <td className='text-secondary dark:text-[#6C3BAA]'>{new Date(history.paidAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Mobile Cards */}
  <div className="lg:hidden space-y-4">
    {payment.map((history, index) => (
      <div
        key={index}
        className="border rounded-xl p-4 bg-white shadow-sm"
      >
        <p className="font-semibold text-secondary dark:text-[#6C3BAA] mb-1">
          {index + 1} — {history.serviceName}
        </p>

        <div className="space-y-1 text-sm">

          <p className='text-secondary dark:text-[#6C3BAA]'>
            <span className="font-semibold">Customer:</span>  
            {" "}{history.customer_email}
          </p>

          <p className="break-all text-secondary dark:text-[#6C3BAA]">
            <span className="font-semibold">Transaction ID:</span>  
            {" "}{history.transactionId}
          </p>

          <p className='text-secondary dark:text-[#6C3BAA]'>
            <span className="font-semibold">Status:</span>  
            {" "}{history.paymentStatus}
          </p>

          <p className='text-secondary dark:text-[#6C3BAA]'>
            <span className="font-semibold">Paid At:</span>  
            {" "}{new Date(history.paidAt).toLocaleString()}
          </p>

        </div>
      </div>
    ))}
  </div>

</div>

         

  </div>
  );
};

export default PaymentHistory;
