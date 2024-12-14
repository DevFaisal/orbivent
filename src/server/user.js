"use server";

import User from "@/models/user";
import dbConnect from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function createUser(data) {
  await dbConnect();
  if (!data) {
    return {
      error: "No Valid Inputs",
    };
  }
  try {
    //check if user exists
    const userExists = await User.findOne({
      email: data.email,
    });
    if (userExists) {
      return {
        error: "User Already Exists",
      };
    }

    const user = await User.create(data);
    if (!user) {
      return {
        error: "Error Creating User",
      };
    }
    return {
      success: "User created Successfully",
    };
  } catch (error) {
    return {
      error: "Server Error",
    };
  }
}

export async function loginUser(data) {
  await dbConnect();
  const cookieStore = await cookies();
  if (!data) {
    return {
      error: "No Valid Inputs",
    };
  }
  try {
    const userExists = await User.findOne({
      email: data.email,
    });
    if (!userExists) {
      return {
        error: "User does not exists",
      };
    }
    const isValidPassword = await userExists.isValidPassword(data.password);
    if (!isValidPassword) {
      return {
        error: "Invalid Password",
      };
    }

    const token = jwt.sign({ id: userExists._id }, "secret", {
      expiresIn: "30d",
    });

    cookieStore.set("token", token, { secure: true });
    return {
      success: true,
      token: token,
    };
  } catch (error) {
    return {
      error: "Server Error",
    };
  }
}

export async function authToken() {
  await dbConnect();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return {
      error: "No Valid Inputs",
    };
  }
  try {
    const decoded = jwt.verify(token, "secret");
    const user = await User.findById(decoded.id).select("-password");
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
