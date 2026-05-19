import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import StudentForm from './components/StudentForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-student" element={<StudentForm />} />
            <Route path="/edit-student/:id" element={<StudentForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
