import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faGear,
  faUser,
  faSearch,
  faUsers,
  faChartSimple,
  faListCheck,
  faHandshake,
  faLightbulb,
  faMapMarkerAlt,
  faCalendar,
  faCheckCircle,
  faClock,
  faBookOpen,
  faSeedling,
  faGlobe,
  faStar,
  faBars,
  faTimes,
  faArrowRight,
  faFilter,
  faSort,
  faEdit,
  faSave,
  faTimesCircle,
  faEye,
  faEyeSlash,
  faSignOutAlt,
  faCog,
  faNetworkWired,
  faChartLine,
  faUserCircle,
  faEnvelope,
  faPhone,
  faMapMarker,
  faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons';

/**
 * Main Dashboard Component
 * Features:
 * - Responsive design with mobile-first approach
 * - Non-sticky navbar that moves up on scroll
 * - Enhanced notifications with clear count indicators
 * - Well-designed, consistent popups that are properly sized
 * - Improved mobile hamburger menu with unique content
 */
const Dashboard = () => {
  // State Management
  const [activeTab, setActiveTab] = useState('opportunities');
  const { user, logout } = useAuth();
  const [timeOfDay, setTimeOfDay] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('relevance');
  
  // Animation states
  const [greetingVisible, setGreetingVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  
  // Popup states
  const [activePopup, setActivePopup] = useState(null);
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      title: 'Welcome to ConnectLink!', 
      message: 'Start exploring opportunities in your area. Complete your profile to get better matches.', 
      read: false, 
      timestamp: '2 mins ago', 
      type: 'welcome',
      priority: 'high'
    },
    { 
      id: 2, 
      title: 'New Opportunity Nearby', 
      message: 'Community Garden Volunteer position matches 95% of your skills.', 
      read: false, 
      timestamp: '1 hour ago', 
      type: 'opportunity',
      priority: 'medium'
    },
    { 
      id: 3, 
      title: 'Profile Completion Reminder', 
      message: 'Your profile is 75% complete. Add your availability to get more matches.', 
      read: true, 
      timestamp: '1 day ago', 
      type: 'reminder',
      priority: 'low'
    }
  ]);
  
  // Settings state
  const [settings, setSettings] = useState({
    displayName: '',
    interests: ['Community Service', 'Education', 'Technology'],
    specializations: ['Web Development', 'Teaching', 'Gardening'],
    emailNotifications: true,
    pushNotifications: false,
    location: 'New York, NY',
    phone: '+1 (555) 123-4567',
    bio: 'Passionate about community service and technology education.'
  });

  // Refs
  const greetingRef = useRef(null);
  const popupRef = useRef(null);
  const navbarRef = useRef(null);

  // Mock Data - Placed at top to avoid reference errors
  const opportunities = [
    {
      id: 1,
      title: 'Community Garden Volunteer',
      organization: 'Green Thumb Initiative',
      location: 'Downtown, 2km away',
      skills: ['Gardening', 'Community', 'Sustainability'],
      commitment: 'Weekly, 4 hours',
      matches: 95,
      applicants: 12,
      icon: faSeedling,
      date: '2024-01-15',
      description: 'Help maintain community gardens and educate locals about sustainable gardening practices.',
      duration: '3 months'
    },
    {
      id: 2,
      title: 'Web Development Mentor',
      organization: 'Tech for Youth',
      location: 'Remote',
      skills: ['JavaScript', 'React', 'Teaching', 'Mentoring'],
      commitment: 'Flexible, 2-5 hours/week',
      matches: 88,
      applicants: 8,
      icon: faGlobe,
      date: '2024-01-20',
      description: 'Mentor underprivileged youth in web development skills and career preparation.',
      duration: '6 months'
    },
    {
      id: 3,
      title: 'Youth Sports Coach',
      organization: 'Community Center',
      location: 'Sports Complex, 1.5km away',
      skills: ['Coaching', 'Sports', 'Leadership', 'Youth Development'],
      commitment: 'Weekends, 3 hours',
      matches: 92,
      applicants: 15,
      icon: faUsers,
      date: '2024-01-18',
      description: 'Coach youth basketball teams and promote sportsmanship and teamwork.',
      duration: '4 months'
    },
    {
      id: 4,
      title: 'Library Reading Assistant',
      organization: 'Public Library',
      location: 'Main Library, 0.8km away',
      skills: ['Literacy', 'Teaching', 'Communication', 'Patience'],
      commitment: 'Weekly, 3 hours',
      matches: 85,
      applicants: 6,
      icon: faBookOpen,
      date: '2024-01-22',
      description: 'Assist with reading programs and help improve literacy in the community.',
      duration: 'Ongoing'
    }
  ];

  const appliedOpportunities = [
    {
      id: 101,
      title: 'Youth Sports Coach',
      organization: 'Community Center',
      status: 'under-review',
      appliedDate: '2 days ago',
      nextSteps: 'Interview scheduled for next week',
      icon: faUsers,
      applicationDate: '2024-01-10',
      statusDetails: 'Your application is being reviewed by the organization.'
    },
    {
      id: 102,
      title: 'Library Reading Assistant',
      organization: 'Public Library',
      status: 'accepted',
      appliedDate: '1 week ago',
      nextSteps: 'Orientation session this Saturday at 10 AM',
      icon: faBookOpen,
      applicationDate: '2024-01-05',
      statusDetails: 'Congratulations! Your application has been accepted.'
    },
    {
      id: 103,
      title: 'Food Bank Volunteer',
      organization: 'City Food Bank',
      status: 'interview',
      appliedDate: '3 days ago',
      nextSteps: 'Phone interview scheduled tomorrow at 2 PM',
      icon: faHandshake,
      applicationDate: '2024-01-12',
      statusDetails: 'The organization would like to schedule an interview.'
    }
  ];

  const nearbyPeople = [
    { 
      name: 'Sarah Chen', 
      skills: ['Teaching', 'Art', 'Mentoring', 'Curriculum Development'], 
      distance: '0.5km', 
      match: 92, 
      icon: faUser,
      mutualConnections: 3,
      bio: 'Art teacher passionate about community education',
      joined: '2 months ago'
    },
    { 
      name: 'Alex Rodriguez', 
      skills: ['Tech', 'Mentoring', 'Programming', 'Web Development'], 
      distance: '1.2km', 
      match: 88, 
      icon: faUser,
      mutualConnections: 1,
      bio: 'Software engineer looking to mentor youth in tech',
      joined: '3 months ago'
    },
    { 
      name: 'Mike Thompson', 
      skills: ['Gardening', 'Construction', 'Leadership', 'Project Management'], 
      distance: '0.8km', 
      match: 95, 
      icon: faUser,
      mutualConnections: 2,
      bio: 'Landscaper with passion for community green spaces',
      joined: '1 month ago'
    },
    { 
      name: 'Emily Watson', 
      skills: ['Writing', 'Editing', 'Grant Writing', 'Communication'], 
      distance: '1.5km', 
      match: 87, 
      icon: faUser,
      mutualConnections: 4,
      bio: 'Non-profit professional specializing in grant applications',
      joined: '4 months ago'
    }
  ];

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setActivePopup(null);
      }
    };

    if (activePopup) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [activePopup]);

  // Initialize dashboard animations and time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('Morning');
    else if (hour < 17) setTimeOfDay('Afternoon');
    else setTimeOfDay('Evening');

    // Initialize settings with user data
    if (user) {
      setSettings(prev => ({
        ...prev,
        displayName: user?.firstName || user?.fullName?.split(' ')[0] || 'User'
      }));
    }

    // Staggered animations for better UX
    setTimeout(() => setGreetingVisible(true), 300);
    setTimeout(() => setStatsVisible(true), 600);
    setTimeout(() => setContentVisible(true), 900);
  }, [user]);

  /**
   * Get user's display name with fallbacks
   */
  const getDisplayName = () => {
    if (user?.firstName) return user.firstName;
    if (user?.fullName) return user.fullName.split(' ')[0];
    return user?.email?.split('@')[0] || 'there';
  };

  /**
   * Generate greeting based on time of day
   */
  const getGreeting = () => `Good ${timeOfDay}, ${getDisplayName()}! 👋`;

  /**
   * Generate subtitle based on profile completion
   */
  const getSubtitle = () => {
    if (user?.profileCompleted) {
      const location = user?.city || user?.location;
      return location
        ? `Ready to make a difference in ${location}?`
        : 'Ready to make a difference?';
    } else {
      return 'Complete your profile to get personalized recommendations!';
    }
  };

  /**
   * Get unread notifications count
   */
  const getUnreadNotificationsCount = () => {
    return notifications.filter(notification => !notification.read).length;
  };

  /**
   * Handle popup toggle with animation
   */
  const togglePopup = (popupName) => {
    if (activePopup === popupName) {
      setActivePopup(null);
    } else {
      setActivePopup(popupName);
      setIsMobileMenuOpen(false); // Close mobile menu when opening popup
    }
  };

  /**
   * Mark notification as read
   */
  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  /**
   * Mark all notifications as read
   */
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  /**
   * Handle settings update
   */
  const handleSettingsUpdate = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  /**
   * Save settings (would typically call API)
   */
  const saveSettings = () => {
    console.log('Settings saved:', settings);
    // Here you would typically make an API call to save settings
    setActivePopup(null);
  };

  /**
   * Filter and sort opportunities based on search and sort options
   */
  const filteredOpportunities = opportunities.filter(opp =>
    opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opp.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
    opp.description.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    switch (sortOption) {
      case 'match':
        return b.matches - a.matches;
      case 'applicants':
        return a.applicants - b.applicants;
      case 'distance':
        return a.location.localeCompare(b.location);
      case 'date':
        return new Date(b.date) - new Date(a.date);
      default:
        return 0;
    }
  });

  // Enhanced Popup Components with better sizing and design
  const SettingsPopup = () => (
    <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[85vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Account Settings</h3>
          <p className="text-gray-600 mt-1">Manage your preferences and account details</p>
        </div>
        <button 
          onClick={() => setActivePopup(null)} 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" className="text-gray-500" />
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
            <input
              type="text"
              value={settings.displayName}
              onChange={(e) => handleSettingsUpdate('displayName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              placeholder="Enter your display name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              value={settings.bio}
              onChange={(e) => handleSettingsUpdate('bio', e.target.value)}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              placeholder="Tell others about yourself..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <div className="relative">
              <FontAwesomeIcon icon={faMapMarker} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={settings.location}
                onChange={(e) => handleSettingsUpdate('location', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                placeholder="Your city or area"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Interests</label>
            <div className="flex flex-wrap gap-2">
              {settings.interests.map((interest, index) => (
                <span key={index} className="inline-flex items-center px-3 py-2 bg-green-100 text-green-800 rounded-full text-sm">
                  {interest}
                  <button 
                    onClick={() => handleSettingsUpdate('interests', settings.interests.filter((_, i) => i !== index))}
                    className="ml-2 text-green-600 hover:text-green-800 text-xs"
                  >
                    ×
                  </button>
                </span>
              ))}
              <button className="inline-flex items-center px-3 py-2 border-2 border-dashed border-gray-300 rounded-full text-sm text-gray-500 hover:border-green-500 hover:text-green-600 transition-colors">
                + Add Interest
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Specializations</label>
            <div className="flex flex-wrap gap-2">
              {settings.specializations.map((spec, index) => (
                <span key={index} className="inline-flex items-center px-3 py-2 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {spec}
                  <button 
                    onClick={() => handleSettingsUpdate('specializations', settings.specializations.filter((_, i) => i !== index))}
                    className="ml-2 text-blue-600 hover:text-blue-800 text-xs"
                  >
                    ×
                  </button>
                </span>
              ))}
              <button className="inline-flex items-center px-3 py-2 border-2 border-dashed border-gray-300 rounded-full text-sm text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-colors">
                + Add Specialization
              </button>
            </div>
          </div>
          
          <div className="space-y-4 pt-4">
            <h4 className="font-medium text-gray-900">Notifications</h4>
            <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <div className="font-medium text-gray-900">Email Notifications</div>
                <div className="text-sm text-gray-600">Receive updates via email</div>
              </div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingsUpdate('emailNotifications', e.target.checked)}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
            </label>
            
            <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <div className="font-medium text-gray-900">Push Notifications</div>
                <div className="text-sm text-gray-600">Get real-time alerts</div>
              </div>
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={(e) => handleSettingsUpdate('pushNotifications', e.target.checked)}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
            </label>
          </div>
        </div>
      </div>
      
      <div className="flex gap-3 pt-6 mt-6 border-t border-gray-200">
        <Button onClick={saveSettings} className="flex-1 bg-green-600 hover:bg-green-700 py-3 text-lg">
          <FontAwesomeIcon icon={faSave} className="mr-2" />
          Save Changes
        </Button>
        <Button variant="outline" onClick={() => setActivePopup(null)} className="flex-1 py-3 text-lg">
          Cancel
        </Button>
      </div>
    </div>
  );

  const NotificationsPopup = () => {
    const unreadCount = getUnreadNotificationsCount();
    
    return (
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Notifications</h3>
            <p className="text-gray-600 mt-1">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-green-600 hover:text-green-800 font-medium text-sm"
              >
                Mark all as read
              </button>
            )}
            <button 
              onClick={() => setActivePopup(null)} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" className="text-gray-500" />
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                notification.read 
                  ? 'bg-gray-50 border-gray-200' 
                  : 'bg-green-50 border-green-200'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    notification.read ? 'bg-gray-400' : 'bg-green-500'
                  }`}></div>
                  <h4 className={`font-semibold ${
                    notification.read ? 'text-gray-700' : 'text-gray-900'
                  }`}>{notification.title}</h4>
                </div>
                <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                  {notification.timestamp}
                </span>
              </div>
              <p className="text-gray-600 mb-3 leading-relaxed">{notification.message}</p>
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  notification.priority === 'high' ? 'bg-red-100 text-red-800' :
                  notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {notification.type}
                </span>
                {!notification.read && (
                  <button 
                    onClick={() => markNotificationAsRead(notification.id)}
                    className="text-green-600 hover:text-green-800 font-medium text-sm"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          ))}
          
          {notifications.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <FontAwesomeIcon icon={faBell} size="3x" className="mb-4 text-gray-300" />
              <p className="text-lg">No notifications yet</p>
              <p className="text-sm mt-1">We'll notify you when something important happens</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const NetworkPopup = () => (
    <div className="bg-white rounded-2xl p-6 w-full max-w-4xl mx-4 max-h-[85vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Your Network</h3>
          <p className="text-gray-600 mt-1">Connect with like-minded people in your area</p>
        </div>
        <button 
          onClick={() => setActivePopup(null)} 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" className="text-gray-500" />
        </button>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6">
        {nearbyPeople.map((person, index) => (
          <div key={index} className="flex flex-col p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {person.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{person.name}</h4>
                  <p className="text-gray-600">{person.distance} • {person.match}% match</p>
                  <p className="text-sm text-gray-500 mt-1">{person.mutualConnections} mutual connections</p>
                </div>
              </div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {person.match}%
              </span>
            </div>
            
            <p className="text-gray-700 mb-4 flex-1">{person.bio}</p>
            
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {person.skills.slice(0, 3).map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    {skill}
                  </span>
                ))}
                {person.skills.length > 3 && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
                    +{person.skills.length - 3} more
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Connect
              </Button>
              <Button variant="outline" className="flex-1">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Message
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProfilePopup = () => (
    <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[85vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">My Profile</h3>
          <p className="text-gray-600 mt-1">Manage your personal information</p>
        </div>
        <button 
          onClick={() => setActivePopup(null)} 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" className="text-gray-500" />
        </button>
      </div>
      
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg">
          {getDisplayName().charAt(0).toUpperCase()}
        </div>
        <h4 className="font-bold text-gray-900 text-2xl">{settings.displayName}</h4>
        <p className="text-gray-600 mt-1">{user?.email}</p>
        <p className="text-sm text-gray-500 capitalize mt-1">{user?.userType}</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
            <input
              type="text"
              value={settings.displayName}
              onChange={(e) => handleSettingsUpdate('displayName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <div className="relative">
              <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => handleSettingsUpdate('phone', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <div className="relative">
              <FontAwesomeIcon icon={faMapMarker} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={settings.location}
                onChange={(e) => handleSettingsUpdate('location', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-6 border-t border-gray-200">
        <button 
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 text-red-600 border-2 border-red-300 rounded-lg hover:bg-red-50 transition-colors font-medium"
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          Sign Out
        </button>
      </div>
    </div>
  );

  const ProgressPopup = () => (
    <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[85vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">My Progress</h3>
          <p className="text-gray-600 mt-1">Track your volunteering journey</p>
        </div>
        <button 
          onClick={() => setActivePopup(null)} 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" className="text-gray-500" />
        </button>
      </div>
      
      <div className="text-center mb-8">
        <div className="relative inline-block">
          <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white text-3xl font-bold">75%</span>
          </div>
          <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-green-300 transform -rotate-45"></div>
        </div>
        <p className="text-gray-600 text-lg">Profile Completion</p>
        <p className="text-sm text-gray-500 mt-1">Complete your profile to unlock more features</p>
      </div>
      
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-900">Connections Made</span>
            <span className="text-blue-600 font-bold">12/50</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-3">
            <div className="bg-blue-600 h-3 rounded-full transition-all duration-500" style={{ width: '24%' }}></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Connect with 50 people to unlock networking features</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-900">Volunteer Hours</span>
            <span className="text-green-600 font-bold">24/100</span>
          </div>
          <div className="w-full bg-green-200 rounded-full h-3">
            <div className="bg-green-600 h-3 rounded-full transition-all duration-500" style={{ width: '24%' }}></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Reach 100 hours to earn the Community Champion badge</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-900">Skills Learned</span>
            <span className="text-purple-600 font-bold">3/10</span>
          </div>
          <div className="w-full bg-purple-200 rounded-full h-3">
            <div className="bg-purple-600 h-3 rounded-full transition-all duration-500" style={{ width: '30%' }}></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Learn 10 new skills to become a Verified Expert</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Non-Sticky Navbar - Removed sticky classes */}
      <nav ref={navbarRef} className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Mobile Menu */}
            <div className="flex items-center">
              <button 
                className="md:hidden p-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 mr-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="lg" />
              </button>
              
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">
                  <span className="text-green-600">Connect</span>Link
                </h1>
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search opportunities, skills, organizations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <FontAwesomeIcon icon={faTimes} className="text-gray-400 hover:text-gray-600 transition-colors" />
                  </button>
                )}
              </div>
            </div>

            {/* Desktop Navigation Icons */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Notifications with enhanced badge */}
              <button 
                onClick={() => togglePopup('notifications')}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FontAwesomeIcon icon={faBell} size="lg" />
                {getUnreadNotificationsCount() > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center px-1 font-bold">
                    {getUnreadNotificationsCount()}
                  </span>
                )}
              </button>

              {/* Network */}
              <button 
                onClick={() => togglePopup('network')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FontAwesomeIcon icon={faUsers} size="lg" />
              </button>

              {/* Progress */}
              <button 
                onClick={() => togglePopup('progress')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FontAwesomeIcon icon={faChartLine} size="lg" />
              </button>

              {/* Settings */}
              <button 
                onClick={() => togglePopup('settings')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FontAwesomeIcon icon={faCog} size="lg" />
              </button>

              {/* Profile */}
              <button 
                onClick={() => togglePopup('profile')}
                className="flex items-center space-x-3 p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-white font-medium">
                    {getDisplayName().charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="font-medium hidden lg:block">{getDisplayName()}</span>
              </button>
            </div>

            {/* Mobile Icons */}
            <div className="md:hidden flex items-center space-x-2">
              <button 
                onClick={() => togglePopup('notifications')}
                className="relative p-2 text-gray-600 hover:text-gray-900 rounded-lg transition-colors"
              >
                <FontAwesomeIcon icon={faBell} />
                {getUnreadNotificationsCount() > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center px-1 font-bold">
                    {getUnreadNotificationsCount()}
                  </span>
                )}
              </button>
              
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {getDisplayName().charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced Mobile Menu with unique content */}
          <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0'
          }`}>
            <div className="space-y-4 border-t border-gray-200 pt-4">
              {/* Quick Stats for Mobile */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-lg font-bold text-gray-900">{filteredOpportunities.length}</div>
                  <div className="text-xs text-gray-600">Matches</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-lg font-bold text-gray-900">{appliedOpportunities.length}</div>
                  <div className="text-xs text-gray-600">Applications</div>
                </div>
              </div>

              {/* Mobile-specific quick actions */}
              <div className="space-y-2">
                <button 
                  onClick={() => { togglePopup('progress'); }}
                  className="flex items-center w-full px-3 py-3 text-gray-700 hover:bg-green-50 rounded-lg transition-colors border border-gray-200"
                >
                  <FontAwesomeIcon icon={faChartLine} className="mr-3 text-green-600 text-lg" />
                  <span className="font-medium">View Progress</span>
                </button>
                
                <button 
                  onClick={() => { togglePopup('network'); }}
                  className="flex items-center w-full px-3 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors border border-gray-200"
                >
                  <FontAwesomeIcon icon={faUsers} className="mr-3 text-blue-600 text-lg" />
                  <span className="font-medium">My Network</span>
                </button>
                
                <button 
                  onClick={() => { togglePopup('settings'); }}
                  className="flex items-center w-full px-3 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors border border-gray-200"
                >
                  <FontAwesomeIcon icon={faCog} className="mr-3 text-orange-600 text-lg" />
                  <span className="font-medium">Settings</span>
                </button>
              </div>

              {/* Profile completion prompt for mobile */}
              {!user?.profileCompleted && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faLightbulb} className="text-yellow-600 mr-2" />
                    <span className="text-sm font-medium text-yellow-800">Complete your profile</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Greeting Section */}
        <div className={`mb-8 transition-all duration-700 ease-out transform ${
          greetingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
            {getGreeting()}
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">{getSubtitle()}</p>
        </div>

        {/* Profile Completion Banner */}
        {!user?.profileCompleted && (
          <div className={`bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6 mb-8 transition-all duration-700 ease-out transform ${
            greetingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                    <FontAwesomeIcon icon={faLightbulb} className="text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-yellow-800">Complete your profile</h3>
                </div>
                <p className="text-yellow-700">
                  Add your skills, interests, and availability to get personalized opportunity recommendations.
                </p>
              </div>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105">
                Complete Profile
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Search and Sort Bar - Mobile */}
        <div className="md:hidden mb-6 space-y-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search opportunities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <select 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="relevance">Sort by: Relevance</option>
            <option value="match">Sort by: Match %</option>
            <option value="applicants">Sort by: Fewest Applicants</option>
            <option value="distance">Sort by: Distance</option>
            <option value="date">Sort by: Date</option>
          </select>
        </div>

        {/* Stats Overview */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 transition-all duration-700 ease-out ${
          statsVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          {[
            { icon: faListCheck, value: filteredOpportunities.length, label: 'Matches for You', color: 'green' },
            { icon: faUsers, value: nearbyPeople.length, label: 'People Nearby', color: 'blue' },
            { icon: faCheckCircle, value: appliedOpportunities.length, label: 'Active Applications', color: 'purple' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <FontAwesomeIcon 
                icon={stat.icon} 
                className={`text-${stat.color}-600 text-xl mb-3`}
              />
              <p className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className={`transition-all duration-700 ease-out ${
          contentVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Sort Bar - Desktop */}
          <div className="hidden md:flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {activeTab === 'opportunities' ? 'Recommended Opportunities' : 
               activeTab === 'applications' ? 'Your Applications' : 'People Near You'}
            </h2>
            
            {activeTab === 'opportunities' && (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">{filteredOpportunities.length} results</div>
                <select 
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="relevance">Sort by Relevance</option>
                  <option value="match">Sort by Match %</option>
                  <option value="applicants">Sort by Fewest Applicants</option>
                  <option value="distance">Sort by Distance</option>
                  <option value="date">Sort by Date</option>
                </select>
              </div>
            )}
          </div>

          {/* Tabs and Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
            <div className="flex border-b border-gray-200 overflow-x-auto">
              {[
                { id: 'opportunities', label: 'Opportunities', icon: faListCheck },
                { id: 'applications', label: 'Applications', icon: faCheckCircle },
                { id: 'network', label: 'Network', icon: faUsers }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-4 md:px-6 text-sm font-medium whitespace-nowrap min-w-max transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FontAwesomeIcon icon={tab.icon} className="mr-2 text-base" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-4 md:p-6">
              {activeTab === 'opportunities' && (
                <div className="grid gap-4 md:gap-6">
                  {filteredOpportunities.map((opp, index) => (
                    <div 
                      key={opp.id}
                      className="bg-gray-50 p-4 md:p-6 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3">
                            <FontAwesomeIcon icon={opp.icon} className="text-green-600 mt-1 text-lg" />
                            <div>
                              <h3 className="font-semibold text-gray-900 text-lg">{opp.title}</h3>
                              <p className="text-sm text-gray-600">{opp.organization}</p>
                              <p className="text-xs text-gray-500 mt-1">{opp.location}</p>
                              <p className="text-sm text-gray-700 mt-2">{opp.description}</p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {opp.skills.map((skill, i) => (
                                  <span key={i} className="px-2 py-1 bg-white text-xs rounded-full border border-gray-200">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium self-start md:self-center">
                          {opp.matches}% Match
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-4 pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-500">
                          <FontAwesomeIcon icon={faUsers} className="mr-1" />
                          {opp.applicants} applicants • {opp.commitment} • {opp.duration}
                        </div>
                        <Button className="w-full sm:w-auto text-sm px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 border-0 text-white hover:from-green-600 hover:to-emerald-700">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {filteredOpportunities.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <FontAwesomeIcon icon={faSearch} size="2x" className="mb-3 text-gray-300" />
                      <p>No opportunities found matching your search</p>
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="text-green-600 hover:text-green-800 mt-2"
                      >
                        Clear search
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'applications' && (
                <div className="grid gap-4">
                  {appliedOpportunities.map((app, index) => (
                    <div 
                      key={app.id}
                      className="bg-gray-50 p-4 md:p-6 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start gap-3">
                        <FontAwesomeIcon icon={app.icon} className="text-blue-600 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{app.title}</h3>
                          <p className="text-sm text-gray-600">{app.organization}</p>
                          <p className="text-xs text-gray-500 mt-1">Applied {app.appliedDate}</p>
                          <p className="text-sm text-gray-700 mt-2">{app.statusDetails}</p>
                          <p className="text-sm text-green-600 font-medium mt-2 flex items-center">
                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                            {app.nextSteps}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          app.status === 'accepted' 
                            ? 'bg-green-100 text-green-800'
                            : app.status === 'interview'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {app.status === 'accepted' ? 'Accepted' : 
                           app.status === 'interview' ? 'Interview' : 'Under Review'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'network' && (
                <div className="grid gap-4">
                  {nearbyPeople.map((person, index) => (
                    <div 
                      key={index}
                      className="bg-gray-50 p-4 md:p-6 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {person.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{person.name}</h3>
                            <p className="text-sm text-gray-600">{person.distance} • {person.match}% match</p>
                            <p className="text-xs text-gray-500">Joined {person.joined}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {person.skills.slice(0, 2).map((skill, i) => (
                                <span key={i} className="px-2 py-0.5 bg-white text-xs rounded border border-gray-200">
                                  {skill}
                                </span>
                              ))}
                              {person.skills.length > 2 && (
                                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded">
                                  +{person.skills.length - 2} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full sm:w-auto text-sm">
                          Connect
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {[
                { icon: faSearch, label: 'Search', color: 'green', action: () => document.querySelector('input[type="text"]')?.focus() },
                { icon: faUsers, label: 'Network', color: 'blue', action: () => togglePopup('network') },
                { icon: faChartLine, label: 'Progress', color: 'purple', action: () => togglePopup('progress') },
                { icon: faCog, label: 'Settings', color: 'orange', action: () => togglePopup('settings') }
              ].map((action, index) => (
                <button 
                  key={index}
                  onClick={action.action}
                  className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-lg hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-100"
                >
                  <FontAwesomeIcon 
                    icon={action.icon} 
                    className={`text-${action.color}-600 text-lg mb-3`}
                  />
                  <p className="text-sm font-medium text-gray-700">{action.label}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Popup Overlay */}
      {activePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div 
            ref={popupRef}
            className="animate-scale-in"
          >
            {activePopup === 'settings' && <SettingsPopup />}
            {activePopup === 'notifications' && <NotificationsPopup />}
            {activePopup === 'network' && <NetworkPopup />}
            {activePopup === 'profile' && <ProfilePopup />}
            {activePopup === 'progress' && <ProgressPopup />}
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes scale-in {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-scale-in {
          animation: scale-in 0.2s ease-out forwards;
        }
        
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;