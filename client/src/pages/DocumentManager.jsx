import { FiPlus } from 'react-icons/fi';

export default function DocumentManager() {
  return (
    <div className="document-manager">
      <div className="section-header">
        <div>
          <h1>Document Manager</h1>
          <p>Upload and manage your documents</p>
        </div>
        <button className="btn btn-primary btn-lg">
          <FiPlus size={20} /> Upload Document
        </button>
      </div>
      <div className="placeholder">
        <p>Document manager coming soon...</p>
      </div>
    </div>
  );
}
