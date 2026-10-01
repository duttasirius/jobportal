import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Button } from "../button";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/components/redux/authSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/">
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#6A38C2]">Portal</span>
          </h1>
        </Link>

        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-6 font-medium text-gray-700">
            {user?.role === "recruiter" ? (
              <>
                <Link to="/admin/jobs">
                  <li className="cursor-pointer transition-colors hover:text-[#6A38C2]">
                    Jobs
                  </li>
                </Link>

                <Link to="/admin/companies">
                  <li className="cursor-pointer transition-colors hover:text-[#6A38C2]">
                    Companies
                  </li>
                </Link>
              </>
            ) : (
              <>
                <Link to="/">
                  <li className="cursor-pointer transition-colors hover:text-[#6A38C2]">
                    Home
                  </li>
                </Link>

                <Link to="/jobs">
                  <li className="cursor-pointer transition-colors hover:text-[#6A38C2]">
                    Jobs
                  </li>
                </Link>

                <Link to="/browse">
                  <li className="cursor-pointer transition-colors hover:text-[#6A38C2]">
                    Browse
                  </li>
                </Link>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>

              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt={user?.fullName || "User"}
                    className="grayscale"
                  />
                  <AvatarFallback>
                    {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-56 p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt={user?.fullName || "User"}
                    />
                    <AvatarFallback>
                      {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="font-medium">{user?.fullName}</h4>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <Link to="/profile">
                    <Button variant="ghost" className="w-full justify-start">
                      View Profile
                    </Button>
                  </Link>

                  <Button
                    onClick={logoutHandler}
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-600"
                  >
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
