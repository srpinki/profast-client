import React from "react";
import { FcGoogle } from "react-icons/fc";
import UseAuth from "../../Hooks/UseAuth";

const SocialLogin = () => {
    const {googleSignIn} = UseAuth();

    const handleGoogleLogin = () => {
        googleSignIn()
        .then(result => {
            console.log(result.user);
        })
        .catch(error => {
            console.log(error);
        })
    }

  return (
    <div>
      <button onClick={handleGoogleLogin} className="btn w-full flex items-center justify-center bg-gray-100 border-none text-gray-700">
        <FcGoogle className="text-xl mr-2" />
        Login with google
      </button>
    </div>
  );
};

export default SocialLogin;
