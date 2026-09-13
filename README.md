# TECHINS HARDWARE

**Build the Hardware Behind Tomorrow**

A complete, production-ready full-stack web application for Electronics, Embedded Systems, IoT, Robotics, PCB Design, and DIY Hardware Projects. Built with the MERN stack and featuring an immersive, motion-rich design inspired by award-winning WebGL experiences.

![TECHINS HARDWARE](https://img.shields.io/badge/MERN-Stack-orange) ![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white) ![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black) ![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)

---

## 🎯 Overview

TECHINS HARDWARE is a comprehensive hardware learning and community platform that combines:

- **LEARN**: Structured courses on Arduino, ESP32, PCB design, embedded systems, and more
- **BUILD**: Project showcase with tutorials, code, and community feedback
- **DISCOVER**: Component explorer with specifications, datasheets, and purchase links
- **SHARE**: Stack Overflow-style Q&A forum for hardware questions
- **COMPETE**: Hackathons, makeathons, and hardware competitions
- **CREATE**: Professional hardware tools and calculators

---

## ✨ Features

### 🎓 Learning Platform
- **10+ Hardware Courses**: Arduino, ESP32, PCB Design, Embedded C, IoT, Robotics
- Course enrollment and progress tracking
- Lesson completion system
- Video content, resources, and downloadable materials
- Instructor-managed content

### 🔧 Project Showcase
- Create and share hardware projects
- Multi-image uploads
- Like, comment, and view counter
- GitHub integration
- Filter by difficulty, category, and technology
- Featured projects on homepage

### 🧩 Component Explorer
- **20+ Hardware Components**: Microcontrollers, sensors, displays, motors
- Detailed specifications and datasheets
- Purchase links and availability status
- Filter by category, voltage, interface, manufacturer
- Related projects

### 🎪 Events & Hackathons
- Hardware hackathons and makeathons
- Workshop management
- Event registration system
- Prize, judges, sponsors, and timeline management
- Online and in-person events

### 💬 Community Forum
- Stack Overflow-style Q&A
- Upvote/downvote system
- Accepted answers
- Tag-based organization
- Reputation points
- Search and filter questions

### 📰 Articles & Documentation
- Technical articles on hardware topics
- Reading time estimation
- Category and tag filtering
- Related articles suggestions
- Documentation system with navigation

### 🛠️ Hardware Tools
- **Ohm's Law Calculator**
- Resistor Color Code Calculator
- LED Resistor Calculator
- Voltage Divider Calculator
- Power Calculator
- PCB Trace Width Calculator
- Battery Life Calculator
- Unit Converter

### 👤 User Management
- Role-based access control (User, Instructor, Admin)
- Profile customization
- Skills, social links, bio
- Project and course history
- Reputation and badges

### 🔐 Security
- JWT authentication
- bcrypt password hashing
- Protected routes (frontend + backend)
- Role-based authorization
- File upload validation
- CORS configuration
- Secure HTTP headers

---

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Three Fiber** - 3D graphics (hero scene)
- **@react-three/drei** - React Three Fiber helpers
- **Axios** - HTTP client
- **Zustand** - State management
- **React Hook Form** - Form validation
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **express-validator** - Input validation

---

## 📁 Project Structure

```
techins-hardware/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/     # Reusable UI components
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── HeroScene.jsx
│       │   └── ProtectedRoute.jsx
│       ├── pages/          # Page components
│       │   ├── HomePage.jsx
│       │   ├── LoginPage.jsx
│       │   ├── RegisterPage.jsx
│       │   ├── CoursesPage.jsx
│       │   ├── ProjectsPage.jsx
│       │   ├── ComponentsPage.jsx
│       │   ├── EventsPage.jsx
│       │   ├── CommunityPage.jsx
│       │   ├── ArticlesPage.jsx
│       │   ├── ToolsPage.jsx
│       │   └── ProfilePage.jsx
│       ├── layouts/        # Layout wrappers
│       │   ├── MainLayout.jsx
│       │   └── AuthLayout.jsx
│       ├── services/       # API services
│       │   └── api.js
│       ├── store/          # State management
│       │   └── authStore.js
│       ├── App.jsx         # Root component
│       ├── main.jsx        # Entry point
│       └── index.css       # Global styles
│
└── server/                 # Express backend
    ├── config/             # Configuration
    │   └── db.js
    ├── controllers/        # Request handlers
    │   ├── authController.js
    │   ├── courseController.js
    │   ├── projectController.js
    │   ├── componentController.js
    │   ├── eventController.js
    │   ├── questionController.js
    │   ├── articleController.js
    │   └── categoryController.js
    ├── models/             # Mongoose schemas
    │   ├── User.js
    │   ├── Category.js
    │   ├── Course.js
    │   ├── Lesson.js
    │   ├── Enrollment.js
    │   ├── Project.js
    │   ├── Comment.js
    │   ├── Component.js
    │   ├── Event.js
    │   ├── Question.js
    │   ├── Answer.js
    │   ├── Article.js
    │   ├── Documentation.js
    │   ├── Product.js
    │   ├── Notification.js
    │   └── Bookmark.js
    ├── routes/             # API routes
    │   ├── authRoutes.js
    │   ├── courseRoutes.js
    │   ├── projectRoutes.js
    │   ├── componentRoutes.js
    │   ├── eventRoutes.js
    │   ├── questionRoutes.js
    │   ├── articleRoutes.js
    │   └── categoryRoutes.js
    ├── middleware/         # Custom middleware
    │   ├── auth.js
    │   ├── errorHandler.js
    │   ├── upload.js
    │   └── validate.js
    ├── utils/              # Utility functions
    │   └── seed.js
    ├── uploads/            # Uploaded files
    ├── .env                # Environment variables
    ├── .env.example        # Example env file
    ├── package.json
    └── server.js           # Entry point
```

---

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (v5 or higher)
- **npm** or **yarn**

### 1. Clone the Repository
```bash
git clone <repository-url>
cd techins-hardware
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` file in the `server` directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/techins-hardware
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

### 4. MongoDB Setup

Make sure MongoDB is running on your system:

**Windows:**
```bash
mongod
```

**macOS/Linux:**
```bash
sudo systemctl start mongodb
# or
brew services start mongodb-community
```

### 5. Seed Database

Populate the database with sample data:

```bash
cd server
npm run seed
```

This creates:
- 10 categories
- 10 courses with lessons
- 10 projects
- 20 components
- 6 events
- 15 community questions
- 10 articles
- Demo user accounts (see below)

---

## 🚀 Running the Application

### Development Mode

**Start Backend** (Terminal 1):
```bash
cd server
npm run dev
```
Backend runs on `http://localhost:5000`

**Start Frontend** (Terminal 2):
```bash
cd client
npm run dev
```
Frontend runs on `http://localhost:5173`

### Production Build

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
```bash
cd client
npm run build
npm run preview
```

---

## 🌐 Deployment to Vercel

TECHINS HARDWARE is optimized for deployment on **Vercel** with **MongoDB Atlas** and **Cloudinary**.

### Architecture

- **Frontend:** Vite React app deployed as static site
- **Backend:** Express API wrapped as serverless function
- **Database:** MongoDB Atlas (cloud database)
- **File Storage:** Cloudinary (cloud storage for images)

### Quick Deploy

1. **Fork/Clone Repository:**
   ```bash
   git clone https://github.com/gkdhass/Techins-Hardward.git
   ```

2. **Set Up MongoDB Atlas:**
   - Create free cluster at https://www.mongodb.com/cloud/atlas
   - Create database user with password
   - Whitelist IP: `0.0.0.0/0` (for serverless)
   - Get connection string

3. **Set Up Cloudinary:**
   - Create free account at https://cloudinary.com
   - Get Cloud Name, API Key, and API Secret from dashboard

4. **Deploy to Vercel:**
   - Import project at https://vercel.com
   - Link your GitHub repository
   - Add environment variables (see below)
   - Deploy!

### Environment Variables (Vercel Project Settings)

**Backend Variables:**
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/techins-hardware?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
CLIENT_URL=https://your-app.vercel.app
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=production
MAX_FILE_SIZE=5242880
JWT_EXPIRE=7d
```

**Frontend Variables:**
```env
VITE_API_URL=/api
```

### Post-Deployment Steps

1. **Seed Database** (run locally, pointed at production MongoDB):
   ```bash
   cd server
   # Create temporary .env with production MONGODB_URI
   NODE_ENV=production npm run seed
   ```

2. **Test Application:**
   - Visit your Vercel URL
   - Test login with demo accounts
   - Verify file uploads work (Cloudinary)

3. **Update CLIENT_URL:**
   - After first deploy, update `CLIENT_URL` env variable with actual Vercel URL
   - Redeploy for CORS to work correctly

### Key Features for Vercel

✅ **Serverless Backend:** Express app wrapped with `serverless-http`  
✅ **Connection Caching:** MongoDB connections reused across function calls  
✅ **Cloud Storage:** Multer uploads to Cloudinary (not local disk)  
✅ **Environment-Aware:** Auto-detects production vs development  
✅ **SPA Routing:** React Router works with direct URLs  
✅ **HTTPS Secure:** SSL certificate included  

### Detailed Documentation

For complete deployment instructions, see:
- **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)** - Step-by-step Vercel guide
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - General deployment checklist

### Alternative Deployment (Split Architecture)

Deploy frontend to Vercel and backend to a persistent Node host:

**Frontend (Vercel):**
- Deploy `client/` as static site
- Set `VITE_API_URL` to backend URL

**Backend (Render/Railway/Fly.io):**
- Deploy `server/` as Node.js app
- Use Cloudinary for file uploads
- Set CORS to allow Vercel domain

---

## 👥 Demo Accounts

After running the seed script, use these accounts to test different roles:

### Admin Account
- **Email**: `admin@techins.com`
- **Password**: `admin123`
- **Access**: Full platform management, all CRUD operations

### Instructor Account
- **Email**: `instructor@techins.com`
- **Password**: `instructor123`
- **Access**: Create courses, manage students, view analytics

### User Account
- **Email**: `user@techins.com`
- **Password**: `user123`
- **Access**: Browse, enroll, submit projects, ask questions

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register         - Register new user
POST   /api/auth/login            - Login user
POST   /api/auth/logout           - Logout user
GET    /api/auth/me               - Get current user
PUT    /api/auth/profile          - Update profile
PUT    /api/auth/update-password  - Update password
POST   /api/auth/forgot-password  - Request password reset
PUT    /api/auth/reset-password/:token - Reset password
```

### Categories
```
GET    /api/categories            - Get all categories
GET    /api/categories/:slug      - Get category by slug
POST   /api/categories            - Create category (Admin)
PUT    /api/categories/:id        - Update category (Admin)
DELETE /api/categories/:id        - Delete category (Admin)
```

### Courses
```
GET    /api/courses               - Get all courses
GET    /api/courses/:slug         - Get course by slug
POST   /api/courses               - Create course (Instructor/Admin)
PUT    /api/courses/:id           - Update course (Instructor/Admin)
DELETE /api/courses/:id           - Delete course (Instructor/Admin)
POST   /api/courses/:id/enroll    - Enroll in course
GET    /api/courses/my-learning   - Get enrolled courses
POST   /api/courses/:courseId/lessons/:lessonId/complete - Complete lesson
```

### Projects
```
GET    /api/projects              - Get all projects
GET    /api/projects/:slug        - Get project by slug
POST   /api/projects              - Create project
PUT    /api/projects/:id          - Update project
DELETE /api/projects/:id          - Delete project
POST   /api/projects/:id/like     - Like/unlike project
POST   /api/projects/:id/comments - Add comment
GET    /api/projects/my-projects  - Get user's projects
```

### Components
```
GET    /api/components            - Get all components
GET    /api/components/:slug      - Get component by slug
POST   /api/components            - Create component (Admin)
PUT    /api/components/:id        - Update component (Admin)
DELETE /api/components/:id        - Delete component (Admin)
GET    /api/components/meta/categories - Get component categories
```

### Events
```
GET    /api/events                - Get all events
GET    /api/events/:slug          - Get event by slug
POST   /api/events                - Create event (Admin)
PUT    /api/events/:id            - Update event (Admin)
DELETE /api/events/:id            - Delete event (Admin)
POST   /api/events/:id/register   - Register for event
```

### Questions (Community)
```
GET    /api/questions             - Get all questions
GET    /api/questions/:id         - Get question by ID
POST   /api/questions             - Create question
PUT    /api/questions/:id         - Update question
DELETE /api/questions/:id         - Delete question
POST   /api/questions/:id/vote    - Vote on question
POST   /api/questions/:id/answers - Create answer
POST   /api/questions/answers/:id/vote - Vote on answer
POST   /api/questions/answers/:id/accept - Accept answer
GET    /api/questions/my-questions - Get user's questions
```

### Articles
```
GET    /api/articles              - Get all articles
GET    /api/articles/:slug        - Get article by slug
POST   /api/articles              - Create article (Instructor/Admin)
PUT    /api/articles/:id          - Update article (Instructor/Admin)
DELETE /api/articles/:id          - Delete article (Instructor/Admin)
```

---

## 🎨 Design System

### Color Palette (Amber Theme - Precision Hardware Aesthetic)

**Amber is the only "loud" color** - everything else is warm-neutral grayscale, creating a sophisticated precision hardware aesthetic that evokes gold-plated PCB contacts, brass connectors, and soldered electronics.

```css
/* Background & Surface */
--bg-base:         #0A0B0D   /* near-black page background */
--bg-surface:      #121417   /* dark gray card surface */
--bg-surface-alt:  #17191D   /* raised card / hover surface */

/* Borders */
--border-thin:     #23262B   /* 1px hairline borders */
--border-glow:     #3D2F1A   /* border with faint amber cast for active/focus cards */

/* Text (warm-neutral tones) */
--text-primary:    #F2F0EC   /* off-white, slightly warm */
--text-secondary:  #A39D91   /* warm gray */
--text-muted:      #6B6659   /* muted warm gray */

/* Accent - Amber (PRIMARY BRAND COLOR) */
--accent-primary:       #D4971E   /* Techins amber - primary brand accent */
--accent-primary-dim:   #A97615   /* muted amber for secondary icons/CTAs */
--accent-primary-light: #F0B94D   /* lighter amber for hover/highlight states */
--accent-glow:          rgba(212, 151, 30, 0.35)  /* box-shadow glow on hover/active */

/* Status Colors */
--accent-warn:     #FFB020   /* warnings */
--accent-error:    #FF4D4F   /* errors */
--accent-info:     #4C9AFF   /* info (used sparingly) */
```

### Logo Design
- **Wordmark**: "TECHINS" in geometric grotesk, all-caps, medium-bold
- **Mark**: Hexagon/chip outline with clipped corner in amber (#D4971E)
- **Glow**: Single node/dot at vertex suggesting circuit connection
- **Color Rule**: Wordmark in off-white, mark in amber (never render wordmark in amber)
- **Scalability**: Works at 24px navbar and 512px favicon

### Typography
- **Display/Headlines**: Inter Tight, 64-104px desktop / 32-44px mobile
- **Body**: Inter, 16-18px
- **Monospace**: JetBrains Mono (code, specs, calculators)
- **Eyebrow Labels**: 11-12px, uppercase, letter-spacing 0.12em

### Key Design Elements
- **Hero Scene**: Animated PCB with amber grid lines, solder-spark particles drifting upward
- **Pill-shaped Navigation**: Rounded buttons with amber hover effects
- **Logo**: Hexagonal chip icon with amber glow at circuit vertex
- **Scroll Reveals**: Framer Motion animations on scroll
- **Card Hover States**: Scale 1.0 → 1.02 with amber glow (rgba(212, 151, 30, 0.35))
- **Dark Theme**: Near-black background with warm-neutral text + amber-only accent
- **PCB Aesthetic**: Gold-plated traces, brass connectors, precision hardware feel

### Design Philosophy
**"Precision Hardware / Soldered-Gold-Contacts"** - Avoid neon-green "hacker cliché". The amber color evokes high-quality electronics manufacturing: gold-plated PCB pads, brass components, technical excellence, and premium craftsmanship.

---

## 📊 Database Models

### User
- Authentication (email, password, role)
- Profile (name, bio, avatar, skills)
- Social links (GitHub, LinkedIn, website)
- Reputation and badges

### Course
- Title, description, thumbnail
- Instructor reference
- Category, level, duration, price
- Requirements and learning outcomes
- Lessons (separate collection)

### Project
- Title, description, images
- Author reference
- Technologies, components, difficulty
- GitHub and documentation URLs
- Likes, views, comments

### Component
- Name, image, description
- Category, manufacturer, specifications
- Voltage, interface, package
- Datasheet and purchase URLs
- Related projects

### Event
- Title, banner, description, type
- Date, location, online status
- Registration management
- Participants, prizes, judges, sponsors

### Question & Answer
- Stack Overflow-style Q&A
- Votes (upvote/downvote)
- Tags, views, accepted answer
- Comments and reputation

### Article
- Title, content, thumbnail
- Author, category, tags
- Reading time, views
- Published status

---

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt with salt rounds
- **Protected Routes**: Frontend and backend route protection
- **Role-Based Access Control**: User, Instructor, Admin roles
- **File Upload Validation**: Type and size validation
- **Input Validation**: express-validator for API inputs
- **CORS Configuration**: Controlled cross-origin requests
- **Helmet.js**: Security HTTP headers
- **XSS Protection**: Sanitized user inputs
- **Rate Limiting**: Prevent abuse

---

## 🚧 Future Enhancements

The application is architected for extensibility:

- **Payment Integration**: Stripe/PayPal for paid courses
- **Certificates**: Course completion certificates
- **Live Classes**: Real-time video streaming
- **Hardware Marketplace**: Buy/sell hardware components
- **IoT Integration**: Connect and monitor real devices
- **AI Assistant**: Hardware design help and debugging
- **Real-time Chat**: Community chat rooms
- **Email Notifications**: Automated email system
- **Cloud Storage**: AWS S3/Cloudinary integration
- **Advanced Analytics**: Detailed usage statistics
- **Mobile Apps**: React Native applications

---

## 🤝 Contributing

This is a complete full-stack application scaffold. To extend:

1. Add new models in `server/models/`
2. Create controllers in `server/controllers/`
3. Define routes in `server/routes/`
4. Build UI pages in `client/src/pages/`
5. Create API services in `client/src/services/api.js`
6. Update seed data in `server/utils/seed.js`

---

## 📝 License

This project is built as a demonstration of a production-ready MERN stack application with modern design patterns and best practices.

---

## 🙏 Acknowledgments

- Design inspiration from Lusion.co studio site
- Hardware community for use cases and features
- MERN stack ecosystem and open-source libraries

---

## 📞 Support

For issues, questions, or contributions:
- Create an issue in the repository
- Review API documentation above
- Check the demo accounts for testing different roles

---

**Built with ❤️ using the MERN Stack**

TECHINS HARDWARE - Build the Hardware Behind Tomorrow
