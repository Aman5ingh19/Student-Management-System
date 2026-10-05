import React, { useState } from 'react';
import { AlertTriangle, X, Loader2 } from 'lucide-react';

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  student,
}) {
  const [deleting, setDeleting] = useState(false);

  if (!isOpen || !student) return null;

  const handleConfirm = async () => {
    try {
      setDeleting(true);
      await onConfirm(student.id);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
      >
        <div className="modal-header">
          <h2 className="modal-title" style={{ color: '#f87171' }}>
            <AlertTriangle size={20} />
            <span>Confirm Deletion</span>
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
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
            Are you sure you want to delete{' '}
            <strong style={{ color: 'var(--text-primary)' }}>{student.name}</strong> (ID #{student.id})?
          </p>
          <p
            style={{
              marginTop: '10px',
              fontSize: '0.8rem',
              color: '#f87171',
              background: 'rgba(239, 68, 68, 0.1)',
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            This action removes the record from the in-memory ArrayList.
          </p>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={deleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleConfirm}
            disabled={deleting}
          >
            {deleting ? (
              <>
                <Loader2 size={16} className="spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Yes, Delete Student</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
