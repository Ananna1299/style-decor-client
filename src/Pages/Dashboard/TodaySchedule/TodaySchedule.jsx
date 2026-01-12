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
          <div className="my-10 px-4">
      <h2  className='text-secondary text-5xl font-bold mb-5 text-center font-display dark:text-[#6C3BAA]'>
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
                  <td className='text-secondary dark:text-[#6C3BAA]'>{i + 1}</td>
                  <td className='text-secondary dark:text-[#6C3BAA]'>{b.serviceName}</td>
                  <td className='text-secondary dark:text-[#6C3BAA]'>{b.bookingDate}</td>
                  <td className='text-secondary dark:text-[#6C3BAA]'>{b.location}</td>
                  <td className='text-secondary dark:text-[#6C3BAA]'>{b.clientEmail}</td>
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
                  <h3 className="font-bold text-secondary text-lg dark:text-[#6C3BAA]" >
                    {b.serviceName}
                  </h3>
                  
                </div>

                <div className="space-y-1 text-sm">
                  <p className='text-secondary dark:text-[#6C3BAA]'>
                    <span className="font-semibold ">
                      Date:
                    </span> {b.bookingDate}
                  </p>

                  <p className='text-secondary dark:text-[#6C3BAA]'>
                    <span className="font-semibold ">
                      Location:
                    </span> {b.location}
                  </p>

                  <p className='text-secondary dark:text-[#6C3BAA]'>
                    <span className="font-semibold">
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