import React from 'react';
import { StaticRouter } from 'react-router';
import App from './App';
import { renderToString } from "react-dom/server";

export function render(url: string) {

  const html = renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </React.StrictMode>
  );
  return {
    html,
  }
}
