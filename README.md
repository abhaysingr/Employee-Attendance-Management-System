# Employee Attendance Management System

## Project Overview

This is a full-stack Employee Management System designed to handle various administrative and employee-related tasks. The system provides functionalities for managing employees, tracking attendance, handling leave requests, and assigning tasks. It features a modern web interface for administrators and employees.

The application is divided into two main parts:
*   **Backend**: A Java-based Spring Boot application that provides a REST API for all the functionalities.
*   **Frontend**: A React-based single-page application that consumes the backend API.

## Tech Stack

**Backend:**
*   Java 17
*   Spring Boot
*   Spring Data JPA (Hibernate)
*   Spring Web
*   Spring Security
*   MySQL
*   Maven

**Frontend:**
*   React
*   Vite
*   Tailwind CSS
*   Axios
*   React Router

## Prerequisites

Before you begin, ensure you have the following installed on your system:
*   [Java JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) or later
*   [Maven](https://maven.apache.org/download.cgi)
*   [Node.js](https://nodejs.org/) (which includes npm)
*   [MySQL](https://dev.mysql.com/downloads/mysql/)

## Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <your-project-directory>
    ```

2.  **Backend Setup (`employee` directory):**
    The backend is a Maven project. Dependencies will be downloaded automatically when you run the application.

3.  **Frontend Setup (`attendancepro-app` directory):**
    Navigate to the frontend directory and install the required npm packages.
    ```bash
    cd "attendancepro-app"
    npm install
    ```

## Database Setup

You need to create a MySQL database and the required tables for the application to work.

1.  **Create the Database:**
    Open the MySQL command line or your favorite SQL client and run the following command:
    ```sql
    CREATE DATABASE employeemanagementsystem;
    ```

2.  **Create the Tables:**
    Use the newly created database and then run the following SQL scripts to create the necessary tables.
    ```sql
    USE employeemanagementsystem;

    CREATE TABLE admin (
        aid VARCHAR(255) PRIMARY KEY,
        full_name VARCHAR(255),
        username VARCHAR(255),
        password VARCHAR(255),
        email VARCHAR(255)
    );

    CREATE TABLE employee (
        eid VARCHAR(255) PRIMARY KEY,
        ename VARCHAR(255),
        email VARCHAR(255),
        department VARCHAR(255),
        designation VARCHAR(255),
        password VARCHAR(255)
    );

    CREATE TABLE attendance (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        eid VARCHAR(255),
        date DATE,
        status VARCHAR(255),
        marked_by VARCHAR(255),
        timestamp DATETIME
    );

    CREATE TABLE leave_request (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        eid VARCHAR(255),
        from_date DATE,
        to_date DATE,
        reason VARCHAR(1000),
        status VARCHAR(255)
    );

    CREATE TABLE task (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255),
        due_date VARCHAR(255),
        status VARCHAR(255),
        eid VARCHAR(255),
        FOREIGN KEY (eid) REFERENCES employee(eid)
    );
    ```

## Configuration

Before running the backend, you need to configure the database connection and email settings in the `application.properties` file.

**File location:** `employee/src/main/resources/application.properties`

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/employeemanagementsystem
spring.datasource.username=<your_mysql_username>
spring.datasource.password=<your_mysql_password>
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Set ddl-auto to 'validate' in production to avoid accidental data loss.
# 'update' is fine for development.
spring.jpa.hibernate.ddl-auto=update

# Email Configuration (for password recovery, etc.)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=YOUR_EMAIL@gmail.com
spring.mail.password=YOUR_APP_PASSWORD
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

**Important:**
*   Replace `<your_mysql_username>` and `<your_mysql_password>` with your MySQL credentials.
*   For the email functionality to work, you'll need to provide your own Gmail account and an "App Password". You can find instructions on how to generate an App Password [here](https://support.google.com/accounts/answer/185833).

## Running the Application

1.  **Run the Backend:**
    Navigate to the `employee` directory and run the Spring Boot application using the Maven wrapper.
    ```bash
    cd employee
    ./mvnw spring-boot:run
    ```
    The backend server will start on port `1111`.

2.  **Run the Frontend:**
    Navigate to the `attendancepro-app` directory and start the Vite development server.
    ```bash
    cd "attendancepro-app"
    npm run dev
    ```
    The frontend development server will start, typically on port `5173`. You can access the application by opening your browser to `http://localhost:5173`.
