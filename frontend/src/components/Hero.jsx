import { Link } from "react-router-dom"; 
import joinUsImage from "../assets/man-search-hiring-job-online-from-laptop.png";

export default function Hero() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-12 lg:py-0 lg:px-8 overflow-hidden">
      {/* Left Section: Text */}
      <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 lg:space-y-8 md:mt-16 sm:mt-18 lg:mt-0 relative z-10">
        <div className="relative">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold relative z-10 animate-fadeIn">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              VitaeXtract
            </span>
            <span className="text-gray-800"> – Automating CV Processing with Intelligence</span>
          </h1>
          <div className="absolute -left-6 -top-6 w-20 h-20 bg-blue-100 rounded-full filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-200 rounded-full filter blur-xl opacity-50 animate-pulse delay-700"></div>
        </div>
          
        <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto lg:mx-0 italic relative animate-fadeIn opacity-90 transition-opacity duration-500 hover:opacity-100">
          VitaeXtract is an intelligent CV processing platform designed to automate resume handling, extract key information, and streamline recruitment workflows. Using advanced OCR and AI-driven parsing, it transforms unstructured CVs into structured insights, making hiring faster, smarter, and more efficient.
        </p>
        
        <div className="relative mt-8 inline-block group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full blur opacity-30 group-hover:opacity-80 transition duration-1000 group-hover:duration-200"></div>
          <Link
            to="/apply"
            className="relative px-8 py-4 bg-white text-blue-600 font-semibold rounded-full inline-flex items-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <span>Get Started</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
        
      {/* Right Section: Image */}
      <div className="w-full lg:w-1/2 mt-12 lg:mt-0 perspective-1000">
        <div className="relative transform transition-all duration-700 hover:rotate-y-12">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur opacity-30 animate-pulse"></div>
          <div className="relative">
            <img
              src={joinUsImage}
              alt="Hiring Banner"
              className="w-full max-w-md lg:max-w-xl mx-auto rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
}