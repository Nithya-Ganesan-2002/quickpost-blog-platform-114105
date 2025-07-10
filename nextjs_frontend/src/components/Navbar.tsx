"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
      <Link href="/" className="font-bold text-xl text-blue-600 tracking-wide">
        QuickPost
      </Link>
      <div className="flex items-center gap-4">
        {loading ? (
          <span>Loading...</span>
        ) : user ? (
          <>
            <span className="text-gray-500 text-sm">{user.email}</span>
            <button
              className="bg-blue-500 text-white rounded px-3 py-1 text-sm hover:bg-blue-600"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="bg-blue-500 text-white rounded px-3 py-1 text-sm hover:bg-blue-600"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
