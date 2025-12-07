import React from 'react';
import { MdNoEncryptionGmailerrorred } from 'react-icons/md';
import { useNavigate } from 'react-router';

const Forbidden = () => {
   
    const navigate=useNavigate()
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <MdNoEncryptionGmailerrorred />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        Oops, page not found!
      </h1>
      <p className="text-gray-500 mb-6">
        The page you are looking for is not available.
      </p>
      <button
        onClick={()=>navigate(-1)}
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition"
      >
        Go Back!
      </button>
    </div>
    );
    
};

export default Forbidden;