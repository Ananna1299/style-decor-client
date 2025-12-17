import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Loading from '../../../Components/Loder/Loading';

const HandleServices = () => {
    const modalRef = useRef(null);
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();

    const [selectedService, setSelectedService] = useState(null);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    const units = ["Per sqrt-ft", "Per floor", "Per meter"];
    const categories = ["Home", "Wedding", "Office", "Seminar", "Meeting"];

    // all services
    const { data: services = [], isLoading } = useQuery({
        queryKey: ['services'], 
        queryFn: async () => {
            const res = await axiosSecure.get('/services');
            return res.data;
        },
    });

    // Open modal 
    const openEditModal = (service) => {
        setSelectedService(service);
        
        setValue('serviceName', service.serviceName);
        setValue('cost', service.cost);
        setValue('unit', service.unit);
        setValue('category', service.category);
        setValue('description', service.description);
        modalRef.current.showModal();
    };
    //close modal
    const closeModal = () => {
        modalRef.current.close();
        setSelectedService(null);
        reset();
    };

    
    const updateMutation = useMutation({
        mutationFn: async (updatedData) => {
            const res = await axiosSecure.patch(`/services/${selectedService._id}`, updatedData);
            return res.data;
        },
        onMutate: async (updatedData) => {
            await queryClient.cancelQueries({ queryKey: ['services'] });

            const previousServices = queryClient.getQueryData(['services']);

            queryClient.setQueryData(['services'], (old = []) =>
                old.map(s => s._id === selectedService._id ? { ...s, ...updatedData } : s)
            );

            return { previousServices };
        },
        
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] });
            closeModal();
        },
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: 'Service updated successfully',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/services/${id}`);
            return res.data;
        },
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['services'] });
            const previousServices = queryClient.getQueryData(['services']);
            queryClient.setQueryData(['services'], (old = []) => old.filter(s => s._id !== id));
            return { previousServices };
        },
        
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Service removed',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });

    const onSubmit = (data) => {
        const updatedData = {
            serviceName: data.serviceName,
            cost: Number(data.cost),
            unit: data.unit,
            category: data.category,
            description: data.description,
        };
        updateMutation.mutate(updatedData);
    };

    if (isLoading) return <Loading></Loading>;

    return (
        <div className="my-8 px-4">
            <h2 className="text-3xl font-bold text-center text-secondary mb-10">Manage Services</h2>

            {/* Desktop Table */}
            <div className="overflow-x-auto hidden lg:block">
                <table className="table table-zebra w-full">
                    <thead className="bg-secondary text-white">
                        <tr>
                            <th>#</th>
                            <th>Service Name</th>
                            <th>Category</th>
                            <th>Cost</th>
                            <th>Unit</th>
                            <th>Email</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service, idx) => (
                            <tr key={service._id}>
                                <th>{idx + 1}</th>
                                <td className="font-semibold">{service.serviceName}</td>
                                <td>{service.category}</td>
                                <td className="font-bold text-secondary">{service.cost} BDT</td>
                                <td>{service.unit}</td>
                                <td>{service.email}</td>
                                <td className="max-w-xs truncate">{service.description}</td>
                                <td className="space-x-2 flex">
                                    <button
                                        onClick={() => openEditModal(service)}
                                        className="btn btn-sm btn-outline btn-secondary"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            Swal.fire({
                                                title: 'Delete?',
                                                text: "This cannot be undone!",
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonText: 'Yes, delete it!'
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    deleteMutation.mutate(service._id);
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
                {services.map((service) => (
                    <div key={service._id} className="card bg-base-100 shadow-lg border">
                        <div className="card-body">
                            <h3 className="card-title text-secondary">{service.serviceName}</h3>
                            <p><strong>Category:</strong> {service.category}</p>
                            <p><strong>Cost:</strong> {service.cost} BDT / {service.unit}</p>
                            <p><strong>By:</strong> {service.email}</p>
                            <p className="text-sm text-gray-600"><strong>Desc:</strong> {service.description}</p>
                            <div className="card-actions justify-end mt-4 gap-2">
                                <button onClick={() => openEditModal(service)} className="btn btn-secondary btn-sm">Edit</button>
                                <button
                                    onClick={() => {
                                        Swal.fire({
                                            title: 'Delete this service?',
                                            icon: 'warning',
                                            showCancelButton: true,
                                        }).then(res => res.isConfirmed && deleteMutation.mutate(service._id))
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

            {/* Edit Modal */}
            <dialog ref={modalRef} className="modal">
                <div className="modal-box w-11/12 max-w-2xl">
                    <h3 className="font-bold text-2xl text-secondary mb-6">Edit Service</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="label font-bold">Service Name</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                {...register("serviceName", { required: "Required", maxLength: 40 })}
                            />
                            {errors.serviceName && <p className="text-red-500 text-sm">{errors.serviceName.message}</p>}
                        </div>

                        <div>
                            <label className="label font-bold">Cost</label>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                {...register("cost", { required:  "Required", min: 0 })}
                            />
                            {errors.cost && <p className="text-red-500 text-sm">{errors.cost.message}</p>}
                        </div>

                        <div>
                            <label className="label font-bold">Unit</label>
                            <select className="select select-bordered w-full" {...register("unit", { required: true })}>
                                <option value="">Select Unit</option>
                                {units.map(u => <option key={u} value={u}>{u}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="label font-bold">Category</label>
                            <select className="select select-bordered w-full" {...register("category", { required: true })}>
                                <option value="">Select Category</option>
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="label font-bold">Description</label>
                            <textarea
                                className="textarea textarea-bordered w-full h-28"
                                {...register("description", { required:  "Required"})}
                            />
                            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
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

export default HandleServices;