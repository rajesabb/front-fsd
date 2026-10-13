import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useApp } from '../context/AppContext';
import PatientForm from '../components/PatientForm';

export default function Patients() {
  const { patients, loadPatients } = useApp();
  const [search, setSearch] = useState('');

  useEffect(() => { loadPatients(); }, [loadPatients]);

  const filtered = useMemo(
    () => patients.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())),
    [patients, search]
  );

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this patient and all their prescriptions?')) return;
    await api.del(`/patients/${id}`);
    loadPatients();
  };

  return (
    <>
      <PatientForm onSaved={loadPatients} />
      <h3>Patients</h3>
      <input placeholder="Search by name" value={search} onChange={(e) => setSearch(e.target.value)} />
      <table>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Phone</th><th></th></tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id}>
              <td><Link to={`/patients/${p.id}`}>{p.name}</Link></td>
              <td>{p.email}</td>
              <td>{p.phone}</td>
              <td><button onClick={() => handleDelete(p.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
