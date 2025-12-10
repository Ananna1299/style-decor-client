import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const CreateService = () => {
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    }= useForm()

     const units = ["Per sqrt-ft", "Per floor", "Per meter"];
     const categories = ["Home", "Wedding", "Office", "Seminar", "Meeting"];


    // OPTIMISTIC MUTATION — This is the magic
    const { mutate,isPending  } = useMutation({
        mutationFn: (newService) => axiosSecure.post('/services', newService),

        // 1. Instantly show the new service in the UI
        onMutate: async (newService) => {
            await queryClient.cancelQueries({ queryKey: ['services'] });

            const previousServices = queryClient.getQueryData(['services']);

            queryClient.setQueryData(['services'], (old = []) => [
                {
                    ...newService,
                    _id: Date.now().toString(), // temporary ID
                    createdAt: new Date().toISOString(),
                },
                ...old,
            ]);

            return { previousServices };
        },

        // 2. If something goes wrong → remove the fake one
        onError: (err, newService, context) => {
            queryClient.setQueryData(['services'], context?.previousServices);

            Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: err.response?.data?.message || 'Could not create service',
                timer: 3000,
            });
        },

        // 3. Always make sure we have the real data from server
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] });
        },

        // 4. Success → show toast and reset form
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'Created!',
                text: 'Service added successfully',
                timer: 2000,
                showConfirmButton: false,
            });
            reset();
        },
    });

     const handleService=async(data)=>{
        const ServiceImg=data.photo[0]
        

         //store image 
            const formData=new FormData();
            formData.append("image",ServiceImg)
            const image_API_URL=`https://api.imgbb.com/1/upload?&key=${import.meta.env.VITE_image_host}`

            const uploadRes = await axios.post(image_API_URL, formData);
            const imgURL = uploadRes.data.data.url; // final URL



        
        console.log(data)
        const serviceData = {
            serviceName: data.serviceName,
            photo:imgURL,
            email: data.email,
            cost: Number(data.cost),
            unit: data.unit,
            category: data.category,
            description: data.description,
            ratings:Number(data.ratings),
            createdAt: new Date()
        };

        mutate(serviceData);

        

     }
    return (


        <div className='mx-10 mt-4'>
            <h2 className='text-secondary text-2xl font-bold text-center my-10'>Create Service</h2>
            <p className='text-black text-center mb-20 '>Bring your creativity to life — add a service and let your decorations make every space unforgettable.</p>
            <hr class="border-black opacity-10 mb-7"></hr>
            <p className='font-extrabold text-xl text-secondary mb-4 '>Add Information </p>
            <div className='flex justify-between items-center gap-20 mb-30'>

        <form  className='w-full' onSubmit={handleSubmit(handleService)}>
                <fieldset  className="fieldset ">
                    {/*service name */}
                <label className="label font-bold">Service Name</label>
                <input type="text" className="input w-full" placeholder="Service Name" 
                {...register("serviceName" , { required: true, maxLength:40})} />

                {errors.serviceName?.type === "required" && (
                 <p className='text-red-600 font-semibold'>service name is required</p>
      )}
                {errors.serviceName?.type === "maxLength" && (
                 <p className='text-red-600 font-semibold'>Maximum Length 20 characters</p>
      )}  


      {/* image input   */}
                <label className="label font-bold mt-4">Image</label>
                <input type="file" className="file-input w-full"  
                {...register("photo" , { required: true })} />

                {errors.photo?.type === "required" && (
                 <p className='text-red-600 font-semibold'>Image is required</p>
      )}
                {/* creator Email */}

                <label className="label font-bold mt-4">Email</label>
                <input type="email" className="input w-full" placeholder="Email" defaultValue={user.email}
                {...register("email" , { required: true})} />

                {/* cost */}
                <label className="label font-bold mt-4">Cost</label>
                <input type="number" className="input w-full" placeholder="Cost" 
                {...register("cost" , { required: true,min:0 })} />

                {errors.cost?.type === "min" && (
                 <p className='text-red-600 font-semibold'>Minimum cost is 0</p>
      )}      
                {errors.cost?.type === "required" && (
                 <p className='text-red-600 font-semibold'>Cost is required</p>
      )}
                 
                  <label className="label font-bold mt-4">Ratings</label>
                <input type="number" className="input w-full" placeholder="Ratings" 
                {...register("ratings" , { required: true,min:0 ,max:5})} />

                {errors.ratings?.type === "min" && (
                 <p className='text-red-600 font-semibold'>Minimum Rating is 0</p>
      )}      

      {errors.ratings?.type === "max" && (
                 <p className='text-red-600 font-semibold'>Maximum Rating is 5</p>
      )}      
                {errors.ratings?.type === "required" && (
                 <p className='text-red-600 font-semibold'>Rating is required</p>
      )}
                

                 {/* Unit */}
                <fieldset className="fieldset mt-4">
                <legend className="label font-bold">Unit</legend>
                <select {...register("unit")} defaultValue="" className="select w-full">
                     <option value="" disabled>Select Unit</option>
                    {
                        units.map((u,i)=> <option key={i} value={u}>{u}</option>)
                    }
                    
                </select>
                {errors.unit?.type === "required" && (
                 <p className='text-red-600 font-semibold'>Unit is required</p>
      )}
               
                </fieldset>

                
                {/* Categories */}
                <fieldset className="fieldset mt-4">
                <legend className="label font-bold">Service Category</legend>
                <select {...register("category")} defaultValue="" className="select w-full">
                     <option value="" disabled>Select Category</option>
                    {
                        categories.map((u,i)=> <option key={i} value={u}>{u}</option>)
                    }
                    
                </select>
                {errors.category?.type === "required" && (
                 <p className='text-red-600 font-semibold'>Category is required</p>
      )}
               
                </fieldset>

                {/* Description */}
                <fieldset className="fieldset mt-4">
                <legend className="label">Description</legend>
                <textarea className="textarea h-24 w-full" placeholder="Description"
                {...register("description")}></textarea>

                {errors.description?.type === "required" && (
                 <p className='text-red-600 font-semibold'>Description is required</p>
      )}
                
                </fieldset>


               <button
                        className="btn bg-primary text-secondary mt-4 mb-7"
                        disabled={isPending}
                        >
                        {isPending ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                            "Create Service"
                        )}
                </button>

        

                </fieldset>
            </form>
            

            </div>

          

            
        </div>
    );
};

export default CreateService;