import React from 'react';
import * as FaIcons from "react-icons/fa";


const WhatsAppButton = () => {
  const phoneNumber = '9667300983'; // WhatsApp number with country code
  const message = 'Hello, I have a question about your service.'; // Optional message

  const handleClick = () => {
    // Open WhatsApp with the specified number and message
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 cursor-pointer flex items-center gap-3 group"
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
    >
       <span className=" text-green-800 text-[20px] font-medium bg-white px-4 py-2 rounded-full  shadow-md  transition-opacity duration-300 whitespace-nowrap">
        Connect with us
      </span>
      <div className="bg-[#25D366] group-hover:bg-[#128C7E] text-white p-2 rounded-full shadow-lg transition-all duration-300 group-hover:scale-105">
        {FaIcons.FaWhatsapp && <FaIcons.FaWhatsapp size={40} />}
      </div>
     
    </div>
  );
};

export default WhatsAppButton;
