import { useEffect, useState } from "react";
import Companylogo from "../assets/logo.png";

// Simulating the authentication state
const useAuth = () => {
  const [user] = useState(null); // This is where the user state would be managed

  useEffect(() => {
    // This is where you would check for an authenticated user,
    // e.g., by checking for a token in local storage or a cookie.
    // For this example, we'll keep the user as null to show the login link.
  }, []);

  return { user };
};

export default function Navbar() {
  const { user } = useAuth(); // Get the user data

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {/* Link to the top of the page */}
          <a href="#home">
            <img src={Companylogo} alt="Logo" className="w-7 h-7" />
          </a>
          <a href="#home">
            <span className="text-2xl font-bold text-gray-800">
              Attendance<span className="text-blue-500">Pro</span>
            </span>
          </a>
        </div>
        <nav className="space-x-12 flex items-center text-xl">
          <a href="#home" className="text-gray-700 hover:text-blue-500">Home</a>
          <a href="#service" className="text-gray-700 hover:text-blue-500">Service</a>
          <a href="#about" className="text-gray-700 hover:text-blue-500">About Us</a>
          <a href="#pricing" className="text-gray-700 hover:text-blue-500">Pricing</a>
          <a href="#contact" className="text-gray-700 hover:text-blue-500">Contact</a>

          {user ? (
            // If the user is logged in, show their profile picture
            <a href="/profile">
              <img
                src={user.profilePicUrl}
                alt={`${user.name}'s Profile`}
                className="w-8 h-8 rounded-full border-2 border-transparent hover:border-blue-500 transition-all duration-300"
              />
            </a>
          ) : (
            // If the user is not logged in, show the "Sign In" link
            <a href="/signin" className="text-white bg-blue-500 hover:bg-blue-600 hover:scale-110 font-bold py-1 px-3 rounded-full transition-colors duration-300">
              Sign In
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}