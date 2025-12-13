import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ApproveDecorators = () => {
    const axiosSecure=useAxiosSecure();
    const queryClient = useQueryClient();
    const modalRef = useRef(null);

    const [selectedDecoratorId, setSelectedDecoratorId] = useState(null);
    const [location, setLocation] = useState("");



    const { data: decorators = [] } = useQuery({
    queryKey: ["decorators"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorators");
      return res.data;
    },
  });


  



  

 //approve
  const approveMutation = useMutation({
    mutationFn: async ({ id, location }) => {
      return axiosSecure.patch(`/decorators/${id}/approve`, {
        location,
        approveStatus: "approved",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["decorators"] });
      modalRef.current.close();
      setLocation("");
      Swal.fire("Decorator approved successfully", "success");
    },
  });



//reject
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.patch(`/decorators/${id}/approve`, {
        approveStatus: "rejected",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["decorators"] });
      Swal.fire("Decorator request rejected");
    },
  });


  //open the modal
  const openApproveModal = (id) => {
    setSelectedDecoratorId(id);
    modalRef.current.showModal();
  };


  //approve the pending req
  const handleApprove = () => {
    if (!location) {
      return Swal.fire("Please mention the decorator area of working");
    }

    approveMutation.mutate({
      id: selectedDecoratorId,
      location,
    });
  };


  // reject decorator req
  const handleReject = (id) => {
    Swal.fire({
      title: "Reject this decorator?",
      text: "Confirm",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate(id);
      }
    });
  };




    return (
        <div className="my-8">
      <h2 className="text-3xl font-bold text-secondary text-center mb-6">
        Approve Decorators
      </h2>

      
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-secondary text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {decorators.map((d, index) => (
              <tr key={d._id}>
                <td>{index + 1}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td className='font-bold'>
                 
                    {d.approveStatus}
                  
                </td>
                <td className="space-x-2">
                  <button
                  type="button"
                    
                    onClick={() => openApproveModal(d._id)}
                    className="btn btn-sm btn-success"
                  >
                    Approve
                  </button>

                  <button
                  type="button"
                   
                    onClick={() => handleReject(d._id)}
                    className="btn btn-sm btn-error"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl mb-4">
            Approve Decorator
          </h3>

          <input
            type="text"
            placeholder="Enter decorator location"
            className="input input-bordered w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <div className="modal-action">
            <button
              onClick={handleApprove}
              className="btn btn-success"
              disabled={approveMutation.isPending}
            >
              Approve The Decorator
            </button>

            <button
              className="btn"
              onClick={() => modalRef.current.close()}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
    );
};

export default ApproveDecorators;