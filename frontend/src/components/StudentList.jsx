import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StudentService from '../services/StudentService';
import './StudentList.css';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        setLoading(true);
        StudentService.getAllStudents()
            .then(response => {
                setStudents(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
                setError('Failed to fetch students. Is the backend running?');
                setLoading(false);
            });
    };

    const deleteStudent = (id) => {
        if(window.confirm('Are you sure you want to delete this student?')) {
            StudentService.deleteStudent(id)
                .then(() => {
                    fetchStudents();
                })
                .catch(error => {
                    console.error('Error deleting student:', error);
                    alert('Error deleting student');
                });
        }
    };

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="student-list-container">
            <div className="list-header">
                <h2>Student Records</h2>
                <input 
                    type="text" 
                    placeholder="Search by name or email..." 
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading students...</div>
            ) : (
                <div className="table-wrapper">
                    <table className="student-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map(student => (
                                    <tr key={student.id}>
                                        <td className="student-name">{student.name}</td>
                                        <td>{student.email}</td>
                                        <td className="actions-cell">
                                            <Link to={`/edit-student/${student.id}`} className="btn-edit">
                                                Edit
                                            </Link>
                                            <button onClick={() => deleteStudent(student.id)} className="btn-delete">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="no-data">No students found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default StudentList;
