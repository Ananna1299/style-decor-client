import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaUserCheck, FaUserMinus } from 'react-icons/fa';

const ManageUsers = () => {
     const axiosSecure=useAxiosSecure()
    const [searchText,setSearchText]=useState("")



    const { refetch,data: users = [] } = useQuery({
    queryKey: ['users',searchText],
    queryFn: async () => {
        const res = await axiosSecure.get(`/users?searchText=${searchText}`);
        console.log(res.data);
        return res.data;
    }
});

//set as admin
const handleMakeAdmin=(user)=>{
    const roleInfo={role:"admin"}

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, make admin !"
      }).then((result) => {

     if (result.isConfirmed) {
         axiosSecure.patch(`/users/${user._id}/role`,roleInfo)
    .then(res=>{
        console.log("after update the data",res.data)
                                if (res.data.modifiedCount){
                                    refetch()
                                    Swal.fire({
                                    title: `${user.displayName} assigned as admin`,
                                    text: "Thanks.",
                                    icon: "success"
                                    });
                                    
                                }
    })
     }   

   
        });
    
}

//remove from admin


const handleRemoveAdmin=(user)=>{
    const roleInfo={role:"user"}
        Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove from admin!"
      }).then((result) => {

         if (result.isConfirmed) {
               axiosSecure.patch(`/users/${user._id}/role`,roleInfo)
    .then(res=>{
        console.log("after update the data",res.data)
                                if (res.data.modifiedCount){
                                    refetch()
                                    Swal.fire({
                                    title: `${user.displayName} removed from admin`,
                                    text: "Thanks.",
                                    icon: "success"
                                    });
                                    
                                }
    })
         }

 
        });

}




//send pending req for create decorator
const handleCreateDecorator = (user) => {
  Swal.fire({
    title: "Create Decorator?",
    text: "This user will be sent for admin approval.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, create",
  }).then((result) => {
    if (result.isConfirmed) {
      axiosSecure
        .post("/decorators", {
          userId: user._id,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
        .then((res) => {
          if (res.data?.insertedId) {
            Swal.fire("Success!", "Decorator created status: pending", "success");
          } else {
            Swal.fire("Info", res.data.message, "info");
          }
        });
    }
  });
};










    return (
        <div className='my-10 px-4'>
            <p className='text-secondary text-5xl font-bold text-center font-display dark:text-[#6C3BAA]'>Manage Users</p>
            

            <label className="input my-10">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
                >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
                </g>
            </svg>
            <input onChange={(e)=>setSearchText(e.target.value)} type="search" required placeholder="Search" />
            </label>


            <div className="overflow-x-auto hidden lg:block">
            <table className="table">
                {/* head */}
                <thead className="bg-secondary text-white">
                <tr>
                    <th>
                    
                    </th>
                    <th className='  '>Name</th>
                     <th  >Photo</th>
                    <th  className=''>Email</th>
                    <th  className=' '>Role</th>
                    <th  className=' '>Admin Actions</th>
                    

                   
                </tr>
                </thead>
                <tbody>
            {
    users.map((user,index)=>{
        return (
            <tr key={user._id}>
                <th className='text-secondary dark:text-[#6C3BAA]'>{index+1}</th>
                <td  className='text-secondary dark:text-[#6C3BAA]'>{user.displayName}</td>

                <td>
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                                <img src={user.photoURL} alt="user photo" />
                            </div>
                        </div>
                    </div>
                </td>

                <td className='text-secondary dark:text-[#6C3BAA]'>{user.email}</td>
                <td
                className={
                    user.role === "admin"
                    ? "underline font-bold text-secondary"
                    : "text-secondary dark:text-[#6C3BAA]"
                }
                >
                {user.role}
                </td>

                <td className='space-x-2'>
                                        {user.role==="admin"?
                                        <button onClick={()=>handleRemoveAdmin(user)}  className="btn btn-secondary btn-sm  hover:bg-primary dark:bg-[#6C3BAA]">Remove Admin</button>:
                                        <button onClick={()=>handleMakeAdmin(user)}
                                         disabled={user.role === "rider"} 
                                           className="btn btn-sm btn-secondary hover:bg-primary 
                                            dark:bg-[#6C3BAA]">
                                            Make Admin
                                           </button>
                                        }



                                        {user.role === "user" && (
                                        <button
                                        onClick={() => handleCreateDecorator(user)}
                                        className="btn bg-primary btn-sm hover:bg-secondary text-white
                                        border-0"
                                        >
                                        Make Decorator
                                        </button>
  )}
                                          
                
                                         
                                         
                                        </td>
                
            </tr>
        );
    })
}

               
        
                
                
                </tbody>
   
    
  </table>
</div>



{/* mobile */}

  <div className="lg:hidden space-y-5 mt-6">
  {users.map((user) => (
    <div
      key={user._id}
      className="
        bg-white
        rounded-2xl
        border border-purple-100
        p-5
        shadow-sm
      "
    >
    
      <div className="flex items-center gap-4">
        <img
          src={user.photoURL}
          alt="user"
          className="w-14 h-14 rounded-xl object-cover"
        />

        <div className="flex-1">
          <p className="font-semibold text-purple-800">
            {user.displayName}
          </p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium
            ${
              user.role === "admin"
                ? "bg-purple-100 text-purple-700"
                : "bg-gray-100 text-gray-600"
            }`}
        >
          {user.role}
        </span>
      </div>

      
      <div className="mt-5 flex flex-wrap gap-2">
        {user.role === "admin" ? (
          <button
            onClick={() => handleRemoveAdmin(user)}
            className="btn btn-secondary btn-sm flex-1 dark:bg-[#6C3BAA] "
          >
            Remove Admin
          </button>
        ) : (
          <button
            onClick={() => handleMakeAdmin(user)}
            disabled={user.role === "rider"}
            className="btn btn-secondary btn-sm flex-1 dark:bg-[#6C3BAA] "
          >
            Make Admin
          </button>
        )}

        {user.role === "user" && (
          <button
            onClick={() => handleCreateDecorator(user)}
            className="btn bg-primary btn-sm text-white flex-1 border-0"
          >
            Make Decorator
          </button>
        )}
      </div>
    </div>
  ))}
</div>

            
        </div>
    );
};

export default ManageUsers;