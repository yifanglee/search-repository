import React from 'react';
import ReactDOM from 'react-dom';
import './Assets/css/Main.css';
import App from './Pages/App';
import "tailwindcss/tailwind.css"
import "tailwindcss/base.css"
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
