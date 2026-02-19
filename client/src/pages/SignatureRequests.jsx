import { FiPlus } from 'react-icons/fi';

export default function SignatureRequests() {
  return (
    <div className="signature-requests">
      <div className="section-header">
        <div>
          <h1>Signature Requests</h1>
          <p>Manage document signatures</p>
        </div>
        <button className="btn btn-primary btn-lg">
          <FiPlus size={20} /> Send for Signature
        </button>
      </div>
      <div className="placeholder">
        <p>Signature requests coming soon...</p>
      </div>
    </div>
  );
}
