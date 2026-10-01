import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs = [] } = useSelector((store) => store.job);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="w-full rounded-xl border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableCaption className="py-4 text-gray-500">
          List of jobs you have applied for.
        </TableCaption>

        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="font-semibold">Applied On</TableHead>
            <TableHead className="font-semibold">Job Role</TableHead>
            <TableHead className="font-semibold">Company</TableHead>
            <TableHead className="font-semibold text-center">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allAppliedJobs.length > 0 ? (
            allAppliedJobs.map((appliedJob) => (
              <TableRow
                key={appliedJob._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell>
                  {new Date(appliedJob.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell className="font-medium">
                  {appliedJob?.job?.title}
                </TableCell>

                <TableCell>{appliedJob?.job?.company?.name}</TableCell>

                <TableCell className="text-center">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusColor(
                      appliedJob.status,
                    )}`}
                  >
                    {appliedJob.status}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center text-gray-500">
                You haven't applied for any jobs yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
