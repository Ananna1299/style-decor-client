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
        <>
        <div className="overflow-x-auto hidden lg:block ">
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

        <div className="lg:hidden space-y-4">
            {todaysBookings.map((b) => (
              <div
                key={b._id}
                className="bg-white border border-purple-200 rounded-xl p-4 shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-secondary text-lg">
                    {b.serviceName}
                  </h3>
                  
                </div>

                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-semibold text-secondary">
                      Date:
                    </span> {b.bookingDate}
                  </p>

                  <p>
                    <span className="font-semibold text-secondary">
                      Location:
                    </span> {b.location}
                  </p>

                  <p>
                    <span className="font-semibold text-secondary">
                      Client:
                    </span> {b.clientEmail}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </>

        

        
      )}
    </div>
    );
};

export default TodaySchedule;