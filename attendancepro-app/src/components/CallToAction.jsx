
export default function CallToAction() {
  return (
    <>
      {/* Call to Action Section */}
      <section className="bg-blue-900 text-white text-center py-25 px-5">
        <h2 className="text-3xl md:text-4xl font-bold">Try AttendancePro today</h2>
        <p className="mt-4 text-lg">Get started for free, no credit card required.</p>
        <a href="/signin">
        <button className="mt-8 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 hover:scale-110 transition-colors duration-300">
          Start Free Trial
        </button>
        </a>
      </section>
    </>
  );
}
