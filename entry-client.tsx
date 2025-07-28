import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from '@/App';

// fix hydration style flicker
if (typeof window !== 'undefined') {
  // remove temporary class added by server render
  const rootElement = document.getElementById('root');
  if (rootElement) {
    // ensure remove any temporary properties that may affect styles after hydration
    const style = document.createElement('style');
    style.innerHTML = `
      body { opacity: 1 !important; }
      * { transition: none !important; }
    `;
    document.head.appendChild(style);
    
    // briefly delay to restore transition effects
    setTimeout(() => {
      style.innerHTML = '';
    }, 300);
  }
}

ReactDOM.hydrateRoot(
  document.getElementById('root')!,
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
