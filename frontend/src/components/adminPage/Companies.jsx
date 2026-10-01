import React, { useEffect, useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetCompany from "../hooks/useGetCompany";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "../redux/companySlice";

const Companies = () => {
  useGetCompany();

  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  // after enter text here redux state  setSearchCompanyByText updated from empty to current input text stored inside
  // from updated setSearchCompanyByText its search & based on text table shows current search company
  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Companies</h1>
          <p className="mt-2 text-gray-500">
            View, manage, and update your registered companies.
          </p>
        </div>

        {/* Search + Button */}
        <div className="mb-6 flex flex-col gap-4 rounded-xl border bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            {/* This top-1/2 + -translate-y-1/2 combination is a very common Tailwind pattern for vertically centering absolutely positioned elements. */}
            <Input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search companies..."
              className="pl-10 h-11"
            />
          </div>

          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="h-11 px-6"
          >
            + New Company
          </Button>
        </div>

        {/* Companies Table */}
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
