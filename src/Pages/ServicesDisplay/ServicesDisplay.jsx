import React, {  useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import img from "../../assets/leaf.png"
import Loading from '../../Components/Loder/Loading';
const ServicesDisplay = () => {
    const axiosInstance=useAxios()
    const [searchText,setSearchText]=useState("")
    const [serviceType, setServiceType] = useState("");

    const [minBudget, setMinBudget] = useState("");
    const [maxBudget, setMaxBudget] = useState("");


    const [currentPage, setCurrentPage] = useState(0); 

    const [sort, setSort] = useState(""); // field to sort by
    const [order, setOrder] = useState(""); // asc or desc
   
    const limit = 4; // number of services per page
    




    const { data: services = {}} = useQuery({
    queryKey: ['service',searchText,serviceType,minBudget, maxBudget,currentPage,sort, order],
    queryFn: async () => {
        const res = await axiosInstance.get(`/services?searchText=${searchText}&type=${serviceType}&minBudget=${minBudget}&maxBudget=${maxBudget}&limit=${limit}&skip=${limit * currentPage}&sort=${sort}&order=${order}`);
        console.log(res.data);
        return res.data;
    }
});

const allServices = services?.result || [];
const totalPage = services?.total ? Math.ceil(services.total / limit) : 0;



 const categories = ["All","Home", "Wedding", "Office", "Seminar", "Meeting"];

  //if (isLoading) return <Loading></Loading>;

    return (
      
      
         <div className=" my-10">
      <h2 className="text-5xl font-extrabold text-center mb-10 text-secondary font-display">
    Our Decoration Services
  </h2>
      <div className='flex flex-col lg:flex-row justify-between gap-4 mb-10'>
        <div className=''>

            <label className="input outline-none focus-within:border-[#6C3BAA] border">
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
            <input onChange={(e)=>setSearchText(e.target.value)} type="search" required 
            className="placeholder:text-[#6C3BAA]" placeholder="Search by Service Name" />
            </label>


            <div className='mt-2'>
                <h2 className='w-64 text-secondary text-sm font-semibold mb-1'>Filter by category</h2>
                {/* filter by category*/}
            <fieldset className="fieldset w-64 ">

                <select
            className="select select-bordered outline-none focus-within:border-[#6C3BAA]  text-[#6C3BAA]" defaultValue=""
            onChange={(e) => setServiceType(e.target.value)}
            >
            <option value="" disabled >Select Category</option>
            {
              categories.map((u,i)=> <option key={i} value={u}>{u}</option>)
            }
            </select>

            </fieldset>

              </div>
              <div className="mt-4 ">
  <h2 className='text-secondary text-sm font-semibold mb-1'>Sort by Price</h2>
  <select
    className="select select-bordered outline-none focus-within:border-[#6C3BAA] text-[#6C3BAA]"
    defaultValue=""
    onChange={(e) => {
      const [field, ord] = e.target.value.split("-");
      setSort(field);
      setOrder(ord);
      setCurrentPage(0); 
    }}
  >
    <option value="" disabled>Select Sort</option>
    <option value="cost-asc">Price: Low - High</option>
    <option value="cost-desc">Price: High - Low</option>
  </select>
</div>


        </div>

            <div className='  '>
              
                
            
  {/* filter by budget */}
  <fieldset className="fieldset w-64">
  <legend className="label text-secondary text-sm font-semibold mb-1">
    Filter by Budget
  </legend>

  {/* Min Budget */}
  <input
    type="number"
    placeholder="Minimum Budget"
    className="input input-bordered mb-3 placeholder:text-[#6C3BAA]
     outline-none focus-within:border-[#6C3BAA]"
    onChange={(e) => setMinBudget(e.target.value)}
  />

  {/* Max Budget */}
  <input
    type="number"
    placeholder="Maximum Budget"
    className="input input-bordered mb-4 placeholder:text-[#6C3BAA]
     outline-none focus-within:border-[#6C3BAA]"
    onChange={(e) => setMaxBudget(e.target.value)}
  />
</fieldset>
            </div>


      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" >
        {allServices.map((service, index) => (
          <div
            key={index}
            className=" bg-cover bg-center bg-no-repeat  border-3 border-purple-200 rounded-xl p-4 shadow-md hover:shadow-xl"
             style={{ backgroundImage: `url(${img})` }}
          >
             
            <img
              src={service.photo}
              alt={service.serviceName}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />


            
            <h3 className="text-xl font-bold text-secondary mb-2 dark:text-[#6C3BAA]">
              {service.serviceName}
            </h3>

            
            <p className="text-sm font-medium  mb-3">
                <span className='font-bold text-secondary dark:text-[#6C3BAA]'>Category:</span>
                <span className='font-bold text-gray-800'> {service.category}</span>
              
            </p>

          
            <p className="text-secondary font-bold mb-2 dark:text-[#6C3BAA]">
              Cost: <span className="text-pink-600">${service.cost} </span>
            </p>
            <p className=" text-sm mb-3"><span className='font-bold text-secondary dark:text-[#6C3BAA]'>Unit: </span>
            <span className='font-bold text-gray-800'>{service.unit}</span></p>

          
            <p className="text-gray-500 text-xs mb-5 "><span className='font-bold text-secondary dark:text-[#6C3BAA]'>Created by: </span>
            <span>{service.email}</span></p>

            <Link to={`/service-details/${service._id}`}  className=" w-full bg-gradient-to-br border-0 border-secondary from-pink-300 via-purple-300 to-indigo-200 text-secondary font-bold p-2 rounded-lg hover:cursor-pointer text-sm  dark:text-[#6C3BAA]">
              View Details
            </Link>
          </div>
        ))}
      </div>

      <div className='my-10  px-8 flex flex-wrap justify-center'>
        {
            currentPage>0 && <button className='bg-secondary btn text-white mr-4 dark:text-white' onClick={()=>setCurrentPage(currentPage-1)}>prev</button>
        }
        
        { 
           [...Array(totalPage).keys()].map((i)=>(
            <button
            onClick={()=>setCurrentPage(i)}
             className={`btn  mr-4 ${ i === currentPage ? "bg-secondary text-white" : "bg-base-500"}` }>
                {i}
            </button>
           ))
            
        }

       {
            currentPage<totalPage-1 && <button className='bg-secondary btn text-white mr-4 dark:text-white' onClick={()=>setCurrentPage(currentPage+1)}>next</button>
        }
    </div>
    </div>
    );
};

export default ServicesDisplay;