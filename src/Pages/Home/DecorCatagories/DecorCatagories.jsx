import React from 'react';
import 'swiper/css';

import { Autoplay } from 'swiper/modules';
import {  Swiper, SwiperSlide,} from 'swiper/react';

const arr=["Home","Wedding","Office","Meeting","Seminar","Home","Wedding","Office"]

const DecorCatagories = () => {
    
    return (
        <div className='mb-10'>
            <h2 className="text-5xl font-extrabold text-center mb-10 text-secondary font-display">
    Decoration Categories
          </h2>
        <Swiper 
          slidesPerView={4}
        centeredSlides={true}
        spaceBetween={20}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}

         modules={[Autoplay]}
        >
            {arr.map((category,index)=>(
                <SwiperSlide key={index}>
                    <p className='px-5 py-3 md:bg-pink-100 m-2
    text-secondary
    font-semibold
    rounded-xl
    text-lg
    text-center
    md:shadow-md
    hover:bg-secondary
    hover:text-white
    hover:scale-105
    transition-all
    duration-300
    cursor-pointer'>
        {category}</p>
                </SwiperSlide>

            ))}
            
            
          </Swiper>


            
        </div>
    );
};

export default DecorCatagories;