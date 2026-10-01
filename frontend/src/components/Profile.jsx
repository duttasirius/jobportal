import React, { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { MdModeEdit, MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import UpdateProfileDailoge from "./UpdateProfileDailoge";
import { useSelector } from "react-redux";

import useGetAppliedJobs from "./hooks/useGetAppliedJobs";
import AppliedJobTable from "./ui/AppliedJobTable";

const Profile = () => {
  useGetAppliedJobs();

  const [open, setOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <Avatar className="h-28 w-28 border-4 border-purple-500 shadow-md">
              <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
            </Avatar>

            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-800">
                {user?.fullName}
              </h1>
              <p className="text-gray-500 mt-2 max-w-md">
                {user?.profile?.bio ? user.profile.bio : "NO BIO AVAILABLE"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
          >
            <MdModeEdit size={20} />
            Edit
          </button>
        </div>

        {/* Divider */}
        <div className="my-8 border-t"></div>

        {/* Contact Information */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-5">
            Contact Information
          </h2>

          <div className="space-y-5">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <MdEmail className="text-purple-600 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <span className="font-medium text-gray-800">{user.email}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <FaPhoneAlt className="text-purple-600 text-xl" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <span className="font-medium text-gray-800">
                  {user.phoneNumber}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills</h2>

          {user?.profile?.skills?.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {user.profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 px-4 py-2 text-sm font-medium text-purple-700 border border-purple-200 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
              <p className="text-gray-500">No skills added yet.</p>
            </div>
          )}
        </div>

        {/* Resume */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Resume</h2>

          <a
            href={user?.profile?.resume}
            className="text-purple-600 font-medium hover:underline"
          >
            {user?.profile?.resumeOriginalName}
          </a>
        </div>

        {/* applied job section  */}
        <div className="mt-10">
          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Applied Jobs</h2>
            <p className="text-gray-500 mt-1">
              Track the status of all the jobs you've applied for.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <AppliedJobTable />
          </div>
        </div>
      </div>

      <UpdateProfileDailoge open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
