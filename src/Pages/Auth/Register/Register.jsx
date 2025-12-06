import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Register = () => {

    const [showpassword,setShowPassword]=useState(true)


     const handleShowpassword=(e)=>{
        e.preventDefault()
        setShowPassword(!showpassword)
    }




   const {register,
        handleSubmit,
        formState: { errors },
         reset

    }= useForm()

     const handleRegister=(data)=>{
        console.log(data)
        console.log(data.photo[0])
        const profileImg=data.photo[0]
     }

  return(
     <div className="w-full max-w-sm shrink-0 bg-white p-5 rounded-2xl my-5">
            <h1 className='font-extrabold text-2xl text-cyan-800'>Create an Account</h1>
            <p className='text-sm mt-2 text-secondary font-semibold'>Register with StyleDecor</p>
            <form className="card-body " 
            onSubmit={handleSubmit(handleRegister)}>
                <fieldset className="fieldset">

                 {/* Name    */}
                <label className="label">Name</label>
                <input type="text" className="input" placeholder="Name" 
                {...register("name" , { required: true })} />

                {errors.name?.type === "required" && (
                 <p className='text-red-600 font-semibold'>Name is required</p>
      )}

       {/* image input   */}
                <label className="label">Image</label>
                <input type="file" className="file-input "  
                {...register("photo" , { required: true })} />

                {errors.photo?.type === "required" && (
                 <p className='text-red-600 font-semibold'>Image is required</p>
      )}

                 {/* email    */}
                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email" 
                {...register("email" , { required: true })} />

                {errors.email?.type === "required" && (
                 <p className='text-red-600 font-semibold'>Email is required</p>
      )}

                

                {/* password */}
                <label className="label">Password</label>
                <div className='relative'>
                     <input type={showpassword?"password":"text"} className="input" placeholder="Password" 
                {...register("password" , 
                { required: true,
                minLength:6,
                pattern:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/ })}/>
                <button type="button" onClick={handleShowpassword} className="btn btn-xs absolute top-1.5 right-5">
                    {showpassword?<FaEye />:<FaEyeSlash />}

                </button>

                </div>
               

                {errors.password?.type === "minLength" && (
                 <p className='text-red-600 font-semibold'>Password should be at least 6 characters</p>
                )}

                {errors.password?.type === "required" && (
                <p className='text-red-600 font-semibold'>Password is required</p>
                )}

                {errors.password?.type === "pattern" && (
                <p className='text-red-600 font-semibold'>Password should have at least one uppercase , at least one lowercase, at least one digit and at least one special character</p>
                )}


                {/* forget pass */}
                <div><a className="link link-hover">Forgot password?</a></div>
                <button className="btn bg-primary text-secondary mt-4 ">Register</button>
                <p>Already have an account? <Link className='text-secondary' to="/login"> Login</Link></p>
                </fieldset>
            </form>
            {/* <GoogleLogin></GoogleLogin> */}

    </div>
  );
};

export default Register;
