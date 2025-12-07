import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import Loading from '../../../Components/Loder/Loading';

import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MyProfile = () => {
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()
   

    const {data=[] } = useQuery({
    queryKey: ['profile',user?.email],
    queryFn: async () => {
        const res = await axiosSecure.get(`/users/profile?email=${user?.email}`);
        console.log(res.data);
        return res.data;
    }
});


const info = data[0] || {};


    return (
        <div className="flex justify-center items-center py-10">
      <div className="bg-white shadow-lg rounded-xl p-6 w-2/3 text-center">
        {/* Profile Photo */}
        <img
          src={info.photoURL || user?.photoURL}
          alt="Profile"
          className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-secondary"
        />

        {/* Name */}
        <h2 className='mt-8'>
            <span className='text-xl text-secondary font-bold'>Name: </span>
            <span  className="text-xl  text-gray-800"> {info.displayName || user?.displayName}</span>
          
        </h2>

        {/* Email */}
        <h2 className='mt-8'>
            <span className='text-xl text-secondary font-bold'>Email: </span>
            <span  className="text-xl  text-gray-800"> {info.email}</span>
          
        </h2>

        {/* Role  */}
        <h2 className='mt-8'>
            <span className='text-xl text-secondary font-bold'>Role: </span>
            <span  className="text-xl  text-gray-800"> {info.role}</span>
          
        </h2>
        

        {/* Join Date */}
        {info.createdAt && (
            <h2 className='mt-8'>
                <span  className='text-xl text-secondary font-bold'>
            Joined: 
            
          </span>
          <span className="text-xl  text-gray-800">{new Date(info.createdAt).toLocaleDateString()}
                
            </span>
            </h2>
          
        )}
      </div>
    </div>
    );
};

export default MyProfile;