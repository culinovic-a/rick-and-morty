import React from 'react';
import './App.css';
import Login from './Pages/LoginPage/Login';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import SignUp from './Pages/SignUpPage/SignUp';
import Navigation from './Components/Navigation'
import Characters from './Pages/CharactersPage/Characters';

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/characters" element={<Characters />} />
      </Routes>
    </Router>
  );
};

export default App;
