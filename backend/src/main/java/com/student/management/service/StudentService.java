package com.student.management.service;

import com.student.management.model.Student;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

/**
 * Service Layer responsible for business logic.
 * Manages students in an in-memory Java ArrayList (no database).
 */
@Service
public class StudentService {

    // In-memory storage using Java ArrayList (synchronized for safe concurrent access)
    private final List<Student> students = Collections.synchronizedList(new ArrayList<>());

    // Thread-safe auto-incrementing ID generator
    private final AtomicLong idSequence = new AtomicLong(1);

    /**
     * Pre-populate the ArrayList with initial sample students
     * so beginners can immediately test GET, SEARCH, PUT, and DELETE operations.
     */
    @PostConstruct
    public void initSampleData() {
        addStudent(new Student(null, "Alice Johnson", "alice.johnson@university.edu", "Computer Science"));
        addStudent(new Student(null, "Bob Smith", "bob.smith@university.edu", "Data Science & AI"));
        addStudent(new Student(null, "Catherine Miller", "catherine.m@university.edu", "Information Technology"));
        addStudent(new Student(null, "David Lee", "david.lee@university.edu", "Software Engineering"));
        addStudent(new Student(null, "Eva Martinez", "eva.martinez@university.edu", "Cybersecurity"));
    }

    /**
     * Retrieve all students in the ArrayList.
     *
     * @return List of all students
     */
    public List<Student> getAllStudents() {
        synchronized (students) {
            return new ArrayList<>(students);
        }
    }

    /**
     * Retrieve a single student by unique ID.
     *
     * @param id the student ID
     * @return Optional containing the Student if found, or empty Optional
     */
    public Optional<Student> getStudentById(Long id) {
        synchronized (students) {
            return students.stream()
                    .filter(s -> s.getId().equals(id))
                    .findFirst();
        }
    }

    /**
     * Search students by name (case-insensitive contains match).
     *
     * @param query the name substring to search
     * @return List of matching students
     */
    public List<Student> searchStudentsByName(String query) {
        if (query == null || query.trim().isEmpty()) {
            return getAllStudents();
        }
        String normalized = query.trim().toLowerCase();
        synchronized (students) {
            return students.stream()
                    .filter(s -> s.getName() != null && s.getName().toLowerCase().contains(normalized))
                    .collect(Collectors.toList());
        }
    }

    /**
     * Add a new student to the ArrayList with an auto-generated ID.
     *
     * @param student the student details from the request
     * @return the newly saved student with its generated ID
     */
    public Student addStudent(Student student) {
        Long generatedId = idSequence.getAndIncrement();
        student.setId(generatedId);
        students.add(student);
        return student;
    }

    /**
     * Update an existing student's details.
     *
     * @param id the ID of the student to update
     * @param updatedDetails the new student details
     * @return Optional containing the updated Student, or empty if not found
     */
    public Optional<Student> updateStudent(Long id, Student updatedDetails) {
        synchronized (students) {
            for (Student student : students) {
                if (student.getId().equals(id)) {
                    student.setName(updatedDetails.getName());
                    student.setEmail(updatedDetails.getEmail());
                    student.setCourse(updatedDetails.getCourse());
                    return Optional.of(student);
                }
            }
        }
        return Optional.empty();
    }

    /**
     * Delete a student by ID from the ArrayList.
     *
     * @param id the ID of the student to delete
     * @return true if found and removed, false otherwise
     */
    public boolean deleteStudent(Long id) {
        synchronized (students) {
            return students.removeIf(s -> s.getId().equals(id));
        }
    }
}
