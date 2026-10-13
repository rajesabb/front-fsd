# Pharmacy Medicine Refill Reminder - Frontend (ISA-III)

React (Create React App) frontend for the ISA-II backend.

## Run
1. Start the backend first (`npm start` in the backend folder, port 5000).
2. Here: `npm install` then `npm start` -> http://localhost:3000
   (requests to `/api` are forwarded to port 5000 using the `proxy` field in package.json)

## Pages (React Router)
- `/` Patients: add / search / delete patients
- `/patients/:id` Patient details: add prescriptions, refill, delete
- `/alerts` Refill alerts: generate and acknowledge

## Concepts used
- Components + props: Navbar, PatientForm, PrescriptionForm, ErrorMessage
- useState: form fields, search, errors
- useReducer + useContext: global patients/alerts state (`context/AppContext.js`)
- useEffect: fetch data from backend on page load
- useRef: auto-focus name field | useMemo: patient search filter | useCallback: data loaders
