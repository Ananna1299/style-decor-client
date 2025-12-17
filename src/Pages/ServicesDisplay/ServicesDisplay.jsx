import React, { useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import img from "../../assets/leaf.png"
const ServicesDisplay = () => {
    const axiosInstance=useAxios()
    const [searchText,setSearchText]=useState("")
    const [serviceType, setServiceType] = useState("");
    // const [budget, setBudget] = useState("");
    // const [minCost, setMinCost] = useState("");
    // const [maxCost, setMaxCost] = useState("");




    const { data: services = [] } = useQuery({
    queryKey: ['service',searchText,serviceType],
    queryFn: async () => {
        const res = await axiosInstance.get(`/services?searchText=${searchText}&type=${serviceType}`);
        console.log(res.data);
        return res.data;
    }
});

// const handleBudgetChange=(value)=>{
//     setBudget(value);
//     console.log(value)
//      
// }


 const categories = ["Home", "Wedding", "Office", "Seminar", "Meeting"];

    return (
         <div className="mx-10 my-20">
      <h2 className="text-4xl font-bold text-cyan-800 text-center mb-10">
        Our Decoration Services
       
      </h2>
      <div className='flex flex-col lg:flex-row justify-between gap-4'>
        <div className='flex-1'>
            <label className="input ">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
                >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
                </g>
            </svg>
            <input onChange={(e)=>setSearchText(e.target.value)} type="search" required placeholder="Search" />
            </label>
        </div>

            <div className='flex flex-col flex-1 lg:items-end'>
                <h2 className='w-64 text-secondary'>Filter by category and budget</h2>
                {/* filter by category*/}
            <fieldset className="fieldset w-64 ">

                <select
            className="select select-bordered mb-4" defaultValue=""
            onChange={(e) => setServiceType(e.target.value)}
            >
            <option value="" disabled>Select Category</option>
            {
              categories.map((u,i)=> <option key={i} value={u}>{u}</option>)
            }
            </select>

            </fieldset>
            
            {/* baki aseeeeeeeeeeeeeeeee */}
            <fieldset className="fieldset w-64">
                {/* filter by budget */}
            <legend className="label font-bold">Please provide value like (min-max)</legend>
            <input
                type="text"
                placeholder="minBudget- maxBudget"
                className="input input-bordered mb-4"
                // value={budget}
                // onChange={(e) => handleBudgetChange(e.target.value)}
                />
            </fieldset>
            </div>


      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" >
        {services.map((service, index) => (
          <div
            key={index}
            className=" bg-cover bg-center bg-no-repeat  border-3 border-purple-200 rounded-xl p-6 shadow-md hover:shadow-xl"
             style={{ backgroundImage: `url(${img})` }}
          >
             {/* Image */}
            <img
              src={service.photo}
              alt={service.serviceName}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />


            {/* Service Name */}
            <h3 className="text-xl font-bold text-secondary mb-2">
              {service.serviceName}
            </h3>

            {/* Category */}
            <p className="text-sm font-medium  mb-3">
                <span className='font-bold text-secondary'>Category:</span>
                <span className='font-bold'> {service.category}</span>
              
            </p>

            {/* Cost & Unit */}
            <p className="text-secondary font-bold mb-2">
              Cost: <span className="text-pink-600">{service.cost} BDT</span>
            </p>
            <p className=" text-sm mb-3"><span className='font-bold text-secondary'>Unit: </span>
            <span className='font-bold text-gray-600'>{service.unit}</span></p>

            {/* Email */}
            <p className="text-gray-500 text-xs mb-5"><span className='font-bold text-secondary'>Created by: </span>{service.email}</p>

            <Link to={`/service-details/${service._id}`}  className=" w-full bg-gradient-to-br border-1 border-secondary from-pink-300 via-purple-300 to-indigo-200 text-secondary font-bold p-3 rounded-lg hover:cursor-pointer ">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
    );
};

export default ServicesDisplay;