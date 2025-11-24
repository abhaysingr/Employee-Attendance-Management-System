import React from "react";

export default function SocialMediaSection() {
  return (
    <section className="flex flex-col sm:flex-row justify-between items-center p-4 bg-blue-900 text-white">
      {/* Left Side */}
      <div className="mb-4 sm:mb-0 sm:mr-5">
        <span className="text-sm md:text-base font-medium">
          Get connected with us on social networks:
        </span>
      </div>

      {/* Right Side (Social Icons) */}
      <div className="flex space-x-4">
        {/* Facebook */}
        <a href="#" className="hover:text-gray-300 transition-colors duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.909c0-.869.272-1.291 1.6-1.291h2.4v-4h-3.272c-3.193 0-4.728 1.583-4.728 4.609v2.391z" />
          </svg>
        </a>

        {/* Twitter */}
        <a href="#" className="hover:text-gray-300 transition-colors duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.594 0-6.495 2.902-6.495 6.495 0 .509.056 1.002.164 1.474-5.405-.271-10.198-2.868-13.402-6.811-.563.969-.886 2.09-.886 3.328 0 2.251 1.144 4.246 2.872 5.419-.533-.017-1.036-.162-1.479-.408v.08c0 3.167 2.253 5.8 5.241 6.392-.547.148-1.129.228-1.729.228-.424 0-.834-.041-1.234-.117.834 2.593 3.242 4.478 6.131 4.582-2.235 1.758-5.068 2.81-8.156 2.81-.531 0-1.053-.031-1.566-.092 2.905 1.861 6.356 2.951 10.066 2.951 12.072 0 18.66-10.007 18.66-18.662 0-.309-.01-.617-.027-.92z" />
          </svg>
        </a>

        {/* LinkedIn */}
        <a href="#" className="hover:text-gray-300 transition-colors duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.112 1.1-1.112s1.1.5 1.1 1.112c0 .613-.493 1.109-1.1 1.109zm8 6.891h-2v-3.793c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>

        {/* Instagram */}
        <a href="#" className="hover:text-gray-300 transition-colors duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.765s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.765-1.75 1.765zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>

        {/* GitHub */}
        <a href="#" className="hover:text-gray-300 transition-colors duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
      </div>
    </section>
  );
}
