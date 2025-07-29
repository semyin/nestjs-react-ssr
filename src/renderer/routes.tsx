import { RouteObject } from 'react-router';
import { QueryClient } from '@tanstack/react-query';
import App from './App';
import { Home, homeQueryKey, fetchHome } from '@/pages/Home';
import { About, aboutQueryKey, fetchAbout } from '@/pages/About';

const createRoutes = (queryClient: QueryClient): RouteObject[] => [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
        loader: async () => {
          return queryClient.prefetchQuery({
            queryKey: homeQueryKey,
            queryFn: fetchHome,
          });
        }
      },
      {
        path: '/about',
        element: <About />,
        loader: async () => {
          return queryClient.prefetchQuery({
            queryKey: aboutQueryKey,
            queryFn: fetchAbout,
          });
        }
      }
    ],
  },
]

export { createRoutes };