import React from "react";
import welcome from "../../../assets/welcome.png"
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loder/Loading";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

const UserDashboard = () => {
   const {user}=useAuth()
    
    const axiosSecure = useAxiosSecure();


     // all services
        const { data: bookings = [], isLoading } = useQuery({
            queryKey: ['bookings', user?.email], 
            queryFn: async () => {
                const res = await axiosSecure.get(`/bookings?email=${user.email}`);
                return res.data;
            },
        });


      const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

      if (isLoading) return <Loading></Loading>;





  return (
     <div  className="flex flex-col  justify-between lg:flex-row items-center  my-10  text-center px-4" >
      <div className="flex flex-col items-center">
        <img src={welcome} alt="404 Error" className=" w-64 " />
                <p className="text-pink-900 mb-6">
    Our professional decorator is managing your booking with attention and care.
    <br />
    Take a look of your service booking summary.
          </p>
      </div>
                
                <div>
                  

          <PieChart width={400} height={400}>
        <Pie
          data={bookings}
          dataKey="totalCost"
          nameKey="serviceName"
          cx="50%"
          cy="50%"
          outerRadius={140}
          label
        >
          {bookings.map((_, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
                </div>
                 
             
          
    
            </div>
  );
};

export default UserDashboard;
