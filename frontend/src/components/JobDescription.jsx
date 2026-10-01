import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import useGetAllJobs from "./hooks/useGetAllJobs";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "./redux/jobSlice";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";

const JobDescription = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;

  const { user } = useSelector((state) => state.auth);

  const { singleJob } = useSelector((store) => store.job);

  /*
|--------------------------------------------------------------------------
| Check Whether the Current User Has Already Applied for This Job
|--------------------------------------------------------------------------
| singleJob is the redux state where all job details stored with populate(backend) add application details so    
| `singleJob.applications` contains an array of all applications submitted
| for the current job. Each application document stores the applicant's
| user ID.
|
| Example:
|
| applications: [
|   {
|     _id: "...",
|     applicant: "687a9c2d8b6f4d9c12345678"
|   },
|   {
|     _id: "...",
|     applicant: "687a9c2d8b6f4d9c87654321"
|   }
| ]
|
| The `.some()` method iterates through the applications array and returns
| `true` immediately when it finds an application whose `applicant` ID
| matches the currently logged-in user's ID (`user._id`).
|
| If no matching application is found, `.some()` returns `false`.
|--------------------------------------------------------------------------
*/
  const isApplied =
    singleJob?.applications?.some(
      (application) => application.applicant?.toString() === user?._id,
    ) || false;

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        console.log(res.data);
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  // apply for the job function
  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        /*
|--------------------------------------------------------------------------
| Update Redux State After Successfully Applying
|--------------------------------------------------------------------------
|
| Why are we creating a new object?
|
| Redux state should NEVER be modified directly.
| Instead of changing `singleJob`, we create a brand new object.
|
| 1. `...singleJob`
|    → Copies all existing job details (title, location, salary, etc.).
|
| 2. `applications: [...]`
|    → Replaces the old applications array(from Job model) with a NEW array.
|
| 3. `...singleJob.applications`
|    → Copies every existing application into the new array.
|
| 4. `{ applicant: user._id }`
|    → Adds the currently logged-in user's application to the end.
|
| Why do this?
|
| - React detects the state change immediately.
| - Applicant count increases instantly.
| - `isApplied` becomes true because the user's ID now exists
|   in the applications array.
| - The button automatically changes from:
|      "Apply Now"
|   to:
|      "✓ Already Applied"
| - No need to refresh the page or fetch the job again.
|--------------------------------------------------------------------------
*/

        const updatedJob = {
          ...singleJob,
          applications: [
            ...singleJob.applications,
            {
              applicant: user._id,
            },
          ],
        };

        dispatch(setSingleJob(updatedJob));

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto rounded-3xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 px-8 py-10 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <p className="uppercase tracking-widest text-purple-100 text-sm font-medium">
                {singleJob?.location}
              </p>

              <h1 className="mt-2 text-4xl font-extrabold">
                {singleJob?.title}
              </h1>

              <p className="mt-3 max-w-2xl text-purple-100">
                {singleJob?.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/20 backdrop-blur px-4 py-2 text-sm font-semibold">
                  {singleJob?.position} Openings
                </span>

                <span className="rounded-full bg-white/20 backdrop-blur px-4 py-2 text-sm font-semibold">
                  {singleJob?.jobType}
                </span>

                <span className="rounded-full bg-white/20 backdrop-blur px-4 py-2 text-sm font-semibold">
                  {singleJob?.salary}
                </span>

                <span className="rounded-full bg-white/20 backdrop-blur px-4 py-2 text-sm font-semibold">
                  Remote Friendly
                </span>
              </div>
            </div>

            <Button
              onClick={applyJobHandler}
              disabled={isApplied}
              className={`h-14 px-8 rounded-xl text-base font-semibold shadow-lg transition-all duration-300 ${
                isApplied
                  ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                  : "bg-white text-purple-700 hover:bg-purple-100 hover:scale-105"
              }`}
            >
              {isApplied ? " Already Applied" : "Apply Now"}
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            📄 Job Overview
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border bg-gray-50 p-5">
              <p className="text-sm text-gray-500">Role</p>
              <h3 className="mt-2 text-lg font-semibold">{singleJob?.title}</h3>
            </div>

            <div className="rounded-2xl border bg-gray-50 p-5">
              <p className="text-sm text-gray-500">Location</p>
              <h3 className="mt-2 text-lg font-semibold">
                {singleJob?.location}
              </h3>
            </div>

            <div className="rounded-2xl border bg-gray-50 p-5">
              <p className="text-sm text-gray-500">Experience</p>
              <h3 className="mt-2 text-lg font-semibold">
                {singleJob?.experienceLevel}Years
              </h3>
            </div>

            <div className="rounded-2xl border bg-gray-50 p-5">
              <p className="text-sm text-gray-500">Salary</p>
              <h3 className="mt-2 text-lg font-semibold text-green-600">
                ₹{singleJob?.salary} LPA
              </h3>
            </div>

            <div className="rounded-2xl border bg-gray-50 p-5">
              <p className="text-sm text-gray-500">Applicants</p>
              <h3 className="mt-2 text-lg font-semibold">
                {singleJob?.applications?.length
                  ? singleJob?.applications?.length
                  : 0}
              </h3>
            </div>

            <div className="rounded-2xl border bg-gray-50 p-5">
              <p className="text-sm text-gray-500">Posted On</p>
              <h3 className="mt-2 text-lg font-semibold">
                {singleJob?.createdAt
                  ? formatDistanceToNow(new Date(singleJob.createdAt), {
                      addSuffix: true,
                    })
                  : "Loading..."}
              </h3>
            </div>
          </div>

          {/* Description */}
          <div className="mt-10 rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">
              Job Description
            </h2>

            <p className="leading-8 text-gray-600">{singleJob?.description}</p>
          </div>

          {/* Requirements */}
          <div className="mt-8 rounded-2xl border bg-gray-50 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">
              Requirements
            </h2>

            <div className="grid gap-4 md:grid-cols-4">
              {singleJob?.requirements?.map((requirement, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-lg"
                >
                  <div className="mt-1 flex h-2 w-2 shrink-0 items-center justify-center rounded-full bg-green-100 text-lg">
                    ✅
                  </div>

                  <p className="text-gray-700 leading-7 font-medium group-hover:text-purple-700">
                    {requirement}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
