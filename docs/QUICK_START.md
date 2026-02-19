# StructaSign - Quick Start Guide

## 🚀 5-Minute Setup

### Prerequisites
- Node.js 16+ installed
- MongoDB running (local or Atlas)
- Git installed

### Step 1: Clone & Navigate
```bash
cd c:\Rameses\SigniStruct\StructaSign
```

### Step 2: Setup Server

```bash
cd server

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update .env with your MongoDB connection string
# MONGODB_URI=mongodb://localhost:27017/signistruct

# Start server (runs on http://localhost:5000)
npm run dev
```

### Step 3: Setup Client (New Terminal)

```bash
cd client

# Install dependencies
npm install

# Start client (runs on http://localhost:5173)
npm run dev
```

### Step 4: Access the Application

Open your browser and go to: **http://localhost:5173**

## 📝 First Steps

1. **Sign Up** - Create a new account
2. **Login** - Use your credentials
3. **Create a Form** - Click "Create New" on dashboard
4. **Upload a Document** - Upload a PDF or document
5. **Request Signature** - Send a document for signing

## 📂 Project Files

### Key Frontend Files
- `client/src/pages/Dashboard.jsx` - Main dashboard
- `client/src/services/api.js` - API configuration
- `client/src/stores/authStore.js` - Authentication state
- `client/src/styles/globals.css` - Global styles

### Key Backend Files
- `server/src/server.js` - Main server file
- `server/src/models/` - Database schemas
- `server/src/controllers/` - Business logic
- `server/src/routes/` - API endpoints

## 🔧 Environment Variables

### Server (.env)
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/signistruct
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

### Client (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=StructaSign
```

## 📚 API Testing

### Using cURL or Postman

```bash
# Sign Up
POST http://localhost:5000/api/auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

# Login
POST http://localhost:5000/api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}

# Create Form (requires JWT token)
POST http://localhost:5000/api/forms
Headers: Authorization: Bearer {token}
{
  "title": "Customer Feedback",
  "description": "Help us improve"
}
```

## 🐛 Troubleshooting

### "MongoDB connection refused"
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env

### "Port 5000 already in use"
- Change PORT in server/.env
- Or kill the process using the port

### "Cannot find module"
- Run `npm install` in the appropriate directory
- Delete node_modules and `.package-lock.json` then reinstall

### CORS Error
- Check CORS_ORIGIN matches your frontend URL
- Ensure server is running on port 5000

## 📊 Database Setup (Optional)

### MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update MONGODB_URI in server/.env

### MongoDB Local
```bash
# Install MongoDB
# macOS: brew install mongodb-community
# Windows: Download from mongodb.com

# Start MongoDB
mongod

# Verify connection
mongo
```

## 🎨 Dashboard Preview

The dashboard includes:
- **4 Stat Cards**: Active Forms, Draft Forms, Responses, Pending Signatures
- **Quick Actions**: Create Form, Upload Document, Request Signature, View Analytics
- **Recent Items**: Latest forms, documents, and signatures
- **Responsive Design**: Works on desktop and mobile

## 📦 Build for Production

### Frontend
```bash
cd client
npm run build
# Creates optimized build in dist/
```

### Backend
```bash
# Set NODE_ENV=production
# Deploy to hosting platform (Heroku, Railway, etc.)
```

## 💡 Tips

1. **Use Modern Browser** - Chrome/Firefox for best experience
2. **Check Console** - Press F12 to see any errors
3. **Clear Cache** - If UI looks odd, hard refresh (Ctrl+Shift+R)
4. **Read Logs** - Check terminal output for backend errors
5. **Use Thunder Client** - VS Code extension for API testing

## 🔗 Useful Links

- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com)
- [MongoDB Guide](https://docs.mongodb.com)
- [Vite Guide](https://vitejs.dev)

## ❓ Need Help?

1. Check the main [README.md](../README.md)
2. Review [ARCHITECTURE.md](./ARCHITECTURE.md)
3. Check browser console (F12)
4. Check server terminal output
5. Verify environment variables

## 🎯 Next Steps

After setup:
1. Explore the dashboard UI
2. Create test forms
3. Submit test responses
4. Upload test documents
5. Request test signatures

---

**Happy coding! 🎉**
