import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Header from './components/Header.tsx';
import Log from './pages/Log.tsx';
import Schedule from './pages/Schedule.tsx'
import History from './pages/History.tsx'
import Colors from './pages/Colors.tsx';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/colors' element={<Colors />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/log' element={<Log />} />
            <Route path='/schedule' element={<Schedule />} />
            <Route path='/history' element={<History />} />
          </Routes>
        </div>
      </Router>
    </>

  );
}

export default App;