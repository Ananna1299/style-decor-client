import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const CreateService = () => {
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()



     const {
        register,
        handleSubmit,
        formState: { errors },
    }= useForm()

     const units = ["Per sqrt-ft", "Per floor", "Per meter"];
     const categories = ["Home", "Wedding", "Office", "Seminar", "Meeting"];

     const handleService=(data)=>{
        console.log(data)
        data.cost=Number(data.cost)
        //console.log(typeof(data.cost),data.cost)
        axiosSecure.post("/services",data)
        .then(res=>{
            console.log(res.data)
        })
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
                {...register("serviceName" , { required: true, maxLength:20})} />

                {errors.serviceName?.type === "required" && (
                 <p className='text-red-600 font-semibold'>service name is required</p>
      )}
                {errors.serviceName?.type === "maxLength" && (
                 <p className='text-red-600 font-semibold'>Maximum Length 20 characters</p>
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


                <button className="btn bg-primary text-secondary mt-4 mb-7 ">Create Service</button>

        

                </fieldset>
            </form>
            

            </div>

          

            
        </div>
    );
};

export default CreateService;