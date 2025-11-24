import React from "react";

export default function WorkWithApps() {
  return (
    <>
      {/* Work with Your Apps Section */}
      <section className="bg-blue-900 text-white py-25 px-5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-20">
            Work with Your Favorite Apps Using AttendancePro
          </h2>
          <div
            id="app-icons"
            className="flex flex-wrap items-center justify-center space-x-8 mt-8"
          >
            {/* App Icons with new hover effect */}
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold transform transition-transform duration-300 hover:scale-110 cursor-pointer">
              App
            </div>
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold transform transition-transform duration-300 hover:scale-110 cursor-pointer">
              App
            </div>
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold transform transition-transform duration-300 hover:scale-110 cursor-pointer">
              App
            </div>
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold transform transition-transform duration-300 hover:scale-110 cursor-pointer">
              App
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
