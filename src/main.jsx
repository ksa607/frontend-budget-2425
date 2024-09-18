// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import TransactionList from './pages/transactions/TransactionList';
import PlacesList from './pages/places/PlacesList';
import PlaceDetail from './pages/places/PlaceDetail.jsx';
import NotFound from './pages/NotFound';
import About, { Services, History, Location } from './pages/about/About.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  { path: 'transactions', element: <TransactionList /> },
  {
    path: '/places',
    children: [
      {
        index: true,
        element: <PlacesList />,
      },
      {
        path: ':id',
        element: <PlaceDetail />,
      },
    ],
  },
  {
    path: 'about',
    element: <About />,
    children: [
      {
        path: 'services',
        element: <Services />,
      },
      {
        path: 'history',
        element: <History />,
      },
      {
        path: 'location',
        element: <Location />,
      },
    ],
  },
  {
    path: 'services',
    element: <Navigate to='/about/services' replace />,
  },
  { path: '*', element: <NotFound /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
