import React from 'react';
import { GraduationCap, Database, Activity } from 'lucide-react';

export default function Navbar({ isBackendOnline }) {
  return (
    <header className="app-header">
      <div className="container header-content">
        <div className="brand-wrapper">
          <div className="brand-icon-box">
            <GraduationCap size={24} />
          </div>
          <div>
            <h1 className="brand-title">Student Management System</h1>
            <p className="brand-subtitle">Spring Boot REST API + React Frontend</p>
          </div>
        </div>

        <div className="header-badges">
          <span className="badge-tag badge-memory" title="Data stored temporarily in Java ArrayList">
            <Database size={13} />
            In-Memory (ArrayList)
          </span>

          <span
            className={`badge-tag ${
              isBackendOnline ? 'badge-backend-online' : 'badge-backend-offline'
            }`}
            title={isBackendOnline ? 'Connected to http://localhost:8080' : 'Backend is unreachable'}
          >
            <span className="status-dot"></span>
            {isBackendOnline ? 'Backend Online' : 'Backend Offline'}
          </span>
        </div>
      </div>
    </header>
  );
}
