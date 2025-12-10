import React from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxios from '../../Hooks/useAxios';
import Loading from '../../Components/Loder/Loading';
import { useQuery } from '@tanstack/react-query';
import ErrorPage from '../../Components/ErrorPage/ErrorPage';

const ServiceDetails = () => {
    const {id}=useParams()
    //console.log(id)
    const axiosInstance = useAxios();
    const navigate = useNavigate();




  const { data: service, isLoading, isError } = useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/services/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;
  if (isError) return <ErrorPage></ErrorPage>;
    return (
        <div className=" w-full md:w-11/12 lg:w-9/12 mx-auto mt-12 p-6">
  <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-purple-200">

    
    <div>
              <img
                className="w-full mx-auto h-[600px] object-cover rounded-2xl p-4"
                src={service.photo}
                alt=""
              />
            </div>
    <div className="p-10 bg-gradient-to-br from-purple-50 to-white">

      {/* name */}
      <h1 className="text-5xl font-extrabold text-secondary text-center mb-8 font-display  ">
        {service.serviceName}
      </h1>

     
      <div className="grid md:grid-cols-2 gap-8 mb-12">

        <div className="bg-pink-100 rounded-2xl p-6 shadow-md border border-purple-100 hover:shadow-lg ">
          <h2 className=" font-semibold text-purple-900 mb-1  text-lg">Category</h2>
          <p className="text-gray-700 font-medium">{service.category}</p>
        </div>

        <div className="bg-pink-100 rounded-2xl p-6 shadow-md border border-purple-100 hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-purple-900 mb-1">Cost</h3>
          <p className="text-gray-700 font-medium">{service.cost} BDT</p>
        </div>

        <div className="bg-pink-100 rounded-2xl p-6 shadow-md border border-purple-100 hover:shadow-lg ">
          <h3 className="text-lg font-semibold text-purple-900 mb-1">Provider Email</h3>
          <p className="text-gray-700 font-medium">{service.email}</p>
        </div>

        <div className="bg-pink-100 rounded-2xl p-6 shadow-md border border-purple-100 hover:shadow-lg ">
          <h3 className="text-lg font-semibold text-purple-900 mb-1">Unit</h3>
          <p className="text-gray-700 font-medium">{service.unit}</p>
        </div>
        <div className="bg-pink-100 rounded-2xl p-6 shadow-md border border-purple-100 hover:shadow-lg ">
          <h3 className="text-lg font-semibold text-purple-900 mb-1">Ratings</h3>
          <p className="text-gray-700 font-medium">{service.ratings}</p>
        </div>

      </div>

      {/* Description */}
      <div className="bg-pink-100 rounded-2xl p-7 shadow-md border border-purple-100 mb-10 hover:shadow-lg ">
        <h3 className="text-2xl font-semibold text-purple-900 mb-3">Description</h3>
        <p className="text-gray-700 text-justify text-lg">
          {service.description}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-end">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 rounded-xl font-display text-2xl border border-purple-500 text-purple-600 font-semibold hover:bg-purple-100  cursor-pointer"
        >
          Back
        </button>

        {/* Booking Button */}
        <button
          className="px-8 py-3 font-display text-2xl rounded-xl bg-secondary text-white font-semibold hover:bg-purple-700 cursor-pointer shadow-lg "
        >
          Book Now
        </button>

      </div>
    </div>
  </div>
</div>

    );
};

export default ServiceDetails;