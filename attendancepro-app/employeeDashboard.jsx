/* eslint-disable no-unused-vars */
import Chart from "chart.js/auto";
import { useEffect, useRef, useState } from "react";
import api from "./src/api/axios";
import "./employeeDashboard.css";
// Icon Imports (Add these to your project, e.g., using 'npm install react-icons')
// import { FaUserShield, FaUsers, FaClipboardList, FaChartPie, FaSignOutAlt, FaUser, FaCalendarCheck, FaTasks, FaRegCalendarTimes } from "react-icons/fa";

function EmployeeDashboard() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [newLeave, setNewLeave] = useState({ fromDate: "", toDate: "", reason: "" });
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "" });
  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendanceStatus, setAttendanceStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("profile");
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  const chartRef = useRef(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      Promise.all([
        fetchTasks(storedUser.eid),
        fetchLeaves(storedUser.eid),
      ]).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchAttendance();
    }
  }, [selectedMonth, user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/signin";
  };

  // --- Fetch Functions ---
  const fetchTasks = (eid) => {
    api.get(`/employee/${eid}/tasks`)
      .then(res => {
        setTasks(res.data);
        drawTaskChart(res.data);
      }).catch(console.error);
  };

  const fetchLeaves = (eid) => {
    api.get(`/employee/${eid}/leaves`)
      .then(res => setLeaveRequests(res.data))
      .catch(console.error);
  };

  const fetchAttendance = async () => {
    if (!user) return;
    try {
      const res = await api.get(`/employee/${user.eid}/attendance`, {
        params: { month: selectedMonth }
      });
      setAttendance(res.data);
      const todaysRecord = res.data.find(a => a.date === selectedDate);
      setAttendanceStatus(todaysRecord ? todaysRecord.status : null);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  // --- Apply Leave ---
  const applyLeave = async () => {
    if (!newLeave.fromDate || !newLeave.toDate || !newLeave.reason) {
      return alert("All fields are required.");
    }
    try {
      const res = await api.post(`/employee/${user.eid}/leave`, newLeave);
      if (res.status === 200 || res.status === 201) {
        alert("Leave request submitted successfully.");
        setNewLeave({ fromDate: "", toDate: "", reason: "" });
        fetchLeaves(user.eid);
      } else alert("Failed to submit leave request.");
    } catch (err) { console.error(err); alert("Error submitting leave request."); }
  };

  // --- Update Task Status ---
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const res = await api.put(`/employee/${user.eid}/tasks/${taskId}`, { status: newStatus });
      if (res.status === 200) {
        alert("Task status updated.");
        fetchTasks(user.eid);
      } else {
        alert("Failed to update task status.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating task status.");
    }
  };

  // --- Mark Attendance ---
  const markAttendance = async (status) => {
    const today = new Date().toISOString().split('T')[0];
    if (selectedDate !== today) {
        return alert("You can only mark attendance for the current day.");
    }

    const onLeave = leaveRequests.some(
      (l) =>
        selectedDate >= l.fromDate &&
        selectedDate <= l.toDate &&
        l.status === "APPROVED"
    );
    if (onLeave) return alert("Cannot mark attendance on approved leave day.");

    try {
      const res = await api.post(`/employee/${user.eid}/attendance`, {
        date: selectedDate,
        status,
      });
      if (res.status === 200 || res.status === 201) {
        alert("Attendance marked successfully.");
        setAttendanceStatus(status);
        fetchAttendance();
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 409) {
        alert(err.response.data);
      } else {
        alert("Failed to mark attendance.");
      }
    }
  };

  // --- Draw Task Chart ---
  const drawTaskChart = (taskData) => {
    let pending = 0, inProgress = 0, completed = 0;
    taskData.forEach(t => {
      if (t.status === "PENDING") pending++;
      if (t.status === "IN_PROGRESS") inProgress++;
      if (t.status === "COMPLETED") completed++;
    });
    const ctx = chartRef.current.getContext("2d");
    if (chartRef.current.chart) chartRef.current.chart.destroy();
    chartRef.current.chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Pending", "In Progress", "Completed"],
        datasets: [{ data: [pending, inProgress, completed], backgroundColor: ["#facc15", "#0ea5e9", "#16a34a"] }]
      },
      options: { responsive: true, plugins: { legend: { position: "bottom" } } }
    });
  };

  if (loading) return <div className="loading">Loading...</div>;

  const leaveSummary = {
    approved: leaveRequests.filter(l => l.status === "APPROVED").length,
    pending: leaveRequests.filter(l => l.status === "PENDING").length,
    rejected: leaveRequests.filter(l => l.status === "REJECTED").length
  };

  const taskSummary = {
    pending: tasks.filter(t => t.status === "PENDING").length,
    inProgress: tasks.filter(t => t.status === "IN_PROGRESS").length,
    completed: tasks.filter(t => t.status === "COMPLETED").length
  };

  return (
    <div className="employee-dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          {/* <FaUserShield className="icon" /> */}
          <span role="img" aria-label="shield-icon" className="icon">🛡️</span>
          <div className="user-info">
            <h3>Employee Dashboard</h3>
            <p>Welcome, {user.ename}!</p>
          </div>
        </div>
        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li className={`nav-item ${activeSection === 'profile' ? 'active' : ''}`} onClick={() => setActiveSection('profile')}>
              {/* <FaUser className="nav-icon" /> */}
              <span role="img" aria-label="user-icon" className="nav-icon">👤</span>
              <span>My Profile</span>
            </li>
            <li className={`nav-item ${activeSection === 'attendance' ? 'active' : ''}`} onClick={() => setActiveSection('attendance')}>
              {/* <FaCalendarCheck className="nav-icon" /> */}
              <span role="img" aria-label="calendar-icon" className="nav-icon">📅</span>
              <span>Attendance</span>
            </li>
            <li className={`nav-item ${activeSection === 'tasks' ? 'active' : ''}`} onClick={() => setActiveSection('tasks')}>
              {/* <FaTasks className="nav-icon" /> */}
              <span role="img" aria-label="tasks-icon" className="nav-icon">📋</span>
              <span>Tasks</span>
            </li>
            <li className={`nav-item ${activeSection === 'leaves' ? 'active' : ''}`} onClick={() => setActiveSection('leaves')}>
              {/* <FaRegCalendarTimes className="nav-icon" /> */}
              <span role="img" aria-label="leave-icon" className="nav-icon">🍃</span>
              <span>Leaves</span>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button className="btn-logout" onClick={handleLogout}>
            {/* <FaSignOutAlt className="nav-icon" /> */}
            <span role="img" aria-label="logout-icon" className="nav-icon">➡️</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <div className="header-left">
            <h1>Dashboard</h1>
            <p>Your current status and activities</p>
          </div>
          <div className="header-right">
            <span className="role-tag">Employee</span>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="dashboard-stats">
          <div className="stat-card stat-card-tasks">
            <div className="stat-icon-wrapper pending">
              {/* <FaClipboardList className="stat-icon" /> */}
              <span role="img" aria-label="tasks-icon" className="stat-icon">📋</span>
            </div>
            <div>
              <p className="stat-title">Pending Tasks</p>
              <h3 className="stat-value">{taskSummary.pending}</h3>
            </div>
          </div>
          <div className="stat-card stat-card-tasks">
            <div className="stat-icon-wrapper in-progress">
              {/* <FaClipboardList className="stat-icon" /> */}
              <span role="img" aria-label="chart-icon" className="stat-icon">📊</span>
            </div>
            <div>
              <p className="stat-title">In Progress Tasks</p>
              <h3 className="stat-value">{taskSummary.inProgress}</h3>
            </div>
          </div>
          <div className="stat-card stat-card-tasks">
            <div className="stat-icon-wrapper completed">
              {/* <FaClipboardList className="stat-icon" /> */}
              <span role="img" aria-label="check-icon" className="stat-icon">✅</span>
            </div>
            <div>
              <p className="stat-title">Completed Tasks</p>
              <h3 className="stat-value">{taskSummary.completed}</h3>
            </div>
          </div>
          <div className="stat-card stat-card-leaves">
            <div className="stat-icon-wrapper approved">
              {/* <FaChartPie className="stat-icon" /> */}
              <span role="img" aria-label="approved-icon" className="stat-icon">✔️</span>
            </div>
            <div>
              <p className="stat-title">Approved Leaves</p>
              <h3 className="stat-value">{leaveSummary.approved}</h3>
            </div>
          </div>
          <div className="stat-card stat-card-leaves">
            <div className="stat-icon-wrapper pending-leave">
              {/* <FaChartPie className="stat-icon" /> */}
              <span role="img" aria-label="pending-icon" className="stat-icon">⏳</span>
            </div>
            <div>
              <p className="stat-title">Pending Leaves</p>
              <h3 className="stat-value">{leaveSummary.pending}</h3>
            </div>
          </div>
          <div className="stat-card stat-card-leaves">
            <div className="stat-icon-wrapper rejected">
              {/* <FaChartPie className="stat-icon" /> */}
              <span role="img" aria-label="rejected-icon" className="stat-icon">❌</span>
            </div>
            <div>
              <p className="stat-title">Rejected Leaves</p>
              <h3 className="stat-value">{leaveSummary.rejected}</h3>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          {activeSection === 'profile' && (
            <section id="profile" className="dashboard-card">
              <h2>My Profile</h2>
              <div className="profile-details-grid">
                <div className="profile-item">
                  <span className="profile-label">ID:</span>
                  <span className="profile-value">{user.eid}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Name:</span>
                  <span className="profile-value">{user.ename}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Email:</span>
                  <span className="profile-value">{user.email}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Department:</span>
                  <span className="profile-value">{user.department}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Designation:</span>
                  <span className="profile-value">{user.designation}</span>
                </div>
              </div>
            </section>
          )}

          {/* Attendance Section */}
          {activeSection === "attendance" && (
            <section id="attendance" className="dashboard-card">
              <h2>My Attendance</h2>
              <div className="attendance-marking">
                <label>Select Date: </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => {
                    const newDate = e.target.value;
                    setSelectedDate(newDate);
                    const record = attendance.find(a => a.date === newDate);
                    setAttendanceStatus(record ? record.status : null);
                  }}
                />
                <button
                  className="btn btn-primary"
                  onClick={() => markAttendance("PRESENT")}
                >
                  Mark Present
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => markAttendance("HALF_DAY")}
                >
                  Mark Half Day
                </button>
              </div>

              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              />

              <div className="table-responsive">
                <table className="styled-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance.length > 0 ? (
                      attendance.map((a, idx) => (
                        <tr key={idx}>
                          <td>{a.date}</td>
                          <td>{a.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2">No attendance records found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeSection === 'tasks' && (
            <section id="tasks" className="dashboard-card">
              <h2>My Tasks</h2>
              <div className="tasks-container">
                <div className="task-table-wrapper">
                  <div className="table-responsive">
                    <table className="styled-table">
                      <thead>
                        <tr>
                          <th>Task</th>
                          <th>Due Date</th>
                          <th>Status</th>
                          <th>Update</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tasks.map((t, idx) => (
                          <tr key={idx}>
                            <td>{t.title}</td>
                            <td>{t.dueDate}</td>
                            <td>
                              <span className={`status-badge status-${t.status.toLowerCase().replace('_', '-')}`}>{t.status.replace('_', ' ')}</span>
                            </td>
                            <td>
                              <select value={t.status} onChange={(e) => updateTaskStatus(t.id, e.target.value)}>
                                <option value="PENDING">Pending</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="COMPLETED">Completed</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="task-chart-wrapper">
                  <canvas ref={chartRef}></canvas>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'leaves' && (
            <section id="leaves" className="dashboard-card">
              <h2>Leave Requests</h2>
              <div className="leave-form-grid">
                <input type="date" value={newLeave.fromDate} onChange={e => setNewLeave({ ...newLeave, fromDate: e.target.value })} />
                <input type="date" value={newLeave.toDate} onChange={e => setNewLeave({ ...newLeave, toDate: e.target.value })} />
                <input type="text" placeholder="Reason" value={newLeave.reason} onChange={e => setNewLeave({ ...newLeave, reason: e.target.value })} />
                <button className="btn btn-primary" onClick={applyLeave}>Apply Leave</button>
              </div>
              <div className="table-responsive">
                <table className="styled-table leave-table">
                  <thead>
                    <tr>
                      <th>From</th>
                      <th>To</th>
                      <th>Reason</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveRequests.map((l, idx) => (
                      <tr key={idx}>
                        <td>{l.fromDate}</td>
                        <td>{l.toDate}</td>
                        <td>{l.reason}</td>
                        <td>
                          <span className={`status-badge status-${l.status.toLowerCase()}`}>{l.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default EmployeeDashboard;
