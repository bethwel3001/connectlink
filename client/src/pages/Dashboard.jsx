import React, { useState, useEffect } from 'react';
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
  faHeart,
  faBookOpen,
  faSeedling,
  faGlobe,
  faComments,
  faStar
} from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('opportunities');
  const { user } = useAuth();
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    // Get current time of day for greeting
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('Morning');
    else if (hour < 17) setTimeOfDay('Afternoon');
    else setTimeOfDay('Evening');
  }, []);

  // Mock data - would come from backend
  const opportunities = [
    {
      id: 1,
      title: 'Community Garden Volunteer',
      organization: 'Green Thumb Initiative',
      location: 'Downtown, 2km away',
      skills: ['Gardening', 'Community'],
      commitment: 'Weekly',
      matches: 95,
      applicants: 12,
      status: 'open',
      icon: faSeedling
    },
    {
      id: 2,
      title: 'Web Development Mentor',
      organization: 'Tech for Youth',
      location: 'Remote',
      skills: ['JavaScript', 'React', 'Teaching'],
      commitment: 'Flexible',
      matches: 88,
      applicants: 8,
      status: 'open',
      icon: faGlobe
    },
    {
      id: 3,
      title: 'Food Distribution Helper',
      organization: 'City Food Bank',
      location: 'Midtown, 5km away',
      skills: ['Logistics', 'Teamwork'],
      commitment: 'Weekends',
      matches: 92,
      applicants: 15,
      status: 'open',
      icon: faHandshake
    }
  ];

  const appliedOpportunities = [
    {
      id: 101,
      title: 'Youth Sports Coach',
      organization: 'Community Center',
      status: 'under-review',
      appliedDate: '2 days ago',
      nextSteps: 'Interview scheduled',
      icon: faUsers
    },
    {
      id: 102,
      title: 'Library Reading Assistant',
      organization: 'Public Library',
      status: 'accepted',
      appliedDate: '1 week ago',
      nextSteps: 'Orientation on Saturday',
      icon: faBookOpen
    }
  ];

  const nearbyPeople = [
    { name: 'Sarah M.', skills: ['Teaching', 'Art'], distance: '0.5km', match: 92, icon: faUser },
    { name: 'Alex K.', skills: ['Tech', 'Mentoring'], distance: '1.2km', match: 88, icon: faUser },
    { name: 'Mike T.', skills: ['Construction', 'Team Lead'], distance: '0.8km', match: 85, icon: faUser }
  ];

  // Get user's display name
  const getDisplayName = () => {
    if (user?.firstName) {
      return user.firstName;
    }
    if (user?.fullName) {
      return user.fullName.split(' ')[0];
    }
    return 'there';
  };

  // Get user's location for personalized opportunities
  const getUserLocation = () => {
    return user?.city || user?.location || 'your area';
  };

  // Filter opportunities based on user's skills and interests
  const getPersonalizedOpportunities = () => {
    if (!user) return opportunities;
    
    return opportunities.map(opp => {
      let matchScore = 85; // Base score
      
      // Increase match score based on skills alignment
      if (user.skills && user.skills.length > 0) {
        const skillMatches = opp.skills.filter(skill => 
          user.skills.includes(skill)
        ).length;
        matchScore += skillMatches * 5;
      }
      
      // Increase match score based on interests
      if (user.interests && user.interests.length > 0) {
        const interestMatches = opp.skills.filter(skill =>
          user.interests.some(interest => 
            skill.toLowerCase().includes(interest.toLowerCase()) ||
            interest.toLowerCase().includes(skill.toLowerCase())
          )
        ).length;
        matchScore += interestMatches * 3;
      }
      
      return {
        ...opp,
        matches: Math.min(matchScore, 99) // Cap at 99%
      };
    }).sort((a, b) => b.matches - a.matches); // Sort by best matches first
  };

  const personalizedOpportunities = getPersonalizedOpportunities();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Good {timeOfDay}, {getDisplayName()}!
            </h1>
            <p className="text-gray-600">
              {user?.profileCompleted 
                ? `Ready to make a difference in ${getUserLocation()}? Here are opportunities tailored for you.`
                : 'Complete your profile to get personalized recommendations!'
              }
            </p>
          </div>
          
          {/* User Actions */}
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <FontAwesomeIcon icon={faBell} size="lg" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <FontAwesomeIcon icon={faGear} size="lg" />
            </button>
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="text-white text-sm" />
            </div>
          </div>
        </div>

        {/* User Profile Summary */}
        {user?.profileCompleted && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faUser} className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{user.fullName || 'Your Profile'}</h3>
                  <p className="text-sm text-gray-600">
                    {user.specialization && `${user.specialization} • `}
                    {user.location || user.city}
                    {user.availability && ` • ${user.availability}`}
                  </p>
                </div>
              </div>
              <Button variant="outline" className="text-sm whitespace-nowrap">
                Edit Profile
              </Button>
            </div>

            {/* Skills & Interests */}
            {(user.skills?.length > 0 || user.interests?.length > 0) && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {user.skills?.map((skill, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                  {user.interests?.map((interest, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <FontAwesomeIcon icon={faListCheck} className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{personalizedOpportunities.length}</p>
                <p className="text-sm text-gray-600">Matches for You</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <FontAwesomeIcon icon={faUsers} className="text-blue-600 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-sm text-gray-600">People Nearby</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                <FontAwesomeIcon icon={faCheckCircle} className="text-purple-600 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{appliedOpportunities.length}</p>
                <p className="text-sm text-gray-600">Active Applications</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {[
              { id: 'opportunities', label: 'Opportunities', icon: faListCheck },
              { id: 'applications', label: 'Applications', icon: faCheckCircle },
              { id: 'network', label: 'Network', icon: faUsers }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center min-w-[120px] py-4 px-6 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FontAwesomeIcon icon={tab.icon} className="mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'opportunities' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Recommended Opportunities</h2>
                  <Button variant="outline" className="text-sm whitespace-nowrap">
                    Filter & Sort
                  </Button>
                </div>

                <div className="grid gap-4">
                  {personalizedOpportunities.map((opp) => (
                    <div key={opp.id} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FontAwesomeIcon icon={opp.icon} className="text-green-600 text-lg" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start gap-3 mb-2">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 text-lg mb-1">{opp.title}</h3>
                              <p className="text-gray-600 text-sm">{opp.organization}</p>
                            </div>
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                              {opp.matches}% Match
                            </span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1 text-gray-400" />
                            <span className="mr-4">{opp.location}</span>
                            <FontAwesomeIcon icon={faCalendar} className="mr-1 text-gray-400" />
                            <span>{opp.commitment}</span>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {opp.skills.map((skill, index) => (
                              <span key={index} className="bg-white px-2 py-1 rounded text-xs text-gray-600 border border-gray-300">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <span className="text-sm text-gray-500">{opp.applicants} applicants</span>
                        <Button className="text-sm px-4 py-2 whitespace-nowrap">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Applications</h2>
                <div className="space-y-4">
                  {appliedOpportunities.map((app) => (
                    <div key={app.id} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FontAwesomeIcon icon={app.icon} className="text-blue-600 text-lg" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start gap-3 mb-2">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 text-lg mb-1">{app.title}</h3>
                              <p className="text-gray-600 text-sm">{app.organization}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${
                              app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                              app.status === 'under-review' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {app.status.replace('-', ' ')}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <FontAwesomeIcon icon={faClock} className="mr-1 text-gray-400" />
                            <span>Applied {app.appliedDate}</span>
                          </div>
                          
                          <p className="text-sm text-gray-600 flex items-center">
                            <FontAwesomeIcon icon={faLightbulb} className="mr-2 text-yellow-500" />
                            {app.nextSteps}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'network' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">People Near You</h2>
                <div className="grid gap-4">
                  {nearbyPeople.map((person, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FontAwesomeIcon icon={person.icon} className="text-purple-600 text-lg" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start gap-3 mb-2">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 text-lg mb-1">{person.name}</h3>
                              <div className="flex items-center text-sm text-gray-500">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1 text-gray-400" />
                                <span className="mr-4">{person.distance} away</span>
                                <FontAwesomeIcon icon={faStar} className="mr-1 text-yellow-400" />
                                <span>{person.match}% match</span>
                              </div>
                            </div>
                            <Button variant="outline" className="text-sm px-3 py-1 whitespace-nowrap">
                              Connect
                            </Button>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mt-3">
                            {person.skills.map((skill, skillIndex) => (
                              <span key={skillIndex} className="bg-white px-2 py-1 rounded text-xs text-gray-600 border border-gray-300">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors group">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-green-700 transition-colors">
                <FontAwesomeIcon icon={faSearch} className="text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900">Search</span>
            </button>
            
            <button className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-colors group">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-700 transition-colors">
                <FontAwesomeIcon icon={faUsers} className="text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900">Network</span>
            </button>
            
            <button className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition-colors group">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-purple-700 transition-colors">
                <FontAwesomeIcon icon={faChartSimple} className="text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900">Progress</span>
            </button>
            
            <button className="p-4 bg-orange-50 rounded-lg text-center hover:bg-orange-100 transition-colors group">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-orange-700 transition-colors">
                <FontAwesomeIcon icon={faGear} className="text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;