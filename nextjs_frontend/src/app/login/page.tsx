import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <LoginForm />
      <div className="mt-8 text-base text-gray-700">
        Don’t have an account?{" "}
        <Link
          href="/register"
          className="text-blue-600 font-semibold hover:underline"
        >
          Register here
        </Link>
      </div>
    </main>
  );
}
