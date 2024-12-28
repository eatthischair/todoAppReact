import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { TaskProvider } from './context/TaskContext.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TaskProvider>
      <Router>
        <App />
      </Router>
    </TaskProvider>
  </React.StrictMode>,
);
