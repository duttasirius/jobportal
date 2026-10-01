import React from "react";
import { Button } from "./ui/button";
import { CiBookmark, CiClock2 } from "react-icons/ci";
import { Avatar, AvatarImage } from "./ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  // this page shows about the particular job

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <p className="text-sm  text-gray-500 flex items-center gap-1">
          <CiClock2 color="black" />
          {/* for adding the exactly date step-1 npm install date-fns /// then inside jobModel i've added createdAt step-2 -import { formatDistanceToNow } from "date-fns"; & add */}
          Posted{" "}
          {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
        </p>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full hover:bg-gray-100"
        >
          <CiBookmark className="text-xl" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-4 mt-5">
        <Avatar className="h-14 w-14 border">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>

        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {job?.company?.name}
          </h2>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      {/* Job Details */}
      <div className="mt-5">
        <h1 className="text-xl font-bold text-gray-900">{job?.title}</h1>

        <p className="mt-2 text-gray-600 text-sm leading-6">
          {job?.description}
        </p>
      </div>

      {/* Job Tags */}
      <div className="mt-6 flex flex-wrap gap-3">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          {job.position} Position
        </span>

        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          {job?.jobType}
        </span>

        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
          ₹{job?.salary}
        </span>
      </div>

      {/* Buttons */}
      <div
        onClick={() => navigate(`/description/${job._id}`)}
        className="mt-6 flex gap-3"
      >
        <Button variant="outline" className="flex-1">
          Details
        </Button>

        <Button className="flex-1 bg-purple-500 hover:bg-purple-600">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
