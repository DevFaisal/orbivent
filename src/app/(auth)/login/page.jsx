import Link from "next/link";
import { loginUser } from "@/server/user";
import UserLogin from "@/components/UserLogin";

export default function LoginPage() {
  return (
    <>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
      <UserLogin />
      <div className="mt-6 text-center text-sm">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
}
