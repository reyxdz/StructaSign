import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Common/Sidebar';
import Navbar from '../components/Common/Navbar';
import './Layout.css';

export default function Layout() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-content">
        <Navbar />
        <main className="layout-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
