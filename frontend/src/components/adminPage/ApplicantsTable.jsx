import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { MoreHorizontal, FileText } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import toast from "react-hot-toast";

const ApplicantsTable = () => {
  const shortList = ["Accepted", "Rejected"];

  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;

      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="w-full py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
          <Table>
            <TableCaption className="py-4 text-sm text-gray-500">
              Recent applicants for this job.
            </TableCaption>

            <TableHeader>
              <TableRow className="bg-gray-100 hover:bg-gray-100">
                <TableHead className="font-semibold">Full Name</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Contact</TableHead>
                <TableHead className="font-semibold">Resume</TableHead>
                <TableHead className="font-semibold">Applied On</TableHead>
                <TableHead className="text-right font-semibold">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {applicants?.map((application) => (
                <TableRow
                  key={application._id}
                  className="transition-colors hover:bg-gray-100"
                >
                  <TableCell className="font-medium">
                    {application.applicant?.fullName}

                    {/*                     
                    // Each item in `applicants` is an Application document, NOT a User.
//
// Database Structure:
//
// Job model
//  └── applications [
//        {
//          applicant: ObjectId("User")
//          status: "pending"
//          createdAt: "..."
//        }
//      ]
//
// After Mongoose `populate("applicant")`, the ObjectId is replaced
// with the complete User object:
//
// application model
// ├── applicant
// │     ├── fullname
// │     ├── email
// │     ├── phoneNumber
// │     └── profile
// ├── status
// └── createdAt
//
// Therefore, user information is inside `application.applicant`,
// not directly inside `application`.
//
// ❌ application.fullname
// ✅ application.applicant.fullname */}
                  </TableCell>

                  <TableCell>{application.applicant?.email}</TableCell>

                  <TableCell>{application.applicant?.phoneNumber}</TableCell>

                  <TableCell>
                    <a
                      href={application.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
                    >
                      <FileText size={16} />
                      {application.applicant?.profile?.resumeOriginalName ||
                        "View Resume"}
                    </a>
                  </TableCell>

                  <TableCell>
                    {new Date(application.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="rounded-full p-2 transition hover:bg-gray-100">
                          <MoreHorizontal className="h-5 w-5 text-gray-600" />
                        </button>
                      </PopoverTrigger>

                      <PopoverContent
                        align="end"
                        className="w-40 rounded-xl p-2"
                      >
                        <div className="space-y-1">
                          {shortList.map((status, index) => (
                            <button
                              onClick={() =>
                                statusHandler(status, application._id)
                              }
                              key={index}
                              className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                                status === "Accepted"
                                  ? "text-green-600 hover:bg-green-100"
                                  : "text-red-600 hover:bg-red-100"
                              }`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default ApplicantsTable;
