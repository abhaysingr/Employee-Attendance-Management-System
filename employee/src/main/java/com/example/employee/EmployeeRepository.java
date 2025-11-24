package com.example.employee;

//EmployeeRepository.java
import org.springframework.data.jpa.repository.JpaRepository;

//import com.example.employee.Employee;



public interface EmployeeRepository extends JpaRepository<Employee, String> {
	
  Employee findByEidAndPassword(String eid, String password);
}
