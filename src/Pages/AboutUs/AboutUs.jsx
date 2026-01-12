import React from 'react';
import about from "../../assets/about.jpg"
import img from "../../assets/leaf.png"

const AboutUs = () => {
    return (
         <div className="w-full  py-10">
      
     
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl font-bold text-secondary font-display">About Us</h2>
        <p className="text-secondary mt-4">
         StyleDecor makes decorating easy – explore packages, book services, choose your style, pay online, and track your service, all in one place
        </p>
      </div>

      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 ">

      
        <div className="bg-cover bg-center bg-no-repeat  border border-secondary shadow-md rounded-xl p-10 " style={{ backgroundImage: `url(${img})` }}>
          <h3 className="text-2xl font-bold text-secondary mb-4 dark:text-[#6C3BAA]">
            We’re here to make every decoration experience effortless and beautiful.
          </h3>

         <p className="text-gray-500 leading-relaxed text-justify  mb-4">
            Not just for big events or luxury makeovers, but for everyone. We offer a more
            accessible and effortless alternative to the stressful, time-consuming decoration
            process.
            </p>

            <p className="text-gray-500 leading-relaxed">
            We don’t think décor should feel overwhelming at all. Decoration is an experience.
            When done right, it not only transforms a space beautifully, but also brings comfort,
            joy, and ease to the entire process.
            </p>
        </div>

        
        <div className="flex items-center justify-center">
          <img
            src={about}
            alt="People Group"
            className="rounded-xl object-cover shadow-lg w-full h-full max-h-[450px]"
          />
        </div>

      </div>
    </div>
    );
};

export default AboutUs;