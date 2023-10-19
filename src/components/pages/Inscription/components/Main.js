import React, { useContext, useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../../../context/userContext';
import { Link } from 'react-router-dom';
import imgInscription from '../../../../media/img/fd_inscription.jpg'
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../../../services/firebase-config';
import '../../../../App.css';
import '../../../../appResponsive.css';

export default function Main() {
    const { signUp } = useContext(UserContext); // Récupère la fonction signUp depuis le contexte utilisateur

    const navigate = useNavigate(); // Initialise la fonction de navigation

    const [validation, setValidation] = useState(""); // Initialise un état pour la validation du formulaire

    const inputs = useRef([]); // Crée une référence pour les éléments d'entrée de formulaire

    const addInputs = el => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el);
        }
    };

    const formRef = useRef(); // Crée une référence pour le formulaire

    const handleForm = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire

        if ((inputs.current[5].value.length || inputs.current[6].value.length) < 6) {
            setValidation("6 caractères minimum");
            return;
        }
        if (inputs.current[5].value !== inputs.current[6].value) {
            setValidation("Mots de passe différents !");
            return;
        }

        try {
            await signUp(
                inputs.current[2].value,
                inputs.current[5].value
            );

            formRef.current.reset();
            setValidation("");
            navigate("/Profil"); // Redirige vers la page de profil après l'inscription

        } catch (err) {

            if (err.code === "auth/invalid-email") {
                setValidation("Le format de l'Email est incorrect");
            }

            if (err.code === "auth/email-already-in-use") {
                setValidation("Cette adresse Email est déjà utilisée");
            }
        }
    };

    // Récupère le prénom, le nom, l'Email et le genre de l'utilisateur
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newGender, setNewGender] = useState("");
    const [users, setUsers] = useState([]); // Initialise un état pour stocker les utilisateurs

    // Récupère les informations dans la collection "users" de Firebase
    const usersCollectionRef = collection(db, "users");

    const createUser = async () => {
        // Crée des champs dans la base de données dans la collection "users"
        await addDoc(usersCollectionRef, { lastName: newLastName, firstName: newFirstName, email: newEmail, gender: newGender });
    };

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            // Récupère toutes les informations des utilisateurs et les place dans un tableau
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getUsers();

    }, []);

    // Le useEffect ci-dessus se déclenche une seule fois au chargement du composant, récupère les utilisateurs de la collection "users" dans Firebase et les stocke dans l'état "users".



    return (
        <main>



            <section className="inscription">
                <div className="gauche">
                    <img src={imgInscription} alt="img_inscription " />
                </div>
                <div className="droite_form">
                    <h2>Inscription</h2>
                    <form ref={formRef} onSubmit={handleForm} >


                        <div className="content_form_inscription">
                            <div className='content_name'>

                                <div className='label_nom'>
                                    <label htmlFor="nom">Nom:</label>
                                    <input

                                        ref={addInputs}
                                        onChange={(event) => {
                                            setNewLastName(event.target.value);
                                        }}
                                        type='text'
                                        id='name'
                                        placeholder='Entrez votre nom...'
                                        required

                                    />

                                </div>
                                <div className="label_prenom">

                                    <label htmlFor="prenom">Prénom:</label>
                                    <input

                                        ref={addInputs}
                                        onChange={(event) => {
                                            setNewFirstName(event.target.value);
                                        }}
                                        type='text'
                                        id='firstname'
                                        placeholder='Entrez votre prénom...'
                                        required

                                    />
                                </div>
                            </div>
                            <div className='label_email'>
                                <label htmlFor="email">Email:</label>
                                <input

                                    ref={addInputs}
                                    onChange={(event) => {
                                        setNewEmail(event.target.value);
                                    }}
                                    type='email'
                                    id='email'
                                    placeholder='Entrez votre email..'
                                    required


                                />


                            </div>


                            <div className="label_genre">

                                <label htmlFor="genre">Genre:</label>

                                <input

                                    ref={addInputs}
                                    onChange={(event) => {
                                        setNewGender(event.target.value);
                                    }}
                                    type='radio'
                                    name='genre'
                                    id='homme'
                                    value='homme'


                                />


                                <span name="homme">Homme</span>

                                <input

                                    ref={addInputs}
                                    onChange={(event) => {
                                        setNewGender(event.target.value);
                                    }}
                                    type='radio'
                                    name='genre'
                                    id='femme'
                                    value='femme'

                                />


                                <span name="femme">Femme</span>

                            </div>




                            <div className='label_mdp'>
                                <label htmlFor="mdp">Mot de passe :</label>
                                <input

                                    ref={addInputs}
                                    type='password'
                                    id='password'
                                    placeholder='Entrez votre mot de passe...'
                                    required

                                />
                            </div>



                            <div className='label_mdp'>
                                <label htmlFor="mdp_vf">Vérification de mot de passe :</label>
                                <input

                                    ref={addInputs}
                                    type='password'
                                    id='password-verification'
                                    placeholder='Confirmez votre mot de passe..'
                                    required

                                />
                                <p>{validation}</p>
                                <button ref={addInputs}
                                    onClick={createUser}
                                    type='submit'
                                    id='inscription'
                                    value='Valider'>Valider </button>
                            </div>



                        </div>
                    </form>

                    <div className="link">
                        <p>Déja Inscrit ? </p> <Link to={'../connexion'}>Connectez-vous</Link>
                    </div>
                </div>
            </section>


        </main>
    );
}