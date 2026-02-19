# StructaSign - Complete File Structure

```
StructaSign/
├── 📁 client/                          # React Frontend (Vite)
│   ├── 📁 public/                      # Static assets
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── 📁 Common/
│   │   │   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   │   │   ├── Sidebar.css
│   │   │   │   ├── Navbar.jsx          # Header navbar
│   │   │   │   └── Navbar.css
│   │   │   ├── 📁 Dashboard/           # Dashboard components (expandable)
│   │   │   ├── 📁 FormBuilder/         # Form builder components
│   │   │   ├── 📁 DocumentManager/     # Document management
│   │   │   └── 📁 SignatureRequests/   # Signature handling
│   │   │
│   │   ├── 📁 pages/
│   │   │   ├── Dashboard.jsx           # Dashboard page
│   │   │   ├── Dashboard.css
│   │   │   ├── FormBuilder.jsx         # Forms page
│   │   │   ├── FormBuilder.css
│   │   │   ├── FormResponses.jsx       # Responses page
│   │   │   ├── DocumentManager.jsx     # Documents page
│   │   │   ├── SignatureRequests.jsx   # Signatures page
│   │   │   ├── Login.jsx               # Login page
│   │   │   ├── SignUp.jsx              # Registration page
│   │   │   └── Auth.css                # Auth pages styling
│   │   │
│   │   ├── 📁 layouts/
│   │   │   ├── Layout.jsx              # Main layout wrapper
│   │   │   └── Layout.css
│   │   │
│   │   ├── 📁 hooks/                   # Custom React hooks (expandable)
│   │   │   └── useForm.js              # Form handling hook (example)
│   │   │
│   │   ├── 📁 context/                 # React Context (if needed)
│   │   │
│   │   ├── 📁 services/
│   │   │   └── api.js                  # Axios API client & endpoints
│   │   │
│   │   ├── 📁 stores/
│   │   │   ├── authStore.js            # Authentication state (Zustand)
│   │   │   └── sidebarStore.js         # UI state (Zustand)
│   │   │
│   │   ├── 📁 utils/                   # Utility functions (expandable)
│   │   │   ├── validators.js           # Form validation helpers
│   │   │   └── formatters.js           # Data formatting helpers
│   │   │
│   │   ├── 📁 styles/
│   │   │   ├── globals.css             # Global styles & design tokens
│   │   │   └── themes.css              # Theme variants
│   │   │
│   │   ├── 📁 assets/
│   │   │   ├── 📁 images/              # Image assets
│   │   │   ├── 📁 icons/               # Icon assets
│   │   │   └── 📁 fonts/               # Custom fonts
│   │   │
│   │   ├── App.jsx                     # Main app component
│   │   ├── App.css
│   │   ├── main.jsx                    # Entry point
│   │   └── index.css                   # Entry styles
│   │
│   ├── index.html                      # HTML template
│   ├── package.json                    # Frontend dependencies
│   ├── vite.config.js                  # Vite configuration
│   ├── .env.example                    # Environment template
│   └── .env                            # Environment variables (git ignored)
│
├── 📁 server/                          # Express Backend
│   ├── 📁 src/
│   │   ├── 📁 models/                  # MongoDB Schemas
│   │   │   ├── User.js                 # User schema
│   │   │   ├── Form.js                 # Form schema
│   │   │   ├── FormResponse.js         # Form response schema
│   │   │   ├── Document.js             # Document schema
│   │   │   └── Signature.js            # Signature request schema
│   │   │
│   │   ├── 📁 controllers/             # Request handlers
│   │   │   ├── authController.js       # Auth logic
│   │   │   ├── formController.js       # Form operations
│   │   │   ├── documentController.js   # Document operations
│   │   │   └── signatureController.js  # Signature operations
│   │   │
│   │   ├── 📁 routes/                  # API routes
│   │   │   ├── authRoutes.js           # /api/auth routes
│   │   │   ├── formRoutes.js           # /api/forms routes
│   │   │   ├── documentRoutes.js       # /api/documents routes
│   │   │   └── signatureRoutes.js      # /api/signatures routes
│   │   │
│   │   ├── 📁 middleware/              # Express middleware
│   │   │   ├── auth.js                 # JWT authentication
│   │   │   └── errorHandler.js         # Error handling
│   │   │
│   │   ├── 📁 config/
│   │   │   └── index.js                # Configuration management
│   │   │
│   │   ├── 📁 utils/                   # Utility functions (expandable)
│   │   │   ├── tokenGenerator.js       # JWT token generation
│   │   │   └── validators.js           # Input validation
│   │   │
│   │   └── server.js                   # Main server file
│   │
│   ├── 📁 uploads/                     # Uploaded files (git ignored)
│   ├── package.json                    # Backend dependencies
│   ├── .env.example                    # Environment template
│   ├── .env                            # Environment variables (git ignored)
│   └── README.md                       # Server documentation
│
├── 📁 docs/                            # Project documentation
│   ├── QUICK_START.md                  # Quick setup guide
│   ├── ARCHITECTURE.md                 # Architecture & design patterns
│   ├── BEST_PRACTICES.md               # Development guidelines
│   └── API_DOCUMENTATION.md            # API docs (expandable)
│
├── README.md                           # Project overview
├── .gitignore                          # Git ignore rules
└── package.json (optional)             # Root/workspace config

```

## Directory Descriptions

### Frontend (`client/`)

**Purpose:** React application UI and user interactions

**Key Directories:**
- `components/` - Reusable UI components (Sidebar, Navbar, Dashboard cards, etc.)
- `pages/` - Full page components that represent routes
- `services/` - API layer (Axios client)
- `stores/` - Global state management (Zustand)
- `styles/` - CSS files and design tokens
- `layouts/` - Page structure templates

### Backend (`server/`)

**Purpose:** API server and business logic

**Key Directories:**
- `models/` - MongoDB schemas (data structure definitions)
- `controllers/` - Business logic for API endpoints
- `routes/` - Route definitions that call controllers
- `middleware/` - Authentication, error handling
- `config/` - Configuration and environment variables

### Documentation (`docs/`)

**Purpose:** Project documentation and guides

**Files:**
- `QUICK_START.md` - Getting started in 5 minutes
- `ARCHITECTURE.md` - System design and patterns
- `BEST_PRACTICES.md` - Code quality guidelines

## File Naming Conventions

### React Components
- **PascalCase**: `Dashboard.jsx`, `FormBuilder.jsx`
- **One component per file** (unless very small)
- **CSS alongside**: `Dashboard.jsx` + `Dashboard.css`

### Backend Files
- **camelCase**: `authController.js`, `formRoutes.js`
- **Descriptive names**: `formController.js` (not `handler.js`)

### Utilities & Hooks
- **camelCase**: `useForm.js`, `validators.js`
- **Prefix with use**: `useAuth.js`, `useFetch.js`

## Expected File Sizes

| File | Size | Type |
|------|------|------|
| Dashboard.jsx | 2-3 KB | Component |
| Sidebar.jsx | 2-3 KB | Component |
| authController.js | 3-4 KB | Controller |
| formController.js | 4-5 KB | Controller |
| globals.css | 2-3 KB | Styles |
| api.js | 2-3 KB | Service |

## Growth Strategy

### Expanding Components
When components grow too large, split into sub-components:

```
components/
├── Dashboard/
│   ├── Dashboard.jsx
│   ├── Dashboard.css
│   ├── StatCard.jsx
│   ├── ActionCard.jsx
│   └── RecentItems.jsx
```

### Expanding Models
Add new models as features are added:

```
models/
├── User.js
├── Form.js
├── FormResponse.js
├── Document.js
├── Signature.js
└── Team.js (new)
```

### Expanding Controllers
Add new controllers for new features:

```
controllers/
├── authController.js
├── formController.js
├── documentController.js
├── signatureController.js
└── analyticsController.js (new)
```

## Version Control

### Important: Never commit these
```
node_modules/
.env
.env.local
dist/
build/
uploads/
.DS_Store
```

These are already in `.gitignore`

---

**Total Project Files Created: 50+**

**Total Lines of Code: 2000+**

**Ready for Development!** 🚀
