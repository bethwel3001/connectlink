import React, { useState, useEffect, useRef, useCallback } from 'react';
import Button from '../ui/Button';
import AuthModal from '../auth/AuthModal';

const Navbar = ({ isVisible = true }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const observer = useRef(null);
  const navbarRef = useRef(null);

  // Section IDs for navigation
  const sections = ['home', 'about', 'features', 'how-it-works', 'community'];

  // Intersection Observer for section detection
  useEffect(() => {
    const options = {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0.1,
    };

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    // Observe all sections
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.current.observe(element);
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  // Scroll hide/show logic - only if we're in the home section
  useEffect(() => {
    const handleScroll = () => {
      if (activeSection === 'home') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsNavbarHidden(true);
        } else {
          setIsNavbarHidden(false);
        }
        setLastScrollY(window.scrollY);
      } else {
        setIsNavbarHidden(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, activeSection]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleRegisterClick = useCallback(() => {
    setIsAuthModalOpen(true);
    closeMobileMenu();
  }, [closeMobileMenu]);

  // Format section name for display
  const formatSectionName = (section) => {
    return section.replace(/-/g, ' ');
  };

  // Don't render navbar if not visible
  if (!isVisible) return null;

  return (
    <>
      <nav 
        ref={navbarRef}
        className={`bg-white shadow-md fixed w-full top-0 z-50 transition-transform duration-300 ${
          isNavbarHidden ? '-translate-y-full' : 'translate-y-0'
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Visible on all screens */}
            <div className="flex-shrink-0">
              <button
                onClick={() => scrollToSection('home')}
                className="text-xl font-bold text-gray-900 hover:text-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md p-1"
                aria-label="Go to homepage"
              >
                <span className="text-green-600">Connect</span>Link
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors font-medium text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${
                    activeSection === section
                      ? 'text-green-600 font-semibold bg-green-50'
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                  aria-current={activeSection === section ? 'location' : undefined}
                >
                  {formatSectionName(section)}
                </button>
              ))}
              <Button 
                onClick={() => setIsAuthModalOpen(true)}
                className="px-5 py-2 text-sm bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-gray-700 hover:text-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <div className="w-6 h-6 relative flex items-center justify-center">
                  <span className={`absolute block w-6 h-0.5 bg-current transform transition duration-300 ease-out ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                  }`} />
                  <span className={`absolute block w-6 h-0.5 bg-current transition duration-300 ease-out ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`} />
                  <span className={`absolute block w-6 h-0.5 bg-current transform transition duration-300 ease-out ${
                    isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                  }`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Side Drawer */}
      <div 
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          isMobileMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Backdrop Overlay */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
        
        {/* Side Drawer Content */}
        <div className={`absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              <span className="text-green-600">Connect</span>Link
            </h2>
            <button
              onClick={closeMobileMenu}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-6">
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className={`w-full text-left px-4 py-3 capitalize transition-colors font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${
                      activeSection === section
                        ? 'bg-green-50 text-green-600 font-semibold border-l-4 border-green-600'
                        : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                    }`}
                    aria-current={activeSection === section ? 'location' : undefined}
                  >
                    {formatSectionName(section)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Section */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-white">
            <Button 
              onClick={handleRegisterClick}
              className="w-full justify-center text-sm bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Get Started
            </Button>
            <p className="text-xs text-center text-gray-500 mt-3">
              Join thousands making a difference
            </p>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;