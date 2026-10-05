package com.student.management.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * Student Model class representing student entities.
 * Stored in an in-memory ArrayList without a database.
 */
public class Student {

    private Long id;

    @NotBlank(message = "Student name is required")
    private String name;

    @NotBlank(message = "Student email is required")
    @Email(message = "Please provide a valid email address")
    private String email;

    @NotBlank(message = "Student course is required")
    private String course;

    // Default constructor (required for JSON deserialization)
    public Student() {
    }

    // Parameterized constructor
    public Student(Long id, String name, String email, String course) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.course = course;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", course='" + course + '\'' +
                '}';
    }
}
