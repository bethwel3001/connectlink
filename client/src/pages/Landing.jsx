import React, { useState, useEffect, useRef, useCallback } from 'react';
import Button from '../components/ui/Button';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';

// Animated Number Component
const AnimatedNumber = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const intervalRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = parseInt(value, 10);
          if (isNaN(end)) return;
          
          const range = Math.abs(end - start);
          const increment = end > start ? 1 : -1;
          const stepTime = Math.abs(Math.floor(duration / Math.max(range, 1)));
          
          // Clear any existing interval
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          
          intervalRef.current = setInterval(() => {
            setCount(prevCount => {
              const newCount = prevCount + increment;
              if (newCount === end) {
                clearInterval(intervalRef.current);
              }
              return newCount;
            });
          }, stepTime);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observerRef.current.observe(ref.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [value, duration]);

  return <span ref={ref} aria-live="polite">{count}+</span>;
};

// FadeIn component for reusable animations
const FadeIn = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`transition-all duration-700 ease-out transform ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
    } ${className}`}>
      {children}
    </div>
  );
};

// Content constants for better maintainability
const STATS_DATA = [
  { number: '500', label: 'Active Volunteers', icon: '🙋‍♂️', ariaLabel: 'Active Volunteers' },
  { number: '200', label: 'Organizations', icon: '🏢', ariaLabel: 'Organizations' },
  { number: '1000', label: 'Opportunities', icon: '📋', ariaLabel: 'Opportunities' },
  { number: '98', label: 'Success Rate', icon: '⭐', ariaLabel: 'Success Rate' }
];

const FEATURES_DATA = [
  { icon: '🔍', title: 'Smart Matching', desc: 'AI-powered matching based on skills and interests', ariaLabel: 'Smart Matching' },
  { icon: '📱', title: 'Mobile App', desc: 'Access opportunities on the go with our mobile app', ariaLabel: 'Mobile App' },
  { icon: '🛡️', title: 'Secure Platform', desc: 'Enterprise-grade security for your data', ariaLabel: 'Secure Platform' },
  { icon: '🌐', title: 'Global Reach', desc: 'Connect with opportunities worldwide', ariaLabel: 'Global Reach' },
  { icon: '📊', title: 'Analytics', desc: 'Track your impact and volunteer history', ariaLabel: 'Analytics' },
  { icon: '💬', title: 'Messaging', desc: 'Direct communication with organizations', ariaLabel: 'Messaging' }
];

const HOW_IT_WORKS_DATA = [
  { step: '1', title: 'Sign Up', desc: 'Create your account as a volunteer or organization', icon: '📝', ariaLabel: 'Sign Up' },
  { step: '2', title: 'Explore', desc: 'Browse opportunities or post your own needs', icon: '🔍', ariaLabel: 'Explore' },
  { step: '3', title: 'Connect', desc: 'Get matched and start making an impact', icon: '🤝', ariaLabel: 'Connect' }
];

const TRUSTED_ORGANIZATIONS = ['GreenPeace', 'UN Volunteers', 'Local Community', 'Red Cross'];

const Landing = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);
  const backgroundRef = useRef(null);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Update URL hash without scrolling
      window.history.replaceState(null, null, `#${sectionId}`);
    }
  }, []);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x10b981,
          backgroundColor: 0xf9fafb,
          points: 10.00,
          maxDistance: 22.00,
          spacing: 16.00
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div className="pt-16">
      {/* Background container for Vanta.js */}
      <div ref={vantaRef} className="fixed top-0 left-0 w-full h-full -z-10" />
      
      {/* Hero Section */}
      <section 
        id="home" 
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
        aria-label="Hero section"
      >
        {/* Semi-transparent overlay to ensure text readability */}
        <div className="absolute inset-0 bg-white bg-opacity-85" aria-hidden="true" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Animated App Name & Motto */}
          <div className="mb-12">
            <FadeIn>
              {/* Icon/Graphic */}
              <div 
                className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg"
                aria-hidden="true"
              >
                <span className="text-4xl" role="img" aria-label="Handshake">🤝</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                Connect<span className="text-green-600">Link</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-6 font-light max-w-2xl mx-auto">
                Connect. Contribute. Grow.
              </p>
              {/* Value Proposition Subheading */}
              <p className="text-lg text-gray-500 mb-10 max-w-3xl mx-auto leading-relaxed">
                The platform where passion meets purpose. Find meaningful volunteering opportunities or discover incredible talent ready to make a difference in your community.
              </p>
            </FadeIn>
          </div>

          {/* CTA Buttons - FIXED RESPONSIVE LAYOUT */}
          <FadeIn delay={300}>
            <div className="flex flex-row flex-wrap gap-3 justify-center items-center mb-16 px-2">
              <Button 
                onClick={() => scrollToSection('features')}
                className="text-base sm:text-lg px-5 py-3 flex-1 min-w-[160px] max-w-[220px]"
                aria-label="Find volunteering opportunities"
              >
                Know more
              </Button>
              <Button 
                variant="outline"
                className="text-base sm:text-lg px-5 py-3 flex-1 min-w-[160px] max-w-[220px]"
                onClick={() => scrollToSection('how-it-works')}
                aria-label="Learn how ConnectLink works"
              >
                How It Works
              </Button>
            </div>
          </FadeIn>

          {/* Trust Indicators / Social Proof */}
          <FadeIn delay={500}>
            <div className="mb-16">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">Trusted by organizations worldwide</p>
              <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 opacity-70">
                {TRUSTED_ORGANIZATIONS.map((org, index) => (
                  <div key={index} className="text-xs md:text-sm font-semibold text-gray-400">
                    {org}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <button 
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center text-gray-400 hover:text-green-600 transition-colors animate-bounce focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-full p-2"
            aria-label="Scroll to about section"
          >
            <span className="text-sm mb-2 font-medium">Explore More</span>
            <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center hover:border-green-600 transition-colors">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" aria-hidden="true" />
            </div>
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white bg-opacity-90 relative overflow-hidden" aria-label="About section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">About ConnectLink</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                ConnectLink bridges the gap between passionate volunteers and organizations 
                that need their skills. We believe everyone has something valuable to contribute 
                to their community.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our platform makes it easy to find meaningful opportunities, connect with 
                like-minded individuals, and make a real impact in the world.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6" aria-hidden="true">
                <span className="text-3xl" role="img" aria-label="Earth">🌍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Making a Difference</h3>
              <p className="text-gray-600">
                Join thousands of volunteers and organizations creating positive change 
                in communities around the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 bg-opacity-90 relative overflow-hidden" aria-label="Statistics section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS_DATA.map((stat, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center group border border-green-100"
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                  <span role="img" aria-label={stat.ariaLabel}>{stat.icon}</span>
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  <AnimatedNumber value={stat.number} />
                </div>
                <div className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white bg-opacity-90 relative overflow-hidden" aria-label="Features section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Features</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover what makes ConnectLink the perfect platform for volunteers and organizations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES_DATA.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="text-3xl mb-4" aria-hidden="true">
                  <span role="img" aria-label={feature.ariaLabel}>{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50 bg-opacity-90 relative overflow-hidden" aria-label="How it works section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS_DATA.map((item, index) => (
              <div key={index} className="text-center p-8 bg-green-50 rounded-2xl border border-green-100">
                <div className="text-4xl mb-4" aria-hidden="true">
                  <span role="img" aria-label={item.ariaLabel}>{item.icon}</span>
                </div>
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 bg-white bg-opacity-90 relative overflow-hidden" aria-label="Community section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Join Our Community</h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Become part of a growing community dedicated to making positive change in the world.
          </p>
          <div className="flex flex-row flex-wrap gap-3 justify-center px-2">
            <Button 
              className="text-base sm:text-lg px-5 py-3 flex-1 min-w-[160px] max-w-[220px]"
              aria-label="Join as a volunteer"
            >
              Join as Volunteer
            </Button>
            <Button 
              variant="outline"
              className="text-base sm:text-lg px-5 py-3 flex-1 min-w-[160px] max-w-[220px]"
              aria-label="Sign up as an organization"
            >
              For Organizations
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;