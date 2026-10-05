import React from 'react';
import { Search, X, UserPlus, LayoutGrid, List } from 'lucide-react';

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  onOpenAddModal,
  viewMode,
  setViewMode,
}) {
  return (
    <div className="controls-bar">
      <div className="search-box-wrapper">
        <Search className="search-icon-left" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Search students by name (e.g. Alice, Smith)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            className="search-clear-btn"
            onClick={() => setSearchTerm('')}
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="actions-group">
        <div className="view-toggle">
          <button
            className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
            title="Table View"
          >
            <List size={18} />
          </button>
          <button
            className={`toggle-btn ${viewMode === 'cards' ? 'active' : ''}`}
            onClick={() => setViewMode('cards')}
            title="Cards View"
          >
            <LayoutGrid size={18} />
          </button>
        </div>

        <button className="btn btn-primary" onClick={onOpenAddModal}>
          <UserPlus size={18} />
          <span>Add Student</span>
        </button>
      </div>
    </div>
  );
}
