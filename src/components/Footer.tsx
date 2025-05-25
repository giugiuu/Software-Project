import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">&copy; {new Date().getFullYear()} Your Event Platform. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="/about" className="text-sm hover:text-gray-300">About</a>
            <a href="/contact" className="text-sm hover:text-gray-300">Contact</a>
            <a href="/privacy" className="text-sm hover:text-gray-300">Privacy Policy</a>
            <a href="/terms" className="text-sm hover:text-gray-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;