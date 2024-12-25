import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const quickLinks = ["Home", "About Us", "Contact Us", "Shop", "FAQ"];
  const companyInfo = ["Careers", "Privacy Policy", "Terms & Conditions", "Affiliate Program"];

  return (
    <footer className="bg-gray-100 border-t pt-10 pb-5">
      {/* Top Section */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-5 md:px-10">
        {/* Brand Section */}
        <div className="flex flex-col space-y-3">
          <h1 className="text-xl font-bold text-blue-600">Book Vault</h1>
          <p className="text-gray-600">
            Your one-stop destination for all genres of books. Discover your next great read with us.
          </p>
          <div className="flex gap-3 mt-3">
            <Facebook className="w-6 h-6 text-blue-600 hover:text-blue-800 cursor-pointer" />
            <Twitter className="w-6 h-6 text-blue-400 hover:text-blue-600 cursor-pointer" />
            <Instagram className="w-6 h-6 text-pink-500 hover:text-pink-700 cursor-pointer" />
            <Linkedin className="w-6 h-6 text-blue-700 hover:text-blue-900 cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-gray-700">Quick Links</h2>
          {quickLinks.map((link) => (
            <a
              key={link}
              href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-gray-600 hover:text-blue-500"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Company Info */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-gray-700">Company</h2>
          {companyInfo.map((info) => (
            <a
              key={info}
              href={`/${info.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-gray-600 hover:text-blue-500"
            >
              {info}
            </a>
          ))}
        </div>

        {/* Contact Info */}
        <div className="flex flex-col space-y-3">
          <h2 className="text-lg font-semibold text-gray-700">Contact</h2>
          <div className="flex items-center gap-2">
            <Phone className="text-blue-500" />
            <span className="text-gray-600">+91 910 XXXXXXX</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="text-blue-500" />
            <span className="text-gray-600">bookvault@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="text-blue-500" />
            <span className="text-gray-600">India</span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t pt-5">
        <div className="container mx-auto flex flex-col items-center text-center">
          <h3 className="text-sm text-gray-700">
            © 2024 . All rights reserved by <span className="font-semibold text-blue-600">Book Vault</span>
          </h3>
        </div>
      </div>
    </footer>
  );
}
