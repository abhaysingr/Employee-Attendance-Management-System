import React, { useState } from 'react';
import api from '../api/axios'; // Assuming you have an axios instance set up

// The main App component
const App = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    _subject: '',
    message: ''
  });

  // Handles changes to any form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/contact', formData);
      alert('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        _subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased">
      {/* Contact Section */}
      <section id="contact" className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col-reverse items-center justify-between gap-12 lg:flex-row lg:gap-20">
            {/* Left Content */}
            <div className="text-center lg:w-1/2 lg:text-left">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Get in touch
              </h1>
              <p className="mt-4 text-base text-gray-600">
                We're always on the lookout to work with new clients. If you're interested in working with us, please get in touch in one of the following ways.
              </p>

              {/* Contact Details */}
              <div className="mt-8 flex flex-col gap-6 md:flex-row md:flex-wrap md:justify-center lg:justify-start">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 shrink-0 text-blue-600">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Address</h3>
                    <p className="mt-1 text-sm text-gray-600">8014 Edith Blvd NE, Albuquerque, New York, United States</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 shrink-0 text-blue-600">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2.02l-3.03-.66a1.9 1.9 0 0 0-1.95.44l-2.45 2.45a1.9 1.9 0 0 1-2.82 0l-1.95-1.95a1.9 1.9 0 0 1-.44-1.95l.66-3.03a2 2 0 0 1 2.02-2.18h3a2 2 0 0 1 2 2z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                    <p className="mt-1 text-sm text-gray-600">(+91) 9876543210</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 shrink-0 text-blue-600">
                    <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
                    <path d="M22 6L12 13L2 6" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">E-Mail</h3>
                    <p className="mt-1 text-sm text-gray-600">support@attendancepro.com</p>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 shrink-0 text-blue-600">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Opening Hours</h3>
                    <p className="mt-1 text-sm text-gray-600">Mon - Fri: 9am - 5pm</p>
                    <p className="mt-1 text-sm text-gray-600">Sat - Sun: 9am - 2pm</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="relative w-full rounded-xl bg-gray-100 p-8 shadow-lg lg:w-1/2">
              <div className="absolute -bottom-4 right-0 h-24 w-24 rounded-bl-full rounded-tr-xl bg-yellow-400"></div>
              <form onSubmit={handleSubmit} className="relative space-y-6">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email *
                    </label>
                    <div className="relative mt-1">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="block w-full rounded-md border border-gray-300 px-4 py-3 pl-10 shadow-sm focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="relative mt-1">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3zm0 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8zm7-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V3zm7-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V3zM3 13a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2zm7 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2zm7 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z" />
                        </svg>
                      </div>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="block w-full rounded-md border border-gray-300 px-4 py-3 pl-10 shadow-sm focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                    Subject *
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="_subject"
                    value={formData._subject}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-600 hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
