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
        const res = await axiosSecure.get(`/payments?email=${user.email}`);
        console.log(res.data);
        return res.data;
    }
});
  return (
  <div className="my-8">
    <h2 className="text-3xl font-bold text-secondary text-center mb-4">
          Payment History

        </h2>

        <div className="mt-10">

 
  <div className="overflow-x-auto hidden lg:block">
    <table className="table table-zebra w-full text-sm">
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
            <td>{index + 1}</td>
            <td>{history.serviceName}</td>
            <td>{history.customer_email}</td>
            <td>{history.transactionId}</td>
            <td >{history.paymentStatus} <span>(Cost: {history.amount})</span></td>
            <td>{new Date(history.paidAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Mobile Cards */}
  <div className="md:hidden space-y-4">
    {payment.map((history, index) => (
      <div
        key={index}
        className="border rounded-xl p-4 bg-white shadow-sm"
      >
        <p className="font-semibold text-primary mb-1">
          #{index + 1} — {history.serviceName}
        </p>

        <div className="space-y-1 text-sm">

          <p>
            <span className="font-semibold">Customer:</span>  
            {" "}{history.customer_email}
          </p>

          <p className="break-all">
            <span className="font-semibold">Transaction ID:</span>  
            {" "}{history.transactionId}
          </p>

          <p>
            <span className="font-semibold">Status:</span>  
            {" "}{history.paymentStatus}
          </p>

          <p>
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
