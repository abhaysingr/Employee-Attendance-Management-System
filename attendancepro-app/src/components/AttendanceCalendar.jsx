import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './AttendanceCalendar.css';
import { useState } from 'react';

const localizer = momentLocalizer(moment);

const AttendanceCalendar = ({ attendance, approvedLeaves, employees, date, view, onNavigate, onView }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const events = [];
  const dailyStatus = {};

  employees.forEach(employee => {
    const empAttendance = attendance[employee.eid] || [];
    const empLeaves = approvedLeaves.filter(l => l.eid === employee.eid);

    empAttendance.forEach(att => {
      const date = att.date;
      if (!dailyStatus[date]) {
        dailyStatus[date] = {};
      }
      if (!dailyStatus[date][att.status]) {
        dailyStatus[date][att.status] = [];
      }
      dailyStatus[date][att.status].push(employee.ename);
    });

    empLeaves.forEach(leave => {
      let start = new Date(leave.fromDate);
      let end = new Date(leave.toDate);
      while (start <= end) {
        const date = moment(start).format('YYYY-MM-DD');
        if (!dailyStatus[date]) {
          dailyStatus[date] = {};
        }
        if (!dailyStatus[date]['ON_LEAVE']) {
          dailyStatus[date]['ON_LEAVE'] = [];
        }
        dailyStatus[date]['ON_LEAVE'].push(employee.ename);
        start.setDate(start.getDate() + 1);
      }
    });
  });

  for (const date in dailyStatus) {
    for (const status in dailyStatus[date]) {
      const employeeNames = dailyStatus[date][status];
      let conciseStatus = status;
      switch (status) {
        case 'PRESENT':
          conciseStatus = 'P';
          break;
        case 'ABSENT':
          conciseStatus = 'A';
          break;
        case 'HALF_DAY':
          conciseStatus = 'HD';
          break;
        case 'ON_LEAVE':
          conciseStatus = 'L';
          break;
      }

      const isAllDay = view === 'month' || view === 'agenda';
      const start = new Date(date);
      const end = new Date(date);

      if (!isAllDay) {
        start.setHours(9, 0, 0, 0); // 9 AM
        end.setHours(17, 0, 0, 0); // 5 PM
      }

      events.push({
        title: `${employeeNames.length} ${conciseStatus}`,
        start,
        end,
        allDay: isAllDay,
        resource: status,
        employees: employeeNames,
      });
    }
  }


  const eventStyleGetter = (event) => {
    let className = 'rbc-event';
    switch (event.resource) {
      case 'PRESENT':
        className += ' status-present';
        break;
      case 'ABSENT':
        className += ' status-absent';
        break;
      case 'HALF_DAY':
        className += ' status-half_day';
        break;
      case 'ON_LEAVE':
        className += ' status-on_leave';
        break;
      default:
        break;
    }
    return { className };
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  }

  const closeModal = () => {
    setSelectedEvent(null);
  }

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleSelectEvent}
        date={date}
        view={view}
        onNavigate={onNavigate}
        onView={onView}
      />

      {selectedEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{moment(selectedEvent.start).format('MMMM Do YYYY')}</h2>
            <p><strong>Status:</strong> {selectedEvent.resource}</p>
            <p><strong>Employees:</strong></p>
            <ul>
              {selectedEvent.employees.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
            <button onClick={closeModal} className="btn btn-primary">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceCalendar;
