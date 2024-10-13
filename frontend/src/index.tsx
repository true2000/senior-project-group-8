//Entry point for the React app
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Assuming you have some global styles you want to apply
import App from './App'; // Import the main App component
import * as serviceWorker from './serviceWorker'; // Import the service worker

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Register the service worker for caching
serviceWorker.register(); // Register your service worker here
