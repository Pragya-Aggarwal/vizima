import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '7855555555'; // WhatsApp number with country code
  const message = 'Hello, I have a question about your service.'; // Optional message
  
  const handleClick = () => {
    // Open WhatsApp with the specified number and message
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 cursor-pointer"
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
    >
      <div className="bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
        <MessageCircle className="w-8 h-8" />
      </div>
    </div>
  );
};

export default WhatsAppButton;
