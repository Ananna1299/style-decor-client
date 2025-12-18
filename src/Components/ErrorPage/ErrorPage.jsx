import React from 'react';
import { useNavigate } from 'react-router';
import ErrorImg from "../../assets/error.jpg"

const ErrorPage = () => {
      const navigate=useNavigate()
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
      <img src={ErrorImg} alt="404 Error" className="w-80 md:w-96 mb-6" />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        Oops, page not found!
      </h1>
      <p className="text-gray-500 mb-6">
        The page you are looking for is not available.
      </p>
      <button
        onClick={()=>navigate(-1)}
        className="bg-secondary hover:bg-pink-900 text-white font-semibold py-2 px-6 rounded-lg transition"
      >
        Go Back!
      </button>
    </div>
    );
};

export default ErrorPage;