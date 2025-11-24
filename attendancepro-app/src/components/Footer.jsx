import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">AttendancePro</h3>
          <p className="text-gray-400">
            Your reliable solution for tracking attendance and project management.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <p><a href="#home" className="text-gray-400 hover:text-gray-200">Home</a></p>
          <p><a href="#service" className="text-gray-400 hover:text-gray-200">Service</a></p>
          <p><a href="#about" className="text-gray-400 hover:text-gray-200">About</a></p>
          <p><a href="#contact" className="text-gray-400 hover:text-gray-200">Contact</a></p>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Services</h4>
          <p><Link to="/service" className="text-gray-400 hover:text-gray-200">Attendance Tracking</Link></p>
          <p><Link to="/service" className="text-gray-400 hover:text-gray-200">Reports</Link></p>
          <p><Link to="/service" className="text-gray-400 hover:text-gray-200">Project Management</Link></p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
          <p className="text-gray-400">Email: support@attendancepro.com</p>
          <p className="text-gray-400">Phone: +91 9876543210</p>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        © 2025 AttendancePro. All rights reserved.
      </div>
    </footer>
  );
}
