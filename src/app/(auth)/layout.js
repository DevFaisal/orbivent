import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src="/event.png"
          alt="Orbivent Logo"
          width={120}
          height={32}
          className="mx-auto h-12 w-auto"
        />
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
