import React from 'react'; // Importe React
import '../../../../App.css'; // Importe les fichiers de style CSS
import '../../../../appResponsive.css';
import { Link } from 'react-router-dom'; // Importe la fonction Link pour gérer les liens
import imgConnexion from '../../../../media/img/fd_connexion.jpg'; // Importe une image
import { useNavigate } from "react-router-dom"; // Importe useNavigate pour gérer la navigation
import { UserContext } from '../../../../context/userContext'; // Importe le contexte utilisateur
import { useRef, useState, useContext } from "react"; // Importe useRef, useState, useContext pour gérer les états et les références

export default function Main() {
  const { signIn } = useContext(UserContext); // Récupère la fonction signIn à partir du contexte utilisateur

  const navigate = useNavigate(); // Initialise la fonction de navigation

  const [validation, setValidation] = useState(""); // Initialise un état pour la validation

  const inputs = useRef([]); // Crée une référence pour les éléments d'entrée de formulaire

  const addInputs = el => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el); // Ajoute les éléments d'entrée au tableau de références
    }
  }

  const formRef = useRef(); // Crée une référence pour le formulaire

  const handleForm = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire

    try {
      // Tente de s'authentifier en utilisant l'email et le mot de passe
      await signIn(
        inputs.current[0].value, // Récupère la valeur de l'email
        inputs.current[1].value  // Récupère la valeur du mot de passe
      );

      setValidation(""); // Réinitialise le message de validation
      navigate("/Profil"); // Redirige vers la page de profil après la connexion

    } catch {
      setValidation("Mot de passe ou Email incorrect"); // Affiche un message d'erreur en cas d'échec de connexion
    }
  }

  return (
    <main>
      {/* Section de connexion */}
      <section className="connexion">
        <div className="gauche">
          <img src={imgConnexion} alt="img_connexion" /> {/* Affiche l'image de connexion */}
        </div>
        <div className="droite_form">
          <h2>Connexion</h2>
          <form ref={formRef} onSubmit={handleForm} method="POST"> {/* Formulaire de connexion */}
            <div className="content_form_connexion">
              <div className='label_email'>
                <label name="email">Email:</label>
                <input ref={addInputs} type="text" placeholder='Entrez votre email...' /> {/* Champ de saisie pour l'email */}
              </div>
              <div className='label_mdp'>
                <label name="mdp">Mot de passe :</label>
                <input ref={addInputs} type="password" placeholder='Entrez votre mot de passe ...' /> {/* Champ de saisie pour le mot de passe */}
              </div>
              <p className='six-characters'>{validation}</p> {/* Affiche le message de validation ou d'erreur */}
              <button type='submit'>Se Connecter</button> {/* Bouton de connexion */}
            </div>
          </form>
          <div className="link">
            <p>Pas de compte ? </p> <Link to={'../inscription'}>Inscrivez-vous</Link> {/* Lien vers la page d'inscription */}
          </div>
        </div>
      </section>
    </main>
  );
}
