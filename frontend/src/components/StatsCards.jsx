import React from 'react';
import { Users, BookOpen, Layers } from 'lucide-react';

export default function StatsCards({ students }) {
  const totalCount = students.length;
  const uniqueCourses = new Set(
    students.map((s) => s.course?.trim()).filter(Boolean)
  ).size;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon indigo">
          <Users size={24} />
        </div>
        <div>
          <div className="stat-value">{totalCount}</div>
          <div className="stat-label">Enrolled Students</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon emerald">
          <BookOpen size={24} />
        </div>
        <div>
          <div className="stat-value">{uniqueCourses}</div>
          <div className="stat-label">Active Courses</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon violet">
          <Layers size={24} />
        </div>
        <div>
          <div className="stat-value">ArrayList</div>
          <div className="stat-label">Storage Backend</div>
        </div>
      </div>
    </div>
  );
}
