# StructaSign Architecture & Development Guide

## System Overview

StructaSign is a unified platform combining:
1. **Form Builder** - Create and distribute dynamic forms
2. **Response Management** - Collect and analyze form responses
3. **Document Management** - Store and organize documents
4. **E-Signature** - Request and manage digital signatures

## Architecture

### Layered Architecture

```
┌─────────────────────────────────────┐
│         Frontend (React/Vite)       │
│  ┌─────────────────────────────────┐│
│  │  Components (UI)                ││
│  │  Pages (Screen Logic)           ││
│  │  Layouts (Structure)            ││
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │  Services (API Calls)           ││
│  │  Stores (State Management)      ││
│  │  Utils (Helpers)                ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
        ↓ HTTP/REST API ↓
┌─────────────────────────────────────┐
│        Backend (Node/Express)       │
│  ┌─────────────────────────────────┐│
│  │  Routes (Endpoints)             ││
│  │  Controllers (Business Logic)   ││
│  │  Middleware (Processing)        ││
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │  Models (Data Schema)           ││
│  │  Database (MongoDB)             ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

## Component Structure

### Frontend Components Hierarchy

```
App
├── Layout
│   ├── Sidebar (Navigation)
│   ├── Navbar (Header)
│   └── Main Content
│       ├── Dashboard (Overview)
│       ├── FormBuilder (Create Forms)
│       ├── FormResponses (View Responses)
│       ├── DocumentManager (Manage Docs)
│       └── SignatureRequests (Handle Signatures)
├── Login
└── SignUp
```

### Data Flow

```
User Action
    ↓
React Component
    ↓
Zustand Store (State)
    ↓
API Service (axios)
    ↓
Backend Route
    ↓
Middleware (Auth)
    ↓
Controller (Logic)
    ↓
MongoDB Model
    ↓
Database
    ↓
Response → Store → Component Update
```

## Backend API Structure

### Route Organization

```
/api/
├── /auth
│   ├── POST /signup
│   ├── POST /login
│   └── GET /me
├── /forms
│   ├── GET / (list all)
│   ├── POST / (create)
│   ├── GET /:id (get one)
│   ├── PUT /:id (update)
│   ├── DELETE /:id
│   ├── PATCH /:id/publish
│   ├── GET /:formId/responses
│   ├── POST /:formId/responses (submit)
│   └── GET /:formId/stats
├── /documents
│   ├── GET /
│   ├── POST /upload
│   ├── GET /:id
│   └── DELETE /:id
└── /signatures
    ├── GET /
    ├── POST /request
    ├── GET /stats
    ├── GET /:id
    └── POST /:id/sign
```

## State Management (Zustand)

### Stores

1. **authStore**
   - user (current user)
   - token (JWT)
   - loading
   - setUser, setToken, logout, checkAuth

2. **sidebarStore**
   - isOpen (sidebar visibility)
   - activeSection (current nav item)
   - toggleSidebar, setActiveSection

### Usage Example

```javascript
import { useAuthStore } from '@/stores/authStore';

const Component = () => {
  const { user, logout } = useAuthStore();
  
  return <span>{user?.name}</span>;
};
```

## Styling System

### CSS Variables (Design Tokens)

```css
--primary: #6366f1
--secondary: #ec4899
--success: #10b981
--warning: #f59e0b
--danger: #ef4444
--dark: #1f2937
--light: #f9fafb
--border: #e5e7eb
--text: #111827
--text-secondary: #6b7280

--spacing-xs: 0.25rem
--spacing-sm: 0.5rem
--spacing-md: 1rem
--spacing-lg: 1.5rem
--spacing-xl: 2rem
--spacing-2xl: 3rem

--radius-sm: 0.375rem
--radius-md: 0.5rem
--radius-lg: 0.75rem

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1)
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1)
```

### Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## Authentication Flow

```
1. User enters email & password
2. Submit to POST /api/auth/login
3. Server validates credentials
4. Server generates JWT token
5. Client stores token in localStorage
6. Add token to Authorization header
7. Protected routes check token validity
8. Token included in all API requests
```

## Error Handling

### Frontend Error Handling

```javascript
try {
  await apiCall();
} catch (error) {
  toast.error(error.response?.data?.message || 'Error');
}
```

### Backend Error Handling

```javascript
// In controllers
if (!resource) {
  return res.status(404).json({ message: 'Not found' });
}

// Global error middleware catches all errors
app.use(errorHandler);
```

## Database Design

### MongoDB Collections

1. **users** - User accounts
2. **forms** - Form definitions
3. **form_responses** - Submitted form responses
4. **documents** - Uploaded documents
5. **signatures** - Signature requests and status

### Relationships

```
User ──1:N──→ Form
Form ──1:N──→ FormResponse
User ──1:N──→ Document
Document ──1:N──→ Signature
User ──Many──→ Signature (as signer)
```

## Performance Optimization

### Frontend Optimization
- Code splitting with React.lazy()
- Image optimization
- CSS minimization
- Bundle analysis

### Backend Optimization
- Database indexing
- Query optimization with Mongoose lean()
- Connection pooling
- Caching strategies

## Security Implementation

### Authentication
- JWT tokens with expiration
- Secure password hashing (bcrypt)
- Token refresh mechanism

### Authorization
- Role-based access control
- Resource ownership checks
- Request validation

### Data Protection
- HTTPS only (production)
- Input validation and sanitization
- CORS configuration
- Rate limiting (recommended)

## Development Workflow

### Setting Up Development Environment

1. Install dependencies
2. Configure environment variables
3. Start MongoDB
4. Run backend server (`npm run dev`)
5. Run frontend server (`npm run dev`)

### Making Changes

1. Create feature branch (`git checkout -b feature/name`)
2. Make your changes
3. Test locally
4. Commit with descriptive message
5. Push to GitHub
6. Create Pull Request

### Code Review Checklist

- [ ] Code follows naming conventions
- [ ] No console.log() in production code
- [ ] Error handling implemented
- [ ] Tests pass (if applicable)
- [ ] Documentation updated
- [ ] No unnecessary dependencies added

## Testing Strategy

### Frontend Testing (Future)
- Unit tests (Jest + React Testing Library)
- Integration tests
- E2E tests (Cypress)

### Backend Testing (Future)
- Unit tests (Jest)
- Integration tests (Supertest)
- API tests

## Deployment Checklist

### Pre-Deployment
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Build tested locally
- [ ] Security review completed
- [ ] Performance tested

### Post-Deployment
- [ ] Monitor error logs
- [ ] Check database integrity
- [ ] Verify API endpoints
- [ ] Test user workflows

## Common Patterns

### API Call with Error Handling

```javascript
const { loading, error, data } = useQuery(() =>
  api.get('/endpoint').then(res => res.data)
);
```

### Protected Route

```javascript
<Route element={<ProtectedLayout />}>
  <Route path="/dashboard" element={<Dashboard />} />
</Route>
```

### Form Validation

```javascript
const [errors, setErrors] = useState({});

const validate = (data) => {
  const newErrors = {};
  if (!data.email) newErrors.email = 'Required';
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

## Resources & References

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose ODM](https://mongoosejs.com)
- [Zustand State Management](https://github.com/pmndrs/zustand)
- [Vite Documentation](https://vitejs.dev)

## Support & Contribution

For questions or contributions, please refer to the main README.md file.
