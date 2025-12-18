import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AssignedWork = () => {
  const axiosSecure=useAxiosSecure()
  const {user}=useAuth();
  const queryClient = useQueryClient();


  const today = new Date();
  today.setHours(0, 0, 0, 0); //this line removes the time portion from the date


  const { data: bookings = [] } = useQuery({
  queryKey: ["assigned-work", user?.email],
  queryFn: async () => {
    const res = await axiosSecure.get(`/bookings/decorators?decoratorEmail=${user?.email}&status=decorator-assigned`);
    return res.data;
  },
});


// Update status
  const statusMutation = useMutation({
    mutationFn: ({ id, status }) =>
      axiosSecure.patch(`/bookings/${id}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(["assigned-work",user?.email]);
    },
    onError: (err) => {
      Swal.fire(
        "Not Allowed",
        err.response?.data?.message || "Not allowed Today",
        "error"
      );
    },
  });

  // Reject booking
  const rejectMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/bookings/${id}/reject`),
    onSuccess: () => {
      Swal.fire("Rejected", "Booking rejected", "warning");
      queryClient.invalidateQueries(["assigned-work", user?.email]);
    },
  });


const handleStatusUpdate = (booking, nextStatus) => {
    const bookingDate = new Date(booking.bookingDate);
    bookingDate.setHours(0, 0, 0, 0);


    const onBookingDateStatus = [ "on-the-way","setup-in-progress","completed"];

    if (onBookingDateStatus.includes(nextStatus) && today < bookingDate) {
      Swal.fire(
        "Too Early",
        "You can perform this action on the booking date",
        "warning"
      );
      return;
    }

    statusMutation.mutate({
      id: booking._id,
      status: nextStatus,
    });
  };






  return (
      <div className="my-8">
      <h2 className="text-3xl font-bold text-secondary text-center mb-6">
        My Assigned Work
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead className="bg-secondary text-white">
            <tr>
              <th>#</th>
              <th>Service</th>
              <th>Date</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b, i) => {
              const bookingDate = new Date(b.bookingDate);
              bookingDate.setHours(0, 0, 0, 0);
              const isNotToday = today < bookingDate;

              return (
                <tr key={b._id}>
                  <td>{i + 1}</td>
                  <td>{b.serviceName}</td>
                  <td>{b.bookingDate}</td>
                  <td>{b.location}</td>

                  <td className="space-x-2">
                    {b.status === "decorator-assigned" && (
                      <>
                        <button
                          className="btn btn-xs bg-secondary text-white"
                          onClick={() => handleStatusUpdate(b, "planning")}
                        >
                          Accept
                        </button>

                        <button
                          className="btn btn-xs btn-error"
                          onClick={() => rejectMutation.mutate(b._id)}
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {b.status === "planning" && (
                      <button
                        className="btn btn-xs bg-secondary text-white"
                        onClick={() =>
                          handleStatusUpdate(b, "materials-prepared")
                        }
                      >
                        Materials Prepared
                      </button>
                    )}

                    {b.status === "materials-prepared" && (
                      <button
                        //disabled={isNotToday}
                        className="btn btn-xs bg-secondary text-white"
                        onClick={() => handleStatusUpdate(b, "on-the-way")}
                      >
                        On the Way
                      </button>
                    )}

                    {b.status === "on-the-way" && (
                      <button
                        disabled={isNotToday}
                        className="btn btn-xs bg-secondary text-white"
                        onClick={() =>
                          handleStatusUpdate(b, "setup-in-progress")
                        }
                      >
                        Setup in Progress
                      </button>
                    )}

                    {b.status === "setup-in-progress" && (
                      <button
                        disabled={isNotToday}
                        className="btn btn-xs btn-success"
                        onClick={() => handleStatusUpdate(b, "completed")}
                      >
                        Complete
                      </button>
                    )}

                    {b.status !== "decorator-assigned" &&
                      b.status !== "completed" && (
                        <span className="font-semibold ml-2 text-secondary">
                          Current status:{" "}
                          <span className="text-black font-extrabold">
                            {b.status.replaceAll("-", " ")}
                          </span>
                        </span>
                      )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <p className="text-center mt-6 text-gray-500">
            No assigned work available
          </p>
        )}
      </div>



     
      

      

      
    </div>
  );
};

export default AssignedWork;