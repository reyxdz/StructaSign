import { useState, useEffect } from 'react';
import {
  FiPlus,
  FiBarChart3,
  FiFileText,
  FiCheckCircle,
  FiClipboard,
  FiArrowRight,
  FiEdit2,
  FiTrash2,
} from 'react-icons/fi';
import { formsAPI, documentsAPI, signaturesAPI } from '../../services/api';
import './Dashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState({
    activeForms: 0,
    draftForms: 0,
    totalResponses: 0,
    pendingSignatures: 0,
  });

  const [recentForms, setRecentForms] = useState([]);
  const [recentDocs, setRecentDocs] = useState([]);
  const [recentSignatures, setRecentSignatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [formsRes, docsRes, sigsRes] = await Promise.all([
        formsAPI.getAll(),
        documentsAPI.getAll(),
        signaturesAPI.getAll(),
      ]);

      // Calculate stats
      const forms = formsRes.data.forms || [];
      const docs = docsRes.data.documents || [];
      const sigs = sigsRes.data.signatures || [];

      setStats({
        activeForms: forms.filter((f) => f.status === 'published').length,
        draftForms: forms.filter((f) => f.status === 'draft').length,
        totalResponses: forms.reduce((sum, f) => sum + (f.responseCount || 0), 0),
        pendingSignatures: sigs.filter((s) => s.status === 'pending').length,
      });

      setRecentForms(forms.slice(0, 3));
      setRecentDocs(docs.slice(0, 3));
      setRecentSignatures(sigs.slice(0, 3));
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      {/* Welcome Section */}
      <section className="section-welcome">
        <div>
          <h1 className="welcome-title">Welcome back! 👋</h1>
          <p className="welcome-subtitle">
            Manage your forms, documents, and signatures all in one place
          </p>
        </div>
        <button className="btn btn-primary btn-lg">
          <FiPlus size={20} /> Create New
        </button>
      </section>

      {/* Stats Grid */}
      <section className="section-stats">
        <StatCard
          icon={FiFileText}
          title="Active Forms"
          value={stats.activeForms}
          color="primary"
        />
        <StatCard
          icon={FiClipboard}
          title="Draft Forms"
          value={stats.draftForms}
          color="secondary"
        />
        <StatCard
          icon={FiBarChart3}
          title="Total Responses"
          value={stats.totalResponses}
          color="success"
        />
        <StatCard
          icon={FiCheckCircle}
          title="Pending Signatures"
          value={stats.pendingSignatures}
          color="warning"
        />
      </section>

      {/* Quick Actions */}
      <section className="section-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <ActionCard
            icon={FiFileText}
            title="Create Form"
            description="Build a new form with our builder"
          />
          <ActionCard
            icon={FiClipboard}
            title="Upload Document"
            description="Upload documents for signatures"
          />
          <ActionCard
            icon={FiCheckCircle}
            title="Request Signature"
            description="Send documents for signing"
          />
          <ActionCard
            icon={FiBarChart3}
            title="View Analytics"
            description="See form responses and insights"
          />
        </div>
      </section>

      {/* Recent Items */}
      <div className="section-recent">
        {/* Recent Forms */}
        <section className="recent-card">
          <div className="section-header">
            <h3>Recent Forms</h3>
            <a href="/forms" className="link-view-all">
              View All <FiArrowRight size={16} />
            </a>
          </div>
          {recentForms.length > 0 ? (
            <div className="items-list">
              {recentForms.map((form) => (
                <div key={form._id} className="item-row">
                  <div className="item-info">
                    <p className="item-title">{form.title}</p>
                    <p className="item-meta">
                      {form.responseCount || 0} responses
                    </p>
                  </div>
                  <div className="item-badge">{form.status}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-state">No forms yet. Create your first form!</p>
          )}
        </section>

        {/* Recent Documents */}
        <section className="recent-card">
          <div className="section-header">
            <h3>Recent Documents</h3>
            <a href="/documents" className="link-view-all">
              View All <FiArrowRight size={16} />
            </a>
          </div>
          {recentDocs.length > 0 ? (
            <div className="items-list">
              {recentDocs.map((doc) => (
                <div key={doc._id} className="item-row">
                  <div className="item-info">
                    <p className="item-title">{doc.name}</p>
                    <p className="item-meta">
                      Uploaded {new Date(doc.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="item-actions">
                    <button className="btn-action">
                      <FiEdit2 size={16} />
                    </button>
                    <button className="btn-action btn-danger">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-state">No documents yet. Upload your first document!</p>
          )}
        </section>

        {/* Recent Signatures */}
        <section className="recent-card">
          <div className="section-header">
            <h3>Recent Signatures</h3>
            <a href="/signatures" className="link-view-all">
              View All <FiArrowRight size={16} />
            </a>
          </div>
          {recentSignatures.length > 0 ? (
            <div className="items-list">
              {recentSignatures.map((sig) => (
                <div key={sig._id} className="item-row">
                  <div className="item-info">
                    <p className="item-title">{sig.documentName}</p>
                    <p className="item-meta">
                      Status: {sig.status === 'signed' ? '✓ Signed' : '⏳ Pending'}
                    </p>
                  </div>
                  <div className="item-badge">{sig.status}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-state">No signature requests. Send your first request!</p>
          )}
        </section>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, color }) {
  return (
    <div className={`stat-card stat-${color}`}>
      <div className="stat-icon">
        <Icon size={28} />
      </div>
      <div className="stat-content">
        <p className="stat-label">{title}</p>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
}

function ActionCard({ icon: Icon, title, description }) {
  return (
    <div className="action-card">
      <div className="action-icon">
        <Icon size={32} />
      </div>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
}
