import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import UseAuth from "../../Hooks/UseAuth";

const Register = () => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {createUser} = UseAuth();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
    .then(result => {
      console.log(result.user);
    })
    .catch(error => {
      console.log(error);
      
    })
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary">Create an Account</h1>
      <p className="text-sm text-gray-500">Register with Profast</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            {...register("name", {required: true})}
            placeholder="Name"
            className="input input-bordered w-full"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-700">Enter your name</p>
          )}
        </div>
        <div>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            {...register("email", {required: true})}
            placeholder="Email"
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
            {...register("password", { required: true, minLength: 6 })}
            placeholder="Password"
            className="input input-bordered w-full"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-700">Password is required.</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-700">Password must be 6 charactor long</p>
          )}
        </div>

        <button className="btn bg-lime-400 hover:bg-lime-500 text-white w-full">
          Register
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-800">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
