import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// https://nodejs.org/en download
// npm i react-router-dom -S
// npm i -D concurrently
// npm i bootstrap
// npm i axios

// To launch json-server do:
// npx json-server -p 8000 -w data/db.json

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='*' element={<App/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);

