import React from 'react';

const HowItWorks = () => {
    return (
        <div className='mb-10'>
            <h2 className="text-5xl font-extrabold text-center mb-12 text-secondary font-display">
    How It Works
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <section className='border border-secondary rounded-xl p-8 hover:shadow-[0px_4px_32px_0_rgba(99,102,241,.70)]'>
                <span className='font-display mr-2 text-secondary text-4xl'>01.</span>
                <span className='font-display text-secondary text-4xl font-bold'>Choose a service</span>
                <p className='text-pink-700 dark:text-primary font-medium drop-shadow-md text-justify'>Browse through a wide range of decoration services tailored for different events like weddings, birthdays, and corporate programs. Select the service that best matches your event type, theme, and budget. This helps us understand your exact needs from the start.</p>
            </section>

            <section className='border border-secondary rounded-xl p-8 hover:shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] '>
                <span className='font-display mr-2 text-secondary text-4xl'>02.</span>
                <span className='font-display text-secondary text-4xl font-bold'>Book & schedule</span>
                <p className='text-pink-700 dark:text-primary font-medium drop-shadow-md text-justify'>Confirm your booking by selecting a convenient date and time. Provide event details such as location, unit. Our simple booking process ensures everything is planned smoothly and on time.</p>
            </section>

            <section className='border border-secondary rounded-xl p-8 hover:shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] '>
                <span className='font-display mr-2 text-secondary text-4xl'>03.</span>
                <span className='font-display text-secondary text-4xl font-bold'>Assigned Decorator</span>
                <p className='text-pink-700 dark:text-primary font-medium drop-shadow-md text-justify'>Once your booking is confirmed, a professional decorator is officially assigned to your event. The decorator reviews your requirements, theme preferences, and schedule in detail. They coordinate with you before the event to ensure everything is perfectly planned and executed as expected.</p>
            </section>

            <section className='border border-secondary rounded-xl p-8 hover:shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] '>
                <span className='font-display mr-2 text-secondary text-4xl'>04.</span>
                <span className='font-display text-secondary text-4xl font-bold'>Enjoy the event</span>
                <p className='text-pink-700 dark:text-primary font-medium drop-shadow-md text-justify'>Relax and enjoy your special day while our professional decorator takes care of everything. From setup to finishing touches, we ensure a beautifully decorated event. Your satisfaction and memorable experience are our top priority ✨</p>
            </section>
          </div>

            
        </div>
    );
};

export default HowItWorks;