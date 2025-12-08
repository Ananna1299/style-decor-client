import React from 'react';
import useAxios from '../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const ServicesDisplay = () => {
    const axiosInstance=useAxios()


    const { refetch,data: services = [] } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
        const res = await axiosInstance.get(`/services`);
        console.log(res.data);
        return res.data;
    }
});
    return (
        <div>
            
        </div>
    );
};

export default ServicesDisplay;