import { useEffect, useState } from 'react';
import { api } from '../api';
import { useApp } from '../context/AppContext';
import ErrorMessage from '../components/ErrorMessage';

export default function Alerts() {
  const { alerts, loadAlerts } = useApp();
  const [error, setError] = useState('');

  useEffect(() => { loadAlerts(); }, [loadAlerts]);

  const handleGenerate = async () => {
    try {
      await api.post('/alerts/generate?days=7');
      loadAlerts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAcknowledge = async (id) => {
    await api.patch(`/alerts/${id}`, { status: 'acknowledged' });
    loadAlerts();
  };

  return (
    <>
      <h3>Refill Alerts</h3>
      <button onClick={handleGenerate}>Generate alerts (next 7 days)</button>
      <ErrorMessage message={error} />
      <table>
        <thead>
          <tr><th>Date</th><th>Patient</th><th>Message</th><th>Status</th><th></th></tr>
        </thead>
        <tbody>
          {alerts.map((a) => (
            <tr key={a.id}>
              <td>{a.alertDate}</td>
              <td>{a.prescription?.patient?.name}</td>
              <td>{a.message}</td>
              <td>{a.status}</td>
              <td>
                {a.status !== 'acknowledged' && (
                  <button onClick={() => handleAcknowledge(a.id)}>Acknowledge</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
