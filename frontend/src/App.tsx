import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddObservation from './pages/addobservation';
import ContactUs from './pages/contactus';
import AboutUs from './pages/AboutUs';
import Navbar from './components/Navbar';


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/addobservation" element={<AddObservation />} />
         <Route path="/contactus" element={<ContactUs />} />
         <Route path="/aboutus" element={<AboutUs />} />
      
      </Routes>
    </>
  );
}

export default App;
