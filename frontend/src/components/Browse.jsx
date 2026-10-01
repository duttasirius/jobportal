import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import Navbar from "./ui/shared/Navbar";
import { useEffect } from "react";
import { setSearchQuery } from "./redux/jobSlice";
import useGetAllJobs from "./hooks/useGetAllJobs";
import { motion } from "framer-motion";

const Browse = () => {
  const dispatch = useDispatch();

  const { allJobs, searchQuery } = useSelector((store) => store.job);

  useGetAllJobs();

  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    };
  }, [dispatch, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">
          Search Results ({allJobs.length})
        </h1>

        {allJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {allJobs.map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.2 },
                }}
              >
                <Job job={job} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
