import React from "react";
import work from "../assets/Workeverywhere.jpg";

export default function WorkEverywhere() {
  return (
    <section className="bg-blue-900 text-white py-16 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Image box on the LEFT now */}
        <div className="md:w-1/2 flex justify-center md:justify-start">
          {/* Placeholder for the illustration */}
          <div className="w-full max-w-lg">
            <img src={work} alt="Logo" style={{ borderRadius: '10px' }} />
          </div>
        </div>

        {/* Text content on the RIGHT now */}
        <div className="mt-8 md:mt-0 md:w-1/2 md:pl-16 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold">
            Your work, everywhere you are
          </h2>
          <p className="mt-4 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button className="mt-8 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 hover:scale-110 transition-colors duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
