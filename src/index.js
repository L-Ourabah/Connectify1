import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client'; // Utilisez createRoot depuis react-dom/client

import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserContextProvider } from './context/userContext';
import ErrorPage from './Routes/ErrorPage';
import Connexion from './Routes/Connexion';
import Inscription from './Routes/Inscription';
import Profil from './Routes/Profil';
import Contact from './Routes/Contact';

const root = document.getElementById('root');

const appRoot = createRoot(root);

appRoot.render(
  
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="connexion" element={<Connexion />} />
          <Route path="inscription" element={<Inscription />} />
          <Route path="profil" element={<Profil />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  
);

reportWebVitals();




