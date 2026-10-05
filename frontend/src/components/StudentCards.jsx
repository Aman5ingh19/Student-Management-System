import React from 'react';
import { Eye, Edit3, Trash2, Mail, BookOpen } from 'lucide-react';

export default function StudentCards({
  students,
  onViewStudent,
  onEditStudent,
  onDeleteStudent,
}) {
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="cards-grid">
      {students.map((student) => (
        <div key={student.id} className="student-grid-card">
          <div>
            <div className="card-top">
              <div className="student-profile">
                <div className="avatar-circle">
                  {getInitials(student.name)}
                </div>
                <div>
                  <h3 className="student-name-text">{student.name}</h3>
                  <span className="student-id-badge">ID #{student.id}</span>
                </div>
              </div>
            </div>

            <div className="card-details">
              <a
                href={`mailto:${student.email}`}
                className="student-email-link"
                title="Send email"
              >
                <Mail size={15} />
                <span>{student.email}</span>
              </a>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <BookOpen size={15} style={{ color: 'var(--text-muted)' }} />
                <span className="course-pill">{student.course}</span>
              </div>
            </div>
          </div>

          <div className="card-actions">
            <button
              className="btn-icon-only view"
              title="View Details"
              onClick={() => onViewStudent(student)}
            >
              <Eye size={16} />
            </button>
            <button
              className="btn-icon-only edit"
              title="Edit Student"
              onClick={() => onEditStudent(student)}
            >
              <Edit3 size={16} />
            </button>
            <button
              className="btn-icon-only delete"
              title="Delete Student"
              onClick={() => onDeleteStudent(student)}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
