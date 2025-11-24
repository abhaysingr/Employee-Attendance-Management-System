package com.example.employee;

import org.springframework.data.jpa.repository.JpaRepository;


public interface AdminRepository extends JpaRepository<Admin, String> {
    Admin findByUsernameAndPassword(String username, String password);
}

