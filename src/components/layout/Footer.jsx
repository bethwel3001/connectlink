import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaHeart, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: <FaFacebookF size={16} />, name: 'Facebook', url: '#' },
    { icon: <FaTwitter size={16} />, name: 'Twitter', url: '#' },
    { icon: <FaInstagram size={16} />, name: 'Instagram', url: '#' },
    { icon: <FaLinkedinIn size={16} />, name: 'LinkedIn', url: '#' },
  ];

  const quickLinks = ['home', 'about', 'features', 'how-it-works', 'community'];
  const resourceLinks = ['Blog', 'Help Center', 'FAQ', 'Terms of Service', 'Privacy Policy'];

  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-green-600">Connect</span>Link
            </h3>
            <p className="text-gray-600 mb-6">
              Connecting volunteers with meaningful opportunities to create positive change in communities worldwide.
            </p>
            <div className="flex justify-center md:justify-start space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-all duration-300 text-gray-600"
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-gray-900">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollToSection(link)}
                    className="text-gray-600 hover:text-green-600 transition-colors duration-300 capitalize text-sm"
                  >
                    {link.replace(/-/g, ' ')}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-gray-900">Resources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-green-600 transition-colors duration-300 text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-gray-900">Contact Us</h4>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center justify-center md:justify-start">
                <FaEnvelope className="text-green-600 mr-2" size={14} />
                <span className="text-sm">hello@connectlink.org</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <FaPhone className="text-green-600 mr-2" size={14} />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <FaMapMarkerAlt className="text-green-600 mr-2" size={14} />
                <span className="text-sm">123 Community St, City, Country</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} ConnectLink. All rights reserved.
          </p>
          <div className="flex items-center text-gray-500 text-sm">
            Made with <FaHeart className="text-red-500 mx-1" /> for a better world
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;