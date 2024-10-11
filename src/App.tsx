import React from 'react';
import './App.css';
import Login from './Pages/LoginPage/Login';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import SignUp from './Pages/SignUpPage/SignUp';
import Navigation from './Components/Navigation'
import Characters from './Pages/CharactersPage/Characters';
import { AuthProvider } from './contexts/AuthContext';
import SingleCharacter from './Pages/SingleCharacterPage/SingleCharacter';
import SingleLocation from './Pages/SingleLocationPage/SingleLocation';
import SingleEpisode from './Pages/SingleEpisodePage/SingleEpisode';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<SingleCharacter />} />
          <Route path="/location/:id" element={<SingleLocation />} />
          <Route path="/episode/:id" element={<SingleEpisode />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
