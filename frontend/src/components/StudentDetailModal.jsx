import React from 'react';
import { X, User, Mail, BookOpen, Hash, Edit3, Trash2 } from 'lucide-react';

export default function StudentDetailModal({
  isOpen,
  onClose,
  student,
  onEdit,
  onDelete,
}) {
  if (!isOpen || !student) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header">
          <h2 className="modal-title">
            <User size={20} style={{ color: '#818cf8' }} />
            <span>Student Profile</span>
          </h2>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="detail-item">
            <span className="detail-label">
              <Hash size={14} style={{ display: 'inline', marginRight: 4 }} />
              Student ID
            </span>
            <span className="detail-val">#{student.id}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">
              <User size={14} style={{ display: 'inline', marginRight: 4 }} />
              Full Name
            </span>
            <span className="detail-val" style={{ fontSize: '1.1rem', fontWeight: 600 }}>
              {student.name}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">
              <Mail size={14} style={{ display: 'inline', marginRight: 4 }} />
              Email Address
            </span>
            <span className="detail-val">
              <a
                href={`mailto:${student.email}`}
                className="student-email-link"
                style={{ fontSize: '0.95rem' }}
              >
                {student.email}
              </a>
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">
              <BookOpen size={14} style={{ display: 'inline', marginRight: 4 }} />
              Enrolled Course
            </span>
            <div style={{ marginTop: '4px' }}>
              <span className="course-pill">{student.course}</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={() => {
              onClose();
              onEdit(student);
            }}
          >
            <Edit3 size={16} />
            <span>Edit Profile</span>
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              onClose();
              onDelete(student);
            }}
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
