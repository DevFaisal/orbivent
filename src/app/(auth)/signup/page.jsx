"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { createUser } from "@/server/user";
import InputField from "@/components/InputField";
import { useState } from "react";

export default function SignupPage() {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //This will call a server action file
  const onSubmit = async (data) => {
    const res = await createUser(data);
    if (res?.success) {
      window.location.href = "/login";
    }
    if (res?.error) {
      setError(res.error);
    }
  };
  return (
    <>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Create your account
      </h2>

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
            name={"Name"}
            type={"text"}
            placeholder={"Enter your name"}
            register={register("name", { required: true })}
          />
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

      <div className="mt-6 text-center text-sm">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}
