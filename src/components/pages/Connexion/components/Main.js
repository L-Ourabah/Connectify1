import React from 'react';
import '../../../../App.css';
import { Link } from 'react-router-dom';
import imgConnexion from '../../../../media/img/fd_connexion.jpg'
import{useNavigate} from "react-router-dom";
import {UserContext} from '../../../../context/userContext';
import { useRef, useState, useContext } from "react";

export default function Main(){

    const {signIn} = useContext(UserContext);

    const navigate = useNavigate();

    const [validation, setValidation] = useState("");

    const inputs = useRef([])

    const addInputs = el => {
        if(el && !inputs.current.includes(el)){
            inputs.current.push(el)
        }
    }

    const formRef = useRef();

    const handleForm = async (e) => {
        e.preventDefault()

        try{

            await signIn(
                inputs.current[0].value,
                inputs.current[1].value
            )

            setValidation("");
            navigate("/Profil");

        }catch{
            setValidation("Mot de passe ou Email incorrect")
        }
        
    }
    return(
        
        <main>


        {/*section contact*/}
        <section className="connexion">
                <div className="gauche">
                    <img src={imgConnexion} alt="img_connexion "/>
                    </div>
                <div className="droite_form">
                    <h2>Connexion</h2>
                    <form ref={formRef} onSubmit={handleForm} method="POST" >
        <div className="content_form_connexion ">
        <div className='label_email'>
            <label name="email">Email:</label>
            <input ref={addInputs} type="text" placeholder='Entrez votre email...' />
        </div>

        <div className='label_mdp'>
        <label name="mdp">Mot de passe :</label>
            <input ref={addInputs} type="password" placeholder='Entrez votre mot de passe ...' />
        </div>
      
        <p className='six-characters'>{validation}</p>
        <button type='submit'>Se Connecter </button>
        </div>
                   </form>

        <div className="link">
                   <p>Pas de compte ? </p> <Link to={'../inscription'}>Inscrivez-vous</Link>
                   </div>
                   </div>
            </section>

  
        </main>
    );
}