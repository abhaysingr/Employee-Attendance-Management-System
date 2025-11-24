import Teamwork from "../assets/Team.jpg";
const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased" >
      {/* Design Process Section */}
      <section id="about"className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xl font-serif uppercase tracking-wider text-gray-500">
              Our Design Process
            </p>
            <h1 className="mt-10 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our design approach is very<br/> organized to ensure satisfaction<br/> for our esteemed clients.
            </h1>
          </div>
          <div className="mt-16 flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-20">
            {/* Image on the left */}
            <div className="lg:w-1/2">
              <img src={Teamwork} alt="Logo" />
            </div>
            {/* Steps on the right */}
            <div className="flex flex-col gap-22 lg:w-1/2">
              {/* Step 1 */}
              <div className="flex items-center gap-4 hover:scale-110">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Planning</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Get to know your users and their needs better through surveys, interviews, usability testing, and other methods.
                  </p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="flex items-center gap-4 hover:scale-110">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Launch</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    This involves creating wireframes, mockups, and prototypes to test out your ideas and get feedback from users.
                  </p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="flex items-center gap-4 hover:scale-110">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Finalize Product</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Once your prototype is ready, it’s important to gather feedback from users to see what they like and dislike about it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="bg-blue-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
            {/* Left content */}
            <div className="text-center lg:w-1/3 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Our Clients
              </h2>
              <p className="mt-4 text-base text-white">
                We believe in client satisfaction. Here are some testimonials by our worthy clients.
              </p>
              <button className="mt-8 rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-600 hover:scale-110">
                More Testimonials
              </button>
            </div>
            {/* Right testimonials grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:w-2/3">
              {/* Testimonial 1 */}
              <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm hover:scale-110">
                <div className="flex items-center gap-4">
                  <img
                    src="https://placehold.co/50x50/FCA5A5/FFFFFF?text=L"
                    alt="Placeholder for user's profile picture"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Luna John</p>
                    <p className="text-sm text-gray-500">UX Designer</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  "We were so impressed with the work they did for us. They were able to take our vague idea and turn it into a reality, and they did it all on time and within budget. We would highly recommend them to anyone looking for a reliable and professional partner."
                </p>
              </div>
              {/* Testimonial 2 */}
              <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm hover:scale-110">
                <div className="flex items-center gap-4">
                  <img
                    src="https://placehold.co/50x50/A7F3D0/1F2937?text=M"
                    alt="Placeholder for user's profile picture"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Mark Smith</p>
                    <p className="text-sm text-gray-500">Marketing Specialist</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  "We were looking for a company that could help us develop a new website that was both visually appealing and user-friendly. We are so happy with the results, and we would highly recommend them to anyone looking for a new website."
                </p>
              </div>
              {/* Testimonial 3 */}
              <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm hover:scale-110">
                <div className="flex items-center gap-4">
                  <img
                    src="https://placehold.co/50x50/FDBA74/1F2937?text=J"
                    alt="Placeholder for user's profile picture"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Jane Doe</p>
                    <p className="text-sm text-gray-500">Founder</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  "We were struggling to manage our finances effectively. We needed help and were so impressed with the work they did for us. They were able to create a financial plan that worked for us, and we were able to get our finances back on track."
                </p>
              </div>
              {/* Testimonial 4 */}
              <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm hover:scale-110">
                <div className="flex items-center gap-4">
                  <img
                    src="https://placehold.co/50x50/D1D5DB/1F2937?text=A"
                    alt="Placeholder for user's profile picture"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Alex Johnson</p>
                    <p className="text-sm text-gray-500">UI Designer</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  "We were looking for a company that could help us with our branding. We needed a new logo, color palette, and other marketing materials. They were able to create a brand identity that was both visually appealing and effective."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
