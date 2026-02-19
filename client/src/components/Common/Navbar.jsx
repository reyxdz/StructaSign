import { useAuthStore } from '../../stores/authStore';
import { FiBell, FiSearch, FiSettings, FiChevronDown } from 'react-icons/fi';
import './Navbar.css';

export default function Navbar() {
  const { user } = useAuthStore();

  return (
    <navbar className="navbar">
      <div className="navbar-search">
        <FiSearch size={18} />
        <input type="text" placeholder="Search forms, documents..." />
      </div>

      <div className="navbar-actions">
        <button className="btn-icon" title="Notifications">
          <FiBell size={20} />
          <span className="badge">3</span>
        </button>

        <button className="btn-icon" title="Settings">
          <FiSettings size={20} />
        </button>

        <div className="navbar-user">
          <div className="user-avatar">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <p className="user-name">{user?.name || 'User'}</p>
            <p className="user-email">{user?.email || ''}</p>
          </div>
          <FiChevronDown size={18} />
        </div>
      </div>
    </navbar>
  );
}
