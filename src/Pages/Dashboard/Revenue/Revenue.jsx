import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loder/Loading';

const Revenue = () => {

     const axiosSecure = useAxiosSecure();

  const { data: revenue = [], isLoading } = useQuery({
    queryKey: ["revenue-category"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/revenue/category");
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>
    
 
    return (
        <div className="my-8 ">
             <h2 className="text-3xl font-bold text-secondary text-center mb-4">
          Revenue of each Category

        </h2>

         <div className="overflow-x-auto mb-10 hidden lg:block">
        <table className="table table-zebra w-full">
          <thead className="bg-secondary text-white">
            <tr>
              <th className="text-left px-4 py-2">Category</th>
              <th className="text-left px-4 py-2">Total Revenue</th>
              <th className="text-left px-4 py-2">Total Orders</th>
            </tr>
          </thead>
          <tbody>
            {revenue.map((r) => (
              <tr key={r._id} className="border-b">
                <td className="px-4 py-2 font-medium">{r._id}</td>
                <td className="px-4 py-2 text-purple-700">{r.totalRevenue}</td>
                <td className="px-4 py-2">{r.totalOrders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <div className="flex flex-wrap gap-5 lg:hidden">
        {revenue.map((r) => (
          <div
            key={r._id}
            className="bg-purple-50 border border-purple-100 rounded-2xl p-5 shadow-sm flex-1 min-w-[200px]"
          >
            <p className="font-semibold text-gray-700">{r._id}</p>
            <p className="text-purple-700 text-xl font-bold mt-2">
              ${r.totalRevenue}
            </p>
            <p className="text-gray-500 mt-1">{r.totalOrders} Orders</p>
          </div>
        ))}
      </div>
            
        </div>
    );
};

export default Revenue;