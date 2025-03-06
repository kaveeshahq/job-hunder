import { useState } from "react";
import axios from "axios";

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cv: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "cv") {
      setFormData({ ...formData, cv: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("cv", formData.cv);

    try {
      const res = await axios.post("http://localhost:5000/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(`File uploaded! View at: ${res.data.cvUrl}`);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">Job Application Form</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" className="w-full p-2 border rounded-lg" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded-lg" onChange={handleChange} required />
          <input type="text" name="phone" placeholder="Phone Number" className="w-full p-2 border rounded-lg" onChange={handleChange} required />
          <input type="file" name="cv" accept=".pdf,.docx" className="w-full p-2 border rounded-lg cursor-pointer" onChange={handleChange} required />

          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

// Comment
