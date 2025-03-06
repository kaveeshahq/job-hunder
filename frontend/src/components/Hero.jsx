import { Link } from "react-router-dom";
import joinUsImage from "../assets/man-search-hiring-job-online-from-laptop.png";

export default function Hero() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 px-6">
      {/* Left Section: Text */}
      <div className="w-1/2 text-left space-y-6">
        <h1 className="text-6xl font-bold text-blue-600">Join Us Today !</h1>
        <p className="text-lg  text-gray-700">
          Join us today for exclusive benefits, seamless experiences,
          <br /> and a thriving community.
          <br /> Don’t miss out—be part of something great !
        </p>
        <button className="mt-4 rounded-full">
          <Link
            to="/apply"
            className="bg-blue-600 text-white px-6 py-3 rounded-3xl text-lg font-semibold hover:bg-blue-700 transition"
          >
            Join Us
          </Link>
        </button>
      </div>

      {/* Right Section: Image */}
      <div className="w-1/2">
        <img src={joinUsImage} alt="Hiring Banner" className="w-full  " />
      </div>
    </div>
  );
}
