import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import SearchBar from './components/SearchBar';
import StudentTable from './components/StudentTable';
import StudentCards from './components/StudentCards';
import StudentModal from './components/StudentModal';
import StudentDetailModal from './components/StudentDetailModal';
import ConfirmModal from './components/ConfirmModal';
import Toast from './components/Toast';
import {
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from './services/api';
import { Info, Users, UserPlus, RefreshCw, AlertCircle } from 'lucide-react';

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [isBackendOnline, setIsBackendOnline] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [viewingStudent, setViewingStudent] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingStudent, setDeletingStudent] = useState(null);

  // Helper for adding notifications
  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Fetch students from Spring Boot backend
  const loadStudents = useCallback(async (searchQuery = '') => {
    try {
      setLoading(true);
      const data = await fetchStudents(searchQuery);
      setStudents(data);
      setIsBackendOnline(true);
    } catch (err) {
      console.error('Error fetching students:', err);
      setIsBackendOnline(false);
      addToast(
        'Cannot connect to Spring Boot backend at http://localhost:8080. Please ensure the backend is running.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadStudents(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, loadStudents]);

  // Handle Add / Edit Submission
  const handleSaveStudent = async (formData) => {
    if (editingStudent) {
      // PUT request
      const updated = await updateStudent(editingStudent.id, formData);
      setStudents((prev) =>
        prev.map((s) => (s.id === updated.id ? updated : s))
      );
      addToast(`Student "${updated.name}" updated successfully!`, 'success');
    } else {
      // POST request
      const created = await createStudent(formData);
      setStudents((prev) => [...prev, created]);
      addToast(`Student "${created.name}" added successfully!`, 'success');
    }
  };

  // Handle Delete Confirmation
  const handleDeleteConfirm = async (id) => {
    try {
      const res = await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      addToast(res.message || 'Student deleted successfully!', 'success');
    } catch (err) {
      addToast(err.message || 'Failed to delete student', 'error');
      throw err;
    }
  };

  // Handlers for Opening Modals
  const handleOpenAdd = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleOpenView = (student) => {
    setViewingStudent(student);
    setIsDetailOpen(true);
  };

  const handleOpenDelete = (student) => {
    setDeletingStudent(student);
    setIsDeleteOpen(true);
  };

  return (
    <div>
      <Navbar isBackendOnline={isBackendOnline} />

      <main className="container" style={{ paddingBottom: '3rem' }}>
        {/* Notice Banner explaining In-Memory storage */}
        <div className="info-banner">
          <Info size={20} className="info-banner-icon" />
          <div>
            <strong>In-Memory Architecture:</strong> Student data is stored in
            a Java <code style={{ color: '#a5b4fc', fontFamily: 'var(--font-mono)' }}>ArrayList</code> inside
            Spring Boot without an external database. If the backend is restarted,
            the list resets to default sample students.
          </div>
        </div>

        {/* Backend offline warning banner */}
        {!isBackendOnline && !loading && (
          <div
            style={{
              marginTop: '1rem',
              padding: '14px 18px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              color: '#fca5a5',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertCircle size={20} style={{ color: '#ef4444' }} />
              <div>
                <strong>Spring Boot backend is not responding at http://localhost:8080.</strong>
                <p style={{ fontSize: '0.825rem', marginTop: '2px', color: '#f87171' }}>
                  Please start the backend server using <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: 4 }}>run-backend.bat</code> or <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: 4 }}>mvn spring-boot:run</code>.
                </p>
              </div>
            </div>
            <button
              className="btn btn-secondary"
              style={{ height: '36px', fontSize: '0.8rem' }}
              onClick={() => loadStudents(searchTerm)}
            >
              <RefreshCw size={14} />
              Retry Connection
            </button>
          </div>
        )}

        {/* Metric summary cards */}
        <StatsCards students={students} />

        {/* Search & Actions Bar */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onOpenAddModal={handleOpenAdd}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* Main Content Area */}
        {loading ? (
          <div className="table-card empty-state">
            <RefreshCw size={36} className="spin" style={{ color: '#818cf8', marginBottom: '1rem' }} />
            <h3 className="empty-title">Loading Students...</h3>
            <p className="empty-desc">Communicating with Spring Boot REST API</p>
          </div>
        ) : students.length === 0 ? (
          <div className="table-card empty-state">
            <div className="empty-icon-box">
              <Users size={32} />
            </div>
            <h3 className="empty-title">
              {searchTerm ? 'No matching students found' : 'No students enrolled yet'}
            </h3>
            <p className="empty-desc">
              {searchTerm
                ? `No students found matching "${searchTerm}". Try another search term or clear the filter.`
                : 'The ArrayList is currently empty. Click the button below to add your first student record!'}
            </p>
            {searchTerm ? (
              <button
                className="btn btn-secondary"
                onClick={() => setSearchTerm('')}
              >
                Clear Search Filter
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleOpenAdd}>
                <UserPlus size={16} />
                Add First Student
              </button>
            )}
          </div>
        ) : viewMode === 'table' ? (
          <StudentTable
            students={students}
            onViewStudent={handleOpenView}
            onEditStudent={handleOpenEdit}
            onDeleteStudent={handleOpenDelete}
          />
        ) : (
          <StudentCards
            students={students}
            onViewStudent={handleOpenView}
            onEditStudent={handleOpenEdit}
            onDeleteStudent={handleOpenDelete}
          />
        )}
      </main>

      {/* Modals */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveStudent}
        initialData={editingStudent}
      />

      <StudentDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        student={viewingStudent}
        onEdit={(student) => {
          setIsDetailOpen(false);
          handleOpenEdit(student);
        }}
        onDelete={(student) => {
          setIsDetailOpen(false);
          handleOpenDelete(student);
        }}
      />

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        student={deletingStudent}
      />

      {/* Toast System */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Student Management System &bull; Java Spring Boot & React &bull; Built with Controller &rarr; Service &rarr; ArrayList architecture
        </p>
      </footer>
    </div>
  );
}
