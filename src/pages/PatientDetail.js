import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api';
import PrescriptionForm from '../components/PrescriptionForm';
import ErrorMessage from '../components/ErrorMessage';

export default function PatientDetail() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      setPatient(await api.get(`/patients/${id}`));
    } catch (err) {
      setError(err.message);
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  const handleRefill = async (rxId) => {
    try {
      await api.post(`/prescriptions/${rxId}/refill`);
      setError('');
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (rxId) => {
    await api.del(`/prescriptions/${rxId}`);
    load();
  };

  if (error && !patient) return <ErrorMessage message={error} />;
  if (!patient) return <p>Loading...</p>;

  return (
    <>
      <Link to="/">&larr; Back</Link>
      <h2>{patient.name}</h2>
      <p>{patient.email} | {patient.phone} | DOB: {patient.dateOfBirth}</p>

      <PrescriptionForm patientId={patient.id} onSaved={load} />

      <h3>Prescriptions</h3>
      <ErrorMessage message={error} />
      <table>
        <thead>
          <tr><th>Medicine</th><th>Dosage</th><th>Next Refill</th><th>Refills Left</th><th>Status</th><th></th></tr>
        </thead>
        <tbody>
          {patient.prescriptions.map((rx) => (
            <tr key={rx.id}>
              <td>{rx.medicineName}</td>
              <td>{rx.dosage}</td>
              <td>{rx.nextRefillDate}</td>
              <td>{rx.refillsRemaining}</td>
              <td>{rx.status}</td>
              <td>
                <button onClick={() => handleRefill(rx.id)}>Refill</button>{' '}
                <button onClick={() => handleDelete(rx.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
