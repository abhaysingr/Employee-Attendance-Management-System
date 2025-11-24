package com.example.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    // Run every hour at the beginning of the hour
    @Scheduled(cron = "0 0 * * * *")
    public void autoMarkAbsent() {
        LocalDate yesterday = LocalDate.now().minusDays(1);

        // Skip on weekends
        if (yesterday.getDayOfWeek() == java.time.DayOfWeek.SATURDAY || yesterday.getDayOfWeek() == java.time.DayOfWeek.SUNDAY) {
            return;
        }

        List<Employee> employees = employeeRepository.findAll();

        for (Employee employee : employees) {
            // Check if attendance was already marked for yesterday
            boolean attendanceExists = attendanceRepository.findByEidAndDate(employee.getEid(), yesterday).isPresent();

            if (!attendanceExists) {
                // Check if the employee was on leave yesterday
                List<LeaveRequest> approvedLeaves = leaveRequestRepository.findByEidAndStatus(employee.getEid(), "APPROVED");
                boolean onLeave = approvedLeaves.stream().anyMatch(leave -> 
                    !yesterday.isBefore(leave.getFromDate()) && !yesterday.isAfter(leave.getToDate())
                );

                if (!onLeave) {
                    Attendance attendance = new Attendance();
                    attendance.setEid(employee.getEid());
                    attendance.setDate(yesterday);
                    attendance.setStatus("ABSENT");
                    attendance.setMarkedBy("system");
                    attendance.setTimestamp(LocalDateTime.now());
                    attendanceRepository.save(attendance);
                }
            }
        }
    }
}
