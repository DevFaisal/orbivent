"use client";
import React, { useActionState } from "react";
import { createUser } from "@/actions/user";
import InputField from "@/components/InputField";
import SubmitButton from "@/components/SubmitButton";

const SignUpForm = () => {
  const [state, createUserAction] = useActionState(createUser, undefined);

  return (
    <form className="mt-8 space-y-6" action={createUserAction}>
      <div className="space-y-4">
        <InputField
          label={"Name"}
          id={"name"}
          name={"name"}
          type={"text"}
          placeholder={"Enter your name"}
          error={state?.errors?.name}
        />
        <InputField
          label={"Email"}
          id={"email"}
          name={"email"}
          type={"email"}
          placeholder={"Enter your email"}
          error={state?.errors?.email}
        />
        <InputField
          label={"Password"}
          id={"password"}
          name={"password"}
          type={"password"}
          placeholder={"Enter your password"}
          error={state?.errors?.password}
        />

        <select
          name="role"
          id="role"
          typeof="text"
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

      <SubmitButton>Sign Up</SubmitButton>
    </form>
  );
};

export default SignUpForm;
