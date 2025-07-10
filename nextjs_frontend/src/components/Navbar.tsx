"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

// Allow Navbar to type-safely access QuickPostNavbarProps on the window object
interface QuickPostNavbarPropsShape {
  onStartNewPost?: () => void;
}
declare global {
  // eslint-disable-next-line no-var
  var QuickPostNavbarProps: QuickPostNavbarPropsShape | undefined;
  interface Window {
    QuickPostNavbarProps?: QuickPostNavbarPropsShape;
  }
}

// PUBLIC_INTERFACE
export default function Navbar() {
  const { user, logout, loading } = useAuth();

  const onStartNewPost =
    typeof window !== "undefined"
      ? window.QuickPostNavbarProps?.onStartNewPost
      : undefined;

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
            <button
              className="bg-blue-500 text-white rounded px-3 py-1 text-sm font-semibold hover:bg-blue-600 transition"
              style={{ marginRight: "8px" }}
              onClick={() => onStartNewPost && onStartNewPost()}
              aria-label="Create New Post"
              type="button"
            >
              + New Post
            </button>
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
