import React from 'react';
import { StaticRouter, matchRoutes } from 'react-router';
import App from './App';
import { renderToString } from "react-dom/server";
import { routes } from './routes';

export async function render(url: string) {

  const matchedRoutes = matchRoutes(routes, url);
  console.log(matchedRoutes);
  
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
