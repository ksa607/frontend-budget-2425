// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TransactionList from './pages/transactions/TransactionList';
import PlacesList from './pages/places/PlacesList';
import NotFound from './pages/NotFound';
import About, { Services, History, Location } from './pages/about/About.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  { path: 'transactions', element: <TransactionList /> },
  { path: 'places', element: <PlacesList /> },
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
  { path: '*', element: <NotFound /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
