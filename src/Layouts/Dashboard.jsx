import React from 'react';
import useAuth from '../Hooks/useAuth';
import { IoIosMenu } from 'react-icons/io';
import { NavLink, Outlet } from 'react-router';
import Logo from '../Components/Logo/Logo';
import useRole from '../Hooks/useRole';
import { FaEdit, FaUsers, FaWpforms } from 'react-icons/fa';
import background from "../assets/background.jpg"
import Loading from '../Components/Loder/Loading';
import { ImProfile } from 'react-icons/im';

const Dashboard = () => {
    const {user,loading}=useAuth()
    //console.log(user.photoURL)
    const {role}=useRole()
    //console.log(role)

     if (loading){
        return <Loading></Loading>
    }
    



    return (
        <div className="drawer lg:drawer-open 
        bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${background})` }}>
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Navbar */}
     <nav className="navbar w-full  justify-between bg-white">
      <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost ">
        {/* Sidebar toggle icon */}
        <IoIosMenu size={30} />
      </label>
      <div className='navbar-end'>
        {
        user && <div className=' flex items-center gap-2 mr-3'>
        <img
                src={user?.photoURL || ""}
                alt="User Photo"
                className="w-10 h-10 rounded-full border-2 border-purple-500 cursor-pointer"
              />
              <span className='text-secondary font-bold'>{user.displayName}</span>

      </div>
      }
      </div>
     
    </nav>
    {/* Page content here */}
    <div className=''>
   <div
  className="w-11/12 mx-auto">
  <Outlet />
</div>
    
   </div>
  </div>

  <div className="drawer-side is-drawer-close:overflow-visible">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="flex min-h-full flex-col items-start bg-white is-drawer-close:w-14 is-drawer-open:w-64">
      {/* Sidebar content here */}
      <ul className="menu w-full grow">
        {/* List item */}

        <li className="is-drawer-close:hidden">
          <Logo></Logo>
          
        </li>
        <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
            {/* Home icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
            <span className="is-drawer-close:hidden">Homepage</span>
          </button>
        </li>


        {/* Profile info */}
        <li >
          <NavLink to="/dashboard/my-profile" className='hover:bg-primary'>
            <ImProfile size={20} title='My Profile'/>
          <p  className="is-drawer-close:hidden">My Profile</p>
          </NavLink>
        </li>

        {role === "admin" && (
        <>
            <li>
            <NavLink to="/dashboard/manage-users" className="hover:bg-primary">
                <FaUsers size={20} title='Manage Users' />
                <p className="is-drawer-close:hidden">Manage Users</p>
            </NavLink>
            </li>

            <li>
            <NavLink to="/dashboard/create-service" className="hover:bg-primary">
                <FaWpforms size={20} title='Decoration Service / Packages' />
                <p className="is-drawer-close:hidden">Decoration Service / Packages</p>
            </NavLink>
            </li>
            <li>
            <NavLink to="/dashboard/handle-service" className="hover:bg-primary">
                 <FaEdit size={20} title='Edit / Delete Service '/>
                <p className="is-drawer-close:hidden">Edit / Delete Services</p>
            </NavLink>
            </li>

        </>
        )}

      </ul>
    </div>
  </div>
</div>
    );
};

export default Dashboard;