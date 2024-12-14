import User from "@/models/user";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import dbConnect from "./mongodb";

export const isAdmin = async () => {
  return true;
};
