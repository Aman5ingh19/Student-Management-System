import React, { useState, useEffect } from 'react';
import { X, UserPlus, Edit3, Loader2 } from 'lucide-react';

export default function StudentModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const isEditing = Boolean(initialData && initialData.id);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        course: initialData.course || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        course: '',
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email format';
    }
    if (!formData.course.trim()) {
      errs.course = 'Enrolled course is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      await onSubmit({
        name: formData.name.trim(),
        email: formData.email.trim(),
        course: formData.course.trim(),
      });
      onClose();
    } catch (err) {
      setErrors((prev) => ({ ...prev, api: err.message }));
    } finally {
      setSubmitting(false);
    }
  };

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
            {isEditing ? (
              <>
                <Edit3 size={20} style={{ color: '#818cf8' }} />
                <span>Edit Student (ID: #{initialData.id})</span>
              </>
            ) : (
              <>
                <UserPlus size={20} style={{ color: '#818cf8' }} />
                <span>Add New Student</span>
              </>
            )}
          </h2>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {errors.api && (
              <div
                style={{
                  marginBottom: '1rem',
                  padding: '10px 14px',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: 'var(--radius-sm)',
                  color: '#f87171',
                  fontSize: '0.85rem',
                }}
              >
                {errors.api}
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="student-name">
                Full Name *
              </label>
              <input
                id="student-name"
                type="text"
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="e.g. Alex Johnson"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                autoFocus
              />
              {errors.name && <div className="error-text">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="student-email">
                Email Address *
              </label>
              <input
                id="student-email"
                type="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="e.g. alex.johnson@university.edu"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              {errors.email && <div className="error-text">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="student-course">
                Enrolled Course *
              </label>
              <input
                id="student-course"
                type="text"
                className={`form-input ${errors.course ? 'error' : ''}`}
                placeholder="e.g. Computer Science, AI, Web Development"
                value={formData.course}
                onChange={(e) =>
                  setFormData({ ...formData, course: e.target.value })
                }
              />
              {errors.course && (
                <div className="error-text">{errors.course}</div>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="spin" />
                  <span>Saving...</span>
                </>
              ) : isEditing ? (
                <span>Update Student</span>
              ) : (
                <span>Add Student</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
