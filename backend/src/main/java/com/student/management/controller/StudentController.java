package com.student.management.controller;

import com.student.management.dto.ApiResponse;
import com.student.management.model.Student;
import com.student.management.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller Layer: Exposes RESTful API endpoints for managing students.
 * Flow: HTTP Request -> Controller -> Service -> ArrayList
 */
@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*") // Allows React frontend running on any host/port
public class StudentController {

    private final StudentService studentService;

    // Constructor-based dependency injection
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    /**
     * GET /api/students
     * Optional search parameter: GET /api/students?search={name}
     * Returns: 200 OK with list of all or matching students
     */
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents(
            @RequestParam(required = false) String search) {
        if (search != null && !search.trim().isEmpty()) {
            return ResponseEntity.ok(studentService.searchStudentsByName(search));
        }
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    /**
     * GET /api/students/{id}
     * Returns: 200 OK with Student object, or 404 Not Found if missing
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(false, "Student not found with ID: " + id)));
    }

    /**
     * POST /api/students
     * Request body: JSON with name, email, course
     * Returns: 201 Created with newly created student (including generated id)
     */
    @PostMapping
    public ResponseEntity<?> createStudent(@Valid @RequestBody Student student) {
        // Ensure ID is null so service assigns the next available ID
        student.setId(null);
        Student createdStudent = studentService.addStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdStudent);
    }

    /**
     * PUT /api/students/{id}
     * Request body: JSON with updated name, email, course
     * Returns: 200 OK with updated student, or 404 Not Found
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody Student student) {
        return studentService.updateStudent(id, student)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(false, "Cannot update. Student not found with ID: " + id)));
    }

    /**
     * DELETE /api/students/{id}
     * Returns: 200 OK with confirmation message, or 404 Not Found
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteStudent(@PathVariable Long id) {
        boolean deleted = studentService.deleteStudent(id);
        if (deleted) {
            return ResponseEntity.ok(new ApiResponse(true, "Student deleted successfully with ID: " + id));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, "Cannot delete. Student not found with ID: " + id));
        }
    }
}
