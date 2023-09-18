// Import des dépendances React et Firebase
import { createContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from "../services/firebase-config";

// Création du contexte utilisateur
export const UserContext = createContext();

// Composant de contexte utilisateur
export function UserContextProvider(props) {
  // Fonction pour s'inscrire avec un email et un mot de passe
  const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd);

  // Fonction pour se connecter avec un email et un mot de passe
  const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);

  // État pour stocker l'utilisateur actuel
  const [currentUser, setCurrentUser] = useState();
  // État pour indiquer si les données sont en cours de chargement
  const [loadingData, setLoadingData] = useState(true);

  // Effet qui écoute les changements d'état de l'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser)
      setLoadingData(false)
    })

    // Désabonnement de l'écoute des changements d'état
    return unsubscribe;
  }, [])

  // Rendu du contexte utilisateur et affichage des enfants une fois que les données sont chargées
  return (
    <UserContext.Provider value={{ signUp, signIn, currentUser }}>
      {!loadingData && props.children}
    </UserContext.Provider>
  )
}
