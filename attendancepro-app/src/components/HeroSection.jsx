import SignIn from "../SignIn";
import Herologo from "../assets/Hero.jpg";

export default function HeroSection() {
  return (
    <section id="home" className="flex flex-col md:flex-row items-center justify-between bg-white text-black p-20 mt-15">
      {/* Left Side */}
      <div className="max-w-lg mt-25">
        <h1 className="text-5xl font-bold mb-4">
          Get More Done with <span className="text-blue-600">AttendancePro</span>
        </h1>
        <p className="mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <a href="/signin">
        <button
          className="bg-blue-600 hover:bg-blue-600 hover:scale-110 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300"
          onClick={() => window.location.link = SignIn}>
          Explore Now
        </button>
        </a>
        {/* <button
          className="bg-blue-600 hover:bg-blue-600 hover:scale-110 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300 ml-4"
          onClick={() => window.location.href = SignIn}
        >
          Free Trail
        </button> */}
      </div>

      {/* Right Side */}
      <div className="mt-5 md:mt-0">
        <div className="bg-blue-500 rounded-lg w-150 h-150 flex items-center justify-center text-white text-lg">
          <img src={Herologo} alt="Logo" />
        </div>
      </div>
    </section>
  );
}
