// src/components/Sidebar.jsx
import { FaUserShield, FaUsers, FaClipboardList, FaChartPie, FaSignOutAlt } from "react-icons/fa";
import './Sidebar.css';

const Sidebar = ({ activeSection, onNavigate, onLogout }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <FaUserShield className="icon" />
        <div className="admin-info">
          <h3>Admin Dashboard</h3>
          <p>Welcome, Admin!</p>
        </div>
      </div>
      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li className={`nav-item ${activeSection === 'employees' ? 'active' : ''}`} onClick={() => onNavigate('employees')}>
            <FaUsers className="nav-icon" />
            <span>Employees</span>
          </li>
          <li className={`nav-item ${activeSection === 'tasks' ? 'active' : ''}`} onClick={() => onNavigate('tasks')}>
            <FaClipboardList className="nav-icon" />
            <span>Tasks</span>
          </li>
          <li className={`nav-item ${activeSection === 'attendance' ? 'active' : ''}`} onClick={() => onNavigate('attendance')}>
            <FaChartPie className="nav-icon" />
            <span>Attendance</span>
          </li>
          <li className={`nav-item ${activeSection === 'leave' ? 'active' : ''}`} onClick={() => onNavigate('leave')}>
            <FaChartPie className="nav-icon" />
            <span>Leave Requests</span>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <button className="btn-logout" onClick={onLogout}>
          <FaSignOutAlt className="nav-icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;