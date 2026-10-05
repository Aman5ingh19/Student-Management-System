import React from 'react';
import { Eye, Edit3, Trash2, Mail } from 'lucide-react';

export default function StudentTable({
  students,
  onViewStudent,
  onEditStudent,
  onDeleteStudent,
}) {
  // Helper to get initials from student name
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
    <div className="table-card">
      <div className="table-responsive">
        <table className="student-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Email Address</th>
              <th>Enrolled Course</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>
                  <span className="student-id-badge">#{student.id}</span>
                </td>
                <td>
                  <div className="student-profile">
                    <div className="avatar-circle">
                      {getInitials(student.name)}
                    </div>
                    <span className="student-name-text">{student.name}</span>
                  </div>
                </td>
                <td>
                  <a
                    href={`mailto:${student.email}`}
                    className="student-email-link"
                    title={`Send email to ${student.email}`}
                  >
                    <Mail size={15} />
                    {student.email}
                  </a>
                </td>
                <td>
                  <span className="course-pill">{student.course}</span>
                </td>
                <td>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: '8px',
                    }}
                  >
                    <button
                      className="btn-icon-only view"
                      title="View Student Details"
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
