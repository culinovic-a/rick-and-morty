import React from 'react';
import './App.css';
import Login from './Pages/LoginPage/Login';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import SignUp from './Pages/SignUpPage/SignUp';
import NavigationNonAuth from './Components/NavigationNonAuth'

const App: React.FC = () => {
  return (
    <Router>
      <NavigationNonAuth />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
