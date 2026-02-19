# Development Best Practices

## Code Quality

### JavaScript/React Best Practices

✅ **DO:**
- Use functional components with hooks
- Keep components small and focused
- Use descriptive variable names
- Implement proper error handling
- Write comments for complex logic
- Use constants for magic numbers
- Follow DRY (Don't Repeat Yourself)

❌ **DON'T:**
- Use console.log() in production
- Nest ternary operators deeply
- Create God components
- Ignore error boundaries
- Hardcode API URLs
- Use `var` (use `const` and `let`)

```javascript
// ✅ GOOD
const fetchUserData = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
};

// ❌ BAD
const getUser = (id) => {
  return fetch(`http://localhost:5000/users/${id}`).then(r => r.json());
};
```

## Component Structure

### File Organization
```
components/
├── Common/
│   ├── Button.jsx
│   ├── Card.jsx
│   └── Modal.jsx
├── Dashboard/
│   ├── Dashboard.jsx
│   ├── StatCard.jsx
│   └── Dashboard.css
```

### Component Template
```javascript
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Component.css';

function Component({ prop1, prop2 }) {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Initialization logic
  }, []);

  const handleAction = () => {
    // Action logic
  };

  return (
    <div className="component">
      {/* JSX */}
    </div>
  );
}

Component.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

export default Component;
```

## API Development

### Controller Best Practices

```javascript
// ✅ Proper error handling
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({ success: true, user });
  } catch (error) {
    next(error); // Pass to error middleware
  }
};
```

### Route Organization

```javascript
// Group related routes
const router = express.Router();

// Protected routes
router.get('/', authenticate, getAll);
router.post('/', authenticate, create);
router.get('/:id', authenticate, getOne);
router.put('/:id', authenticate, update);
router.delete('/:id', authenticate, delete);

export default router;
```

## Database Best Practices

### Mongoose Schema Design

```javascript
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // Don't return in queries
    },
  },
  { timestamps: true } // Adds createdAt, updatedAt
);

// Add indexes for frequently queried fields
userSchema.index({ email: 1 });
```

### Query Optimization

```javascript
// ✅ GOOD - Lean query (faster, read-only)
const forms = await Form.find({ owner: userId }).lean();

// ❌ BAD - Unnecessary populate
const forms = await Form.find({ owner: userId }).populate('owner');
```

## State Management with Zustand

### Store Best Practices

```javascript
export const useStore = create((set, get) => ({
  // State
  data: null,
  loading: false,

  // Actions
  fetchData: async () => {
    set({ loading: true });
    try {
      const response = await api.get('/data');
      set({ data: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  // Selectors
  getData: () => get().data,
}));
```

### Using Stores in Components

```javascript
// ✅ GOOD - Selective subscription
const data = useStore(state => state.data);
const fetchData = useStore(state => state.fetchData);

// ❌ BAD - Subscribe to entire store
const state = useStore();
```

## Styling Best Practices

### CSS Organization

```css
/* Variables first */
:root {
  --primary: #6366f1;
  --spacing: 1rem;
}

/* Global styles */
* {
  box-sizing: border-box;
}

/* Component styles */
.component {
  padding: var(--spacing);
  color: var(--primary);
}

/* Responsive */
@media (max-width: 768px) {
  .component {
    padding: var(--spacing-sm);
  }
}
```

## Testing Guidelines

### Unit Testing Example

```javascript
// ✅ Test specific functionality
describe('UserForm', () => {
  it('should validate email format', () => {
    const { getByRole } = render(<UserForm />);
    const input = getByRole('textbox', { name: /email/i });
    
    // Test implementation
  });
});
```

## Performance Optimization

### Frontend Performance

```javascript
// Lazy load components
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Memoize expensive components
const Component = memo(({ data }) => {
  return <div>{data}</div>;
});

// Optimize re-renders
useCallback(() => { /* logic */ }, [dependency]);
useMemo(() => expensiveCalculation(), [dependency]);
```

### Backend Performance

```javascript
// Use indexing
db.forms.createIndex({ owner: 1 });

// Limit query results
const forms = await Form.find().limit(10).skip(offset);

// Select specific fields
const forms = await Form.find().select('title status -_v');
```

## Security Best Practices

### Frontend Security

```javascript
// ✅ Sanitize user input
const sanitizedInput = input.replace(/[<>]/g, '');

// ✅ Store tokens securely
localStorage.setItem('token', token); // Consider httpOnly cookies

// ✅ Validate before submission
if (!validateForm(data)) return;
```

### Backend Security

```javascript
// ✅ Validate all inputs
const { error, value } = schema.validate(req.body);
if (error) return res.status(400).json({ error });

// ✅ Hash passwords
const hashed = await bcrypt.hash(password, 10);

// ✅ Check ownership
if (resource.owner.toString() !== req.user.id) {
  return res.status(403).json({ message: 'Unauthorized' });
}
```

## Debugging Tips

### Browser DevTools
- Use React DevTools extension
- Check Network tab for API calls
- Use Elements tab to inspect styles
- Console for errors and logging

### Backend Debugging
```javascript
// Use descriptive logs
console.log('User details:', { id, email, role });

// Use debugger
debugger; // Pause execution with --inspect

// Check MongoDB
db.collection.find().pretty();
```

## Documentation

### Code Comments
```javascript
// ✅ Good comment - explains why
// Using lean() for read-only queries to improve performance
const forms = await Form.find().lean();

// ❌ Bad comment - obvious what code does
// Get all forms
const forms = await Form.find();
```

### Function Documentation
```javascript
/**
 * Fetches user data by ID
 * @param {string} userId - The user's MongoDB ID
 * @returns {Promise<Object>} User object
 * @throws {Error} If user not found
 */
async function getUserById(userId) {
  // implementation
}
```

## Git Workflow

### Commit Messages
```
feat: Add user authentication
fix: Correct form validation logic
docs: Update API documentation
style: Format code with prettier
refactor: Extract form logic into hook
chore: Update dependencies
```

### Branch Naming
```
feature/user-authentication
bugfix/form-validation
docs/api-guide
```

## Common Pitfalls to Avoid

❌ **Don't:**
1. Mix business logic with UI components
2. Make API calls directly in render
3. Store sensitive data in localStorage
4. Use index as key in lists
5. Ignore loading and error states
6. Create circular dependencies
7. Use `any` type in TypeScript
8. Hardcode configuration values

✅ **Do:**
1. Separate concerns
2. Use useEffect for side effects
3. Handle sensitive data securely
4. Use unique identifiers as keys
5. Show loading spinners and error messages
6. Plan architecture carefully
7. Use proper types
8. Use environment variables

---

**Remember: Clean code is maintainable code!**
