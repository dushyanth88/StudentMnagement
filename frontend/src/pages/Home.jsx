import React from 'react';
import StudentList from '../components/StudentList';

const Home = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to Student Management System</h1>
                <p>Manage all your student records efficiently.</p>
            </header>
            <main>
                <StudentList />
            </main>
        </div>
    );
};

export default Home;
