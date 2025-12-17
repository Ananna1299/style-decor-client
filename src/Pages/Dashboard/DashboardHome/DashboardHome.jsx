import React from 'react';
import useRole from '../../../Hooks/useRole';
import Loading from '../../../Components/Loder/Loading';
import AdminDashboardHome from './AdminDashboardHome';

const DashboardHome = () => {
     const {isLoading,role}=useRole()

     if (isLoading){
        return <Loading></Loading>
     }
     if (role === "admin"){
        return <AdminDashboardHome></AdminDashboardHome>
    }
};

export default DashboardHome;