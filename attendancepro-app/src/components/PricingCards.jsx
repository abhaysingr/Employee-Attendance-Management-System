import React from "react";

// The PricingCard component is now a separate, reusable component.
const PricingCard = ({ plan }) => {
  return (
    <div
      className={`rounded-3xl shadow-xl p-8 border-2 transition duration-500 transform hover:scale-105 ${
        plan.highlight
          ? "border-blue-600 bg-white"
          : "border-gray-200 bg-white"
      }`}
    >
      <h3 className="text-2xl font-bold mb-2 text-gray-800">
        {plan.title}
      </h3>
      <p className="text-sm text-gray-500 mb-6">{plan.description}</p>
      <p className="text-5xl font-extrabold text-blue-600 mb-2">
        {plan.price}
      </p>
      <p className="text-gray-500 mb-8">per month</p>
      <ul className="text-left text-gray-700 mb-10 space-y-4">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="text-green-500 mt-1 mr-2 flex-shrink-0">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-3 px-6 rounded-xl font-bold text-lg transition duration-300 transform hover:-translate-y-1 shadow-md ${
          plan.highlight
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
      >
        Choose Plan
      </button>
    </div>
  );
};

// The main PricingCards component manages the data and renders the individual cards.
const pricingPlans = [
  {
    id: 1,
    title: "Basic",
    price: "$10",
    description: "Ideal for small teams just starting with attendance tracking.",
    features: [
      "Attendance Tracking",
      "Basic Reporting & Analytics",
      "Email Support",
      "Employee Self-Service Portal",
      "Automated Time Tracking",
    ],
    highlight: false,
  },
  {
    id: 2,
    title: "Pro",
    price: "$30",
    description: "Perfect for growing businesses needing advanced insights and support.",
    features: [
      "Everything in Basic",
      "Advanced Reporting & Analytics",
      "Priority Email & Phone Support",
      "Custom Integrations (e.g., HR & Payroll)",
      "Leave & Absence Management",
      "Real-Time Monitoring",
      "Automated Alerts & Notifications",
    ],
    highlight: true,
  },
  {
    id: 3,
    title: "Enterprise",
    price: "$50",
    description: "Tailored for large organizations requiring full control and compliance.",
    features: [
      "Everything in Pro",
      "Dedicated Account Manager",
      "Advanced API Access",
      "Unlimited Users & Locations",
      "Shift Scheduling",
      "Biometric & Geofencing Attendance",
      "Payroll & Compliance Management",
    ],
    highlight: false,
  },
];

export default function PricingCards() {
  return (
    <section className="py-20 bg-gray-50" id="pricing">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Our Pricing Plans
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mt-12 mx-auto">
          Choose a plan that fits your business needs, from basic attendance
          tracking to advanced enterprise-level workforce management.
        </p>
        <div className="grid grid-cols-1 mt-15 md:grid-cols-3 gap-10">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}