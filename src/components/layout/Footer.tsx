import React, { useState } from "react";
import { Link } from "wouter";
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import avgLogo from "@assets/ChatGPT_Image_May_20,_2026,_11_19_23_AM_1779256187909.png";
import { motion, AnimatePresence } from "framer-motion";

export const Footer = () => {
  const [showSocialPopup, setShowSocialPopup] = useState(false);
  return (
    <footer className="bg-[#0f1f14] text-white pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center mb-6">
              <img
                src={avgLogo}
                alt="AVG Bags Logo"
                className="h-16 w-auto object-contain rounded-xl drop-shadow-lg"
                draggable={false}
              />
            </Link>
            <p className="text-white/70 mb-6">
              Premium industrial manufacturer of custom-printed non-woven fabric bags for businesses, schools, and temples across India.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://wa.me/917780524290" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors duration-300">
                <SiWhatsapp className="w-5 h-5" />
              </a>
              <a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    setShowSocialPopup(true);
  }}
  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors"
>
  <Facebook className="w-5 h-5" />
</a>
  <a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    setShowSocialPopup(true);
  }}
  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors"
>
  <Instagram className="w-5 h-5" />
</a>
                
              
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-bold text-xl mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-white/70 hover:text-secondary transition-colors">Home</Link></li>
              <li><Link href="/shopping" className="text-white/70 hover:text-secondary transition-colors">Shopping Catalog</Link></li>
              <li><Link href="/services" className="text-white/70 hover:text-secondary transition-colors">Our Services</Link></li>
              <li><Link href="/manufacturing" className="text-white/70 hover:text-secondary transition-colors">Manufacturing Process</Link></li>
              <li><Link href="/about" className="text-white/70 hover:text-secondary transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-serif font-bold text-xl mb-6 text-white">Support</h3>
            <ul className="space-y-3">
              <li><Link href="/quote" className="text-white/70 hover:text-secondary transition-colors">Get a Quote</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-secondary transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="text-white/70 hover:text-secondary transition-colors">Shipping Policy</Link></li>
              <li><Link href="#" className="text-white/70 hover:text-secondary transition-colors">Terms & Conditions</Link></li>
              <li><Link href="#" className="text-white/70 hover:text-secondary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif font-bold text-xl mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-1" />
                <span>Warangal, Telangana, India</span>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <a href="tel:+917780524290" className="hover:text-secondary transition-colors">+91 7780524290</a>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <a href="mailto:avgbags@gmail.com" className="hover:text-secondary transition-colors">avgbags@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white/50 text-sm">
          <p>&copy; {new Date().getFullYear()} AVG Bags. All rights reserved.</p>
          <p>Designed for premium bulk manufacturing.</p>
        </div>
      </div>
    <AnimatePresence>
  {showSocialPopup && (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={() => setShowSocialPopup(false)}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-[90%] text-center relative"
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{
          duration: 0.35,
          ease: "easeOut",
        }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* KEEP YOUR EXISTING POPUP CONTENT HERE */}

        <button
          onClick={() => setShowSocialPopup(false)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-200 hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center justify-center text-gray-700 font-bold text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Connect With Us
        </h2>

        <p className="text-gray-600 mb-6">
          We are currently not active on Facebook and Instagram.
          <br /><br />
          For quotations, bulk orders, product enquiries, or customer support,
          please contact us through WhatsApp or call us directly.
        </p>

        <div className="space-y-3">
          <a
            href="https://wa.me/917780524290"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
          >
            💬 Contact on WhatsApp
          </a>

          <a
            href="tel:+917780524290"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            📞 Call Now
          </a>
        </div>

      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </footer>
  );
};
