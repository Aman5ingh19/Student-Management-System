/**
 * API Service for communicating with Spring Boot backend
 * Backend Base URL: http://localhost:8080/api/students
 */

const API_BASE_URL = 'http://localhost:8080/api/students';

/**
 * Fetch all students, or search students by name if a query is provided
 * @param {string} search - Optional search query
 * @returns {Promise<Array>} Array of student objects
 */
export async function fetchStudents(search = '') {
  const url = search.trim()
    ? `${API_BASE_URL}?search=${encodeURIComponent(search.trim())}`
    : API_BASE_URL;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch students (HTTP ${response.status})`);
  }

  return await response.json();
}

/**
 * Fetch a single student by ID
 * @param {number|string} id - Student ID
 * @returns {Promise<Object>} Student object
 */
export async function fetchStudentById(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Student with ID ${id} not found`);
    }
    throw new Error(`Failed to fetch student details (HTTP ${response.status})`);
  }

  return await response.json();
}

/**
 * Create a new student (POST /api/students)
 * @param {Object} student - { name, email, course }
 * @returns {Promise<Object>} Created student object with ID
 */
export async function createStudent(student) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(student),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMsg = data.errors
      ? Object.values(data.errors).join(', ')
      : data.message || `Failed to create student (HTTP ${response.status})`;
    throw new Error(errorMsg);
  }

  return data;
}

/**
 * Update an existing student (PUT /api/students/{id})
 * @param {number|string} id - Student ID
 * @param {Object} student - { name, email, course }
 * @returns {Promise<Object>} Updated student object
 */
export async function updateStudent(id, student) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(student),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMsg = data.errors
      ? Object.values(data.errors).join(', ')
      : data.message || `Failed to update student (HTTP ${response.status})`;
    throw new Error(errorMsg);
  }

  return data;
}

/**
 * Delete a student (DELETE /api/students/{id})
 * @param {number|string} id - Student ID
 * @returns {Promise<Object>} API response message
 */
export async function deleteStudent(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `Failed to delete student (HTTP ${response.status})`);
  }

  return data;
}
