import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';

function App() {
  const handleLogin = (email: string, password: string) => {
    if (email === 'test@example.com' && password === 'password') {
      alert('Login successful');
    } else {
      alert('Invalid credentials');
    }
  };
  return (
    <div className="App">
     <Login onLogin={handleLogin}></Login>
    </div>
  );
}

export default App;
