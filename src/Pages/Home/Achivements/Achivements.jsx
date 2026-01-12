
import React from 'react';
import { FaStar, FaUsers, FaMapMarkedAlt, FaCalendarCheck } from "react-icons/fa";
import img from "../../../assets/leaf.png"
import leaf from "../../../assets/back.png"

const Achivements = () => {
    return (
        <section className="mb-10 ">
            <h2 className="text-5xl font-extrabold text-center mb-12 text-secondary font-display">
    Our Achievements
          </h2>
  <div className="">

    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

      <div className=" rounded-xl p-8 shadow hover:scale-110" style={{ backgroundImage: `url(${img})` }}>
        <FaCalendarCheck className="text-4xl mx-auto text-secondary dark:text-[#6C3BAA] mb-4" />
        <h3 className="text-4xl font-bold text-secondary dark:text-[#6C3BAA]">20+</h3>
        <p className="text-gray-500">Events Completed</p>
      </div>

      <div className="bg-white rounded-xl p-8 shadow hover:scale-110" style={{ backgroundImage: `url(${leaf})` }}>
        <FaUsers className="text-4xl mx-auto text-pink-600 mb-4" />
        <h3 className="text-4xl font-bold text-pink-600 ">10+</h3>
        <p className="text-gray-500">Decorators</p>
      </div>

      <div className="bg-white rounded-xl p-8 shadow hover:scale-110" style={{ backgroundImage: `url(${img})` }}>
        <FaStar className="text-4xl mx-auto text-secondary mb-4 dark:text-[#6C3BAA]" />
        <h3 className="text-4xl font-bold text-secondary dark:text-[#6C3BAA]">4.8</h3>
        <p className="text-gray-500">Average Rating</p>
      </div>

      <div className="bg-white rounded-xl p-8 shadow hover:scale-110" style={{ backgroundImage: `url(${leaf})` }}>
        <FaMapMarkedAlt className="text-4xl mx-auto  text-pink-600 mb-4" />
        <h3 className="text-4xl font-bold text-pink-600">10+</h3>
        <p className="text-gray-600">Cities Served</p>
      </div>

    </div>

  </div>
</section>

    );
};

export default Achivements;