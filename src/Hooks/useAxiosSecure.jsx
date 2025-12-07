import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const {user, logout}=useAuth()
  const navigate=useNavigate()
  useEffect(()=>{
    // Add a request interceptor    
     const reqInterceptor=axiosSecure.interceptors.request.use(config=> {
    // Do something before request is sent

    config.headers.authorization=`Bearer ${user?.accessToken}`
    return config;
  });

  
// Add a response interceptor
const resInterceptor=axiosSecure.interceptors.response.use((response)=> {
    
    return response;
  },(error)=> {
    const statusCode = error?.response?.status; 

    if (statusCode===401 || statusCode===403){
       logout()
       .then(()=>{
        navigate("/login")

       })

    }
    return Promise.reject(error);
  });


  // Cleanup to avoid duplicate interceptors
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };

  }
  
  
  ,[user,logout,navigate])
  return axiosSecure;
};

export default useAxiosSecure;