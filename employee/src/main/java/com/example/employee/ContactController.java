package com.example.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin
public class ContactController {

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping
    public void handleContactForm(@RequestBody ContactForm data) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(data.getEmail());
        message.setTo("your-email@example.com"); // Replace with the recipient's email address
        message.setSubject(data.getSubject()); // Corrected getter method
        message.setText("Name: " + data.getFull_name() + "\nPhone: " + data.getPhone() + "\n\nMessage: " + data.getMessage()); // Corrected getter method
//        message.setText("Name: " + data.getFull_name() + "\nPhone: " + data.getPhone_number() + "\n\nMessage: " + data.getMessage());
        mailSender.send(message);
    }
}

class ContactForm {
    private String full_name;
    private String email;
    private String phone;
    private String subject;
    private String message;

    // Getters and setters (unchanged)
    public String getFull_name() {
        return full_name;
    }

    public void setFull_name(String full_name) {
        this.full_name = full_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}