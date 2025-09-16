import React, { useState, useEffect } from 'react';
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Notification from './components/ui/Notification';
import Navbar from './components/layout/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Footer from './components/layout/Footer';

// Create a component that handles the routing logic
const AppContent = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const { isAuthenticated, getRedirectState } = useAuth();
  const [currentPage, setCurrentPage] = useState('landing');

  useEffect(() => {
    const { shouldRedirect, redirectPath, resetRedirect } = getRedirectState();
    
    if (shouldRedirect) {
      setCurrentPage(redirectPath.replace('/', ''));
      resetRedirect();
    }
  }, [getRedirectState]);

  useEffect(() => {
    const handleScroll = () => {
      // Only handle scroll for landing page
      if (currentPage === 'landing') {
        const homeSection = document.getElementById('home');
        if (homeSection) {
          const homeSectionBottom = homeSection.offsetTop + homeSection.offsetHeight;
          const shouldShowNavbar = window.scrollY < homeSectionBottom - 100 || window.scrollY < 50;
          setIsNavbarVisible(shouldShowNavbar);
        }
      } else {
        // Always show navbar on other pages (though dashboard doesn't use it)
        setIsNavbarVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage]);

  const renderCurrentPage = () => {
    if (currentPage === 'dashboard' && isAuthenticated) {
      return <Dashboard />;
    }
    return <Landing />;
  };

  return (
    <div className="App">
      {/* Only show navbar on landing page */}
      {currentPage === 'landing' && <Navbar isVisible={isNavbarVisible} />}
      {renderCurrentPage()}
      {/* Only show footer on landing page */}
      {currentPage === 'landing' && <Footer />}
      <Notification />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;