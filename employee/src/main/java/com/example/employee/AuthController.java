package com.example.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired private AdminRepository adminRepository;
    @Autowired private EmployeeRepository employeeRepository;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        Admin admin = adminRepository.findByUsernameAndPassword(request.getUsername(), request.getPassword());
        if (admin != null) {
            LoginResponse response = new LoginResponse();
            response.setEid(admin.getAid());
            response.setEname(admin.getFullName());
            response.setEmail(admin.getEmail());
            response.setRole("ADMIN"); // Crucial line for frontend logic
            return response;
        }

        Employee emp = employeeRepository.findByEidAndPassword(request.getUsername(), request.getPassword());
        if (emp != null) {
            LoginResponse response = new LoginResponse();
            response.setEid(emp.getEid());
            response.setEname(emp.getEname());
            response.setEmail(emp.getEmail());
            response.setDepartment(emp.getDepartment());
            response.setDesignation(emp.getDesignation());
            response.setRole("EMPLOYEE"); // Crucial line for frontend logic
            return response;
        }

        throw new RuntimeException("Invalid username or password");
    }

    @PostMapping("/register")
    public Admin register(@RequestBody Admin newAdmin) {
        return adminRepository.save(newAdmin);
    }

    @PostMapping("/forgot-password")
    public void forgotPassword(@RequestBody String email) {
        System.out.println("Password reset request for email: " + email);
        // In a real application, you would send a password reset email here.
    }
}
