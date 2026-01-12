import React from 'react';
import { FaEnvelope, FaGlobe, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Contact = () => {
    return (
        // <div className=' w-full  py-10 flex justify-center items-center '>
        //     <div className="text-center max-w-2xl mx-auto mb-16">
        // <h2 className="text-4xl font-bold text-secondary font-display">Contact Us</h2>


        //   <div className="space-y-6 text-gray-700">

        //   {/* Address */}
        //   <div className="flex flex-col items-center gap-2">
        //     <FaMapMarkerAlt className="text-xl" />
        //     <p className="">
        //       123 Anywhere St., Dhaka <br />
        //       City, Bangladesh
        //     </p>
        //   </div>

        //   <hr className="border-gray-300" />

        //   {/* Phone */}
        //   <div className="flex flex-col items-center gap-2">
        //     <FaPhoneAlt className="text-lg" />
        //     <p>+8801301854156</p>
        //   </div>

        //   <hr className="border-gray-300" />

        //   {/* Email */}
        //   <div className="flex flex-col items-center gap-2">
        //     <FaEnvelope className="text-lg" />
        //     <p>info@styledecor.com</p>
        //   </div>

        // </div>


        // </div>


            
        // </div>
        <div className="w-full py-10 flex justify-center items-center">
      <div className="w-full max-w-3xl text-center text-white">

        {/* Heading */}
        <h2 className="text-4xl font-bold text-secondary font-display">Contact Us</h2>
        <p className="text-secondary dark:text-primary mb-10 text-sm">
          Don’t hesitate to ask everything about us!
        </p>

        {/* Contact Card */}
        <div className="space-y-4">

          {/* Website */}
          <div className="flex items-center bg-white text-black rounded overflow-hidden">
            <div className="bg-primary text-secondary p-4 dark:text-[#6C3BAA]">
              <FaGlobe />
            </div>
            <p className="flex-1 text-center font-medium text-secondary dark:text-[#6C3BAA]">
              www.yourwebsitelinkhere.com
            </p>
          </div>

          {/* Phone (Highlighted) */}
          <div className="flex items-center bg-primary text-black rounded overflow-hidden">
            <div className="bg-white text-secondary p-4 dark:text-[#6C3BAA]">
              <FaPhoneAlt />
            </div>
            <p className="flex-1 text-center font-semibold text-secondary dark:text-[#6C3BAA]">
              +880 1301-854156
            </p>
          </div>

          {/* Email */}
          <div className="flex items-center bg-white text-black rounded overflow-hidden">
            <div className="bg-primary text-secondary p-4 dark:text-[#6C3BAA]">
              <FaEnvelope />
            </div>
            <p className="flex-1 text-center font-medium text-secondary dark:text-[#6C3BAA]">
              info@styledecor.com
            </p>
          </div>

          {/* Address */}
          <div className="flex items-center bg-white text-black rounded overflow-hidden">
            <div  className="bg-primary text-secondary p-4 dark:text-[#6C3BAA]">
              <FaMapMarkerAlt />
            </div>
            <p  className="flex-1 text-center font-medium text-secondary dark:text-[#6C3BAA]">
              Businesstrade Center, Suite 6001 <br />
              Markaz Road, Dhaka
            </p>
          </div>
        </div>

        {/* Footer text */}
        <p className="mt-8 text-secondary dark:text-primary text-sm">
          It’s all about our client’s satisfaction!
        </p>
      </div>
    </div>
    );
};

export default Contact;