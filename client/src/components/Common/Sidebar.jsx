import { Link, useNavigate } from 'react-router-dom';
import { useSidebarStore } from '../../stores/sidebarStore';
import { useAuthStore } from '../../stores/authStore';
import {
  FiHome,
  FiFileText,
  FiFileCheck,
  FiPenTool,
  FiLogOut,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import './Sidebar.css';

export default function Sidebar() {
  const { isOpen, toggleSidebar, activeSection, setActiveSection } = useSidebarStore();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: FiHome, label: 'Dashboard', section: 'overview', path: '/dashboard' },
    { icon: FiFileText, label: 'Forms', section: 'forms', path: '/forms' },
    { icon: FiFileCheck, label: 'Responses', section: 'responses', path: '/responses' },
    { icon: FiFileText, label: 'Documents', section: 'documents', path: '/documents' },
    { icon: FiPenTool, label: 'Signatures', section: 'signatures', path: '/signatures' },
  ];

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">⚡</span>
            {isOpen && <span className="logo-text">StructaSign</span>}
          </div>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(({ icon: Icon, label, section, path }) => (
            <Link
              key={section}
              to={path}
              className={`nav-item ${activeSection === section ? 'active' : ''}`}
              onClick={() => setActiveSection(section)}
              title={!isOpen ? label : ''}
            >
              <Icon size={20} />
              {isOpen && <span>{label}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button
            className="btn-logout"
            onClick={handleLogout}
            title="Logout"
          >
            <FiLogOut size={20} />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar} />}
    </>
  );
}
