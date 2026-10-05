# 🎓 Student Management System (Spring Boot + React)

A beginner-friendly full-stack **Student Management System** built with **Java Spring Boot** on the backend and **React** on the frontend. 

This application uses **no database**; student data is temporarily managed in a thread-safe Java `ArrayList` in memory. It demonstrates clean architectural separation (**Controller → Service → ArrayList**) and modern RESTful API communication.

---

## ✨ Features

- **Add Student**: Create new students with Full Name, Email Address, and Enrolled Course.
- **View Students**: Browse enrolled students in both sleek Table and Card Grid views.
- **Inspect Student Profile**: Open individual student details in a dedicated profile dialog.
- **Update Student**: Edit existing student records with pre-filled modal forms.
- **Delete Student**: Remove student records with safe confirmation dialogs.
- **Live Search**: Instant case-insensitive search by student name (`GET /api/students?search=...`).
- **Real-time Backend Status**: UI indicators show whether the Spring Boot server is online.
- **Responsive & Modern UI**: Fast, responsive layout with toast alerts, metrics overview, and clean design.

---

## 🛠️ Tech Stack

### **Backend**
- **Java 21** (or Java 17+)
- **Spring Boot 3.3.4** (with `spring-boot-starter-web` and `spring-boot-starter-validation`)
- **Maven** for build and dependency management
- **In-Memory Storage**: Java `Collections.synchronizedList(new ArrayList<Student>())`

### **Frontend**
- **React 18 / 19** with **Vite**
- **Vanilla CSS3** (Custom design system with CSS variables, responsive grid/flexbox, animations)
- **Lucide React** (Clean, lightweight icons)

---

## 🏛️ Architecture & Data Flow

The project follows a standard multi-layer architecture with zero unnecessary complexity:

```text
React Client (Vite: http://localhost:5173)
       │
       │ HTTP REST API (JSON)
       ▼
StudentController.java (@RestController: http://localhost:8080/api/students)
       │
       │ Method calls
       ▼
StudentService.java (@Service - Business logic & CRUD)
       │
       │ Memory operations
       ▼
Java ArrayList (In-memory storage)
```

1. **Controller Layer (`StudentController`)**: Exposes REST endpoints (`GET`, `POST`, `PUT`, `DELETE`), handles HTTP requests/responses, status codes, and cross-origin requests (`@CrossOrigin`).
2. **Service Layer (`StudentService`)**: Contains business operations (adding, updating, searching, deleting) and maintains the in-memory `ArrayList` with an atomic ID generator (`AtomicLong`).
3. **Model Layer (`Student`)**: Represents the student entity with fields: `id`, `name`, `email`, and `course`.
4. **Exception Handling (`GlobalExceptionHandler`)**: Returns user-friendly JSON error messages for validation failures.

---

## 📁 Project Structure

```text
Student Manager/
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/student/management/
│   │       │   ├── StudentManagementApplication.java  # Main Spring Boot entry point
│   │       │   ├── controller/
│   │       │   │   └── StudentController.java         # REST Controller (@RestController)
│   │       │   ├── service/
│   │       │   │   └── StudentService.java            # Service layer with ArrayList
│   │       │   ├── model/
│   │       │   │   └── Student.java                   # Student entity model
│   │       │   ├── dto/
│   │       │   │   └── ApiResponse.java               # Standard JSON response wrapper
│   │       │   └── exception/
│   │       │       └── GlobalExceptionHandler.java    # Handles validation & errors
│   │       └── resources/
│   │           └── application.properties             # Backend configuration (port 8080)
│   ├── pom.xml                                        # Maven project configuration
│   └── run-backend.bat                                # Windows helper script to start backend
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx                             # Header and status badges
│   │   │   ├── StatsCards.jsx                         # Metric summary cards
│   │   │   ├── SearchBar.jsx                          # Search input and mode switcher
│   │   │   ├── StudentTable.jsx                       # Responsive table view
│   │   │   ├── StudentCards.jsx                       # Responsive card grid view
│   │   │   ├── StudentModal.jsx                       # Add / Edit form modal
│   │   │   ├── StudentDetailModal.jsx                 # View student details modal
│   │   │   ├── ConfirmModal.jsx                       # Delete confirmation modal
│   │   │   └── Toast.jsx                              # Toast alert notifications
│   │   ├── services/
│   │   │   └── api.js                                 # Fetch calls to Spring Boot API
│   │   ├── App.jsx                                    # Main React view and state
│   │   ├── index.css                                  # Custom CSS styling system
│   │   └── main.jsx                                   # React bootstrap file
│   ├── index.html                                     # HTML template
│   ├── package.json                                   # NPM dependencies and scripts
│   └── vite.config.js                                 # Vite bundler config
│
├── run-backend.bat                                    # Convenient root launcher for backend
├── run-frontend.bat                                   # Convenient root launcher for frontend
├── .gitignore                                         # Git ignore rules
└── README.md                                          # Documentation
```

---

## ⚡ Prerequisites

Before running the application, make sure you have installed:

- **Java JDK 21** (or 17+) — Check using:
  ```bash
  java -version
  ```
- **Node.js** (v18+ or v20+) and **npm** — Check using:
  ```bash
  node -v
  npm -v
  ```
- *(Optional)* **Apache Maven 3.6+** (A pre-configured Maven runner is included in `run-backend.bat`).

---

## 🚀 How to Run the Project

### Option A: Quick Start (Windows)
Double-click the following scripts from the project root:
1. Double-click `run-backend.bat` to launch the Spring Boot server.
2. Double-click `run-frontend.bat` to launch the React frontend.

---

### Option B: Manual Terminal Execution

#### 1. Start the Spring Boot Backend

Open a terminal window and run:

```bash
cd backend

# Using Maven:
mvn spring-boot:run

# Or run the bundled script:
.\run-backend.bat
```

The backend server will start on: **`http://localhost:8080`**  
You will see the startup banner:
```text
==================================================
  Student Management System Backend Started!
  In-Memory Storage Mode: Java ArrayList
  API Base URL: http://localhost:8080/api/students
==================================================
```

#### 2. Start the React Frontend

Open a **second** terminal window and run:

```bash
cd frontend

# Install dependencies (only needed the first time):
npm install

# Start the development server:
npm run dev
```

Open your browser and navigate to: **`http://localhost:5173`** (or `http://127.0.0.1:5173`).

---

## 🌐 REST API Endpoints

The Spring Boot backend exposes standard REST endpoints under `/api/students`:

| Method | Endpoint | Description | Request Body | Success Code |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/students` | Get all students | None | `200 OK` |
| `GET` | `/api/students?search={name}` | Search students by name | None | `200 OK` |
| `GET` | `/api/students/{id}` | Get a single student by ID | None | `200 OK` (or `404`) |
| `POST` | `/api/students` | Add a new student | JSON object | `201 Created` |
| `PUT` | `/api/students/{id}` | Update student by ID | JSON object | `200 OK` (or `404`) |
| `DELETE` | `/api/students/{id}` | Delete student by ID | None | `200 OK` (or `404`) |

---

## 📬 Example API Requests & Responses

### 1. Get All Students
**Request:**
```http
GET http://localhost:8080/api/students
```
**Response (`200 OK`):**
```json
[
  {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice.johnson@university.edu",
    "course": "Computer Science"
  },
  {
    "id": 2,
    "name": "Bob Smith",
    "email": "bob.smith@university.edu",
    "course": "Data Science & AI"
  }
]
```

---

### 2. Search Students by Name
**Request:**
```http
GET http://localhost:8080/api/students?search=alice
```
**Response (`200 OK`):**
```json
[
  {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice.johnson@university.edu",
    "course": "Computer Science"
  }
]
```

---

### 3. Add a New Student
**Request:**
```http
POST http://localhost:8080/api/students
Content-Type: application/json

{
  "name": "Franklin Clark",
  "email": "franklin.clark@university.edu",
  "course": "Robotics & Automation"
}
```
**Response (`201 Created`):**
```json
{
  "id": 6,
  "name": "Franklin Clark",
  "email": "franklin.clark@university.edu",
  "course": "Robotics & Automation"
}
```

---

### 4. Update an Existing Student
**Request:**
```http
PUT http://localhost:8080/api/students/6
Content-Type: application/json

{
  "name": "Franklin Clark (Honors)",
  "email": "franklin.clark@university.edu",
  "course": "Advanced Robotics"
}
```
**Response (`200 OK`):**
```json
{
  "id": 6,
  "name": "Franklin Clark (Honors)",
  "email": "franklin.clark@university.edu",
  "course": "Advanced Robotics"
}
```

---

### 5. Delete a Student
**Request:**
```http
DELETE http://localhost:8080/api/students/6
```
**Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Student deleted successfully with ID: 6",
  "timestamp": "2026-10-05T14:14:51.064863"
}
```

---

### 6. Validation Error Example
**Request:** (missing student name and invalid email format)
```http
POST http://localhost:8080/api/students
Content-Type: application/json

{
  "name": "",
  "email": "invalid-email-address",
  "course": ""
}
```
**Response (`400 Bad Request`):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "name": "Student name is required",
    "email": "Please provide a valid email address",
    "course": "Student course is required"
  }
}
```

---

## ⚠️ Important Limitations (In-Memory Storage)

> [!WARNING]
> **Data is temporary and not persistent!**
>
> 1. **No External Database**: This application intentionally uses a Java `ArrayList` inside the `StudentService` class to store records in the server's RAM.
> 2. **Data Reset on Restart**: Whenever the Spring Boot application stops, restarts, or crashes, **all newly created, edited, or deleted students are lost**.
> 3. **Initial Sample Data**: When the backend boots up, it automatically re-populates the `ArrayList` with 5 default students via `@PostConstruct initSampleData()` so the application is immediately testable.
> 4. **Future Upgrade**: To persist records permanently, you can replace the `ArrayList` in `StudentService` with Spring Data JPA (`@Entity`, `JpaRepository`) and a database such as H2, MySQL, or PostgreSQL.

---

## 📝 Beginner Exercises to Practice

Want to learn more by experimenting? Try these quick challenges:

1. **Add a new field**: Add a `phone` or `gpa` field to `Student.java` and update the React form in `StudentModal.jsx`.
2. **Filter by Course**: Create a dropdown in `SearchBar.jsx` allowing users to filter students by course.
3. **Sort Students**: Add a button to sort students alphabetically by name or numerically by ID.

---

## 📄 License
This project is open-source and free to use for educational and learning purposes.
