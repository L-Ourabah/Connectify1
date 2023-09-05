import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserContextProvider } from './context/userContext';


import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './Routes/ErrorPage';
import Connexion from './Routes/Connexion';
import Inscription from './Routes/Inscription';
import Profil from './Routes/Profil';
import Contact from './Routes/Contact';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "connexion",
    element: <Connexion />
  },
  {
    path: "inscription",
    element: <Inscription />
  },
  {
    path: "profil",
    element: <Profil />
  },
  {
    path: "contact",
    element: <Contact />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>

      <RouterProvider router={router} />

    </UserContextProvider>
  </React.StrictMode>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
