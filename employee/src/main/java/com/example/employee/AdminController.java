package com.example.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    @Autowired private EmployeeRepository employeeRepo;
    @Autowired private LeaveRequestRepository leaveRepo;
    @Autowired private TaskRepository taskRepo;
    @Autowired private AttendanceRepository attendanceRepo;
    @Autowired private AdminRepository adminRepo;
    @Autowired private WebSocketController webSocketController;
  
   
 // ✅ Get all employees
    @GetMapping("/employees")
    public List<Employee> getEmployees() {
        return employeeRepo.findAll();
    }

    // ✅ Add new employee
    @PostMapping("/employees")
    public Employee addEmployee(@RequestBody Employee employee) {
        return employeeRepo.save(employee);
    }

    // ✅ Update existing employee
    @PutMapping("/employees/{eid}")
    public Employee updateEmployee(@PathVariable String eid, @RequestBody Employee updatedEmployee) {
        Employee existing = employeeRepo.findById(eid)
                .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + eid));

        existing.setEname(updatedEmployee.getEname());
        existing.setEmail(updatedEmployee.getEmail());
        existing.setDepartment(updatedEmployee.getDepartment());
        existing.setDesignation(updatedEmployee.getDesignation());

        return employeeRepo.save(existing);
    }

    // ✅ Delete employee
    @DeleteMapping("/employees/{eid}")
    public String deleteEmployee(@PathVariable String eid) {
        Employee existing = employeeRepo.findById(eid)
                .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + eid));
        employeeRepo.delete(existing);
        return "Employee with ID " + eid + " deleted successfully.";
    }
    @GetMapping("/admin")
    public List<Admin> getAdmin() {
        return adminRepo.findAll();
    }
    @PostMapping("/admin")
    public Admin addAdmin(@RequestBody Admin admin) {
        return adminRepo.save(admin);
    }
    

    @GetMapping("/leave/requests")
    public List<LeaveRequest> getLeaveRequests() {
        return leaveRepo.findByStatus("PENDING");
    }

    @PutMapping("/leave/{id}/approve")
    public void approveLeave(@PathVariable Long id) {
        LeaveRequest lr = leaveRepo.findById(id).orElseThrow();
        lr.setStatus("APPROVED");
        leaveRepo.save(lr);
    }

    @PutMapping("/leave/{id}/reject")
    public void rejectLeave( @PathVariable Long id) {
        LeaveRequest lr = leaveRepo.findById(id).orElseThrow();
        lr.setStatus("REJECTED");
        leaveRepo.save(lr);
    }

    @GetMapping("/leaves/approved/{month}")
    public List<LeaveRequest> getApprovedLeavesForMonth(@PathVariable String month) {
        YearMonth ym = YearMonth.parse(month);
        LocalDate start = ym.atDay(1);
        LocalDate end = ym.atEndOfMonth();
        return leaveRepo.findByStatusAndToDateGreaterThanEqualAndFromDateLessThanEqual("APPROVED", start, end);
    }

    @PostMapping("/employees/{eid}/tasks")
    public Task assignTask(@PathVariable String eid, @RequestBody Task task) {
        Employee emp = employeeRepo.findById(eid).orElseThrow();
        task.setEmployee(emp);
        task.setId(null);  // Force it to be treated as a new entity
        return taskRepo.save(task);
    }

    @GetMapping("/tasks/report")
    public List<Map<String, Object>> getTaskReport() {
        List<Employee> employees = employeeRepo.findAll();
        return employees.stream().map(emp -> {
            Map<String, Object> map = new HashMap<>();
            map.put("eid", emp.getEid());
            map.put("ename", emp.getEname());
            map.put("pending", taskRepo.countByEmployeeAndStatus(emp, "PENDING"));
            map.put("inProgress", taskRepo.countByEmployeeAndStatus(emp, "IN_PROGRESS"));
            map.put("completed", taskRepo.countByEmployeeAndStatus(emp, "COMPLETED"));
            return map;
        }).collect(Collectors.toList());
    }

    // ✅ Get attendance for an employee for a specific month
    @GetMapping("/attendance/{eid}/{month}")
    public List<Attendance> getAttendanceForMonth(
            @PathVariable String eid,
            @PathVariable String month // format: "yyyy-MM"
    ) {
        YearMonth ym = YearMonth.parse(month);
        LocalDate start = ym.atDay(1);
        LocalDate end = ym.atEndOfMonth();
        return attendanceRepo.findByEidAndDateBetween(eid, start, end);
    }

    // ✅ Get attendance (with optional month filter) for a single employee
    @GetMapping("/employee/{eid}/attendance")
    public List<Attendance> getAttendance(
            @PathVariable String eid,
            @RequestParam(required = false) String month) {

        if (month != null && !month.isEmpty()) {
            YearMonth ym = YearMonth.parse(month);
            LocalDate start = ym.atDay(1);
            LocalDate end = ym.atEndOfMonth();
            return attendanceRepo.findByEidAndDateBetween(eid, start, end);
        } else {
            return attendanceRepo.findByEid(eid);
        }
    }

    // ✅ New: Get attendance summary for all employees for a month
    @GetMapping("/attendance/summary/{month}")
    public Map<String, List<Attendance>> getAttendanceSummary( @PathVariable String month) {
        YearMonth ym = YearMonth.parse(month);
        LocalDate start = ym.atDay(1);
        LocalDate end = ym.atEndOfMonth();

        Map<String, List<Attendance>> summary = new HashMap<>();
        List<Employee> employees = employeeRepo.findAll();
        for (Employee emp : employees) {
            List<Attendance> records = attendanceRepo.findByEidAndDateBetween(emp.getEid(), start, end);
            summary.put(emp.getEid(), records);
        }
        return summary;
    }

    @GetMapping("/attendance/summary-counts/{month}")
    public Map<String, Long> getAttendanceSummaryCounts(@PathVariable String month) {
        YearMonth ym = YearMonth.parse(month);
        LocalDate start = ym.atDay(1);
        LocalDate end = ym.atEndOfMonth();

        long totalPresent = 0;
        long totalHalfDay = 0;
        long totalLeave = 0;
        long totalAbsent = 0;

        List<Employee> employees = employeeRepo.findAll();
        List<LeaveRequest> allApprovedLeaves = leaveRepo.findByStatus("APPROVED");

        for (Employee emp : employees) {
            List<Attendance> records = attendanceRepo.findByEidAndDateBetween(emp.getEid(), start, end);
            List<LeaveRequest> employeeApprovedLeaves = allApprovedLeaves.stream()
                .filter(l -> l.getEid().equals(emp.getEid()))
                .collect(Collectors.toList());

            for (LocalDate date = start; !date.isAfter(end); date = date.plusDays(1)) {
                final LocalDate currentDate = date;  // effectively final copy

                if (date.getDayOfWeek() != DayOfWeek.SATURDAY && date.getDayOfWeek() != DayOfWeek.SUNDAY) {
                    boolean isOnLeave = employeeApprovedLeaves.stream()
                        .anyMatch(l -> !currentDate.isBefore(l.getFromDate()) && !currentDate.isAfter(l.getToDate()));

                    if (isOnLeave) {
                        totalLeave++;
                    } else {
                        Optional<Attendance> att = records.stream()
                            .filter(r -> r.getDate().equals(currentDate))
                            .findFirst();

                        if (att.isPresent()) {
                            switch (att.get().getStatus()) {
                                case "PRESENT": totalPresent++; break;
                                case "HALF_DAY": totalHalfDay++; break;
                            }
                        } else {
                            totalAbsent++;
                        }
                    }
                }
            }

        }

        Map<String, Long> summary = new HashMap<>();
        summary.put("PRESENT", totalPresent);
        summary.put("HALF_DAY", totalHalfDay);
        summary.put("LEAVE", totalLeave);
        summary.put("ABSENT", totalAbsent);
        return summary;
    }

    // ✅ Mark attendance
    @PostMapping("/attendance")
    public Attendance markAttendance( @RequestBody Attendance attendance) {
        Attendance savedAttendance = attendanceRepo.save(attendance);
        Employee employee = employeeRepo.findById(savedAttendance.getEid()).orElse(null);
        if (employee != null) {
            RealTimeUpdate update = new RealTimeUpdate(
                employee.getEid(),
                employee.getEname(),
                new java.text.SimpleDateFormat("HH:mm:ss").format(new java.util.Date()),
                savedAttendance.getStatus()
            );
            webSocketController.sendUpdate(update);
        }
        return savedAttendance;
    }
}
