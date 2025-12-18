
import React from "react";
import welcome from "../../../assets/welcome.png"


const DecoratorDashBoard = () => {
  return (
        <div  className="flex flex-col items-center justify-center min-h-screen  text-center px-4" >
            <img src={welcome} alt="404 Error" className="w-80 md:w-96 mb-2" />
             
                <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
        Check Your Decoration Assignment .
      </h1>
         <p className="text-pink-900 mb-6">
Please complete the work step by step and keep the status updated for smooth coordination and timely delivery.
      </p>

        </div>
  );
};

export default DecoratorDashBoard;
