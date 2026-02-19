# StructaSign - Unified Form & Document Management Platform

A modern, professional MERN stack application combining form building, data collection, document management, and e-signature capabilities into a single unified platform.

## 🚀 Features

### Forms & Surveys
- **Form Builder**: Drag-and-drop interface for creating professional forms
- **Multiple Field Types**: Text, email, number, checkbox, radio, select, textarea, date
- **Templates**: Pre-built form templates for quick setup
- **Sharing & Collaboration**: Share forms with team members
- **Response Analytics**: Track responses and generate insights

### Document Management
- **Upload & Store**: Manage all your documents in one place
- **Sharing**: Control who can view, sign, or edit documents
- **Tagging & Organization**: Organize documents with custom tags

### E-Signatures
- **Signature Requests**: Request signatures from multiple signers
- **Signing Order**: Control the sequence of signers
- **Expiration**: Set expiration dates for signature requests
- **Signature Tracking**: Monitor signature status in real-time

### User Experience
- **Modern Dashboard**: Overview of forms, documents, and signatures
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Dark/Light Mode**: Theme support for user preference
- **Real-time Notifications**: Stay updated on form responses and signatures

## 📁 Project Structure

```
StructaSign/
├── client/                    # React Frontend (Vite)
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── layouts/         # Layout components
│   │   ├── services/        # API services
│   │   ├── stores/          # Zustand stores
│   │   ├── hooks/           # Custom hooks
│   │   ├── utils/           # Utility functions
│   │   ├── styles/          # Global styles
│   │   ├── assets/          # Images, icons
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── server/                    # Express Backend
│   ├── src/
│   │   ├── models/          # MongoDB schemas
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Express middleware
│   │   ├── config/          # Configuration
│   │   ├── utils/           # Helper functions
│   │   └── server.js        # Main server file
│   ├── package.json
│   ├── .env                 # Environment variables
│   └── .env.example
│
└── README.md                # This file
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Zustand** - State management
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Hot Toast** - Notifications
- **React PDF** - PDF support

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **CORS** - Cross-origin support

## 📋 Prerequisites

- Node.js 16+ and npm
- MongoDB (local or Atlas)
- Git

## 🚦 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd StructaSign
```

### 2. Setup Server

```bash
cd server
npm install
```

Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

Update `.env` with your MongoDB connection string and JWT secret.

Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### 3. Setup Client

```bash
cd ../client
npm install
```

Create a `.env` file:
```bash
cp .env.example .env
```

Start the development server:
```bash
npm run dev
```

The client will run on `http://localhost:5173`

## 📚 API Documentation

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Forms
- `GET /api/forms` - Get all forms
- `POST /api/forms` - Create new form
- `GET /api/forms/:id` - Get form details
- `PUT /api/forms/:id` - Update form
- `DELETE /api/forms/:id` - Delete form
- `PATCH /api/forms/:id/publish` - Publish form
- `GET /api/forms/:formId/responses` - Get form responses
- `POST /api/forms/:formId/responses` - Submit form response
- `GET /api/forms/:formId/stats` - Get form statistics

### Documents
- `GET /api/documents` - Get all documents
- `POST /api/documents/upload` - Upload document
- `GET /api/documents/:id` - Get document details
- `DELETE /api/documents/:id` - Delete document

### Signatures
- `GET /api/signatures` - Get all signature requests
- `POST /api/signatures/request` - Request signature
- `GET /api/signatures/:id` - Get signature details
- `POST /api/signatures/:id/sign` - Sign document
- `GET /api/signatures/stats` - Get signature statistics

## 🎨 UI/UX Features

- **Modern Design System**: Consistent spacing, colors, and typography
- **Responsive Grid Layout**: Auto-adapting dashboard sections
- **Interactive Cards**: Hover effects and smooth transitions
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: User-friendly error messages
- **Accessibility**: WCAG compliant components

## 🔐 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: Bcrypt for password security
- **Authorization Checks**: Role-based access control
- **Input Validation**: Server-side validation
- **CORS**: Cross-origin request handling
- **Secure Headers**: HTTP security headers

## 📱 Responsive Design

- **Desktop** (1920px+): Full layout with sidebar
- **Tablet** (768px - 1024px): Collapsible sidebar
- **Mobile** (< 768px): Mobile-optimized navigation

## 🚀 Deployment

### Deploy Frontend (Vercel)
```bash
npm run build
# Deploy dist/ folder to Vercel
```

### Deploy Backend (Heroku/Railway)
```bash
# Set environment variables
# Deploy to your hosting platform
```

## 📝 Development Guidelines

### Code Style
- Use ES6+ syntax
- Follow naming conventions
- Write descriptive comments
- Use proper error handling

### File Organization
- Keep components modular
- Separate logic from presentation
- Use custom hooks for reusable logic
- Organize styles with components

### Commit Messages
```
feat: Add form validation
fix: Correct dashboard stats calculation
docs: Update API documentation
style: Format code according to standards
refactor: Simplify authentication logic
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or connection string is correct
- Check `.env` file for correct `MONGODB_URI`

### CORS Error
- Ensure `CORS_ORIGIN` in server `.env` matches client URL
- Check server middleware order

### Module Not Found
- Run `npm install` in both client and server directories
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## 📊 Database Models

### User
- id, name, email, password, avatar, role, status, timestamps

### Form
- id, title, description, owner, fields, status, settings, responseCount, template, sharedWith, timestamps

### FormResponse
- id, form, respondent, responses, ipAddress, userAgent, status, timestamps

### Document
- id, name, owner, fileUrl, fileType, fileSize, description, tags, sharedWith, timestamps

### Signature
- id, document, requester, signer, signerEmail, status, signatureUrl, signedAt, expiresAt, message, timestamps

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support, email support@signistruct.com or open an issue in the repository.

## 🎯 Roadmap

- [ ] Advanced form analytics and reporting
- [ ] Custom domain support
- [ ] API webhooks
- [ ] Form conditionals and logic
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Integrations (Slack, Google Sheets, Zapier)
- [ ] Advanced audit logging
- [ ] Batch operations
- [ ] Custom branding

---

**Built with ❤️ using MERN Stack**
#   S t r u c t a S i g n  
 