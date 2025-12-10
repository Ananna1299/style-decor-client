import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Loading from '../../../Components/Loder/Loading';
import { Link } from 'react-router';

const MyBookings = () => {
   const {user}=useAuth()
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();

    // all services
        const { data: bookings = [], isLoading } = useQuery({
            queryKey: ['bookings', user?.email], 
            queryFn: async () => {
                const res = await axiosSecure.get(`/bookings?email=${user.email}`);
                return res.data;
            },
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
      if (isLoading) return <Loading></Loading>;

    return (
          <div className="my-8 px-4">
            <h2 className="text-3xl font-bold text-center text-secondary mb-10">
                My Bookings
            </h2>

            {/* Desktop Table */}
            <div className="overflow-x-auto hidden lg:block">
                <table className="table table-zebra w-full">
                    <thead className="bg-secondary text-white">
                        <tr>
                            <th>#</th>
                            <th>Service Name</th>
                            <th>Category</th>
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
                                <td className="font-bold text-secondary">{b.totalCost} BDT</td>
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

            {/* Mobile Cards */}
            <div className="grid gap-4 lg:hidden">
                {bookings.map((b) => (
                    <div key={b._id} className="card bg-base-100 shadow-lg border">
                        <div className="card-body">
                            <h3 className="card-title text-secondary">{b.serviceName}</h3>

                            <p><strong>Category:</strong> {b.category}</p>
                            <p><strong>Total Cost:</strong> {b.totalCost} BDT</p>
                            <p><strong>Unit:</strong> {b.unit}</p>
                            <p><strong>Date:</strong> {b.bookingDate}</p>
                            <p><strong>Location:</strong> {b.location}</p>
                             <p><strong>Status:</strong> {b.status}</p>

                            

                            <div className="card-actions justify-end mt-4">
                                <div>
                                        {
                                            b.paymentStatus==="paid"? 
                                            <span className='text-green-500'>Paid</span>:
                                            <Link to={`/dashboard/payment/${b._id}`} className='btn btn-square bg-primary text-black'>Pay</Link>

                                        }
                                </div>
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
        </div>
    );
};

export default MyBookings;