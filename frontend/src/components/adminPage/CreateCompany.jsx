import React, { useEffect, useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCompany } from "../redux/companySlice";
import toast from "react-hot-toast";

const CreateCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");

  const registeredCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        // redirect to edit company page
        navigate(`/admin/companies/${res.data.company._id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="border rounded-xl shadow-sm bg-white p-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Company</h1>

          <p className="mt-2 text-gray-500">
            Register your company to start posting jobs and managing
            applications.
          </p>

          <div className="mt-8 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Company Name
              </label>

              <Input
                type="text"
                placeholder="Enter company name"
                className="h-11"
                onChange={(e) => setCompanyName(e.target.value)}
                value={companyName}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => navigate("/admin/companies")}
              >
                Cancel
              </Button>

              <Button onClick={registeredCompany}>Create Company</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCompany;
