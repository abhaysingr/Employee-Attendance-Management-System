package com.example.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;

// This is the new EmployeeController
@RestController
@RequestMapping("/api/employee")
@CrossOrigin
public class EmployeeController {

    @Autowired private TaskRepository taskRepo;
    @Autowired private LeaveRequestRepository leaveRepo;
    @Autowired private EmployeeRepository employeeRepo;
    @Autowired private AttendanceRepository attendanceRepository;

    @GetMapping("/{eid}/tasks")
    public List<Task> getEmployeeTasks(@PathVariable String eid) {
        Optional<Employee> emp = employeeRepo.findById(eid);
        if (emp.isPresent()) {
            return taskRepo.findByEmployee(emp.get());
        }
        return List.of(); // Return an empty list if employee not found
    }
    
    

    @PostMapping("/{eid}/leave")
    public LeaveRequest applyLeave(@PathVariable String eid, @RequestBody LeaveRequest leaveRequest) {
        leaveRequest.setEid(String.valueOf(eid));
        leaveRequest.setStatus("PENDING");
        return leaveRepo.save(leaveRequest);
    }
   
    @GetMapping("/{eid}/leaves")
    public List<LeaveRequest> getLeaves(@PathVariable String eid) {
        Employee emp = employeeRepo.findById(eid).orElseThrow();
        return leaveRepo.findByEid(eid);
    }
    
 // ✅ Update task status
    @PutMapping("/{eid}/tasks/{tid}")
    public Task updateTaskStatus(@PathVariable String eid, @PathVariable Long tid, @RequestBody Task updatedTask) {
        Task task = taskRepo.findById(tid).orElseThrow();
        if (!task.getEmployee().getEid().equals(eid)) {
            throw new RuntimeException("Unauthorized: Task does not belong to this employee");
        }
        task.setStatus(updatedTask.getStatus());
        return taskRepo.save(task);
    }
 // ✅ Mark Attendance
    @PostMapping("/{eid}/attendance")
    public ResponseEntity<String> markAttendance( @PathVariable String eid, @RequestBody Map<String, String> body) {
        LocalDate date = LocalDate.parse(body.get("date"));
        if (!date.equals(LocalDate.now())) {
            return ResponseEntity.badRequest().body("You can only mark attendance for the current day.");
        }
        String status = body.get("status");

            // Prevent duplicate marking for same day
            if (attendanceRepository.findByEidAndDate(eid, date).isPresent()) {
                return ResponseEntity.status(409).body("Attendance already marked for this date.");
            }

        // Check if already marked
        if (attendanceRepository.findByEidAndDate(eid, date).isPresent()) {
            return ResponseEntity.badRequest().body("Attendance already marked for today.");
        }

        // Check leave
        boolean onLeave = leaveRepo.findByEidAndStatus(eid, "APPROVED")
                .stream()
                .anyMatch(l -> !date.isBefore(l.getFromDate()) && !date.isAfter(l.getToDate()));

        if (onLeave) {
            return ResponseEntity.badRequest().body("You cannot mark attendance on an approved leave day.");
        }

        // Save attendance
        Attendance att = new Attendance();
        att.setEid(eid);
        att.setDate(date);
        att.setStatus(status);
        attendanceRepository.save(att);

        return ResponseEntity.ok("Attendance marked successfully.");
    }

    // ✅ Get attendance (all or monthly filter with query param)
    @GetMapping("/{eid}/attendance")
    public ResponseEntity<?> getEmployeeAttendance(
            @PathVariable String eid,
            @RequestParam(required = false) String month) {
        try {
            List<Attendance> attendanceList;

            if (month != null && !month.isEmpty()) {
                YearMonth ym = YearMonth.parse(month); // yyyy-MM
                LocalDate start = ym.atDay(1);
                LocalDate end = ym.atEndOfMonth();
                attendanceList = attendanceRepository.findByEidAndDateBetween(eid, start, end);
            } else {
                attendanceList = attendanceRepository.findByEid(eid);
            }

            return ResponseEntity.ok(attendanceList);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to fetch employee attendance summary");
        }
    }
    // ✅ Get Monthly Stats
    @GetMapping("/{eid}/attendance/monthly/{year}/{month}")
    public ResponseEntity<Map<String, Long>> getMonthlyStats( @PathVariable String eid,
                                                             @PathVariable int year,
                                                             @PathVariable int month) {
        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());

        List<Attendance> records = attendanceRepository.findByEidAndDateBetween(eid, start, end);
        return ResponseEntity.ok(countStatuses(records));
    }

    // ✅ Get Yearly Stats
    @GetMapping("/{eid}/attendance/yearly/{year}")
    public ResponseEntity<Map<String, Long>> getYearlyStats( @PathVariable String eid,
                                                            @PathVariable int year) {
        LocalDate start = LocalDate.of(year, 1, 1);
        LocalDate end = LocalDate.of(year, 12, 31);

        List<Attendance> records = attendanceRepository.findByEidAndDateBetween(eid, start, end);
        return ResponseEntity.ok(countStatuses(records));
    }

    // ✅ Helper to count statuses
    private Map<String, Long> countStatuses(List<Attendance> records) {
        Map<String, Long> stats = new HashMap<>();
        stats.put("PRESENT", records.stream().filter(a -> "PRESENT".equals(a.getStatus())).count());
        stats.put("HALF_DAY", records.stream().filter(a -> "HALF_DAY".equals(a.getStatus())).count());
        stats.put("LEAVE", records.stream().filter(a -> "LEAVE".equals(a.getStatus())).count());
        return stats;
    }
}
