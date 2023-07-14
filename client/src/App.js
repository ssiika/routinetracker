import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Header from './components/Header.tsx';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </Router>
    </>

  );
}

export default App;