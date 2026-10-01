import React from "react";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LatestJobsCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {job.company?.name}
          </h2>

          <p className="mt-1 text-sm text-gray-500">📍 {job.location}</p>
        </div>

        <button className="rounded-full border p-2 transition hover:bg-blue-50 hover:text-blue-600">
          <Bookmark size={18} />
        </button>
      </div>

      {/* Job Info */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          {job.description}
        </p>
      </div>

      {/* Tags */}
      <div className="mt-6 flex flex-wrap gap-3">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          {job.position} Positions
        </span>

        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          {job.jobType}
        </span>

        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
          ₹{job.salary.toLocaleString()}
        </span>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex gap-3">
        <button
          onClick={() => navigate(`/description/${job._id}`)}
          className="flex-1 rounded-lg border border-gray-300 py-2.5 font-medium transition hover:bg-gray-100"
        >
          Details
        </button>

        <button className="flex-1 rounded-lg bg-blue-600 py-2.5 font-medium text-white transition hover:bg-blue-700">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default LatestJobsCards;
