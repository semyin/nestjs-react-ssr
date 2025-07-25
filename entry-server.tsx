import React from 'react';
import { StaticRouter } from 'react-router';
import App from './App';
import { renderToString } from "react-dom/server";

export function render(url: string) {
  console.log(url);
  
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
  return {
    html,
  }
}
