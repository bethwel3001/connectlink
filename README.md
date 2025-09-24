## ConnectLink
Bridging Communities Through Volunteering
ConnectLink is a modern web application that connects volunteers with meaningful opportunities in their local communities. Our platform makes it easy to find, apply, and track volunteering positions while building networks with like-minded individuals.

##  Features
Core Functionality
Smart Matching: AI-powered opportunity recommendations based on skills and interests
Real-time Notifications: Stay updated on application status and new opportunities
Interactive Dashboard: Beautiful, responsive interface with animated components
Community Network: Connect with other volunteers and organizations
Progress Tracking: Monitor your volunteering journey and achievements

##  Tech Stack
* Frontend
React 18 - Modern React with hooks and functional components
Tailwind CSS - Utility-first CSS framework for rapid UI development
Font Awesome - Comprehensive icon library
Context API - State management for authentication and notifications
Custom Hooks - Reusable logic for API calls and state management

* Backend
Node.js - Runtime environment
Express.js - Web application framework
MongoDB - NoSQL database for flexible data storage
Mongoose - MongoDB object modeling
JWT - JSON Web Tokens for authentication
bcryptjs - Password hashing and security

* Development Tools
Create React App - Bootstrapping and build tools
ESLint - Code linting and quality
Prettier - Code formatting
Git - Version control

* Installation & Setup
Prerequisites
Node.js (v14 or higher)
MongoDB (v4.4 or higher)
npm or yarn

## Quick Start
1. Clone the repository
```bash
git clone https://github.com/bethwel3001/connectlink.git
cd connectlink
```

2. Install dependencies.
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```
3. Environment setup.
```bash
# Create .env file in server directory
cd server
touch .env
```
4. Set up the database.
```bash
# Make sure MongoDB is running
mongod

# Or if using MongoDB as a service
sudo systemctl start mongod
```

5. Run the app.
```bash
# Terminal 1 - Start the backend server
cd server
npm run dev

# Terminal 2 - Start the frontend client
cd client
npm start
```