import React, { useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import useAxios from '../../Hooks/useAxios';
import Loading from '../../Components/Loder/Loading';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ErrorPage from '../../Components/ErrorPage/ErrorPage';
import useAuth from '../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ServiceDetails = () => {
    const {id}=useParams()
    //console.log(id)
    const axiosInstance = useAxios();
    const navigate = useNavigate();
     const modalRef = useRef(null);
     const {user}=useAuth()
     const axiosSecure=useAxiosSecure()

  const [selectedService, setSelectedService] = useState(null);
  const { register, handleSubmit, reset, setValue , formState: { errors }} = useForm();
    const queryClient = useQueryClient();


  const { data: service, isLoading, isError } = useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/services/${id}`);
      return res.data;
    },
  });


  
    const { mutate } = useMutation({
        mutationFn: (newBooking) => axiosSecure.post('/bookings', newBooking),

        
        onMutate: async (newBooking) => {
            await queryClient.cancelQueries({ queryKey: ['bookings'] });

            const previousServices = queryClient.getQueryData(['bookings']);

            queryClient.setQueryData(['bookings'], (old = []) => [
                {
                    ...newBooking,
                    _id: Date.now().toString(),
                    createdAt: new Date().toISOString(),
                },
                ...old,
            ]);

            return { previousServices };
        },

        
        onError: (err, newService, context) => {
            queryClient.setQueryData(['bookings'], context?.previousServices);

            Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: err.response?.data?.message || 'Could not create booking',
                timer: 3000,
            });
        },

     
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
             closeModal();
        },

        // 4. Success → show toast and reset form
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'Created!',
                text: 'Booking added successfully',
                timer: 2000,
                showConfirmButton: false,
            });
            reset();
        },
    });

  // Open modal 
    const openEditModal = (service) => {
      if (!user){
        return navigate("/login")
      }
        setSelectedService(service);
    
        setValue('serviceName', service.serviceName);
        setValue('cost', service.cost);
        setValue('unit', service.unit);
        setValue('category', service.category);
        setValue('description', service.description);

        setValue("userName", user.displayName || "");
        setValue("userEmail", user.email || "");
       
        modalRef.current.showModal();
    };
    //close modal
    const closeModal = () => {
        modalRef.current.close();
        setSelectedService(null);
        reset();
    };

    const capitalize = (text = "") =>{
       const value = text.trim();
       if (!value) return "";
       return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();}

   const onSubmit = (data) => {
       //console.log(data)
        const quantity = Number(data.quantity);
        const costPerUnit = Number(data.cost);

        const totalCost = costPerUnit * quantity;
       
       const bookingData = {
            serviceName: data.serviceName,
            quantity: Number(data.quantity),
            costPerUnit:Number(data.cost),
            totalCost: totalCost,
            unit: data.unit,
            category: data.category,
            description: data.description,
            clientName:data.userName,
            clientEmail:data.userEmail,
            location:capitalize(data.location),
            bookingDate:data.bookingDate,
            status:"Payment not cleared"
            };
         console.log(bookingData)
         mutate(bookingData);
        
    };






  if (isLoading) return <Loading></Loading>;
  if (isError) return <ErrorPage></ErrorPage>;
    return (
        <div className="  mt-10 ">
          <h2 className="text-5xl font-extrabold text-center mb-10 text-secondary font-display">
    Decoration Service Details
  </h2>
  <div className="max-w-7xl mx-auto px-4 py-10">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

    {/* LEFT: Image Section */}
    <div>
      <div className="rounded-2xl overflow-hidden border border-secondary">
        <img
          src={service.photo}
          alt={service.serviceName}
          className="w-full h-[520px] object-cover"
        />
      </div>

      
    </div>

    {/* RIGHT: Details Section */}
    <div className="space-y-6">

      {/* Title */}
      <h1 className="text-3xl lg:text-4xl font-extrabold text-secondary font-display">
        {service.serviceName}
      </h1>

      {/* Price + Rating */}
      <div className="flex items-center gap-6">
        <p className="text-2xl font-bold text-secondary dark:text-primary">
          ${service.cost}
        </p>

        <div className="flex items-center gap-1">
          <span className="text-yellow-400 text-xl">★</span>
          <span className="font-semibold text-gray-700 dark:text-[#6C3BAA]">
            {service.ratings}
          </span>
          <span className="text-sm text-gray-500">/ 5</span>
        </div>
      </div>

      {/* info */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-secondary dark:text-[#6C3BAA]">Category</p>
          <p className="font-semibold text-gray-500 dark:text-gray-500">{service.category}</p>
        </div>

        <div>
          <p className="text-secondary dark:text-[#6C3BAA]">Unit</p>
          <p className="font-semibold text-gray-500 dark:text-gray-500">{service.unit}</p>
        </div>

        <div>
          <p className="text-secondary dark:text-[#6C3BAA] " >Provider Email</p>
          <p className="font-semibold text-gray-500 break-all dark:text-gray-500">
            {service.email}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t pt-6"></div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold text-secondary mb-2 dark:text-[#6C3BAA]">
          Description
        </h3>
        <p className="text-gray-600 leading-relaxed dark:text-gray-500 text-justify">
          {service.description}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 rounded-xl border border-secondary text-secondary font-semibold
          hover:cursor-pointer hover:scale-110"
        >
          ⬅️Back
        </button>

        <button
          onClick={() => openEditModal(service)}
          className="px-8 py-3 rounded-xl bg-secondary text-white  font-semibold shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] border-0 hover:scale-110 hover:cursor-pointer
          dark:bg-[#6C3BAA]"
        >
          Book Now
        </button>
      </div>

    </div>
  </div>
</div>

















  {/* Edit Modal */}
            <dialog ref={modalRef} className="modal">
                <div className="modal-box w-11/12 max-w-2xl">
                    <h3 className="font-bold text-3xl text-secondary mb-6 font-display">Edit Service</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="label font-bold font-display text-secondary text-2xl">Service Name</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                {...register("serviceName")} disabled
                            />
                        </div>

                        <div>
                            <label className="label font-bold font-display text-secondary text-2xl">Cost</label>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                {...register("cost")} disabled
                            />
                        </div>

                        <div>
                            <label className="label font-bold font-display text-secondary text-2xl">Unit</label>
                            <input className="select select-bordered w-full" {...register("unit")}
                            disabled
                            />
                        </div>

                        <div>
                            <label className="label font-bold font-display text-secondary text-2xl">Category</label>
                            <input className="select select-bordered w-full" {...register("category")}
                            disabled/>
                                
                        </div>

                        <div>
                            <label className="label font-bold font-display text-secondary text-2xl">Description</label>
                            <textarea
                                className="textarea textarea-bordered w-full h-28"
                                {...register("description")} disabled
                            />
                            
                        </div>


                        {/* user info */}
                        <div>
                              <label className="label font-bold font-display text-secondary text-2xl">Client Name</label>
                              <input
                                type="text"
                                className="input input-bordered w-full"
                                {...register("userName")}
                                readOnly   
                              />
                        </div>

                        <div>
                              <label className="label font-bold font-display text-secondary text-2xl">Client Email</label>
                              <input
                                type="email"
                                className="input input-bordered w-full"
                                {...register("userEmail")}
                                readOnly
                              />
                        </div>

                        <div>
                              <label className="label font-bold font-display text-secondary text-2xl">Location (Example: Dhaka, Rajshahi, Chittagong, Rangpur, Khulna, Sylhet, Dinajpur)

                              </label>
                              <input
                                type="text"
                                className="input input-bordered w-full"
                                {...register("location",{ required: "Required" })}
                              />
                              {errors.location && <p className="text-red-500 text-sm">
                                {errors.location.message}</p>}
                        </div>

                        <div>
                              <label className="label font-bold font-display text-secondary text-2xl">Booking Date</label>
                              <input
                                type="date"
                                className="input input-bordered w-full"
                                {...register("bookingDate", { required: true })}
                              />

                               {errors.bookingDate && <p className="text-red-500 text-sm">
                                {errors.bookingDate.message}</p>}
                          </div>

                          <div>
                              <label className="label font-bold font-display text-secondary text-2xl">Quantity (floor / meter / sq-ft)</label>
                              <input
                                type="number"
                                min="1"
                                className="input input-bordered w-full"
                                {...register("quantity", {
                                  required: "Quantity is required",
                                  min: { value: 1, message: "Minimum value is 1" }
                                })}
                              />
                              {errors.quantity && (
                                <p className="text-red-500 text-sm">{errors.quantity.message}</p>
                              )}
                          </div>
                        
                        
                        <div className="modal-action">
                                <button 
                                    type="submit" 
                                    className="btn btn-secondary rounded-xl shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] border-0 hover:scale-110 hover:cursor-pointer
          dark:bg-[#6C3BAA]">
                                    Book
                                </button>
                                <button type="button" className="btn  rounded-xl border border-secondary text-secondary font-semibold
          hover:cursor-pointer hover:scale-110 " onClick={closeModal}>
                                    Cancel
                                </button>
                            </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
</div>

    );
};

export default ServiceDetails;