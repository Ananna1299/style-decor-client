import React from 'react';
import Banner from '../Banner/Banner';
import TopDecorators from '../TopDecorators/TopDecorators';
import HowItWorks from '../HowItWorks/HowItWorks';
import Achivements from '../Achivements/Achivements';
import Faq from '../Faq/Faq';
import { FaArrowRight } from 'react-icons/fa';
import wall from "../../../assets/wall.png"
import { Link } from 'react-router';
import DecorCatagories from '../DecorCatagories/DecorCatagories';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <TopDecorators></TopDecorators>
            <DecorCatagories></DecorCatagories>
           
            <HowItWorks></HowItWorks>


             <div className="flex flex-col    items-center gap-6 mb-10 border border-secondary rounded-xl p-10 relative  bg-cover bg-center bg-no-repeat"  style={{ backgroundImage: `url(${wall})` }}>
      
      {/* Left Side */}
      <div>
        <h2 className="text-5xl font-bold text-secondary font-display text-center dark:text-[#6C3BAA]">
          Blogs
        </h2>
        <p className="text-pink-600 font-semibold mt-2 text-center">
          Explore decoration tips, trends, and creative ideas to make your events unforgettable.
        </p>
      </div>

      {/* Right Side */}
      <Link to="/blogs" className="btn my-btn-purple text-white rounded-xl font-semibold shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] border-0 hover:scale-110">
        Read Blogs
        <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
      </Link>

    </div>



    
            <Achivements></Achivements>
            <WhyChooseUs></WhyChooseUs>
            <Faq></Faq>

            
        </div>
    );
};

export default Home;