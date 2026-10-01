import React, { useEffect, useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { IoArrowBackOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import useGetCompanyById from "../hooks/usegetCompanyById";

const CompanySetUp = () => {
  const navigate = useNavigate();
  const params = useParams();

  // Fetch company details whenever this page loads
  // this paramsId send to useGetCompanyById hooks & then its run the func & fetch the current company details
  useGetCompanyById(params.id);

  const [loading, setLoading] = useState(false);

  const { singleCompany } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const changeFileHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files[0],
    });
  };

  // if fetch company then at placeholder show company details
  useEffect(() => {
    if (!singleCompany) return;

    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: null,
    });
  }, [singleCompany]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);

      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message || "Company updated successfully");
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white shadow-lg rounded-2xl border p-8">
          <button
            onClick={() => navigate("/admin/companies")}
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition mb-6"
          >
            <IoArrowBackOutline size={22} />
            <span className="font-medium">Back</span>
          </button>

          <h1 className="text-3xl font-bold text-gray-900">Company Setup</h1>

          <p className="text-gray-500 mt-2">
            Update your company details and upload your logo.
          </p>

          <form onSubmit={submitHandler} className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Company Name
              </label>

              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>

              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Enter company description"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Website
                </label>

                <Input
                  type="text"
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                  placeholder="https://company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Location
                </label>

                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  placeholder="Kolkata, India"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Company Logo
              </label>

              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />

              {input.file && (
                <p className="text-sm text-green-600 mt-2">
                  Selected: {input.file.name}
                </p>
              )}

              {singleCompany?.logo && !input.file && (
                <img
                  src={singleCompany.logo}
                  alt="Company Logo"
                  className="w-20 h-20 rounded-full object-cover mt-4 border"
                />
              )}
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/companies")}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={loading}>
                {loading ? (
                  <ClipLoader size={20} color="#ffffff" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CompanySetUp;
