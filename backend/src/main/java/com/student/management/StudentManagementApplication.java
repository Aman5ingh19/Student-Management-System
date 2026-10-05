package com.student.management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for the Student Management Spring Boot application.
 */
@SpringBootApplication
public class StudentManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudentManagementApplication.class, args);
        System.out.println("==================================================");
        System.out.println("  Student Management System Backend Started!");
        System.out.println("  In-Memory Storage Mode: Java ArrayList");
        System.out.println("  API Base URL: http://localhost:8080/api/students");
        System.out.println("==================================================");
    }
}
