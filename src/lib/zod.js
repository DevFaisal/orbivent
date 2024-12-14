import z from "zod";

export const Validation = {
  loginSchema: z.object({
    email: z.string().email({ message: "Invalid Email" }),
    password: z.string().min(6, { message: "Password too short" }).trim(),
  }),
  createUserSchema: z.object({
    name: z.string().min(3, { message: "Name too short" }).trim(),
    email: z.string().email({ message: "Invalid Email" }),
    password: z.string().min(6, { message: "Password too short" }).trim(),
    role: z.string().min(3, { message: "Invalid Role" }).trim(),
  }),
  createEventSchema: z.object({
    name: z.string().min(3, { message: "Name too short" }).trim(),
    description: z.string().min(3, { message: "Description too short" }).trim(),
    date: z.string().min(3, { message: "Invalid Date" }).trim(),
    time: z.string().min(3, { message: "Invalid Time" }).trim(),
    venue: z.string().min(3, { message: "Invalid Venue" }).trim(),
    registrationLimit: z.string().min(1, { message: "Invalid Registration Limit" }),
  }),
};
