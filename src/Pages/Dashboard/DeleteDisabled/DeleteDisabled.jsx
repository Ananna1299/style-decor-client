import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../../../Components/Loder/Loading';
import Swal from 'sweetalert2';

const DeleteDisabled = () => {
        const axiosSecure = useAxiosSecure();
        const queryClient = useQueryClient();



        

        const { data: decorators = [], isLoading } = useQuery({
        queryKey: ["decorators","approved" ],
        queryFn: async () => {
            const res = await axiosSecure.get(
            `/decorators?approveStatus=approved`
            );
            return res.data;
        },
        });


     const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/decorators/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["approvedDecorators"]);
      Swal.fire("Deleted!", "Decorator removed successfully");
    },
  });

   //disable
  const disableMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.patch(`/decorators/${id}/disable`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["approvedDecorators"]);
      Swal.fire("Disabled!", "Decorator work status is disabled");
    },
  });

  // enable 
  const enableMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.patch(`/decorators/${id}/enable`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["decorators", "approved"] });
      Swal.fire("Enabled!", "Decorator work  enabled");
    },
  });



   const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this decorator?",
      text: "This action is irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };


  const handleToggleWorkStatus = (decorator) => {
    if (decorator.workStatus === "active") {
      disableMutation.mutate(decorator._id);
    } else if (decorator.workStatus === "disabled") {
      enableMutation.mutate(decorator._id);
    }
  };




    if (isLoading) {
    return <Loading></Loading>;
  }

    return (
      <div className="my-10 px-4">
      <h2 className='text-secondary text-5xl font-bold mb-5 text-center font-display dark:text-[#6C3BAA]'>
        Approved Decorators
      </h2>

     
      <div className="overflow-x-auto hidden lg:block">
        <table className="table  w-full">
          <thead className="bg-secondary text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Work Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {decorators.map((d, index) => (
              <tr key={d._id}>
                <td>{index + 1}</td>
                <td className='text-secondary dark:text-[#6C3BAA]'>{d.name}</td>
                <td className='text-secondary dark:text-[#6C3BAA]'>{d.email}</td>
                <td className='text-secondary dark:text-[#6C3BAA]'>{d.location}</td>
                <td className="font-semibold text-secondary dark:text-[#6C3BAA]">{d.workStatus}</td>
                <td className="space-x-2">
                  {/* Conditional Button */}
                  {d.workStatus === "available" || d.workStatus === "disabled" ? (
                    <button
                      onClick={() => handleToggleWorkStatus(d)}
                      className={`btn btn-sm ${
                        d.workStatus === "available"
                          ? "bg-amber-600 text-black border-0"
                          : "bg-green-600 text-white border-0"
                      }`}
                    >
                      {d.workStatus === "available" ? "Disable" : "Enable"}
                    </button>
                  ) : (
                    <span className="text-sm font-semibold text-gray-500">
                      Decorator in work
                    </span>
                  )}

                  <button
                    onClick={() => handleDelete(d._id)}
                    className="btn btn-sm bg-red-400 text-white border-0"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* mobile */}
      <div className="lg:hidden space-y-4">
        {decorators.map((d) => (
          <div
            key={d._id}
            className="border rounded-xl p-4 bg-white shadow-sm"
          >
            <p className="font-semibold mb-1 text-secondary dark:text-[#6C3BAA]">Name: {d.name}</p>

            <p className="text-sm text-secondary dark:text-[#6C3BAA]">
              <span className="font-semibold">Email:</span> {d.email}
            </p>

            <p className="text-sm text-secondary dark:text-[#6C3BAA]">
              <span className="font-semibold">Location:</span> {d.location}
            </p>

            <p className="text-sm text-secondary dark:text-[#6C3BAA]">
              <span className="font-semibold">Status:</span>{" "}
              <span className="font-bold">{d.workStatus}</span>
            </p>

            <div className="flex gap-2 mt-4">
              {d.workStatus === "available" || d.workStatus === "disabled" ? (
                <button
                  onClick={() => handleToggleWorkStatus(d)}
                  className={`btn btn-sm flex-1 ${
                    d.workStatus === "available"
                      ? "bg-yellow-600 text-black border-0"
                      : "bg-green-600 text-white border-0"
                  }`}
                >
                  {d.workStatus === "available" ? "Disable" : "Enable"}
                </button>
              ) : (
                <p className="text-sm font-semibold text-gray-500 flex-1">
                  Decorator in work
                </p>
              )}

              <button
                onClick={() => handleDelete(d._id)}
               className="btn btn-sm bg-red-500 flex-1 border-0"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
};

export default DeleteDisabled;