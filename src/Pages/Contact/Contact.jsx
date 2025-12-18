import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Contact = () => {
    return (
        <div className=' w-full  py-20 flex justify-center items-center '>
            <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl font-bold text-cyan-800 mb-5">Contact Us</h2>


          <div className="space-y-6 text-gray-700">

          {/* Address */}
          <div className="flex flex-col items-center gap-2">
            <FaMapMarkerAlt className="text-xl" />
            <p className="">
              123 Anywhere St., Dhaka <br />
              City, Bangladesh
            </p>
          </div>

          <hr className="border-gray-300" />

          {/* Phone */}
          <div className="flex flex-col items-center gap-2">
            <FaPhoneAlt className="text-lg" />
            <p>+8801301854156</p>
          </div>

          <hr className="border-gray-300" />

          {/* Email */}
          <div className="flex flex-col items-center gap-2">
            <FaEnvelope className="text-lg" />
            <p>info@styledecor.com</p>
          </div>

        </div>


        </div>


            
        </div>
    );
};

export default Contact;