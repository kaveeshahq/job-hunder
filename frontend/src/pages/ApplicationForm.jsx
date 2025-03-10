import { useState } from "react";
import axios from "axios";

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cv: null,
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [focused, setFocused] = useState({
    name: false,
    email: false,
    phone: false,
    cv: false
  });

  const handleChange = (e) => {
    if (e.target.name === "cv") {
      setFormData({ ...formData, cv: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleFocus = (field) => {
    setFocused({ ...focused, [field]: true });
  };

  const handleBlur = (field) => {
    setFocused({ ...focused, [field]: formData[field] ? true : false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
  
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("cv", formData.cv);
  
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${API_URL}/api/upload`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("Backend Response:", response.data);
      setSuccessMessage("Application submitted successfully!");
      setFormData({ name: "", email: "", phone: "", cv: null });
      
     
      setFocused({
        name: false,
        email: false,
        phone: false,
        cv: false
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      if (error.code === "ERR_NETWORK") {
        setErrorMessage("Network error. Please check your internet connection or ensure the backend server is running.");
      } else {
        setErrorMessage("Failed to submit application. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full transform transition-all duration-500 hover:shadow-2xl backdrop-blur-sm bg-opacity-90 border border-blue-100">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600 relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
           Enter Your Details
          </span>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
        </h1>
  
        {successMessage && (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-6 animate-fadeIn">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p>{successMessage}</p>
            </div>
          </div>
        )}
  
        {errorMessage && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 animate-fadeIn">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9h2v5H9V9zm0-1a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd" />
              </svg>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}
  
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group relative overflow-hidden border border-gray-300 rounded-lg transition-all duration-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => handleFocus('name')}
              onBlur={() => handleBlur('name')}
              required
              className="block w-full px-4 pt-6 pb-2 text-gray-700 bg-transparent appearance-none focus:outline-none"
            />
            <label 
              className={`absolute ${focused.name ? 'text-xs top-2 text-blue-500' : 'text-base top-4 text-gray-500'} left-4 transition-all duration-300`}
            >
              Full Name
            </label>
          </div>

          <div className="group relative overflow-hidden border border-gray-300 rounded-lg transition-all duration-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFocus('email')}
              onBlur={() => handleBlur('email')}
              required
              className="block w-full px-4 pt-6 pb-2 text-gray-700 bg-transparent appearance-none focus:outline-none"
            />
            <label 
              className={`absolute ${focused.email ? 'text-xs top-2 text-blue-500' : 'text-base top-4 text-gray-500'} left-4 transition-all duration-300`}
            >
              Email Address
            </label>
          </div>

          <div className="group relative overflow-hidden border border-gray-300 rounded-lg transition-all duration-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onFocus={() => handleFocus('phone')}
              onBlur={() => handleBlur('phone')}
              required
              className="block w-full px-4 pt-6 pb-2 text-gray-700 bg-transparent appearance-none focus:outline-none"
            />
            <label 
              className={`absolute ${focused.phone ? 'text-xs top-2 text-blue-500' : 'text-base top-4 text-gray-500'} left-4 transition-all duration-300`}
            >
              Phone Number
            </label>
          </div>

          <div className="relative group">
            <label className="block mb-2 text-sm font-medium text-blue-500">
              Upload CV (PDF, DOCX)
            </label>
            <div className="relative flex items-center">
              <input
                type="file"
                name="cv"
                accept=".pdf,.docx"
                onChange={handleChange}
                required
                className="hidden"
                id="cv-upload"
              />
              <label
                htmlFor="cv-upload"
                className="w-full cursor-pointer bg-blue-50 text-blue-700 border border-blue-300 py-3 px-4 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-all"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
                {formData.cv ? formData.cv.name : "Choose a file"}
              </label>
            </div>
          </div>
  
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 text-white font-medium rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Application"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}