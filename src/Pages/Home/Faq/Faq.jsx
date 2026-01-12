import React from 'react';

const Faq = () => {
    return (
       <section className=" py-10">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        
        {/* Left Content */}
        <div>
          
          <h2 className="text-5xl font-extrabold mb-4 font-display text-secondary">
            Frequently Asked <br /> Questions
          </h2>
          <p className="text-gray-500 max-w-md text-gray-500">
            We’ve answered some of the most common questions to help you plan
            your event decoration smoothly and confidently.
          </p>
        </div>

        {/* Right Accordion */}
        <div className="space-y-4">

          {/* Question 1 */}
          <div className="collapse collapse-plus bg-base-100 border border-secondary rounded-xl">
            <input type="radio" name="faq-accordion" defaultChecked />
            <div className="collapse-title text-lg font-semibold text-secondary">
              Do you work on weekends and public holidays?
            </div>
            <div className="collapse-content text-gray-500">
              <p>
                Yes, we provide decoration services on weekends and public
                holidays to ensure your special events are perfectly decorated.
              </p>
            </div>
          </div>

          {/* Question 2 */}
          <div className="collapse collapse-plus bg-base-100 border border-secondary rounded-xl">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-lg font-semibold text-secondary">
              Do you offer same-day decoration services?
            </div>
            <div className="collapse-content text-gray-500">
              <p>
                Yes, same-day bookings are available depending on
                decorator availability.One decorator can not take more than one task in the same day.
              </p>
            </div>
          </div>

          {/* Question 3 */}
          <div className="collapse collapse-plus bg-base-100 border border-secondary rounded-xl">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-lg font-semibold text-secondary">
              Can I reschedule or cancel my booking?
            </div>
            <div className="collapse-content text-gray-500">
              <p>
                You can reschedule or cancel your booking within the allowed
                timeframe mentioned in our booking policy.
              </p>
            </div>
          </div>

          {/* Question 4 */}
          <div className="collapse collapse-plus bg-base-100 border border-secondary rounded-xl">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-lg font-semibold text-secondary">
              Can I customize the decoration theme according to my event?
            </div>
            <div className="collapse-content text-gray-500">
              <p>
                Absolutely! Our decorators offer fully customizable themes to
                match your event’s style, color palette, and preferences.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
    );
};

export default Faq;