import { Link } from "react-router-dom";
import NavbarSSF from "./components/NavbarSSF";
import Footer from "./components/Footer";
import api from "./api/axios";
import { useState } from "react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/forgot-password", email);
      alert("Password reset link sent to your email.");
    } catch (error) {
      console.error("Forgot password failed:", error);
      alert("Failed to send password reset link.");
    }
  };

  return (
    <>
    <NavbarSSF/>
    <div className="flex min-h-screen items-center justify-center dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="grid w-full max-w-sm grid-cols-1 gap-6 rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
        {/* Logo and Title */}
        <div className="flex items-center justify-center text-lg font-bold">
          <div className="logo mr-3">
            <div className="box red"></div>
            <div className="box green"></div>
            <div className="box blue"></div>
          </div>
          AttendancePro
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Reset your password
        </h2>

        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          Enter your email and we’ll send you a link to reset your password.
        </p>

        {/* Email Field */}
        <div className="flex flex-col gap-2">
          <label className="text-left text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="Enter your email"
          />
        </div>

        {/* Reset Password Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 p-2 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300 transition-colors"
        >
          Reset password
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-gray-700 dark:text-gray-300 text-sm">
          Don’t have a AttendancePro account?{' '}
          <Link
            to="/signup"
            className="text-indigo-600 hover:underline dark:text-indigo-400 font-semibold"
          >Sign up
          </Link>
        </p>
      </form>
    </div>
    {/* <Footer/> */}
    </>
  );
}
