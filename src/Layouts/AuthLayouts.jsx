import React from "react";
import { FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, Outlet } from "react-router";
import authImage from "../assets/authImage.png";
import ProfastLogo from "../Shared/ProfastLogo/ProfastLogo";
import SocialLogin from "../Pages/Authorization/SocialLogin";

const AuthLayouts = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fcf5]">
      <div className="grid md:grid-cols-2 w-full max-w-6xl bg-white rounded-lg overflow-hidden ">
        {/* Left Section - Form */}
        <div className="p-10">
          <div className="mb-6">
            <div className="text-black">
              <ProfastLogo></ProfastLogo>
            </div>
          </div>
          <Outlet></Outlet>

          <div className="divider">Or</div>
          <SocialLogin></SocialLogin>
        </div>

        {/* Right Section - Image */}
        <div className="hidden md:flex items-center justify-center bg-[#f9fcf5]">
          <img
            src={authImage}
            alt="Register Illustration"
            className="max-w-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayouts;
