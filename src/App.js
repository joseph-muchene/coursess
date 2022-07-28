import './App.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profilenew';
import InRegister from './Pages/InstructorSignUp';
import Dashboard from './Pages/Dashboard';
import Scourses from './Pages/SCourses'; 
import Sdashboard from './Pages/Studentdashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/inRegister" element={<InRegister />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/sdashboard" element={<Sdashboard/>} />
          <Route path="/sCourses" element={<Scourses/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
