import React from 'react';
// import { StaticRouter } from 'react-router-dom';
import App from './App';
import { renderToString } from "react-dom/server";

export function render(url: string) {
  const html = renderToString(
    // <StaticRouter location={url}>
      <App />
    // </StaticRouter>
  );
  return {
    html,
  }
}
