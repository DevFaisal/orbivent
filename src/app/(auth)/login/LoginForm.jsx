"use client";
import React, { useActionState } from "react";
import { loginUser } from "@/actions/user";
import InputField from "@/components/InputField";
import { useFormStatus } from "react-dom";
import SubmitButton from "@/components/SubmitButton";

const LoginForm = () => {
  const [state, loginAction] = useActionState(loginUser, undefined);

  return (
    <form className="mt-8 space-y-6" action={loginAction}>
      <div className="space-y-4">
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
      </div>
      <div>
        <SubmitButton>Login</SubmitButton>
      </div>
    </form>
  );
};

export default LoginForm;
