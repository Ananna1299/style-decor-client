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
       return value.charAt(0).toUpperCase() + text.slice(1).toLowerCase();}

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

        <div className="bg-pink-100 rounded-2xl p-6 shadow-md border border-purple-100 hover:shadow-lg ">
          <h3 className="text-lg font-semibold text-purple-900 mb-1">Cost</h3>
          <p className="text-gray-700 font-medium">${service.cost} </p>
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

      
      <div className="flex gap-4 justify-end">
        
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 rounded-xl font-display text-2xl border border-purple-500 text-purple-600 font-semibold hover:bg-purple-100  cursor-pointer"
        >
          Back
        </button>

        {/* Booking  */}
        <button onClick={() => openEditModal(service)}
          className="px-8 py-3 font-display text-2xl rounded-xl bg-secondary text-white font-semibold hover:bg-purple-700 cursor-pointer shadow-lg "
        >
          Book Now
        </button>

      </div>
    </div>
  </div>

  {/* Edit Modal */}
            <dialog ref={modalRef} className="modal">
                <div className="modal-box w-11/12 max-w-2xl bg-pink-50 ">
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
                                    className="btn btn-secondary">
                                    Book
                                </button>
                                <button type="button" className="btn" onClick={closeModal}>
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