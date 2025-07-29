import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { RouteObject } from 'react-router';
import { DefaultLayout } from '@/layouts/Default';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '',
        element: <Home />,
        loader: async () => {
          return {
            title: 'Home',
          }
        }
      },
      {
        path: '/about',
        element: <About />,
      }
    ],
  },
]

export { routes };