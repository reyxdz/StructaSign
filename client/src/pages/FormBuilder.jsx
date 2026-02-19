import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import './FormBuilder.css';

export default function FormBuilder() {
  return (
    <div className="form-builder">
      <div className="section-header">
        <div>
          <h1>Form Builder</h1>
          <p>Create and manage your forms</p>
        </div>
        <button className="btn btn-primary btn-lg">
          <FiPlus size={20} /> New Form
        </button>
      </div>

      <div className="placeholder">
        <p>Form builder functionality coming soon...</p>
      </div>
    </div>
  );
}
