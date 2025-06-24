import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import UseAuth from "../../Hooks/UseAuth";

const Login = () => {
  const { signInUser } = UseAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary">Welcome back</h1>
      <p className="text-sm text-gray-500">Login with Profast</p>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-700">Email is required.</p>
          )}
        </div>
        <div>
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true, minLength: 6 })}
            className="input input-bordered w-full"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-700">Password is required.</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-700">Password must 6 cherector long</p>
          )}
        </div>
        <Link>
          <p className="text-sm text-gray-800 underline">Forget password?</p>
        </Link>
        <button className="mt-4 btn bg-lime-400 hover:bg-lime-500 text-white w-full">
          Login
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-800">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
