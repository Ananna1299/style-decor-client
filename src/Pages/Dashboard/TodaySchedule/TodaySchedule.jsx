import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const TodaySchedule = () => {

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

 
const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const { data: bookings = [] } = useQuery({
  queryKey: ["assigned-work", user?.email],
  queryFn: async () => {
    const res = await axiosSecure.get(`/bookings/decorators/today?decoratorEmail=${user?.email}`);
    return res.data;
  },
});

 const todaysBookings = bookings.filter(
    (b) => b.bookingDate === todayString
  );
    return (
          <div className="my-8">
      <h2 className="text-3xl font-bold text-secondary text-center mb-6">
        Today's Bookings
      </h2>

      {todaysBookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings for today</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-secondary text-white">
              <tr>
                <th>#</th>
                <th>Service</th>
                <th>Date</th>
                <th>Location</th>
                <th>Client</th>
              </tr>
            </thead>
            <tbody>
              {todaysBookings.map((b, i) => (
                <tr key={b._id}>
                  <td>{i + 1}</td>
                  <td>{b.serviceName}</td>
                  <td>{b.bookingDate}</td>
                  <td>{b.location}</td>
                  <td>{b.clientEmail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    );
};

export default TodaySchedule;