import React, { useState, useEffect } from 'react';
import { NotificationProvider } from './context/NotificationContext';
import Notification from './components/ui/Notification';
import Navbar from './components/layout/Navbar';
import Landing from './pages/Landing';
import Footer from './components/layout/Footer';

function App() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Get the home section element
      const homeSection = document.getElementById('home');
      if (homeSection) {
        const homeSectionBottom = homeSection.offsetTop + homeSection.offsetHeight;
        
        // Show navbar only when in the home section or near the top
        const shouldShowNavbar = window.scrollY < homeSectionBottom - 100 || window.scrollY < 50;
        setIsNavbarVisible(shouldShowNavbar);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <NotificationProvider>
      <div className="App">
        <Navbar isVisible={isNavbarVisible} />
        <Landing />
        <Footer />
        <Notification />
      </div>
    </NotificationProvider>
  );
}

export default App;