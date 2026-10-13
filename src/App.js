import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Patients from './pages/Patients';
import PatientDetail from './pages/PatientDetail';
import Alerts from './pages/Alerts';

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Patients />} />
          <Route path="/patients/:id" element={<PatientDetail />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes>
      </div>
    </>
  );
}
