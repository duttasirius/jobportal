import React, { useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useGetCompany from "../hooks/useGetCompany";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const PostJob = () => {
  useGetCompany();

  const { companies } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    position: "",
    companyId: "",
  });

  const changeEventHandler = async (effect) => {
    setInput({ ...input, [effect.target.name]: effect.target.value });
  };

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Post a New Job</h1>
            <p className="mt-2 text-gray-500">
              Fill in the details below to create a new job posting.
            </p>
          </div>

          <form
            onSubmit={onSubmitHandler}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {/* Job Title */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Job Title
              </label>

              <input
                type="text"
                placeholder="React Developer"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="h-11 w-full rounded-lg border border-gray-300 px-4 outline-none transition focus:border-[#6A38C2] focus:ring-2 focus:ring-[#6A38C2]/20"
              />
            </div>

            {/* Salary */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Salary
              </label>

              <input
                type="number"
                placeholder="12"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="h-11 w-full rounded-lg border border-gray-300 px-4 outline-none transition focus:border-[#6A38C2] focus:ring-2 focus:ring-[#6A38C2]/20"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>

              <textarea
                rows={4}
                placeholder="Write a short description..."
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="w-full rounded-lg border border-gray-300 p-4 outline-none transition focus:border-[#6A38C2] focus:ring-2 focus:ring-[#6A38C2]/20"
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Requirements
              </label>

              <textarea
                rows={4}
                placeholder="React, Node.js, MongoDB..."
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="w-full rounded-lg border border-gray-300 p-4 outline-none transition focus:border-[#6A38C2] focus:ring-2 focus:ring-[#6A38C2]/20"
              />
            </div>

            {/* Location */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Location
              </label>

              <input
                type="text"
                placeholder="Kolkata"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="h-11 w-full rounded-lg border border-gray-300 px-4 outline-none transition focus:border-[#6A38C2] focus:ring-2 focus:ring-[#6A38C2]/20"
              />
            </div>

            {/* Job Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Job Type
              </label>

              <input
                type="text"
                placeholder="Full Time"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="h-11 w-full rounded-lg border border-gray-300 px-4 outline-none transition focus:border-[#6A38C2] focus:ring-2 focus:ring-[#6A38C2]/20"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Experience
              </label>

              <input
                type="number"
                placeholder="2"
                name="experienceLevel"
                value={input.experienceLevel}
                onChange={changeEventHandler}
                className="h-11 w-full rounded-lg border border-gray-300 px-4 outline-none transition focus:border-[#6A38C2] focus:ring-2 focus:ring-[#6A38C2]/20"
              />
            </div>

            {/* Number of Positions */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Number of Positions
              </label>

              <input
                type="number"
                placeholder="5"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="h-11 w-full rounded-lg border border-gray-300 px-4 outline-none transition focus:border-[#6A38C2] focus:ring-2 focus:ring-[#6A38C2]/20"
              />
            </div>

            {/* Company */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Company
              </label>

              {companies.length > 0 ? (
                <Select
                  value={input.companyId}
                  onValueChange={(value) =>
                    setInput((prev) => ({
                      ...prev,
                      companyId: value,
                    }))
                  }
                >
                  <SelectTrigger className="h-11 w-full">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem key={company._id} value={company._id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-red-500">
                  No companies available. Please create a company first.
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-end">
              <button
                disabled={setLoading}
                type="submit"
                className="rounded-lg bg-[#6A38C2] px-8 py-3 font-semibold text-white transition hover:bg-[#582ca5]"
              >
                {loading ? <ClipLoader /> : "Post Job"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
