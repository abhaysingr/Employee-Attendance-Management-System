
// Main App component
const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800 antialiased">
      {/* Services Section */}
      <section id="service" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl text-center mt-10">
          <p className="text-xl font-medium uppercase tracking-wider text-blue-400">
            What we do?
          </p>
          <h1 className="mt-4 text-sm tracking-tight text-gray-900 sm:text-5xl">
            We are giving you perfect
            <br/>solutions with our proficient
            <br/>services.
            <br/>
            <br/>
            <br/>
            <hr/>
          </h1>
          <div className="mt-33 grid gap-8 md:grid-cols-3">
            {/* Service Card 1 */}
            <div className="group rounded-xl border border-gray-200 hover:scale-110 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg ">
              <div className="flex justify-center md:block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-10 w-10 text-blue-400 transition-all duration-300 group-hover:scale-110"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="mt-4 text-center text-xl font-semibold text-gray-900 md:text-left">
                Real-time Tracking
              </h3>
              <p className="mt-2 text-center text-sm text-gray-600 md:text-left">
                Our system provides a comprehensive, up-to-the-minute view of your workforce. Employees can check in and out using web browsers, mobile apps, or a dedicated kiosk. This flexibility ensures that whether your team is in the office or remote, their attendance is accurately recorded. The real-time data flow eliminates manual time sheets and reduces errors, boosting overall operational efficiency.
              </p>
              <div className="mt-4 text-center md:text-left">
                <a href="#" className="text-sm font-medium text-blue-400 hover:underline">
                  Learn More →
                </a>
              </div>
            </div>
            {/* Service Card 2 */}
            <div className="group rounded-xl border border-gray-200 bg-white p-6 hover:scale-110 shadow-sm transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-center md:block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-10 w-10 text-blue-400 transition-all duration-300 group-hover:scale-110"
                >
                  <path d="M3 15.0001V22.0001H12V15.0001H3Z" />
                  <path d="M12 9.0001V22.0001H21V9.0001H12Z" />
                  <path d="M7 2.0001V22.0001H17V2.0001H7Z" />
                </svg>
              </div>
              <h3 className="mt-4 text-center text-xl font-semibold text-gray-900 md:text-left">
                Automated Reporting
              </h3>
              <p className="mt-2 text-center text-sm text-gray-600 md:text-left">
                Our attendance system streamlines reporting with powerful automation. It automatically compiles all data, eliminating manual entry and calculation. You can generate custom reports in seconds, including daily summaries and detailed reports on overtime and absences. The system can be configured to automatically send these reports to managers on a schedule, providing a clear, accurate, and structured view of attendance data to help you make informed business decisions.
              </p>
              <div className="mt-4 text-center md:text-left">
                <a href="#" className="text-sm font-medium text-blue-400 hover:underline">
                  Learn More →
                </a>
              </div>
            </div>
            {/* Service Card 3 */}
            <div className="group rounded-xl border border-gray-200 hover:scale-110 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-center md:block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-10 w-10 text-blue-400 transition-all duration-300 group-hover:scale-110"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </div>
              <h3 className="mt-4 text-center text-xl font-semibold text-gray-900 md:text-left">
                Seamless Integration
              </h3>
              <p className="mt-2 text-center text-sm text-gray-600 md:text-left">
                Our system is built to seamlessly integrate with your existing tech stack, ensuring a smooth transition and a unified data environment. It acts as a central hub for all attendance data, eliminating silos. You can automatically sync attendance data with your payroll system, drastically reducing the time and effort required to process paychecks. This level of automation saves time, minimizes human error, and allows your teams to focus on core responsibilities.
              </p>
              <div className="mt-4 text-center md:text-left">
                <a href="#" className="text-sm font-medium text-blue-400 hover:underline">
                  Learn More →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Studio Section */}
      <section className="bg-blue-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl text-center">
          <p className="text-l font-serif uppercase tracking-wider text-white">
            Our Services & Expertise
          </p>
          <h2 className="mt-15 text-3xl font-serif tracking-tight text-white sm:text-7xl">
            We are a design agency <br/> studio delivering custom <br/> creative & unique
            websites.
          </h2>
          <a href="/signin">
          <button className="mt-20 rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-600 hover:scale-110">
            Get Started
          </button>
          </a>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="bg-gray-100 py-40 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our Achievements
              </h2>
              <p className="mt-4 text-base text-gray-600">
                Our system has helped countless businesses streamline their operations and boost efficiency. These metrics show the scale of our vision and the positive impact we aim to make in the industry.
              </p>
              <button className="mt-8 rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-600 hover:scale-110">
                More Details
              </button>
            </div>
            {/* Right Metrics Grid */}
            <div className="grid grid-cols-2 gap-8">
              {/* Metric 1 */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm hover:scale-110">
                <h3 className="text-4xl font-bold text-gray-900">60</h3>
                <p className="mt-2 text-sm text-gray-600">Finished Projects</p>
              </div>
              {/* Metric 2 */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm hover:scale-110">
                <h3 className="text-4xl font-bold text-gray-900">33k+</h3>
                <p className="mt-2 text-sm text-gray-600">Issues Solved</p>
              </div>
              {/* Metric 3 */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm hover:scale-110">
                <h3 className="text-4xl font-bold text-gray-900">50k+</h3>
                <p className="mt-2 text-sm text-gray-600">Happy Customers</p>
              </div>
              {/* Metric 4 */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm hover:scale-110">
                <h3 className="text-4xl font-bold text-gray-900">48</h3>
                <p className="mt-2 text-sm text-gray-600">Awards Winning</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
