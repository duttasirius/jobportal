import React, { useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { useParams } from "react-router-dom";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants } from "../redux/applicationSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { applicants } = useSelector((state) => state.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true },
        );

        // Backend Response:
        //
        // res.data
        // └── job (Job Object)
        //      ├── title
        //      ├── description
        //      ├── company
        //      ├── salary
        //      └── applications (Array)
        //            ├── Application 1
        //            ├── Application 2
        //            └── ...
        //
        // We only need the list of applications on this page,
        // not the entire job object.

        // We store only:
        //
        // applicants = [
        //   {
        //     _id,
        //     applicant,
        //     status,
        //     createdAt
        //   },
        //   ...
        // ]
        //
        // Because applicants is now an ARRAY, we can directly use:

        dispatch(setApplicants(res.data.job.applications));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold px-5 py-5">
        Total Applicants - {applicants?.length || 0}
      </h1>
      <ApplicantsTable />
    </div>
  );
};

export default Applicants;
