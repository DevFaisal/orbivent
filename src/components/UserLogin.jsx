"use client";
import React from "react";
import { loginUser } from "@/server/user";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import InputField from "./InputField";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const UserLogin = () => {
  const [error, setError] = useState("");

  const { user, isAuthenticated } = useAuth();

  console.log("User", user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  //This will call a server action file
  const onSubmit = async (data) => {
    const res = await loginUser(data);
    if (res?.success) {
      // cookies.set("token", res.token);
      router.push("/user");
    }
    if (res?.error) {
      setError(res.error);
    }
  };
  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold pr-2">Error:</strong>
          <span className="block sm:inline">{error}.</span>
        </div>
      )}
      <div className="space-y-4">
        <InputField
          name={"Email"}
          type={"email"}
          placeholder={"Enter your email"}
          register={register("email", { required: true })}
        />
        <InputField
          name={"Password"}
          type={"password"}
          placeholder={"Enter your password"}
          register={register("password", { required: true })}
        />

        <select
          {...register("role", { required: true })}
          defaultValue="user"
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {["User", "Admin"].map((option, idx) => (
            <option key={idx} value={option.toLowerCase()}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default UserLogin;
