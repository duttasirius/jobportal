import React from "react";
import LatestJobsCards from "./LatestJobsCards";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
const LatestJobs = () => {
  const { allJobs } = useSelector((state) => state.job);

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-5">
        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
            Latest Opportunities
          </span>

          <h1 className="mt-5 text-4xl font-extrabold text-gray-900 md:text-5xl">
            Latest & <span className="text-blue-600">Top Job Openings</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Discover the newest jobs from top companies and take the next step
            in your career.
          </p>
        </div>

        {/* Job Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {allJobs && allJobs.length > 0 ? (
            allJobs.slice(0, 6).map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2 },
                }}
              >
                <LatestJobsCards job={item} />
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No jobs available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestJobs;
