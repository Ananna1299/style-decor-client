import React from 'react';
import { FaClock, FaRedoAlt, FaInfoCircle, FaCheckCircle } from "react-icons/fa";

const WhyChooseUs = () => {
    return (
        <div className='mb-10'>
            <h2 className="text-5xl font-extrabold text-center mb-10 text-secondary font-display">
    Why Choose Us
          </h2>

        


         {/* Content */}
      <div className="grid md:grid-cols-2 gap-16 relative">
        
        {/* Vertical Divider */}
        <div className="hidden md:block absolute left-1/2 top-0 h-full w-[1px] bg-gray-300"></div>

        {/* Left Column */}
        <div className="space-y-12">
          <div className="flex gap-5 items-start">
            <FaCheckCircle className="text-4xl text-secondary" />
            <div>
              <h3 className="text-4xl font-bold font-display text-secondary ">
                Builds Confidence
              </h3>
              <p className="text-gray-500 mt-2 dark:text-primary">
                Our proven experience and trusted decorators help first-time
                visitors feel confident and secure when booking our services.
              </p>
            </div>
          </div>

          <div className="flex gap-5 items-start">
            <FaInfoCircle className="text-4xl text-secondary" />
            <div>
              <h3 className="text-4xl font-bold font-display text-secondary ">
                Clear Service Explanation
              </h3>
              <p className="text-gray-500 mt-2 dark:text-primary">
                We clearly explain all decoration packages, themes, and pricing
                so you know exactly what you’re getting—no confusion.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-12">
          <div className="flex gap-5 items-start">
            <FaRedoAlt className="text-4xl text-secondary" />
            <div>
              <h3 className="text-4xl font-bold font-display text-secondary ">
                Encourages Repeat Customers
              </h3>
              <p className="text-gray-500 mt-2 dark:text-primary">
                Quality service, attention to detail, and customer satisfaction
                make our clients come back for every special occasion.
              </p>
            </div>
          </div>

          <div className="flex gap-5 items-start">
            <FaClock className="text-4xl text-secondary" />
            <div>
              <h3 className="text-4xl font-bold font-display text-secondary ">
                Saves Your Time
              </h3>
              <p className="text-gray-500 mt-2 dark:text-primary">
                From booking to execution, our streamlined process saves your
                time and delivers stress-free decoration solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
        </div>
    );
};

export default WhyChooseUs;