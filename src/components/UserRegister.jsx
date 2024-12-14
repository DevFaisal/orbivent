import React from "react";
import { createUser } from "@/server/user";
import { useForm } from "react-hook-form";

const UserRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //This will call a server action file
  const onSubmit = async (data) => await createUser(data);

  return (
    <form
      className="flex flex-col bg-red-100 p-5 gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input type="text" placeholder="name" {...register("name")} />
      <input
        type="email"
        placeholder="email"
        {...register("email", { required: true })}
      />
      <input
        type="password"
        placeholder="password"
        {...register("password", { required: true })}
      />

      <select {...register("role")}>
        {["User", "Admin"].map((option, idx) => (
          <option key={idx} value={option.toLowerCase()}>
            {option}
          </option>
        ))}
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserRegister;
