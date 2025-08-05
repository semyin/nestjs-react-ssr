import React from 'react';
import { StaticRouterProvider, createStaticHandler, createStaticRouter } from 'react-router';
import { renderToString } from "react-dom/server";
import { dehydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { AppProvider, IGlobalState } from './AppContext';
import { createRoutes } from './routes';

export async function render(req: { originalUrl: string, headers: Record<string, string>, cookies: Record<string, string> }) {

  // 1. app initial state
  const isLoggedIn = req?.cookies?.token; 
  const globalInitialState: IGlobalState = {
    title: 'this is inital title',
    user: isLoggedIn ? { isLoggedIn: true, name: 'SSR User' } : null,
    theme: 'light',
  };

  // 2. create HelmetProvider
  const helmetContext: { helmet?: any } = {};

  // 3. create QueryClient
  const queryClient = new QueryClient({ 
    defaultOptions: {
      queries: {
        //  The staleTime here should match the server-side or be adjusted according to your strategy.
        staleTime: 10 * 1000,
        // On the server, we usually do not want to retry failed queries.
        retry: false,
      },
    },
   });
 
  // 4. create routes using queryClient
  const routes = createRoutes(queryClient);
  
  // 5. create React Router's static handler
  const handler = createStaticHandler(routes);
 
  // 6. create a Fetch Request object, which is needed by handler.query
  const fetchRequest = new Request(new URL(req.originalUrl, `http://${req.headers.host}`), {
    method: 'GET',
    headers: req.headers,
  });
 
  // 7. Query the route and run the loaders. This is crucial!
  // handler.query will automatically call the loader functions of the matched routes.
  const context = await handler.query(fetchRequest);
 
   // If there is a redirect or a Response is thrown in the loader, return it directly.
  if (context instanceof Response) {
    throw context;
  }
  
  // 8. create static router using handler.dataRoutes and context
  const router = createStaticRouter(handler.dataRoutes, context);

  const html = renderToString(
    <React.StrictMode>
      <AppProvider initialState={globalInitialState}>
        <HelmetProvider context={helmetContext}>
          <QueryClientProvider client={queryClient}>
            <StaticRouterProvider router={router} context={context} />
          </QueryClientProvider>
        </HelmetProvider>
      </AppProvider>
    </React.StrictMode>
  );

   // 9. dehydration
  const dehydratedState = dehydrate(queryClient);

  // 10. clear queryClient
  queryClient.clear();

  const { helmet } = helmetContext;
  const head = helmet
    ? `
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      ${helmet.script.toString()}
    `
    : '';

  return { html, head, dehydratedState, globalInitialState }
}
