import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../../Hooks/useAxios';
import Loading from '../../../Components/Loder/Loading';
import img from "../../../assets/leaf.png"

const TopDecorators = () => {
    const axiosInstance=useAxios()

    const { data: topDecorators = [] ,isLoading} = useQuery({
    queryKey: ["topDecorators"],
    queryFn: async () => {
      const res = await axiosInstance.get("/decorators/top?limit=6");
      return res.data;
    },
  });
    return (
        <section className="w-11/12 mx-auto my-24">
  <h2 className="text-5xl font-extrabold text-center mb-12 text-secondary font-display">
    Our Finest Decorators
  </h2>

  {isLoading ? (
   <Loading></Loading>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      {topDecorators.map((decorator) => (
        <div
          key={decorator._id}
          className="relative  bg-cover bg-center bg-no-repeat h-96  mb-10 rounded-xl  px-6"
                style={{ backgroundImage: `url(${img})` }}
        >
          {/* Name */}
          <h3 className="text-4xl font-extrabold text-secondary mt-20 font-display ">
            <span className='font-display' >Decorator Name: </span>
            {decorator.name}
          </h3>

          {/* Location */}
          <p className="text-2xl font-extrabold text-secondary font-display ">
             <span className='font-display' > Working Area: </span>
            {decorator.location}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-4">
            <span className="text-yellow-400 text-3xl">★</span>
            <span className="font-medium text-secondary font-bold">
              {decorator.ratings}
            </span>
            <span className="text-sm text-purple-400">/ 5</span>
          </div>

          {/* Status */}
          <span
            className={`inline-block mt-4 px-4 py-1 rounded-full text-xs font-medium
              ${
                decorator.workStatus === "available"
                  ? "bg-green-100 text-green-900"
                  : "bg-red-100 text-red-600"
              }`}
          >
            {decorator.workStatus}
          </span>

          {/* Specialties */}
          <div className="mt-5 flex flex-wrap gap-2">
            {decorator.specialties.map((s, i) => (
              <span
                key={i}
                className="
                  bg-purple-100
                  text-purple-700
                  px-3 py-3
                  rounded-full
                  text-xs
                  font-medium
                "
              >
                {s}
              </span>
            ))}
          </div>

          
        </div>
      ))}
    </div>
  )}
</section>
    );
};

export default TopDecorators;