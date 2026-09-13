# TECHINS HARDWARE - Quick Start Guide

Get up and running in 5 minutes!

## Prerequisites

Make sure you have installed:
- ✅ **Node.js** v16+ ([Download](https://nodejs.org/))
- ✅ **MongoDB** v5+ ([Download](https://www.mongodb.com/try/download/community))
- ✅ **npm** (comes with Node.js)

## Step-by-Step Setup

### 1. Install Dependencies

From the root directory (`techins-hardware/`):

```bash
# Install all dependencies at once
npm run install-all
```

Or install individually:

```bash
# Server dependencies
npm run install-server

# Client dependencies
npm run install-client
```

### 2. Start MongoDB

Make sure MongoDB is running:

**Windows:**
```bash
# Start MongoDB service
net start MongoDB

# Or run mongod directly
mongod
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### 3. Configure Environment

The server already has a `.env` file configured for local development:

```env
MONGODB_URI=mongodb://localhost:27017/techins-hardware
JWT_SECRET=techins_hardware_jwt_secret_key_2026_change_in_production
PORT=5000
CLIENT_URL=http://localhost:5173
```

✅ **No changes needed for local development!**

### 4. Seed the Database

Populate the database with sample data:

```bash
npm run seed
```

This creates:
- 10 categories
- 10 courses
- 10 projects
- 20 components
- 6 events
- 15 questions
- 10 articles
- 3 demo accounts

### 5. Start the Application

**Option A: Two Terminals (Recommended)**

Terminal 1 - Backend:
```bash
npm run server
```

Terminal 2 - Frontend:
```bash
npm run client
```

**Option B: Concurrently (Advanced)**

Install concurrently globally:
```bash
npm install -g concurrently
```

Then run both at once:
```bash
concurrently "npm run server" "npm run client"
```

### 6. Access the Application

- 🌐 **Frontend**: http://localhost:5173
- 🔌 **Backend API**: http://localhost:5000
- 🏥 **Health Check**: http://localhost:5000/api/health

## Demo Accounts

### Admin
- **Email**: admin@techins.com
- **Password**: admin123
- Can manage everything

### Instructor  
- **Email**: instructor@techins.com
- **Password**: instructor123
- Can create courses and articles

### User
- **Email**: user@techins.com
- **Password**: user123
- Can browse, enroll, and interact

## Verify Installation

### Test Backend
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "TECHINS HARDWARE API is running",
  "timestamp": "2026-09-13T..."
}
```

### Test Frontend
Open http://localhost:5173 in your browser. You should see:
- ✅ TECHINS logo in navbar
- ✅ Animated 3D hero scene
- ✅ "Build the Hardware Behind Tomorrow" headline
- ✅ Categories, courses, and projects sections

## Common Issues

### MongoDB Connection Error

**Error**: `MongoServerError: connect ECONNREFUSED`

**Solution**: 
- Make sure MongoDB is running: `mongod` or service start command
- Check MongoDB is on default port 27017
- Verify `.env` has correct `MONGODB_URI`

### Port Already in Use

**Error**: `Port 5000 is already in use`

**Solution**:
- Stop other services using port 5000
- Or change port in `server/.env`: `PORT=5001`

### Module Not Found

**Error**: `Cannot find module 'express'`

**Solution**:
- Run `npm run install-all` again
- Check that `node_modules` exists in both `client/` and `server/`

### React Three Fiber Warning

**Warning**: WebGL context warnings in console

**Solution**: 
- This is normal for 3D graphics
- Refresh the page if hero scene doesn't load
- Works best in Chrome, Firefox, or Edge

## Next Steps

1. **Login**: Use any demo account (see above)
2. **Explore**: Browse courses, projects, components
3. **Enroll**: Join a course and track progress
4. **Create**: Share your own hardware project
5. **Ask**: Post a question in the community
6. **Admin**: Login as admin to manage content

## Development Workflow

### Making Changes

**Backend Changes:**
- Edit files in `server/`
- Server auto-restarts with nodemon
- Check terminal for errors

**Frontend Changes:**
- Edit files in `client/src/`
- Hot reload happens automatically
- Check browser console for errors

### Adding New Features

1. **Backend**: Model → Controller → Routes → Test API
2. **Frontend**: API Service → Page → Component → Route

### Database Reset

To start fresh:

```bash
# In MongoDB shell or Compass
use techins-hardware
db.dropDatabase()

# Then re-seed
npm run seed
```

## Production Deployment

When ready to deploy:

### Backend
```bash
cd server
npm start  # Production server
```

### Frontend
```bash
cd client
npm run build  # Creates dist/ folder
npm run preview  # Test production build
```

Deploy:
- **Backend**: Heroku, Railway, DigitalOcean, AWS
- **Frontend**: Vercel, Netlify, Cloudflare Pages
- **Database**: MongoDB Atlas (cloud)

## Folder Structure Quick Reference

```
techins-hardware/
├── client/           → React frontend (Vite + Tailwind)
│   └── src/
│       ├── pages/    → Page components
│       ├── components/ → Reusable UI
│       └── services/ → API calls
│
└── server/           → Express backend
    ├── models/       → MongoDB schemas
    ├── controllers/  → Business logic
    ├── routes/       → API endpoints
    └── middleware/   → Auth, validation
```

## Helpful Commands

```bash
# Check Node.js version
node -v

# Check MongoDB status
mongod --version

# View MongoDB data (Compass)
# Download: https://www.mongodb.com/products/compass

# Clear node_modules and reinstall
rm -rf client/node_modules server/node_modules
npm run install-all

# Check running processes
lsof -i :5000  # Backend port
lsof -i :5173  # Frontend port
```

## Resources

- 📖 Full README: `README.md`
- 🔌 API Endpoints: See README API section
- 🎨 Design System: See README Design System section
- 🗄️ Database Schema: `server/models/`
- 🌐 Frontend Routes: `client/src/App.jsx`

## Getting Help

1. Check the browser console (F12)
2. Check the server terminal output
3. Review the README.md for detailed docs
4. Verify all prerequisites are installed
5. Make sure MongoDB is running

---

## Success Checklist

- [ ] Node.js and MongoDB installed
- [ ] Dependencies installed (server + client)
- [ ] MongoDB running
- [ ] Database seeded with sample data
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Can login with demo accounts
- [ ] Homepage loads with 3D hero scene
- [ ] Can browse courses and projects

## You're Ready! 🚀

Visit **http://localhost:5173** and start exploring TECHINS HARDWARE!

**Build the Hardware Behind Tomorrow.**
