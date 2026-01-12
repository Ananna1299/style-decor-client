import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loder/Loading';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";








const AdminDashboardHome = () => {

     const axiosSecure = useAxiosSecure();

  const { data:serviceDemand= [], isLoading } = useQuery({
    queryKey: ["service-demand"],
    queryFn: async () => {
      const res = await axiosSecure.get("/service-demand");
      
      return res.data;
    },
  });



  if (isLoading) return <Loading></Loading>

  // Convert service-demand data into histogram bins
  const histogramData = Object.values(
    serviceDemand.reduce((acc, item) => {
      const count = item.bookingsCount;

      if (!acc[count]) {
        acc[count] = {
          range: `${count} booking${count > 1 ? "s" : ""}`,
          count: 0,
          services: [],
        };
      }

      acc[count].count += 1;
      acc[count].services.push(item._id);

      return acc;
    }, {})
  );





    return (
         <div className="my-10 px-4">
      <h2 className='text-secondary text-5xl font-bold mb-5 text-center font-display dark:text-[#6C3BAA]'>
        Number of Services Booked by Users
      </h2>


       <ResponsiveContainer width="100%" height={400}>
        <BarChart data={histogramData}>
          <CartesianGrid strokeDasharray="3 3" />

          
          <XAxis dataKey="range" />
          <YAxis allowDecimals={false} 
          domain={[0, 20]}
            tickCount={21}
            />

          
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;

              const { range, count, services } = payload[0].payload;

              return (
                <div className="bg-white p-3 rounded shadow text-sm dark:text-pink-600">
                  <p className="font-semibold">{range}</p>
                  <p>Total Services: {count}</p>
                  <p className="mt-1 font-semibold">Services:</p>
                  <ul className="list-disc list-inside">
                    {services.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              );
            }}
          />

          <Bar
            dataKey="count"
            fill="#7c3aed" 
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      
    </div>
    );
};

export default AdminDashboardHome;