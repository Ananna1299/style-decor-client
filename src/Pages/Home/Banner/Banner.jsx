import React from 'react';
import img from "../../../assets/backg.jpg"
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import flower from "../../../assets/flowerpic.png"

const Banner = () => {
    return (
        <section
      className="relative h-96 lg:h-[500px]  bg-cover bg-center bg-no-repeat flex items-center justify-center mb-10 rounded-xl text-center px-6 mt-10"
      style={{ backgroundImage: `url(${img})` }}
    >


        <img
        src={flower}
        alt="flower"
        className="absolute top-8 left-8 w-24 md:w-32 opacity-80 animate-pulse"
        style={{ transform: 'rotate(-20deg)' }}
      />
      <img
        src={flower}
        alt="flower"
        className="absolute top-20 right-12 w-20 md:w-28 opacity-70"
        style={{ transform: 'rotate(15deg)' }}
      />
      <img
        src={flower}
        alt=" flower"
        className="absolute bottom-10 left-16 w-28 md:w-36 opacity-80 animate-spin-slow"
        style={{ transform: 'rotate(30deg)' }}
      />
      <img
        src={flower}
        alt=" flower"
        className="absolute bottom-20 right-20 w-16 md:w-24 opacity-60"
        style={{ transform: 'rotate(-10deg)' }}
      />
      <img
        src={flower}
        alt="flower"
        className="absolute top-1/2 left-4 w-20 md:w-28 opacity-70 "
        style={{ transform: 'rotate(-45deg)' }}
      />
      <img
        src={flower}
        alt=" flower"
        className="absolute top-1/3 right-4 w-24 md:w-32 opacity-75"
        style={{ transform: 'rotate(40deg)' }}
      />

      <img
        src={flower}
        alt=" flower"
        className="absolute top-1 right-200  w-24 md:w-32 opacity-75"
        style={{ transform: 'rotate(40deg)' }}
      />
      <img
        src={flower}
        alt=" flower"
        className="absolute top-1 right-150  w-24 md:w-32 opacity-75"
        style={{ transform: 'rotate(40deg)' }}
      />

       <img
        src={flower}
        alt=" flower"
        className="absolute bottom-1 right-150  w-24 md:w-32 opacity-75"
        style={{ transform: 'rotate(40deg)' }}
      />

        <img
        src={flower}
        alt=" flower"
        className="absolute bottom-1 right-200  w-24 md:w-32 opacity-75"
        style={{ transform: 'rotate(40deg)' }}
      />
        
      

      <motion.div 
      initial={{opacity: 0, y:-100}}
                  animate={{opacity:1, y:0}}
                  transition={{duration:2}}
      
      className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-secondary drop-shadow-lg dark:text-[#6C3BAA] font-display">
          Transform Your Space with Effortless Elegance
        </h1>
        <p className="mt-6 text-sm lg:text-lg text-pink-800 font-medium drop-shadow-md">
         Book professional decorators for stunning home makeovers or memorable ceremonies. Choose from curated packages,
        </p>
        <Link to="/service-display">
        <button className='bg-secondary text-white mt-6 p-3 font-semibold rounded-xl hover:cursor-pointer hover:scale-110 dark:bg-[#6C3BAA] shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] border-0'>Book Decoration Services</button>
        </Link>
        
      </motion.div>
    </section>
       
    );
};

export default Banner;