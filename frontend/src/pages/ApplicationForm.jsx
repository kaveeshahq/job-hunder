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

  const handleChange = (e) => {
    if (e.target.name === "cv") {
      setFormData({ ...formData, cv: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
  
    // ✅ Correctly create FormData object
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("cv", formData.cv);
  
    try {
      // ✅ Send correct FormData to backend
      const response = await axios.post("http://localhost:5000/api/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("🔥 Backend Response:", response.data);
      setSuccessMessage("Application submitted successfully!");
      setFormData({ name: "", email: "", phone: "", cv: null }); // Reset form
    } catch (error) {
      console.error("❌ Error submitting application:", error);
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Job Application Form
        </h1>
  
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            {successMessage}
          </div>
        )}
  
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {errorMessage}
          </div>
        )}
  
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-2 border rounded-lg"
            onChange={handleChange}
            value={formData.name}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded-lg"
            onChange={handleChange}
            value={formData.email}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full p-2 border rounded-lg"
            onChange={handleChange}
            value={formData.phone}
            required
          />
          <input
            type="file"
            name="cv"
            accept=".pdf,.docx"
            className="w-full p-2 border rounded-lg"
            onChange={handleChange}
            required
          />
  
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}