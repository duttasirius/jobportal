import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdPeople } from "react-icons/io";

const AdminJobsTable = () => {
  const navigate = useNavigate();

  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);

  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    // Runs whenever:
    // 1. allAdminJobs changes (API fetch, delete, update)
    // 2. searchJobByText changes (user types in the search box)

    // If the search box is empty (or only contains spaces),
    // show all jobs.
    //
    // Example:
    // ""    -> true
    // "   " -> true because trim() removes spaces.
    if (!searchJobByText) {
      // Copy every job into the table state.
      setFilterJobs(allAdminJobs);

      // Stop here.
      // No need to filter because we're showing everything.
      return;
    }

    // If the user typed something,
    // filter the jobs array.
    const filteredJobs = allAdminJobs.filter((job) =>
      // For every job:
      // 1. Convert the job title to lowercase.
      // 2. Convert the search text to lowercase.
      // 3. Check whether the title contains the search text.
      //
      // Example:
      // Job Title : "Frontend Developer"
      // Search    : "front"
      //
      // "frontend developer".includes("front") -> true
      //
      // Job Title : "Backend Developer"
      // Search    : "front"
      //
      // "backend developer".includes("front") -> false
      job.title?.toLowerCase().includes(searchJobByText.toLowerCase()),
    );

    // Save only the matching jobs.
    // The table will re-render using this filtered list.
    setFilterJobs(filteredJobs);

    // This effect runs again whenever:
    // - allAdminJobs changes
    // - searchJobByText changes
  }, [allAdminJobs, searchJobByText]);

  // ********************************
  return (
    <div className="rounded-xl border bg-white shadow-sm px-10">
      <Table>
        <TableCaption className="pb-4">
          A list of your posted jobs.
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Created On</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs.length > 0 ? (
            filterJobs.map((job) => (
              <TableRow key={job._id}>
                {/* Company */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-11 w-11">
                      <AvatarImage src={job.company?.logo} />
                      <AvatarFallback>
                        {job.company?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <p className="font-medium">{job.company?.name}</p>
                  </div>
                </TableCell>

                {/* Job Title */}
                <TableCell>
                  <p className="font-medium">{job.title}</p>
                </TableCell>

                {/* Created Date */}
                <TableCell>
                  {new Date(job.createdAt).toLocaleDateString()}
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="rounded-md p-2 hover:bg-gray-100">
                      <MoreHorizontal className="h-5 w-5" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => navigate(`/admin/jobs/${job._id}`)}
                        className="cursor-pointer gap-2"
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="cursor-pointer gap-2 text-green-500 focus:text-green-600"
                      >
                        <IoMdPeople className="w-4 h-5" />
                        Applicants
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="py-6 text-center text-gray-500">
                No jobs found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
