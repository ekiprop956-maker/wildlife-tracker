
import { Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from './pages/home';
import Login from './pages/login';
import Registration from './pages/registration';
import Navbar from './components/Navbar';

function App() {
  

  return (
    <>
    <Navbar />
   <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/registration" element={<Registration />} /> 
   </Routes>
     </>
  )
}

export default App
