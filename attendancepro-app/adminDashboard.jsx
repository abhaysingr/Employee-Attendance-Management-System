// adminDashboard.jsx
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { FaPen, FaTrash, FaUser, FaTasks, FaHourglassHalf, FaClipboardCheck, FaCalendarCheck, FaCalendarAlt, FaCalendarTimes } from "react-icons/fa";
import Sidebar from "./sidebar";
import "./adminDashboard.css";
import api from "./src/api/axios";
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import AttendanceCalendar from './src/components/AttendanceCalendar';

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("employees");
  const [employees, setEmployees] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ eid: "", title: "", dueDate: "" });
  const [attendance, setAttendance] = useState({});
  const [attendanceSummary, setAttendanceSummary] = useState({ PRESENT: 0, HALF_DAY: 0, LEAVE: 0, ABSENT: 0 });
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [realTimeUpdates, setRealTimeUpdates] = useState([]);

  const [newEmployee, setNewEmployee] = useState({
    eid: "",
    ename: "",
    email: "",
    department: "",
    designation: "",
    password: "",
  });
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [approvedLeaves, setApprovedLeaves] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'calendar'
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState('month');

  const chartInstanceRef = useRef(null);

  // Fetch all data
  useEffect(() => {
    fetchEmployees();
    fetchTasks();
    fetchLeaveRequests();
    fetchAttendanceSummary();
    fetchAttendanceSummaryCounts();
    fetchApprovedLeaves();
  }, [selectedMonth]);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      onConnect: () => {
        client.subscribe('/topic/attendance', message => {
          const update = JSON.parse(message.body);
          setRealTimeUpdates(prevUpdates => [update, ...prevUpdates]);
        });
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);


  // ===== API Calls =====
  const fetchEmployees = () => {
    api.get("/admin/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  };

  const fetchTasks = () => {
    api.get("/admin/tasks/report")
      .then((res) => {
        setTasks(res.data);
        if (document.getElementById("taskChart")) {
          drawTaskChart(res.data);
        }
      })
      .catch((err) => console.error(err));
  };

  const fetchLeaveRequests = () => {
    api.get("/admin/leave/requests")
      .then((res) => setLeaveRequests(res.data))
      .catch((err) => console.error(err));
  };

  const fetchAttendanceSummary = async () => {
    try {
      const res = await api.get(`/admin/attendance/summary/${selectedMonth}`);
      console.log("Fetched attendance data:", res.data);
      setAttendance(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAttendanceSummaryCounts = async () => {
    try {
      const res = await api.get(`/admin/attendance/summary-counts/${selectedMonth}`);
      setAttendanceSummary(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchApprovedLeaves = async () => {
    try {
      const res = await api.get(`/admin/leaves/approved/${selectedMonth}`);
      setApprovedLeaves(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const assignTask = async () => {
    try {
      if (!newTask.eid || !newTask.title || !newTask.dueDate) {
        alert("Please fill all fields before assigning");
        return;
      }
      await api.post(`/admin/employees/${newTask.eid}/tasks`, {
        title: newTask.title,
        dueDate: newTask.dueDate,
      });
      alert("Task assigned successfully!");
      setNewTask({ eid: "", title: "", dueDate: "" });
      fetchTasks();
    } catch (error) {
      console.error("Error assigning task:", error);
      alert("An error occurred while assigning task");
    }
  };

  const addEmployee = async () => {
    try {
      await api.post("/admin/employees", newEmployee);
      alert("Employee added successfully!");
      setNewEmployee({
        eid: "",
        ename: "",
        email: "",
        department: "",
        designation: "",
        password: "",
      });
      fetchEmployees();
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Failed to add employee");
    }
  };

  const saveEmployee = async () => {
    try {
      await api.put(`/admin/employees/${editingEmployee.eid}`, editingEmployee);
      alert("Employee updated successfully!");
      setEditingEmployee(null);
      fetchEmployees();
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee");
    }
  };

  const deleteEmployee = async (eid) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await api.delete(`/admin/employees/${eid}`);
      alert("Employee deleted successfully!");
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee");
    }
  };

  const handleLeaveAction = async (id, action) => {
    try {
      const response = await api.put(`/admin/leave/${id}/${action}`);
      if (response.status === 200) {
        setLeaveRequests(leaveRequests.filter((l) => l.id !== id));
		fetchAttendanceSummary();
		fetchApprovedLeaves();
      } else {
        alert(`Failed to ${action} leave request.`);
      }
    } catch (error) {
      console.error(`Error ${action}ing leave request:`, error);
      alert("An error occurred while processing the leave request.");
    }
  };

  const drawTaskChart = (taskData) => {
    let pending = 0, inProgress = 0, completed = 0;
    taskData.forEach((t) => {
      pending += t.pending;
      inProgress += t.inProgress;
      completed += t.completed;
    });

    const ctx = document.getElementById("taskChart").getContext("2d");
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Pending", "In Progress", "Completed"],
        datasets: [
          {
            data: [pending, inProgress, completed],
            backgroundColor: ["#fbbf24", "#3b82f6", "#22c55e"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: "bottom" } },
      },
    });
  };

  const handleLogout = () => {
    window.location.href = "/signin";
  };

  return (
    <div className="dashboard-layout">
      <Sidebar activeSection={activeSection} onNavigate={setActiveSection} onLogout={handleLogout} />
      <div className="dashboard-main-content">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
        </div>

        {activeSection === "employees" && (
          <section className="dashboard-card">
            <h2>Manage Employees</h2>
            <div className="table-responsive">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>EID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Dept</th>
                    <th>Designation</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((e) => (
                    <tr key={e.eid}>
                      <td>{e.eid}</td>
                      <td>{e.ename}</td>
                      <td>{e.email}</td>
                      <td>{e.department}</td>
                      <td>{e.designation}</td>
                      <td>
                        <button className="btn btn-edit" onClick={() => setEditingEmployee(e)}><FaPen /></button>
                        <button className="btn btn-delete" onClick={() => deleteEmployee(e.eid)}><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="form-grid add-employee-form">
              <h3>Add New Employee</h3>
              <input type="text" placeholder="EID" value={newEmployee.eid} onChange={(e) => setNewEmployee({ ...newEmployee, eid: e.target.value })} />
              <input type="text" placeholder="Name" value={newEmployee.ename} onChange={(e) => setNewEmployee({ ...newEmployee, ename: e.target.value })} />
              <input type="email" placeholder="Email" value={newEmployee.email} onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })} />
              <input type="text" placeholder="Department" value={newEmployee.department} onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })} />
              <input type="text" placeholder="Designation" value={newEmployee.designation} onChange={(e) => setNewEmployee({ ...newEmployee, designation: e.target.value })} />
              <input type="password" placeholder="Password" value={newEmployee.password} onChange={(e) => setNewEmployee({...newEmployee, password: e.target.value,})}/>
              <button className="btn btn-primary" onClick={addEmployee}>Add Employee</button>
            </div>
          </section>
        )}

        {activeSection === "tasks" && (
          <>
            <section className="dashboard-card">
              <h2>Assign New Task</h2>
              <div className="form-grid">
                <select value={newTask.eid} onChange={(e) => setNewTask({ ...newTask, eid: e.target.value })}>
                  <option value="">Select Employee</option>
                  {employees.map((e) => (
                    <option key={e.eid} value={e.eid}>{e.ename}</option>
                  ))}
                </select>
                <input type="text" placeholder="Task Title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
                <input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} />
                <button className="btn btn-primary" onClick={assignTask}>Assign Task</button>
              </div>
            </section>

            <section className="dashboard-card task-report-card">
              <h2>Task Report</h2>
              <div className="tasks-summary-grid">
                <div className="task-report-table">
                  <div className="table-responsive">
                    <table className="styled-table">
                      <thead>
                        <tr>
                          <th>EID</th>
                          <th>Name</th>
                          <th>Pending</th>
                          <th>In Progress</th>
                          <th>Completed</th>
                        </tr>
                      </thead>
                                              <tbody>
                                                {tasks.map((t) => (                          <tr key={t.eid}>
                            <td>{t.eid}</td>
                            <td>{t.ename}</td>
                            <td>{t.pending}</td>
                            <td>{t.inProgress}</td>
                            <td>{t.completed}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="task-chart-container">
                  <h3>Task Distribution</h3>
                  <canvas id="taskChart"></canvas>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ===== Attendance Section ===== */}
        {activeSection === "attendance" && (
          <>
          <section className="dashboard-card">
            <h2>Attendance</h2>
            <input type="month" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} />
            <div className="view-toggle">
              <button onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'active' : ''}>Grid View</button>
              <button onClick={() => setViewMode('calendar')} className={viewMode === 'calendar' ? 'active' : ''}>Calendar View</button>
            </div>

            {viewMode === 'grid' ? (
              <>
                <div className="dashboard-stats">
                  <div className="stat-card">
                    <p className="stat-title">Present</p>
                    <h3 className="stat-value">{attendanceSummary.PRESENT}</h3>
                  </div>
                  <div className="stat-card">
                    <p className="stat-title">Half Day</p>
                    <h3 className="stat-value">{attendanceSummary.HALF_DAY}</h3>
                  </div>
                  <div className="stat-card">
                    <p className="stat-title">Leave</p>
                    <h3 className="stat-value">{attendanceSummary.LEAVE}</h3>
                  </div>
                  <div className="stat-card">
                    <p className="stat-title">Absent</p>
                    <h3 className="stat-value">{attendanceSummary.ABSENT}</h3>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="styled-table attendance-grid">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        {Array.from({ length: new Date(selectedMonth.split('-')[0], selectedMonth.split('-')[1], 0).getDate() }, (_, i) => i + 1).map(day => (
                          <th key={day} className={new Date().getDate() === day ? 'today' : ''}>{day}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const [year, month] = selectedMonth.split('-').map(Number);
                        const daysInMonth = new Date(year, month, 0).getDate();
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);

                        return employees.map(employee => {
                          const empAttendance = attendance[employee.eid] || [];
                          const empLeaves = approvedLeaves.filter(l => l.eid === employee.eid);

                          return (
                            <tr key={employee.eid}>
                              <td>{employee.ename}</td>
                              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                                const date = new Date(year, month - 1, day);
                                const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

                                const attendanceRecord = empAttendance.find(a => a.date === dateString);
                                const leaveRecord = empLeaves.find(l => dateString >= l.fromDate && dateString <= l.toDate);

                                let status = '';
                                let statusDetails = null;

                                if (attendanceRecord) {
                                  status = attendanceRecord.status;
                                  statusDetails = attendanceRecord;
                                } else if (leaveRecord) {
                                  status = 'ON_LEAVE';
                                } else if (date < today && date.getDay() !== 0 && date.getDay() !== 6) {
                                  status = 'ABSENT';
                                }

                                return (
                                  <td key={day} className={`status-${status.toLowerCase()}`} title={statusDetails ? `Marked by: ${statusDetails.marked_by || 'user'} at ${new Date(statusDetails.timestamp).toLocaleTimeString()}`: status}>
                                    {status === 'PRESENT' && <FaCalendarCheck style={{ color: 'green' }} />}
                                    {status === 'HALF_DAY' && <FaHourglassHalf style={{ color: 'orange' }} />}
                                    {status === 'ABSENT' && <FaCalendarTimes style={{ color: 'red' }} />}
                                    {status === 'ON_LEAVE' && <FaCalendarAlt style={{ color: 'blue' }} />}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        });
                      })()}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <AttendanceCalendar 
                attendance={attendance} 
                approvedLeaves={approvedLeaves} 
                employees={employees} 
                date={calendarDate}
                view={calendarView}
                onNavigate={setCalendarDate}
                onView={setCalendarView}
              />
            )}
          </section>
          <section className="dashboard-card">
            <h2>Real-time Updates</h2>
            <div className="real-time-updates">
              {realTimeUpdates.map((update, index) => (
                <div key={index} className="update-item">
                  <p><strong>{update.ename} ({update.eid})</strong> marked as <strong>{update.status}</strong>.</p>
                  <span>{update.timestamp}</span>
                </div>
              ))}
            </div>
          </section>
          </>
        )}

        {activeSection === "leave" && (
          <section className="dashboard-card">
            <h2>Pending Leave Requests</h2>
            <div className="table-responsive">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>EID</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Reason</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map((l) => (
                    <tr key={l.id}>
                      <td>{l.id}</td>
                      <td>{l.eid}</td>
                      <td>{l.fromDate}</td>
                      <td>{l.toDate}</td>
                      <td>{l.reason}</td>
                      <td>
                        <button className="btn btn-approve" onClick={() => handleLeaveAction(l.id, "approve")}>Approve</button>
                        <button className="btn btn-reject" onClick={() => handleLeaveAction(l.id, "reject")}>Reject</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {editingEmployee && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Edit Employee</h2>
              <div className="form-grid">
                <input type="text" placeholder="Name" value={editingEmployee.ename} onChange={(ev) => setEditingEmployee({ ...editingEmployee, ename: ev.target.value })} />
                <input type="email" placeholder="Email" value={editingEmployee.email} onChange={(ev) => setEditingEmployee({ ...editingEmployee, email: ev.target.value })} />
                <input type="text" placeholder="Department" value={editingEmployee.department} onChange={(ev) => setEditingEmployee({ ...editingEmployee, department: ev.target.value })} />
                <input type="text" placeholder="Designation" value={editingEmployee.designation} onChange={(ev) => setEditingEmployee({ ...editingEmployee, designation: ev.target.value })} />
                <input type="password" placeholder="Password" value={editingEmployee.password} onChange={(ev) => setEditingEmployee({ ...editingEmployee, password: ev.target.value })} />
              </div>
              <div className="modal-actions">
                <button className="btn btn-save" onClick={saveEmployee}>Save Changes</button>
                <button className="btn btn-cancel" onClick={() => setEditingEmployee(null)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminDashboard;