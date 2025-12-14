import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ApproveDecorators = () => {

   const specialtiesOptions = ["Home", "Wedding", "Office", "Seminar", "Meeting"];
    const axiosSecure=useAxiosSecure();
    const queryClient = useQueryClient();
    const modalRef = useRef(null);

    const [selectedDecoratorId, setSelectedDecoratorId] = useState(null);
    const [location, setLocation] = useState("");
    const [ratings, setRatings] = useState("");
    const [specialties, setSpecialties] = useState([]);
  

   


    const { data: decorators = [] } = useQuery({
    queryKey: ["decorators"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorators");
      return res.data;
    },
  });


  



  

 //approve
  const approveMutation = useMutation({
    mutationFn: async ({ id, location, ratings, specialties }) => {
      return axiosSecure.patch(`/decorators/${id}/approve`, {
        location,
        approveStatus: "approved",
        ratings,
        specialties,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["decorators"] });
      modalRef.current.close();
      setLocation("");
      setRatings("");
      setSpecialties([]);
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
    if (!ratings) {
      return Swal.fire("Please give a rating");
    }

    if (specialties.length === 0) {
      return Swal.fire("Select at least one specialty");
    }

    approveMutation.mutate({
      id: selectedDecoratorId,
      location,
      ratings: Number(ratings),
      specialties,
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

   const handleSpecialty = (sp) => {
    setSpecialties(prev =>
      prev.includes(sp)
        ? prev.filter(s => s !== sp)
        : [...prev, sp]
    );
  };


    return (
        <div className="my-8">
      <h2 className="text-3xl font-bold text-secondary text-center mb-6">
        Approve Decorators
      </h2>

      
      <div className="overflow-x-auto hidden lg:block">
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
                    className="btn btn-sm btn-secondary"
                  >
                    Approve
                  </button>

                  <button
                  type="button"
                   
                    onClick={() => handleReject(d._id)}
                    className="btn btn-sm btn-primary text-black"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    <div className="lg:hidden space-y-4">
  {decorators.map((d) => (
    <div
      key={d._id}
      className="border rounded-xl p-4 bg-white shadow-sm"
    >
      <p className="font-semibold  mb-2">
        Name: {d.name}
      </p>

      <div className="space-y-1 text-sm">
        <p>
          <span className="font-semibold">Email: </span>
          {d.email}
        </p>

        <p>
          <span className="font-semibold">Status: </span>
          <span className="font-bold">
            {d.approveStatus}
          </span>
        </p>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => openApproveModal(d._id)}
          className="btn btn-sm btn-success flex-1"
        >
          Approve
        </button>

        <button
          onClick={() => handleReject(d._id)}
          className="btn btn-sm btn-error flex-1"
        >
          Reject
        </button>
      </div>
    </div>
  ))}
</div>

      {/* modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl mb-4">
            Approve Decorator
          </h3>
          <label className='font-semibold mb-1'>Location</label>
          <input
            type="text"
            placeholder="Enter decorator location"
            className="input input-bordered w-full mb-4"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <label className='font-semibold mb-1'>Ratings</label>
          <input
            type="number"
            min="0"
            max="5"
            placeholder="Ratings (0-5)"
            className="input input-bordered w-full mb-4"
            value={ratings}
            onChange={(e) => setRatings(e.target.value)}
          />

         <div className="mb-2">
            <p className="font-semibold mb-1">Specialties:</p>
            <div className="flex flex-wrap gap-2">
              {specialtiesOptions.map((s) => (
                <label key={s} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={specialties.includes(s)}
                    onChange={() => handleSpecialty(s)}
                    className="checkbox checkbox-sm"
                  />
                  <span className="text-sm">{s}</span>
                </label>
              ))}
            </div>
          </div>
          

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