import React, { useState } from "react";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "./redux/jobSlice";

const HeroSection = () => {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = async () => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <section className="bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Badge */}
        <span className="bg-purple-100 text-purple-700 px-5 py-2 rounded-full text-sm font-medium">
          No. 1 Job Hunt Website
        </span>

        {/* Heading */}
        <h1 className="mt-6 text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          Search, Apply & <br />
          Get Your <span className="text-purple-600">Dream Job</span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-gray-600 text-lg">
          Discover thousands of job opportunities from top companies across the
          country. Find jobs that match your skills, apply with one click, and
          take the next step toward your dream career.
        </p>

        {/* Search Box */}
        <div className="mt-10 flex items-center bg-white rounded-full shadow-lg border border-gray-200 w-full max-w-2xl overflow-hidden">
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Find your dream jobs..."
            className="flex-1 px-6 py-4 outline-none text-gray-700"
          />

          <button
            onClick={searchJobHandler}
            className="bg-purple-600 hover:bg-purple-700 text-white p-4 transition duration-300"
          >
            <Search size={22} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
