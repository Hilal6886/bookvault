"use client";

import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-5 md:px-10">
        {/* Column 1: Contact Info */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Contact Us</h2>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-blue-500" />
            <span>+91 9596169694</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-red-500" />
            <span>info@bookvault.com</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-500" />
            <span>Srinagar, Jammu & Kashmir, India</span>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/collections" className="hover:underline">
                Collections
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:underline">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Follow Us</h2>
          <div className="flex items-center gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-6 h-6 hover:text-blue-500 transition duration-200" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-6 h-6 hover:text-blue-400 transition duration-200" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-6 h-6 hover:text-pink-500 transition duration-200" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-gray-700 pt-5">
        <p className="text-center text-sm text-gray-400">
          Designed and Developed by{" "}
          <a
            href="https://crescentapex.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Crescent Apex
          </a>
        </p>
      </div>
    </footer>
  );
}
