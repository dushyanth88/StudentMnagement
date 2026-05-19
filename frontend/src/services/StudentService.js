import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/students';

class StudentService {
    getAllStudents() {
        return axios.get(API_BASE_URL);
    }

    getStudentById(studentId) {
        return axios.get(`${API_BASE_URL}/${studentId}`);
    }

    createStudent(student) {
        return axios.post(API_BASE_URL, student);
    }

    updateStudent(studentId, student) {
        return axios.put(`${API_BASE_URL}/${studentId}`, student);
    }

    deleteStudent(studentId) {
        return axios.delete(`${API_BASE_URL}/${studentId}`);
    }
}

export default new StudentService();
