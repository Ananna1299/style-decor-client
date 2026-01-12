import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AssignDecorator = () => {

    const axiosSecure=useAxiosSecure()
    const queryClient = useQueryClient();
    const modalRef = useRef(null);

     const [selectedBooking, setSelectedBooking] = useState(null);

    const { data: bookings = [] } = useQuery({
    queryKey: ["bookings", "pending-decorator"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/bookings?status=pending-decorator"
      );
      return res.data;
    },
  });
   



  const { data: decorators = [] } = useQuery({
    queryKey: [
      "decorators",
      selectedBooking?.location,
      selectedBooking?.category,
      "available",
    ],
    enabled: !!selectedBooking,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/decorators?approveStatus=approved&workStatus=available&location=${selectedBooking.location}&specialty=${selectedBooking.category}`
      );
      return res.data;
    },
  });



  const assignMutation = useMutation({
    mutationFn: async (decorator) => {
      return axiosSecure.patch(
        `/bookings/${selectedBooking._id}/assign-decorator`,
        {
          decoratorId: decorator._id,
          decoratorName: decorator.name,
          decoratorEmail: decorator.email,
        }
      );
    },
    onSuccess: () => {
      Swal.fire( "Decorator assigned successfully");
      modalRef.current.close();
      setSelectedBooking(null);
      queryClient.invalidateQueries({ queryKey: ["bookings","pending-decorator"] });
    },

    onError: (error) => {
    modalRef.current.close();
    Swal.fire({
      icon: "error",
      title: "Unavailable",
      text:
        error.response?.data?.message ||
        "Decorator already assigned on this date. Please choose another decorator.",
    });
  },
  });







  const openModal = (booking) => {
    setSelectedBooking(booking);
    modalRef.current.showModal();
  };





    return (
        <div className="my-10 px-4">
      <h2 className='text-secondary text-5xl font-bold mb-5 text-center font-display dark:text-[#6C3BAA]'>
        Assign Decorators
      </h2>

      
      <div className="overflow-x-auto hidden lg:block">
        <table className="table  w-full">
          <thead className="bg-secondary text-white">
            <tr>
              <th>#</th>
              <th>Service</th>
              <th>Category</th>
              <th>Location</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b, idx) => (
              <tr key={b._id}>
                <td className='text-secondary dark:text-[#6C3BAA]'>{idx + 1}</td>
                <td className='text-secondary dark:text-[#6C3BAA]'>{b.serviceName}</td>
                <td className='text-secondary dark:text-[#6C3BAA]'>{b.category}</td>
                <td className='text-secondary dark:text-[#6C3BAA]'>{b.location}</td>
                <td className="font-semibold text-secondary dark:text-[#6C3BAA]">{b.status}</td>
                <td>
                  <button
                    onClick={() => openModal(b)}
                    className="btn btn-sm btn-secondary dark:bg-[#6C3BAA] text-white"
                  >
                    Check Available Decorators
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



      <div className="lg:hidden space-y-4">
  {bookings.map((b, index) => (
    <div
      key={b._id}
      className="border rounded-xl p-4 bg-white shadow-sm"
    >
      <p className="font-semibold text-secondary dark:text-[#6C3BAA] mb-1">
        {index + 1} — {b.serviceName}
      </p>

      <div className="space-y-1 text-sm">
        <p className='text-secondary dark:text-[#6C3BAA]'>
          <span className="font-semibold ">Category:</span>{" "}
          {b.category}
        </p>

        <p className='text-secondary dark:text-[#6C3BAA]'>
          <span className="font-semibold ">Location:</span>{" "}
          {b.location}
        </p>

        <p className='text-secondary dark:text-[#6C3BAA]'>
          <span className="font-semibold">Status:</span>{" "}
          <span className="font-bold">{b.status}</span>
        </p>
      </div>

      <div className="mt-4">
        <button
          onClick={() => openModal(b)}
          className="btn btn-sm btn-secondary dark:bg-[#6C3BAA] text-white w-full"
        >
          Check Available Decorators
        </button>
      </div>
    </div>
  ))}
</div>

      {/* modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box max-w-3xl">
          <h3 className="font-bold text-xl mb-4">
            Available Decorators
          </h3>
 
          {decorators.length === 0 ? (
            <p className="text-center text-gray-500">
              No decorators available for this category or location
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Location</th>
                    <th>Specialties</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {decorators.map((d, idx) => (
                    <tr key={d._id}>
                      <td>{idx + 1}</td>
                      <td>{d.name}</td>
                      <td>{d.email}</td>
                      <td>{d.location}</td>
                      <td>{d.specialties.join(", ")}</td>
                      <td>
                        <button
                          onClick={() => assignMutation.mutate(d)}
                          className="btn btn-xs bg-secondary text-white dark:bg-[#6C3BAA]"
                        >
                          Assign Decorator
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )} 

          <div className="modal-action">
            <button className="btn btn-primary text-white" onClick={() => modalRef.current.close()}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
    );
};

export default AssignDecorator;