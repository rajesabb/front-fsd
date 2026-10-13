import { useEffect, useRef, useState } from 'react';
import { api } from '../api';
import ErrorMessage from './ErrorMessage';

const empty = { name: '', email: '', phone: '', dateOfBirth: '', address: '' };

export default function PatientForm({ onSaved }) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');
  const nameRef = useRef(null);

  useEffect(() => { nameRef.current.focus(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/patients', form);
      setForm(empty);
      setError('');
      nameRef.current.focus();
      onSaved();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Add Patient</h3>
      <input ref={nameRef} name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="phone" placeholder="Phone (10 digits)" value={form.phone} onChange={handleChange} />
      <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} />
      <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
      <button type="submit">Add</button>
      <ErrorMessage message={error} />
    </form>
  );
}
