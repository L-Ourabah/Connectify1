import React from 'react';
import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { createRoot } from 'react-dom/client'; // Utilisez createRoot depuis react-dom/client
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserContextProvider } from './context/userContext';
import ErrorPage from './Routes/ErrorPage';
import Connexion from './Routes/Connexion';
import Inscription from './Routes/Inscription';
import Profil from './Routes/Profil';
import Contact from './Routes/Contact';

// Sélectionne l'élément HTML avec l'ID "root"
const root = document.getElementById('root');

// Crée un "appRoot" pour le rendu React
const appRoot = createRoot(root);

// Rendu de l'application React dans l'élément "root"
appRoot.render(
  <StrictMode>
    {/* Encadre l'application avec React Strict Mode, pour détecter les problèmes potentiels */}
    <UserContextProvider>
      {/* Fournit un contexte utilisateur aux composants enfants */}
      <BrowserRouter>
        {/* Configuration du routeur pour gérer la navigation */}
        <Routes>
          {/* Définition des routes et de leurs composants associés */}
          <Route path="/" element={<App />} />
          {/* Route pour la page d'accueil */}
          <Route path="connexion" element={<Connexion />} />
          {/* Route pour la page de connexion */}
          <Route path="inscription" element={<Inscription />} />
          {/* Route pour la page d'inscription */}
          <Route path="profil" element={<Profil />} />
          {/* Route pour la page de profil */}
          <Route path="contact" element={<Contact />} />
          {/* Route pour la page de contact */}
          <Route path="*" element={<ErrorPage />} />
          {/* Route pour toutes les autres URL non définies */}
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  </StrictMode>
);

// Rapport des performances de l'application
reportWebVitals();





