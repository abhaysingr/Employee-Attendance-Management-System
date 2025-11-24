import React from "react";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Manager, ABC Corp",
    message: "AttendancePro has streamlined our team's workflow. It's simple and effective!",
    image: "/assets/logo.png",
  },
  {
    id: 2,
    name: "Sarah Lee",
    role: "HR, Tech Solutions",
    message: "Tracking attendance has never been easier. Great tool for modern businesses.",
    image: "/assets/logo.png",
  },
  {
    id: 3,
    name: "David Kim",
    role: "CEO, StartUpX",
    message: "Amazing UI and smooth experience. Highly recommend AttendancePro!",
    image: "/assets/logo.png",
  },
];

export default function TestimonialCards() {
  return (
    <section className="py-25 bg-gray-100" id="testimonials">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-20">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white shadow-xl rounded-xl p-6 hover:shadow-2xl transition duration-300"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <p className="text-gray-600 italic mb-4">"{testimonial.message}"</p>
              <h4 className="text-lg font-semibold text-gray-800">
                {testimonial.name}
              </h4>
              <p className="text-gray-500 text-sm">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
