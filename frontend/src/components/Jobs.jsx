import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./ui/shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchQuery } = useSelector((state) => state.job);

  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredJobs(allJobs);
      return;
    }

    const keyword = searchQuery.toLowerCase();

    const jobs = allJobs.filter((job) => {
      return (
        job?.title?.toLowerCase().includes(keyword) ||
        job?.description?.toLowerCase().includes(keyword) ||
        job?.location?.toLowerCase().includes(keyword)
      );
    });

    setFilteredJobs(jobs);
  }, [allJobs, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-20 max-sm:mx-5 px-4 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="w-full lg:w-1/4">
            <div className="sticky top-24">
              <FilterCard />
            </div>
          </aside>

          <main className="w-full lg:w-3/4">
            {filteredJobs.length === 0 ? (
              <div className="flex h-96 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white bg-white shadow-sm">
                <h2 className="text-xl font-semibold text-gray-500">
                  No jobs found.
                </h2>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredJobs.map((job, index) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                    }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
