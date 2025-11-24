package com.example.employee;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByStatus(String status);
    List<LeaveRequest> findByEidAndStatus(String eid, String status);
    List<LeaveRequest> findByEid(String eid);
    List<LeaveRequest> findByStatusAndToDateGreaterThanEqualAndFromDateLessThanEqual(String status, LocalDate from, LocalDate to);
}