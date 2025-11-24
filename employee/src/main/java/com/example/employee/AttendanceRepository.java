package com.example.employee;

import org.springframework.data.jpa.repository.JpaRepository;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByEid(String eid);
    Optional<Attendance> findByEidAndDate(String eid, LocalDate localDate);
    List<Attendance> findByEidAndDateBetween(String eid, LocalDate start, LocalDate end);
}