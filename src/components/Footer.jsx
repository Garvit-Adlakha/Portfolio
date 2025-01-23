import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      {/* <div className="py-6 bg-gray-800">
        {/* <div className="container mx-auto flex flex-col items-center sm:flex-row sm:justify-between">
          <div className="text-lg font-semibold mb-4 sm:mb-0">Newsletter</div>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded-l-full text-gray-800 focus:outline-none"
            />
            <button className="bg-sky-400 text-white px-4 py-2 rounded-r-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.94 2.94a1.5 1.5 0 112.12 2.12L4.12 6H15a1 1 0 011 1v6a1 1 0 01-1 1H4.12l.94.94a1.5 1.5 0 11-2.12 2.12l-3-3a1.5 1.5 0 010-2.12l3-3z" />
              </svg>
            </button>
          </div>
        </div> 
      </div> */}
      <div className="py-6 bg-gray-900">
        <div className="container mx-auto text-center">
          <ul className="flex justify-center space-x-6 mb-4">
            <li><a href="#home" className="hover:underline">Home</a></li>
            <li><a href="#about" className="hover:underline">About Me</a></li>
            <li><a href="#work" className="hover:underline">Work</a></li>
            <li><a href="#contact" className="hover:underline">Contact</a></li>
          </ul>
          <div className="flex justify-center space-x-4 mb-4">
            <a href="#facebook" className="hover:text-blue-500">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#twitter" className="hover:text-blue-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#youtube" className="hover:text-red-500">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
