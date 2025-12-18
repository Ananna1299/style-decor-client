import React, { useRef, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Loading from '../../../Components/Loder/Loading';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';

const MyBookings = () => {
   const {user}=useAuth()
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();
      const modalRef = useRef(null);

        const [selectedBooking, setSelectedBooking] = useState(null);


       const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    // all services
        const { data: bookings = [], isLoading } = useQuery({
            queryKey: ['bookings', user?.email], 
            queryFn: async () => {
                const res = await axiosSecure.get(`/bookings?email=${user.email}`);
                return res.data;
            },
        });
    // Open modal 
    const openEditModal = (b) => {
      
        setSelectedBooking(b);
        setValue('quantity', b.quantity);
        setValue('location', b.location);
        setValue('bookingDate', b.bookingDate);
         setValue('costPerUnit', b.costPerUnit);
       
        modalRef.current.showModal();
    };
    //close modal
    const closeModal = () => {
        modalRef.current.close();
         setSelectedBooking(null);
        reset();
    };






     const updateMutation = useMutation({
        mutationFn: async (updatedData) => {
            const res = await axiosSecure.patch(`/bookings/${selectedBooking._id}/mybooking`, updatedData);
            return res.data;
        },
        onMutate: async (updatedData) => {
            await queryClient.cancelQueries({ queryKey: ['bookings', user?.email] });

            const previousServices = queryClient.getQueryData(['bookings', user?.email]);

            queryClient.setQueryData(['bookings', user?.email], (old = []) =>
                old.map(s => s._id === selectedBooking._id ? { ...s, ...updatedData,totalCost: updatedData.totalCost, } : s)
            );

            return { previousServices };
        },
        
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings', user?.email] });
            closeModal();
        },
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: 'Bookings updated successfully',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/bookings/${id}`);
            return res.data;
        },
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['bookings', user?.email] });
            const previousServices = queryClient.getQueryData(['bookings', user?.email]);
            queryClient.setQueryData(['bookings', user?.email], (old = []) => old.filter(s => s._id !== id));
            return { previousServices };
        },
        
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Booking removed',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });

    const onSubmit = (data) => {
        const quantity = Number(data.quantity);
        const costPerUnit = Number(data.costPerUnit);

        const totalCost = costPerUnit * quantity;

        const updatedData = {
            location:data.location,
            totalCost: totalCost,
            bookingDate:data.bookingDate,
            quantity: Number(data.quantity),
           

        };
        updateMutation.mutate(updatedData);
    };
      if (isLoading) return <Loading></Loading>;

    return (
          <div className="my-8 px-4">
            <h2 className="text-3xl font-bold text-center text-secondary mb-10">
                My Bookings
            </h2>

            {/* Table */}
            <div className="overflow-x-auto hidden lg:block">
                <table className="table table-zebra w-full">
                    <thead className="bg-secondary text-white">
                        <tr>
                            <th>#</th>
                            <th>Service Name</th>
                            <th>Category</th>
                            <th>Cost Per Unit</th>
                            <th>Total Cost</th>
                            <th>Unit</th>
                            <th>Booking Date</th>
                            <th>Location</th>
                            
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.map((b, idx) => (
                            <tr key={b._id}>
                                <th>{idx + 1}</th>
                                <td className="font-semibold">{b.serviceName}</td>
                                <td>{b.category}</td>
                                <td>${b.costPerUnit}</td>
                                <td className="font-bold text-secondary">${b.totalCost}</td>
                                <td>{b.unit}</td>
                                <td>{b.bookingDate}</td>
                                <td>{b.location}</td>
                                <td>{b.status}</td>
                              

                                <td className='flex gap-2'>
                                    <div>
                                        {
                                            b.paymentStatus==="paid"? 
                                            <span className='text-green-500'>Paid</span>:
                                            <Link to={`/dashboard/payment/${b._id}`} className='btn btn-sm bg-primary text-black'>Pay</Link>

                                        }
                                </div>
                                <button
                                        onClick={() => openEditModal(b)}
                                        className="btn btn-sm btn-outline btn-secondary"
                                         disabled={b.paymentStatus === "paid"}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            Swal.fire({
                                                title: 'Delete?',
                                                text: 'This cannot be undone!',
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonText: 'Yes, delete it!'
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    deleteMutation.mutate(b._id);
                                                }
                                            });
                                        }}
                                        className="btn btn-sm btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile  */}
            <div className="grid gap-4 lg:hidden">
                {bookings.map((b) => (
                    <div key={b._id} className="card bg-base-100 shadow-lg border">
                        <div className="card-body">
                            <h3 className="card-title text-secondary">{b.serviceName}</h3>

                            <p><strong>Category:</strong> {b.category}</p>
                            <p><strong>Cost Per Unit:</strong> {b.costPerUnit}</p>
                            <p><strong>Total Cost:</strong>${b.totalCost}</p>
                            <p><strong>Unit:</strong> {b.unit}</p>
                            <p><strong>Date:</strong> {b.bookingDate}</p>
                            <p><strong>Location:</strong> {b.location}</p>
                             <p><strong>Status:</strong> {b.status}</p>

                            

                            <div className="card-actions justify-end mt-4">
                                <div>
                                        {
                                            b.paymentStatus==="paid"? 
                                            <span className='text-green-600 text-center'>Paid</span>:
                                            <Link to={`/dashboard/payment/${b._id}`} className='btn btn-square bg-primary text-black'>Pay</Link>

                                        }
                                </div>
                                <button
                                        onClick={() => openEditModal(b)}
                                        className="btn btn-sm btn-outline btn-secondary"
                                         disabled={b.paymentStatus === "paid"}
                                    >
                                        Edit
                                    </button>
                                
                                <button
                                    onClick={() => {
                                        Swal.fire({
                                            title: 'Delete this booking?',
                                            icon: 'warning',
                                            showCancelButton: true,
                                        }).then(res => res.isConfirmed && deleteMutation.mutate(b._id));
                                    }}
                                    className="btn btn-error btn-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>




             <dialog ref={modalRef} className="modal">
                <div className="modal-box w-11/12 max-w-2xl">
                    <h3 className="font-bold text-2xl text-secondary mb-6">Edit Service</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                       <div>
                              <label className="label font-bold font-display text-secondary text-2xl">Location</label>
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
                            <label className="label font-bold font-display text-secondary text-2xl">Cost</label>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                {...register("costPerUnit")} disabled
                            />
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
                                    className="btn btn-secondary" 
                                    disabled={updateMutation.isPending}
                                >
                                    Save Changes
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

export default MyBookings;