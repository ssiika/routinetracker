import React from 'react';
import { Navigate, BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Header from './components/Header.tsx';
import Log from './pages/Log.tsx';
import Schedule from './pages/Schedule.tsx'
import History from './pages/History.tsx'
import Guide from './pages/Guide.tsx';
import Activities from './pages/Activities.tsx';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path='/' element={ <Navigate to="/schedule" /> }/>
            <Route path='/activities' element={<Activities />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/log' element={<Log />} />
            <Route path='/schedule' element={<Schedule />} />
            <Route path='/history' element={<History />} />
            <Route path='/guide' element={<Guide />} />
          </Routes>
        </div>
      </Router>
    </>

  );
}

export default App;