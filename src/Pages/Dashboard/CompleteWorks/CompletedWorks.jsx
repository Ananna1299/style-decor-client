import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const CompletedWorks = () => {


    const axiosSecure=useAxiosSecure();
    const {user}=useAuth()


    const { data: completedWorks = [] } = useQuery({
    queryKey: ['task',user?.email,"parcel-delivered"],
    queryFn: async () => {
        const res = await axiosSecure.get(`/bookings/decorators/completed?decoratorEmail=${user?.email}&status=completed`);
        return res.data;
    }
});


const handlePayment=(booking)=>{
    return booking.totalCost*0.7
}
    return (
        <div className="my-8">
      <h2 className="text-3xl font-bold text-secondary text-center mb-6">
        Completed Works
      </h2>


      <div className="overflow-x-auto hidden lg:block">
        <table className="table table-zebra w-full">
          <thead className="bg-secondary text-white">
            <tr>
              <th>#</th>
              <th>Service</th>
              <th>Date</th>
              <th>Location</th>
              <th>Total Cost</th>
              <th>Payment</th>
            </tr>
          </thead>

          <tbody>
            {completedWorks.map((b, index) => (
              <tr key={b._id}>
                <td>{index + 1}</td>
                <td>{b.serviceName}</td>
                <td>{b.bookingDate}</td>
                <td>{b.location}</td>
                <td>{b.totalCost}</td>
                <td >
                    { handlePayment(b)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <div className="lg:hidden space-y-4">
        {completedWorks.map((b) => (
          <div
            key={b._id}
            className="border rounded-xl p-4 bg-white shadow-sm"
          >
            <p className="font-semibold mb-1">
              Service: {b.serviceName}
            </p>

            <p className="text-sm">
              <span className="font-semibold">Date:</span> {b.bookingDate}
            </p>

            <p className="text-sm">
              <span className="font-semibold">Location:</span> {b.location}
            </p>

            <p className="text-sm">
              <span className="font-semibold">Total Cost:</span> ${b.totalCost}
            </p>

            <p>
            </p>
          </div>
        ))}
      </div>

      {completedWorks.length === 0 && (
        <p className="text-center mt-6 text-gray-500">
          No completed work found
        </p>
      )}
    </div>
    );
};

export default CompletedWorks;