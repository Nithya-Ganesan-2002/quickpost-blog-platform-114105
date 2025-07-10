"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

// PUBLIC_INTERFACE
export default function RegisterForm() {
  const { register, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    const { error } = await register(email, password);
    if (error) setError(error.message);
    else router.replace("/");
  };

  return (
    <form className="max-w-sm mx-auto bg-white p-8 border rounded shadow" onSubmit={handleSubmit}>
      <h2 className="font-bold text-xl mb-4">Register</h2>
      <input
        type="email"
        name="email"
        required
        placeholder="Email"
        className="border rounded px-3 py-2 w-full mb-4"
      />
      <input
        type="password"
        name="password"
        required
        placeholder="Password"
        className="border rounded px-3 py-2 w-full mb-4"
      />
      <input
        type="password"
        name="confirm"
        required
        placeholder="Confirm Password"
        className="border rounded px-3 py-2 w-full mb-4"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded py-2 w-full font-semibold hover:bg-blue-600 mb-2"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </form>
  );
}
