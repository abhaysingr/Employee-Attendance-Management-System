import React from "react";

export default function ProjectManagement() {
  return (
    <>
      {/* Project Management Section */}
      <section className="py-16 px-4 bg-blue-900">
        <div className="container mx-auto text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold">Project Management</h2>
          <p className="mt-2 text-lg text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex flex-col md:flex-row items-center mt-8">
            <div className="md:w-1/2">
              {/* Placeholder for the illustration */}
              <div className="w-full max-w-lg mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 500 300"
                  className="w-full h-auto rounded-xl"
                >
                  <rect width="500" height="300" fill="#d1d5db"></rect>
                  <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fontFamily="Inter"
                    fontSize="20"
                    fill="#374151"
                  >
                    Team Illustration Placeholder
                  </text>
                </svg>
              </div>
            </div>
            <div className="mt-8 md:mt-0 md:w-1/2 md:pl-16 text-center md:text-left">
              <h3 className="text-2xl font-bold">Work together</h3>
              <p className="mt-4 text-white">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
