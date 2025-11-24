import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Companylogo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "text-indigo-600 font-semibold" : "text-gray-700 dark:text-gray-300";

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center">
            <img src={Companylogo} alt="Logo" className="w-7 h-7" />
            <span className="text-xl font-bold text-gray-900 dark:text-white ml-4">
              AttendancePro
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/signin" className={isActive("/signin")}>Sign In</Link>
            <Link to="/signup" className={isActive("/signup")}>Sign Up</Link>
            <Link to="/forgotpassword" className={isActive("/forgotpass")}>Forgot Password</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 focus:outline-none"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;