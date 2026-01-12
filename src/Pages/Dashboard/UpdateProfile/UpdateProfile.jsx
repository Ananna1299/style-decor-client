import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateProfile = () => {
    const { user, updateData } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.displayName
    }
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      let photoURL = user.photoURL;

      // If user selects new image
      if (data.photo && data.photo[0]) {
        const formData = new FormData();
        formData.append("image", data.photo[0]);

        const imageAPI = `https://api.imgbb.com/1/upload?&key=${import.meta.env.VITE_image_host}`;

        const res = await axios.post(imageAPI, formData);
        photoURL = res.data.data.url;
      }

      // Update Firebase profile
      await updateData({
        displayName: data.name,
        photoURL
      });

      //  Update database
      await axiosSecure.patch(`/users/${user.email}/update/profile`, {
        displayName: data.name,
        photoURL
      });

     Swal.fire("Success!", "Profile Updated", "success");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
    return (

      <div className='my-10 px-4'>

        <p className='text-secondary text-5xl font-bold text-center mb-10 font-display dark:text-[#6C3BAA]'>Update My Information</p>

        <div className="max-w-md mx-auto bg-white dark:bg-black p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-secondary">Update Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <label className="label">Name</label>
        <input
          type="text"
          className="input input-bordered w-full mb-4"
          {...register("name")}
        />

        {/* Image */}
        <label className="label">Profile Image</label>
        <input
          type="file"
          className="file-input w-full mb-4"
          {...register("photo")}
        />

        <button
          disabled={loading}
          className="btn bg-primary text-secondary w-full"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
      </div>
      
    );
};

export default UpdateProfile;