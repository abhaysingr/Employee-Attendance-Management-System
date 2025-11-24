import { Link, useNavigate } from "react-router-dom";
import NavbarSSF from "./components/NavbarSSF";
import Footer from "./components/Footer";
import api from './api/axios'; // Import your Axios instance
import { useState } from "react"; // Import useState for managing form data

export function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'EMPLOYEE',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission (page reload)
    try {
      const response = await api.post('/auth/login', formData); // Replace with your actual sign-in endpoint
      console.log('Login successful:', response.data);
      // Handle successful login (e.g., store token, redirect user)
      localStorage.setItem('user', JSON.stringify(response.data));
      if (response.data.role === 'ADMIN') {
        navigate('/admin');
      } else if (response.data.role === 'EMPLOYEE') {
        navigate('/employee');
      }
    } catch (error) {
      console.error('Login failed:', error.response.data);
      // Handle login error (e.g., display an error message to the user)
    }
  };

  return (
    <>
      <NavbarSSF/>
      <div className="flex items-center justify-center dark:bg-gray-900 min-h-screen">
        <form onSubmit={handleSubmit} className="grid w-full max-w-sm grid-cols-1 gap-8 rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
          {/* Your form JSX from before */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-left mb-0">Sign in</h2>
          <div className="flex flex-col gap-0.5">
            <label htmlFor="username" className="text-left text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter your username"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <label htmlFor="password" className="text-left text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <label htmlFor="role" className="text-left text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <button type="submit" className="w-full rounded-lg bg-indigo-600 p-2 text-white font-semibold hover:bg-indigo-700 transition-colors">Login</button>
        </form>
      </div>
      <Footer/>
    </>
  );
}

export default SignIn;