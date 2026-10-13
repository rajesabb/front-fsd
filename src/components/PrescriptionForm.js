import { useState } from 'react';
import { api } from '../api';
import ErrorMessage from './ErrorMessage';

const empty = { medicineName: '', dosage: '', frequencyPerDay: 1, daysSupply: 30, refillsRemaining: 3, doctorName: '' };

export default function PrescriptionForm({ patientId, onSaved }) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/prescriptions', { ...form, patientId });
      setForm(empty);
      setError('');
      onSaved();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Add Prescription</h3>
      <input name="medicineName" placeholder="Medicine" value={form.medicineName} onChange={handleChange} />
      <input name="dosage" placeholder="Dosage (e.g. 500mg)" value={form.dosage} onChange={handleChange} />
      <input name="frequencyPerDay" type="number" placeholder="Times per day" value={form.frequencyPerDay} onChange={handleChange} />
      <input name="daysSupply" type="number" placeholder="Days supply" value={form.daysSupply} onChange={handleChange} />
      <input name="refillsRemaining" type="number" placeholder="Refills" value={form.refillsRemaining} onChange={handleChange} />
      <input name="doctorName" placeholder="Doctor" value={form.doctorName} onChange={handleChange} />
      <button type="submit">Add</button>
      <ErrorMessage message={error} />
    </form>
  );
}
