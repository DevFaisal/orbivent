"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutUser } from "@/actions/user";
import { useAuth } from "@/context/AuthContext";

const NavBar = () => {
  const [userRole, setUserRole] = useState("");
  const { user, isAuthenticated } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    console.log("rendered");
    setUserRole(user?.role);
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await logoutUser();
    setUserRole("public");
  };

  const NavLink = ({ href, children }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`text-gray-600 hover:text-blue-600 transition-colors ${
          isActive ? "font-bold text-blue-600 border-b-2 border-blue-600" : ""
        }`}
      >
        {children}
      </Link>
    );
  };

  const renderNavLinks = () => {
    switch (userRole) {
      case "admin":
        return (
          <>
            <NavLink href="/admin">Dashboard</NavLink>
            <NavLink href="/admin/events">Events</NavLink>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          </>
        );
      case "user":
        return (
          <>
            <NavLink href="/user">Dashboard</NavLink>
            <NavLink href="/user/enrolled-events">Enrolled Events</NavLink>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          </>
        );
      case "public":
        return (
          <>
            <NavLink href="/login">Login</NavLink>
            <Link
              href="/signup"
              className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors ${
                pathname === "/signup" ? "font-bold ring-2 ring-blue-400" : ""
              }`}
            >
              Sign Up
            </Link>
          </>
        );
      default:
        return (
          <>
            <span className="flex space-x-6">
              <p className="h-[30px] w-[100px] bg-gray-100 animate-pulse"></p>
              <p className="h-[30px] w-[100px] bg-gray-100 animate-pulse"></p>
            </span>
          </>
        );
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <Image
              src="/event.png"
              alt="Orbivent Logo"
              width={40}
              height={32}
              className="transition-transform group-hover:scale-110"
            />
            <span className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
              Orbivent
            </span>
          </Link>
          <div className="space-x-6">{renderNavLinks()}</div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
