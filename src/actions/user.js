"use server";

import User from "@/models/user";
import dbConnect from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { createSession, decrypt } from "@/lib/session";
import { Validation } from "@/lib/zod";

export async function createUser(previousState, formData) {
  await dbConnect();
  const result = Validation.createUserSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const { name, email, password, role } = result.data;
  console.log(name, email, password, role);

  //check if user exists
  const userExists = await User.findOne({
    email: email,
  });
  if (userExists) {
    return {
      errors: {
        email: "User already exists",
      },
    };
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  if (!user) {
    return {
      errors: {
        email: "User not created",
      },
    };
  }
  // await createSession(user._id, user.role);
  redirect("/login", RedirectType.push);
}
export async function loginUser(previousState, formData) {
  const result = Validation.loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;
  await dbConnect();
  const userExists = await User.findOne({
    email: email,
  });
  if (!userExists) {
    return {
      errors: {
        email: "User does not exists",
      },
    };
  }
  const isValidPassword = await userExists.isValidPassword(password);
  if (!isValidPassword) {
    return {
      errors: {
        password: "Invalid Password",
      },
    };
  }
  await createSession(userExists._id, userExists.role);
  redirect("/" + userExists.role, "push");
}
export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/", "push");
}
export async function authToken() {
  await dbConnect();
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value || null;
  const session = cookie ? await decrypt(cookie) : null;

  if (!session) {
    return {
      error: "No Valid Inputs",
    };
  }
  try {
    const user = await User.findById(session.userId).select("-password");
    if (!user) {
      return {
        error: "User does not exists",
      };
    }

    return {
      success: true,
      user: JSON.stringify(user),
    };
  } catch (error) {
    return {
      error: "Server Error",
    };
  }
}
