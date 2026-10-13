import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>Pharmacy Refill Reminder</h2>
      <NavLink to="/" end>Patients</NavLink>
      <NavLink to="/alerts">Alerts</NavLink>
    </nav>
  );
}
