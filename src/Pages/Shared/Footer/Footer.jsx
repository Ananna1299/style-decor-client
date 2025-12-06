import React from 'react';
import Logo from '../../../Components/Logo/Logo';

import { FaFacebook, FaFacebookF,  FaMapMarkerAlt,  FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
    return (
          <footer className="bg-[#111827] text-white py-12 px-6 md:px-16 rounded-xl">
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-20">

        {/* Logo & About */}
        <div>
          <h2 className="text-3xl font-bold mb-4 italic text-secondary">StyleDecor</h2>
          <p className="text-gray-300 leading-relaxed mb-4 text-justify">
            StyleDecor is a modern appointment management system for a local decoration
            company that offers both in-studio consultations and on-site decoration services
            for homes and ceremonies.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-4">
            <a className="bg-[#1A1F2B] p-3 rounded-full hover:bg-[#2563EB] transition" href="https://facebook.com"  target="_blank">
              <FaFacebookF />
            </a>
            <a className="bg-[#1A1F2B] p-3 rounded-full hover:bg-[#1DA1F2] transition"
             href="https://www.instagram.com/"
              target="_blank">
                 <RiInstagramFill />
             
            </a>
            
            

            <a className="bg-[#1A1F2B] p-3 rounded-full hover:bg-[#0A66C2] transition" href="https://twitter.com/"
              target="_blank">
                 <FaTwitter />
              
            </a>
            
          </div>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-primary">CONTACT US</h3>

          <p className="flex items-center gap-2 mb-2">
            <FaWhatsapp /> WhatsApp : +8801301854156
          </p>

          

          <p className="flex items-center gap-2 mb-2">
            <MdEmail /> info@styledecor.com
          </p>

          

          <p className="flex items-center gap-2 mb-2">
            <FaMapMarkerAlt /> Dhaka, Bangladesh
          </p>
        </div>

        {/* Link Websites */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-primary">Working Hours</h3>

          <ul className="space-y-2 text-gray-300">
        <li className="flex justify-between gap-2">
          <span>Saturday – Thursday</span>
          <span className="font-semibold text-white">8:00 AM – 10:00 PM</span>
        </li>

        <li className="flex justify-between">
          <span>Friday</span>
          <span className="font-semibold text-white">Closed</span>
        </li>

        <li className="flex justify-between">
          <span>Customer Support</span>
          <span className="font-semibold text-white">24/7 Available</span>
        </li>
      </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-primary">Company</h3>

          <ul className="space-y-2 text-gray-300">
            <li>➡ About Us</li>
            <li>➡ Contact Us</li>
            
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-primary text-black text-center py-3 mt-10 font-semibold">
        Style Decor © 2023. Develop & Maintenance By  
        <a className="font-bold ml-1" href="#"> abc.com</a>
      </div>

    </footer>
    )
};

export default Footer;