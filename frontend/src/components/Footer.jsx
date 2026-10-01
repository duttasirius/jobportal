import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-5 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Description */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              Job<span className="text-blue-500">Portal</span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              Find your dream job from thousands of verified opportunities.
              Connect with top companies and build your career with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Home
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Browse Jobs
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Companies
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Support</h3>

            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Contact
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Terms & Conditions
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Follow Us</h3>

            <div className="flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-blue-600"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-sky-500"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-pink-500"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-blue-700"
              >
                <FaLinkedinIn />
              </a>
            </div>

            <p className="mt-5 text-sm text-gray-400">
              Email: support@jobportal.com
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} JobPortal. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
