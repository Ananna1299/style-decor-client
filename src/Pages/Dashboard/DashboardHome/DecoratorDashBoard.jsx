
import React from "react";
import welcome from "../../../assets/welcome.png"
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loder/Loading";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";


const DecoratorDashBoard = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: completedWorks = [], isLoading } = useQuery({
    queryKey: ["decorator-completed", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings/decorators/completed?decoratorEmail=${user.email}&status=completed`
      );
      return res.data;
    },
    enabled: !!user?.email
  });

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  if (isLoading) return <Loading />;


  const chartData = completedWorks.map(work => ({
    serviceName: work.serviceName,
    earning: Math.round(work.totalCost * 0.7)
  }));

  const totalEarning = chartData.reduce(
    (sum, item) => sum + item.earning,
    0
  );

  return (
        <div className="flex flex-col lg:flex-row items-center justify-between my-10 px-4 text-center">
      
      {/* LEFT SIDE (same UI as UserDashboard) */}
      <div className="flex flex-col items-center">
        <img src={welcome} alt="Welcome" className="w-64" />

        <p className="text-pink-900 mb-4">
          You have successfully completed decoration services.
          <br />
          Here is a summary of your earnings.
        </p>

        <p className="font-bold text-secondary dark:text-[#6C3BAA]">
          Total Earnings: <span className="text-pink-600">$ {totalEarning}</span> 
        </p>
      </div>

      {/* RIGHT SIDE PIE CHART */}
      <div>
        <PieChart width={400} height={400}>
          <Pie
            data={chartData}
            dataKey="earning"
            nameKey="serviceName"
            cx="50%"
            cy="50%"
            outerRadius={140}
            label
          >
            {chartData.map((_, index) => (
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

export default DecoratorDashBoard;
