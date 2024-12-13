import React from "react";
import { Link } from "react-router-dom";
import { BsTwitter, BsLinkedin, BsInstagram, BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <footer className="py-4 bg-gray-800 text-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 lg:w-1/4 mb-4 md:mb-0">
              <h4 className="text-white mb-3">Contact Us</h4>
              <div>
                <address className="text-white text-sm">
                  eShop
                  <br />
                  Rajkot,
                  <br />
                  Gujarat
                </address>
                <a href="tel:+91 8160579238" className="block text-white mt-1">
                  +91 8866443428
                </a>
                <a
                  href="mailto:abhisheksharma27948@gmail.com"
                  className="block text-white mt-1"
                >
                  abhisheksharma27948@gmail.com
                </a>
                <a
                  href="mailto:jaylekhani445@gmail.com"
                  className="block text-white mt-1"
                >
                  jaylekhani445@gmail.com
                </a>
                <div className="flex justify-center items-center gap-4 mt-3">
                  <a className="text-white" href="">
                    <BsTwitter className="text-lg" />
                  </a>
                  <a className="text-white" href="">
                    <BsLinkedin className="text-lg" />
                  </a>
                  <a className="text-white" href="">
                    <BsYoutube className="text-lg" />
                  </a>
                  <a className="text-white" href="">
                    <BsInstagram className="text-lg" />
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 lg:w-1/4 mb-4 md:mb-0">
              <h4 className="text-white mb-4">Information</h4>
              <div className="flex flex-col items-center">
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-teal-400 py-2"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/refundPolicy"
                  className="text-gray-400 hover:text-teal-400 py-2"
                >
                  Refund Policy
                </Link>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-teal-400 py-2"
                >
                  Terms & Conditions
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/3 lg:w-1/4">
              <h4 className="text-white mb-4">Account</h4>
              <div className="flex flex-col">
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-teal-400 py-2"
                >
                  About Us
                </Link>
                <Link
                  to="/faq"
                  className="text-gray-400 hover:text-teal-400 py-2"
                >
                  FAQ
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-teal-400 py-2"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="w-full text-center">
            <p className="text-white">
              &copy; {new Date().getFullYear()}; Powered by eShop
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
