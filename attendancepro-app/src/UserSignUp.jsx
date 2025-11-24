import { Link, useNavigate } from "react-router-dom";
import FooterSSF from "./components/Footer";
import NavbarSSF from "./components/NavbarSSF";
import api from './api/axios'; // Import your Axios instance
import { useState } from "react"; // Import useState

export function UserSignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission
    try {
      const response = await api.post('/auth/register', formData); // Replace with your actual sign-up endpoint
      console.log('Registration successful:', response.data);
      // Handle successful registration (e.g., redirect to sign-in page)
      navigate('/signin');
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      // Handle registration error
    }
  };

  return (
    <>
      <NavbarSSF/>
      <div className="flex min-h-screen items-center justify-center dark:bg-gray-900">
        <form onSubmit={handleSubmit} className="grid w-full max-w-sm grid-cols-1 gap-6 rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Create your account</h2>
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-left text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-2 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter your username"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-left text-sm font-medium text-gray-700 dark:text-gray-300">Full name</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-2 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter your full name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-left text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-2 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-left text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              className="w-full rounded-lg border border-gray-300 p-2 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Create a password"
            />
          </div>
          <button type="submit" className="w-full rounded-lg bg-indigo-600 p-2 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300 transition-colors">Create account</button>
        </form>
      </div>
      <FooterSSF/>
    </>
  );
}

export default UserSignUp;