import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StudentService from '../services/StudentService';
import './StudentForm.css';

const StudentForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            setLoading(true);
            StudentService.getStudentById(id)
                .then(response => {
                    setName(response.data.name);
                    setEmail(response.data.email);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching student:', error);
                    setLoading(false);
                });
        }
    }, [id]);

    const validateForm = () => {
        let formErrors = {};
        if (!name.trim()) formErrors.name = 'Name is required';
        if (!email.trim()) {
            formErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            formErrors.email = 'Email address is invalid';
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const saveOrUpdateStudent = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        const student = { name, email };

        if (id) {
            StudentService.updateStudent(id, student)
                .then(() => {
                    navigate('/');
                })
                .catch(err => {
                    console.error('Error updating student:', err);
                    setLoading(false);
                });
        } else {
            StudentService.createStudent(student)
                .then(() => {
                    navigate('/');
                })
                .catch(err => {
                    console.error('Error creating student:', err);
                    setLoading(false);
                });
        }
    };

    const title = () => {
        if (id) {
            return <h2 className="form-title">Update Student</h2>;
        } else {
            return <h2 className="form-title">Add Student</h2>;
        }
    };

    return (
        <div className="form-container-wrapper">
            <div className="form-card">
                {title()}
                <form onSubmit={saveOrUpdateStudent}>
                    <div className="form-group">
                        <label>Student Name:</label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={errors.name ? 'input-error' : ''}
                        />
                        {errors.name && <div className="error-text">{errors.name}</div>}
                    </div>

                    <div className="form-group">
                        <label>Email Address:</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={errors.email ? 'input-error' : ''}
                        />
                        {errors.email && <div className="error-text">{errors.email}</div>}
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Student'}
                        </button>
                        <button type="button" onClick={() => navigate('/')} className="btn-cancel">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentForm;
